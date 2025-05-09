"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { select } from "d3-selection";
import { json } from "d3-fetch";
import { geoPath, geoMercator } from "d3-geo";
import { Feature, FeatureCollection } from "geojson";
import { Box } from "@mui/material";

const width = 800;
const height = 600;
const areaColor = "#0b4678";
const areaHoverColor = "#005faf";

const regionNames: { [key: string]: string } = {
  "Иссык-Кульская область": "statesIssykKulRegion",
  "Чуйская область": "statesChuyRegion",
  "Нарынская область": "statesNarynRegion",
  "Таласская область": "statesTalasRegion",
  "Баткенская область": "statesBatkenRegion",
  "Джалал-Абадская область": "statesDjalalAbadRegion",
  "Ошская область": "statesOshRegion",
  "город Бишкек": "statesBishkekCity",
  "город Ош": "statesOshCity",
};

const isFeatureCollection = (data: unknown): data is FeatureCollection => {
  return (
    typeof data === "object" &&
    data !== null &&
    "features" in data &&
    Array.isArray((data as FeatureCollection).features) &&
    (data as FeatureCollection).features.every(
      (feature) => typeof feature === "object" && feature !== null && "geometry" in feature
    )
  );
};

interface Props {
  handleMouseEnter: (locationName: string) => void;
  handleMouseLeave: () => void;
  handleClick: (locationName: string) => void;
  handleBack: () => void;
}

const ContractsMap: React.FC<Props> = ({ handleMouseEnter, handleMouseLeave, handleBack, handleClick }) => {
  const ref = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Feature | null>(null);

  const drawRegions = useCallback(() => {
    json("/map/statesGeoJSON.json")
      .then((geoData: unknown) => {
        if (isFeatureCollection(geoData)) {
          const svg = select(ref.current);
          svg.selectAll("*").remove();

          const projection = geoMercator().fitSize([width, height], geoData);
          const path = geoPath().projection(projection);

          svg
            .selectAll("path")
            .data(geoData.features.filter((f: Feature) => f.geometry.type !== "Point"))
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", areaColor)
            .attr("stroke", "#fff")
            .attr("stroke-width", 0.5)
            .style("cursor", "pointer")
            .on("mousemove", function (event, d) {
              const tooltip = select(tooltipRef.current);
              tooltip
                .style("left", `${event.offsetX + 12}px`)
                .style("top", `${event.offsetY + 12}px`)
                .style("opacity", 1)
                .html((d.id as string) || "Без названия");
            })
            .on("mouseenter", function (event, d) {
              if (d && d.id) {
                select(this).attr("fill", areaHoverColor);
                handleMouseEnter(d.id as string);
              }
            })
            .on("mouseleave", function (event, d) {
              select(tooltipRef.current).style("opacity", 0);
              select(this).attr("fill", areaColor);
              handleMouseLeave();
            })
            .on("click", function (event, d) {
              if (d && d.id) {
                setSelectedRegion(d);
                handleClick(d.id as string);
              }
            })
            .append("title");
        }
      })
      .catch((error) => console.error("Error loading GeoJSON data:", error));
  }, []);

  const drawDistricts = useCallback(() => {
    if (!selectedRegion) return;

    const regionName = regionNames[selectedRegion.id as string];

    json(`/map/${regionName}.json`).then((districts: unknown) => {
      if (isFeatureCollection(districts)) {
        const svg = select(ref.current);
        svg.selectAll("*").remove();
        const projection = geoMercator().fitSize([width, height], districts);
        const path = geoPath().projection(projection);

        svg
          .selectAll("path")
          .data(districts.features.filter((f: Feature) => f.geometry.type !== "Point"))
          .enter()
          .append("path")
          .attr("d", (d) => {
            return path(d);
          })
          .attr("d", path)
          .attr("fill", areaColor)
          .attr("stroke", "#fff")
          .attr("stroke-width", 0.5)
          .style("cursor", "pointer")
          .on("mousemove", function (event, d) {
            const tooltip = select(tooltipRef.current);
            tooltip
              .style("left", `${event.offsetX + 12}px`)
              .style("top", `${event.offsetY + 12}px`)
              .style("opacity", 1)
              .html((d.id as string) || "Без названия");
          })
          .on("mouseenter", function (event, d) {
            if (d && d.id) {
              select(this).attr("fill", areaHoverColor);
              // handleSetIsDistrict(true);
              // handleSetChartFilter(d.id as string);
            }
          })
          .on("mouseleave", function () {
            select(tooltipRef.current).style("opacity", 0);
            select(this).attr("fill", areaColor);
            // handleSetIsDistrict(false);
            // handleSetChartFilter(null);
          })
          .on("click", function (event, d) {
            if (d && d.id) {
              // handleSetChartFilter(d.id as string);
            }
          })
          .append("title");
      }
    });
  }, [selectedRegion]);

  const resetView = () => {
    setSelectedRegion(null);
    // handleSetIsDistrict(false);
    // handleSetFilter(null);
    drawRegions();
  };

  useEffect(() => {
    const svg = select(ref.current);
    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("background", "#fff");

    drawRegions();
  }, [drawRegions]);

  useEffect(() => {
    if (selectedRegion) {
      drawDistricts();
      // handleSetChartFilter(selectedRegion.id as string);
    }
  }, [selectedRegion, drawDistricts]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: { xs: "350px", md: "800px" },
        height: "600px", // <-- добавьте фиксированную высоту
        overflow: "hidden", // <-- это предотвратит "вытекание" при перерисовке
        margin: "0 auto",
      }}
    >
      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          pointerEvents: "none",
          zIndex: 20,
          padding: "10px 30px",
          border: "1px solid white",
          borderRadius: "4px",
          backgroundColor: areaColor,
          color: "white",
          fontSize: "18px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          opacity: 0,
          transition: "opacity 0.15s ease-in-out",
        }}
        onMouseLeave={() => handleMouseLeave()}
      ></div>

      {selectedRegion && (
        <button
          onClick={resetView}
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            zIndex: 10,
            padding: "8px 16px",
            color: "white",
            backgroundColor: areaColor,
            border: "1px solid #ccc",
            borderRadius: "6px",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
          }}
        >
          Назад
        </button>
      )}
      <svg ref={ref} style={{ width: "100%", height: "100%", userSelect: "none", marginRight: "auto" }} />
    </Box>
  );
};

export default ContractsMap;

"use client";

import React from "react";

const HeatLayerLegend = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: "white",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "12px",
        lineHeight: "1.5",
        zIndex: 1000,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <div style={{ backgroundColor: "#000033", width: 10, height: 10, borderRadius: "50%" }} />
        <span>до 5 млн</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <div style={{ backgroundColor: "#0000CC", width: 10, height: 10, borderRadius: "50%" }} />
        <span>5 млн - 50 млн</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <div style={{ backgroundColor: "#99CCFF", width: 10, height: 10, borderRadius: "50%" }} />
        <span>50 млн - 100 млн</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <div style={{ backgroundColor: "#F0F8FF", width: 10, height: 10, borderRadius: "50%" }} />
        <span>от 100 млн</span>
      </div>
    </div>
  );
};

export default HeatLayerLegend;

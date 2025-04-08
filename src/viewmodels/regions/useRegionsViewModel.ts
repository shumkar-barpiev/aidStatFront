"use client";

import { useEffect, useState } from "react";
import { useAidStatRegionsStore } from "@/stores/dictionaries/aidstat-regions";

export interface District {
  id: number;
  name: string;
  regionId: number;
  projectCount: number;
}

export interface Region {
  id: number;
  name: string;
  projectCount: number;
}

export const useRegionsViewModel = () => {
  const regionsStore = useAidStatRegionsStore();
  const [regions, setRegions] = useState<Region[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);

  const splitRegionObject = (regionObj: Record<string, any>): [Region, District[]] => {
    console.log(regionObj);
    const region = {
      id: regionObj.id,
      name: regionObj.name,
      projectCount: regionObj.projectCount,
    };

    const districts = regionObj.district.map((district: Record<string, any>) => ({
      id: district.id,
      name: district.name,
      regionId: regionObj.id,
      projectCount: district.projectCount,
    }));

    return [region, districts];
  };

  useEffect(() => {
    regionsStore.fetchItems((data: Record<string, any>[]) => {
      if (data.length > 0) {
        const regions: Region[] = [];
        const regionDistricts: District[] = [];

        data.map((regionData) => {
          const [region, districts] = splitRegionObject(regionData.region);

          regions.push(region);
          regionDistricts.push(...districts);
        });

        setRegions(regions);
        setDistricts(regionDistricts);
      }
    });
  }, []);

  return {
    regions,
    districts,
  };
};

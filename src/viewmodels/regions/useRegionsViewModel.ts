"use client";

import { useEffect, useState } from "react";
import { useAidStatRegionsStore } from "@/stores/dictionaries/aidstat-regions";

export interface District {
  id: number;
  name: string;
  regionId: number;
}

export interface Region {
  id: number;
  name: string;
}

export const useRegionsViewModel = () => {
  const regionsStore = useAidStatRegionsStore();
  const [regions, setRegions] = useState<Region[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);

  const splitRegionObject = (regionObj: Record<string, any>): [Region, District[]] => {
    const region = {
      id: regionObj.id,
      name: regionObj.name,
    };

    const districts = regionObj.district.map((district: Record<string, any>) => ({
      id: district.id,
      name: district.name,
      regionId: regionObj.id,
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

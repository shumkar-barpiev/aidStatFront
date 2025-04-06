"use client";

import { useEffect, useState } from "react";
import { useAidStatSectorsStore } from "@/stores/dictionaries/aidstat-sectors";

interface SectorOption {
  id: number;
  name: string;
  projectCount: number;
  type: string;
}

export const useSectorsViewModel = () => {
  const sectorsStore = useAidStatSectorsStore();
  const [sectors, setSectors] = useState<SectorOption[]>([]);

  useEffect(() => {
    sectorsStore.fetchItems((data: SectorOption[]) => {
      setSectors(data);
    });
  }, []);

  return {
    sectors,
  };
};

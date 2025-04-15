"use client";

import { useEffect, useState } from "react";
import { useAidStatSectorsStore } from "@/stores/dictionaries/aidstat-sectors";

interface SectorOption {
  id: number;
  name: string;
  type: string;
  projectCount: number;
  children: Record<string, any>[] | null;
}

export const useSectorsViewModel = () => {
  const sectorsStore = useAidStatSectorsStore();
  const [sectors, setSectors] = useState<SectorOption[]>([]);
  const [sectorsGroup, setSectorsGroup] = useState<SectorOption[]>([]);
  const [allChildrenMap, setAllChildrenMap] = useState<Record<number, SectorOption[]>>({});

  const handleSectorGroupChange = (parentIds: number[]) => {
    if (parentIds.length > 0) {
      const filteredParents = sectorsGroup.filter((group) => parentIds.includes(group.id));
      let children: Record<string, any>[] = [];
      filteredParents.map((parent) => {
        if (parent.children?.length) {
          parent.children.map((child) => children.push(child));
        }
      });

      setSectors(children as SectorOption[]);
    } else {
      const allChildren = Object.values(allChildrenMap).flat();
      setSectors(allChildren);
    }
  };

  useEffect(() => {
    sectorsStore.fetchItems((data: SectorOption[]) => {
      setSectorsGroup(data);
      const children = data.flatMap((item) => item.children || []);
      setSectors(children as SectorOption[]);

      const childrenMap: Record<number, SectorOption[]> = {};
      data.forEach((item) => {
        if (item.children && item.children.length > 0) {
          childrenMap[item.id] = item.children as SectorOption[];
        }
      });
      setAllChildrenMap(childrenMap);
    });
  }, []);

  return {
    sectors,
    sectorsGroup,
    handleSectorGroupChange,
  };
};

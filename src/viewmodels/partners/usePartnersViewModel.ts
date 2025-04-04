"use client";

import { TModelFilters } from "@/types/model";
import { ChangeEvent, useEffect, useState } from "react";
import { usePartnersStore } from "@/stores/partners/partners";
import { TPartnerModel, EPartnerModelFilter } from "@/models/partner/partner";

let timer: ReturnType<typeof setTimeout> | null;

const initialFilters: () => TModelFilters = () => {
  return {
    page: 1,
    pageSize: 16,
  };
};

export const usePartnersViewModel = () => {
  const partnerStore = usePartnersStore();
  const [partners, setPartners] = useState<TPartnerModel[]>([]);
  const [allPartners, setAllPartners] = useState<TPartnerModel[]>([]);
  const [partnerItemsPageTotal, setPartnerItemsPageTotal] = useState(0);
  const [partnersFilter, setPartnersFilter] = useState<TModelFilters>({
    ...initialFilters(),
  });

  const handleProcessItemsPageChange = (e: ChangeEvent<unknown>, page: number) => {
    setPartnersFilter((prev) => ({ ...prev, page }));
  };

  const handleFilter = (type: EPartnerModelFilter, searchText?: string | number) => {
    if (timer != null) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      // switch (type) {
      //   case EPartnerModelFilter.search:
      //     console.log(searchText);
      //     setPartnersFilter((prev) => ({
      //       ...prev,
      //       page: 1,
      //       searchString: searchText ?? "",
      //     }));
      //     timer = null;
      //     break;
      // }
    }, 500);
  };

  useEffect(() => {
    partnerStore.fetchItems(partnersFilter, (data: Record<string, any>) => {
      const pageTotal =
        data.total != null && partnersFilter?.pageSize != null ? Math.ceil(data.total / partnersFilter?.pageSize) : 0;
      setPartnerItemsPageTotal(pageTotal);
      if (pageTotal > 0) setPartners(data.data);
    });

    partnerStore.getItems((data: TPartnerModel[]) => {
      if (data.length > 0) setAllPartners(data);
    });
  }, [partnersFilter]);

  return {
    partners,
    allPartners,
    handleFilter,
    partnersFilter,
    partnerItemsPageTotal,
    handleProcessItemsPageChange,
  };
};

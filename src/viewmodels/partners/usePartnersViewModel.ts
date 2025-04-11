"use client";

import { TModelFilters } from "@/types/model";
import { ChangeEvent, useEffect, useState } from "react";
import { usePartnersStore } from "@/stores/partners/partners";
import { TPartnerModel, EPartnerModelFilter } from "@/models/partner/partner";

let timer: ReturnType<typeof setTimeout> | null;

const initialFilters: () => TModelFilters = () => {
  return {
    page: 1,
    pageSize: 8,
  };
};

export const usePartnersViewModel = () => {
  const partnerStore = usePartnersStore();
  const [allPartners, setAllPartners] = useState<TPartnerModel[]>([]);
  const [partnersFilter, setPartnersFilter] = useState<TModelFilters>({
    ...initialFilters(),
  });

  const handlePartnersPageChange = (e: ChangeEvent<unknown>, page: number) => {
    setPartnersFilter((prev) => ({ ...prev, page }));
  };

  const handleFilter = (type: EPartnerModelFilter, searchText?: string | number) => {
    if (timer != null) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      switch (type) {
        case EPartnerModelFilter.search:
          setPartnersFilter((prev) => ({
            ...prev,
            page: 1,
            searchString: searchText ?? null,
          }));
          timer = null;
          break;
      }
    }, 500);
  };

  const fetchPartner = (id: number) => {
    partnerStore.fetchItem(id);
  };

  useEffect(() => {
    partnerStore.getItems((data: TPartnerModel[]) => {
      if (data.length > 0) setAllPartners(data);
    });
  }, []);

  useEffect(() => {
    partnerStore.fetchItems(partnersFilter);
  }, [partnersFilter]);

  return {
    allPartners,
    fetchPartner,
    handleFilter,
    partnersFilter,
    handlePartnersPageChange,
  };
};

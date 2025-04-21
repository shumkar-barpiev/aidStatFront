"use client";

import { TModelFilters } from "@/types/model";
import { ChangeEvent, useEffect, useState } from "react";
import { PartnerType } from "@/viewmodels/partners/usePartnersViewModel";
import { useAgenciesStore } from "@/stores/partners/agencies";

const initialFilters: () => TModelFilters = () => {
  return {
    page: 1,
    pageSize: 8,
    partnerType: PartnerType.CONTRACTOR_IMPLEMENTER,
  };
};

export const useAgenciesViewModel = () => {
  const [selectedAgencyId, setSelectedAgencyId] = useState<number | null>(null);
  const [agenciesFilter, setAgenciesFilter] = useState<TModelFilters>({
    ...initialFilters(),
  });
  const { fetchAgencies, fetchAgency } = useAgenciesStore();
  const handleAgenciesPageChange = (e: ChangeEvent<unknown>, page: number) => {
    setAgenciesFilter((prev) => ({ ...prev, page }));
  };

  const handleSelectAgency = (id: number) => {
    setSelectedAgencyId(id);
  };

  useEffect(() => {
    if (selectedAgencyId) fetchAgency(selectedAgencyId);
  }, [selectedAgencyId])

  useEffect(() => {
    fetchAgencies(agenciesFilter);
  }, [agenciesFilter]);

  return {
    agenciesFilter,
    handleSelectAgency,
    handleAgenciesPageChange,
  };
};

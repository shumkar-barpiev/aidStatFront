"use client";

import React, { useState } from "react";
import AgenciesListItem from "@/components/partners/agencies/AgenciesListItem";
import { Box, Pagination } from "@mui/material";
import { useAgenciesStore } from "@/stores/partners/agencies";
import { useAgenciesViewModel } from "@/viewmodels/partners/useAgenciesViewModel";

const AgenciesList = () => {
  const [isOpenId, setIsOpenId] = useState<null | number>(null);

  const { agencies, agenciesPageTotal } = useAgenciesStore();
  const { handleAgenciesPageChange, agenciesFilter, handleSelectAgency } = useAgenciesViewModel();

  const toggleOpen = (id: number) => {
    setIsOpenId((prev) => (prev === id ? null : id));
    handleSelectAgency(id);
  };

  return (
    <Box>
      {agencies?.map((agency) => (
        <AgenciesListItem
          key={agency.id}
          item={agency}
          toggleOpen={toggleOpen}
          isOpenId={isOpenId}
        />
      ))}
      {(agenciesPageTotal ?? 0) > 0 && (
        <Box sx={{ mt: 2 }}>
          <Pagination
            siblingCount={1}
            boundaryCount={2}
            page={agenciesFilter?.page || 1}
            count={agenciesPageTotal ?? 1}
            onChange={handleAgenciesPageChange}
          />
        </Box>
      )}
    </Box>
  );
};

export default AgenciesList;


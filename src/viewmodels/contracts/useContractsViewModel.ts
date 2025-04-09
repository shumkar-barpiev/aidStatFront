import { useEffect, useState } from "react";
import { Contract, useContractsStore } from "@/stores/constracts/contracts.ts";
import contractsData from "@/components/maps/contractsData.json";

export const UseContractsViewModel = () => {
  const contractsStore = useContractsStore();
  const [contracts, setContracts] = useState<Contract[]>(contractsData);
  const [filteredContracts, setFilteredContracts] = useState<Contract[]>(contractsData);

  const handleSetFilter = (filter: string | null) => {
    contractsStore.setFilter(filter);
  };

  useEffect(() => {
    contractsStore.fetchItems((data: Contract[]) => {
      setContracts(data);
    });
  }, []);

  useEffect(() => {
    const filterBy = contractsStore.filter;
    if (filterBy) {
      const filtered = contracts.filter((contract) => contract.state_id === filterBy);
      setFilteredContracts(filtered);
    } else {
      setFilteredContracts(contracts); // Если фильтра нет, показываем все контракты
    }
  }, [contractsStore.filter, contracts]);

  return {
    contracts,
    filteredContracts,
    handleSetFilter,
  };
};

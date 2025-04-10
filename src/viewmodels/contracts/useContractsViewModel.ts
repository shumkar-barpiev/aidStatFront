import { useEffect, useState } from "react";
import {
  BudgetStats,
  ByTypesStats,
  Contract,
  ContractShort,
  useContractsStore,
} from "@/stores/constracts/contracts.ts";
import contractsData from "@/components/maps/contractsData.json";
import contractsDataBudgetStateOnly from "@/components/maps/contractsDataBudgetStateOnly.json";

export const useContractsViewModel = () => {
  const contractsStore = useContractsStore();
  const [contracts, setContracts] = useState<Contract[]>(contractsData);
  const [filteredContracts, setFilteredContracts] = useState<Contract[]>(contractsData);
  const [filteredContractsForChart, setFilteredContractsForChart] =
    useState<ContractShort[]>(contractsDataBudgetStateOnly);
  const [budgetForChart, setBudgetForChart] = useState<BudgetStats | null>(null);
  const [byTypesForChart, setByTypesForChart] = useState<ByTypesStats | null>(null);

  const handleSetFilter = (filter: string | null) => {
    contractsStore.setFilter(filter);
  };

  const handleSetChartFilter = (filter: string | null) => {
    contractsStore.setChartFilter(filter);
  };

  const handleFilterContracts = (data: Contract[] | ContractShort[], filterBy: string) => {
    return data.filter((contract: Contract | ContractShort) => contract.state_id === filterBy);
  };

  const getTypesStats = (data: ContractShort[]) => {
    let goods = 0;
    let infrastructure = 0;

    data.forEach((contract) => {
      if (contract.type === "товары") {
        goods++;
      } else {
        infrastructure++;
      }
    });

    return {
      goods,
      infrastructure,
    };
  };

  const getBudgetStats = (data: ContractShort[], dollarRate: number = 87): BudgetStats => {
    let lowBudget = 0;
    let mediumBudget = 0;
    let highBudget = 0;

    data.forEach((contract) => {
      const budgetSom = parseFloat(contract.budget);
      const budgetUSD = budgetSom / dollarRate;

      if (budgetUSD < 100_000) {
        lowBudget++;
      } else if (budgetUSD <= 500_000) {
        mediumBudget++;
      } else {
        highBudget++;
      }
    });

    return {
      lowBudget,
      mediumBudget,
      highBudget,
    };
  };

  useEffect(() => {
    contractsStore.fetchItems((data: Contract[]) => {
      setContracts(data);
    });
  }, []);

  useEffect(() => {
    const filterBy = contractsStore.filter;
    if (filterBy) {
      const filtered = handleFilterContracts(contracts, filterBy) as Contract[];
      setFilteredContracts(filtered);
      const filteredForChart = handleFilterContracts(contractsDataBudgetStateOnly, filterBy) as ContractShort[];
      setFilteredContractsForChart(filteredForChart);
      const stats = getBudgetStats(filteredForChart);
      setBudgetForChart(stats);
      const typesStats = getTypesStats(filteredForChart);
      setByTypesForChart(typesStats);
    } else {
      setFilteredContracts(contracts);
      setFilteredContractsForChart(contractsDataBudgetStateOnly);
      const stats = getBudgetStats(contractsDataBudgetStateOnly);
      setBudgetForChart(stats);
      const typesStats = getTypesStats(contractsDataBudgetStateOnly);
      setByTypesForChart(typesStats);
    }
  }, [contractsStore.filter, contracts]);

  useEffect(() => {
    const chartFilter = contractsStore.chartFilter;
    if (chartFilter) {
      const filteredForChart = handleFilterContracts(contractsDataBudgetStateOnly, chartFilter) as ContractShort[];
      setFilteredContractsForChart(filteredForChart);
      const stats = getBudgetStats(filteredForChart);
      setBudgetForChart(stats);
      const typesStats = getTypesStats(filteredForChart);
      setByTypesForChart(typesStats);
    } else {
      setFilteredContractsForChart(contractsDataBudgetStateOnly);
      const stats = getBudgetStats(contractsDataBudgetStateOnly);
      setBudgetForChart(stats);
      const typesStats = getTypesStats(contractsDataBudgetStateOnly);
      setByTypesForChart(typesStats);
    }
  }, [contractsStore.chartFilter]);

  return {
    contracts,
    filteredContracts,
    handleSetFilter,
    handleSetChartFilter,
    filteredContractsForChart,
    budgetForChart,
    byTypesForChart,
  };
};

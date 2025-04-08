import { useEffect, useState } from "react";
import { useContractsStore } from "@/stores/constracts/contracts.ts";

interface ContractOption {
  id: number;
  name: string;
  projectCount: number;
  type: string;
}

export const UseContractsViewModel = () => {
  const contractsStore = useContractsStore();
  const [contracts, setContracts] = useState<ContractOption[]>([]);

  useEffect(() => {
    contractsStore.fetchItems((data: ContractOption[]) => {
      setContracts(data);
    });
  }, []);

  return;
  {
    contracts;
  }
};

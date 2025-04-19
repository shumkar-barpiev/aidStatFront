import { useRouter, useSearchParams } from "next/navigation";

export function useQueryTab(defaultTab = 0) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentTab = parseInt(searchParams.get("tab") || `${defaultTab}`, 10);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", newValue.toString());
    router.replace(`?${params.toString()}`);
  };

  return {
    currentTab,
    handleTabChange,
  };
}
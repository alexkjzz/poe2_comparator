import { useComparison } from "../contexts/ComparisonContext";

export function useComparator() {
  const { state, setItem1, setItem2, swapItems, clearComparison } = useComparison();

  return {
    item1: state.item1,
    item2: state.item2,
    setItem1,
    setItem2,
    swapItems,
    clearComparison,
  };
}

import { useMemo } from "react";
import { useAppSelector } from ".";

export const useCounter = () => {
  const counter = useAppSelector((state) => state.counter.value);
  return useMemo(() => [counter], [counter]);
};

import { useId } from "react";

export default function useNcId(pre = "nc") {
  const id = useId();
  return `${pre}_${id.replace(/:/g, "_")}`;
}

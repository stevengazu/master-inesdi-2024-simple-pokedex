import { useContext } from "react";
import { ThemeContext } from "./theme-context";

export function useTheme() {
  console.log("useTheme()");
  return useContext(ThemeContext);
}

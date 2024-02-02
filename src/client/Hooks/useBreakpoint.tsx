import { useMediaQuery } from "react-responsive";
import resolveConfig from "tailwindcss/resolveConfig.js";
import tailwindConfig from "../../../tailwind.config.js";

const config = resolveConfig({ ...tailwindConfig });

const breakpoints = config.theme.screens;

type BreakpointKey = keyof typeof breakpoints;

export default function useBreakpoint<K extends BreakpointKey>(
  breakpointKey: K
) {
  const bool = useMediaQuery({
    query: `(min-width: ${breakpoints[breakpointKey]})`
  });
  const capitalisedKey =
    breakpointKey[0].toUpperCase() + breakpointKey.substring(1);
  type Key = `is${Capitalize<K>}`;

  return {
    [`is${capitalisedKey}`]: bool
  } as Record<Key, boolean>;
}

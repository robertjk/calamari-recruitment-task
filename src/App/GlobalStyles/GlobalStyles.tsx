import { ReactNode } from "react";

// CSS Reset
import "the-new-css-reset/css/reset.css";

import "./GlobalStyles.boxSizing.css";
import "./GlobalStyles.layout.css";
import "./GlobalStyles.typography.css";

interface GlobalStylesProps {
  children: ReactNode;
}

function GlobalStyles({ children }: GlobalStylesProps) {
  return <>{children}</>;
}

export { GlobalStyles };

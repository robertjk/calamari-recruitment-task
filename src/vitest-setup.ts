import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Fixing issue of Vitest integration with RTL:
// https://github.com/vitest-dev/vitest/issues/1430
afterEach(cleanup);

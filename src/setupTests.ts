import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll } from "vitest";

import { mockServer } from "%mocks/setupNode";

beforeAll(() => {
  mockServer.listen();
});

afterEach(() => {
  mockServer.resetHandlers();

  // Fixing issue of Vitest integration with RTL:
  // https://github.com/vitest-dev/vitest/issues/1430
  cleanup();
});

afterAll(() => {
  mockServer.close();
});

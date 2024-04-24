import { setupWorker } from "msw/browser";

import { handlers } from "./handlers";

const mockWorker = setupWorker(...handlers);

export { mockWorker };

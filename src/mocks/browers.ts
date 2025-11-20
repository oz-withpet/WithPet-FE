import { setupWorker } from "msw/browser";

import { mapHandlers } from "./handlers/mapHandlers";

export const worker = setupWorker(...mapHandlers);

import { setupWorker } from "msw/browser";

import { mapHandlers } from "./handlers/mapHandlers";
import { signupHandlers } from "./handlers/singupHandlers";

export const worker = setupWorker(...mapHandlers, ...signupHandlers);

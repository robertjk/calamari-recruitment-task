import { http, passthrough } from "msw";

const imagesHandlers = [http.get(/.*\.(svg|jpg|png)/, passthrough)];

export { imagesHandlers };

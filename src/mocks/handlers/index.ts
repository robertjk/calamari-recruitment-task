import { imagesHandlers } from "./images";
import { specialistsHandlers } from "./specialists";

const handlers = [...imagesHandlers, ...specialistsHandlers];

export { handlers };

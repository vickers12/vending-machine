import "i18next";
import type { defaultNS } from "./index";
import type resources from "./resources";

declare module "i18next" {
    interface CustomTypeOptions {
        resources: typeof resources;
        defaultNS: typeof defaultNS;
    }
}

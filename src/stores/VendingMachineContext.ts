// src/stores/VendingMachineProvider.tsx
import { createContext } from "react";
import type { VendingMachineStore } from "./VendingMachineStore";

export const VendingMachineContext = createContext<VendingMachineStore | null>(null);

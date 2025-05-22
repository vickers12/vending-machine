import { useContext } from "react";
import type { VendingMachineStore } from "./VendingMachineStore";
import { VendingMachineContext } from "./VendingMachineContext";

export const useVendingMachineStore = (): VendingMachineStore => {
    const store = useContext(VendingMachineContext);
    if (!store)
        throw new Error("useVendingMachineStore must be used within VendingMachineProvider");
    return store;
};

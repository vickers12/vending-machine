import { VendingMachineStore } from "./VendingMachineStore";
import { initialState } from "@core/initialState";

export const vendingMachineStoreInstance = new VendingMachineStore(initialState);

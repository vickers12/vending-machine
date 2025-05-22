import {
    emptyCurrencyInventory,
    getChange,
    makeSingleCurrencyInventory,
    updateCurrencyInventory
} from "@utils/currency";
import type { State, Action } from "./types";
import { currencyValues, EventEnum, productPrices } from "./types";

export function vendingMachineReducer(state: State, action: Action): State {
    switch (action.type) {
        case "DEPOSIT": {
            const value = currencyValues[action.currency];
            const singleDeposit = makeSingleCurrencyInventory(action.currency);
            const updatedInventory = updateCurrencyInventory(
                state.currencyInventory,
                singleDeposit,
                "add"
            );

            return {
                ...state,
                insertedAmount: state.insertedAmount + value,
                currencyInventory: updatedInventory,
                insertedCurrencies: updateCurrencyInventory(
                    state.insertedCurrencies,
                    singleDeposit,
                    "add"
                ),
                event: EventEnum.DEPOSITED
            };
        }

        case "SELECT_PRODUCT": {
            const productKey = action.productKey;
            const price = productPrices[productKey];
            const stock = state.productInventory[productKey];

            if (stock <= 0) {
                return { ...state, event: EventEnum.OUT_OF_STOCK };
            }

            if (state.insertedAmount < price) {
                return { ...state, event: EventEnum.INSUFFICIENT_FUNDS };
            }

            const changeNeeded = state.insertedAmount - price;
            const change = getChange(changeNeeded, state.currencyInventory);

            if (!change) {
                return { ...state, event: EventEnum.UNABLE_TO_GIVE_CHANGE };
            }

            return {
                ...state,
                insertedAmount: 0,
                insertedCurrencies: emptyCurrencyInventory(),
                currencyInventory: updateCurrencyInventory(
                    state.currencyInventory,
                    change,
                    "subtract"
                ),
                productInventory: {
                    ...state.productInventory,
                    [productKey]: stock - 1
                },
                selectedProduct: productKey,
                changeToReturn: change,
                event: EventEnum.PRODUCT_DISPENSED
            };
        }

        case "CANCEL": {
            return {
                ...state,
                insertedAmount: 0,
                currencyInventory: updateCurrencyInventory(
                    state.currencyInventory,
                    state.insertedCurrencies,
                    "subtract"
                ),
                insertedCurrencies: emptyCurrencyInventory(),
                changeToReturn: { ...state.insertedCurrencies },
                event: EventEnum.CANCELLED
            };
        }

        case "CLEAR_EVENT":
            return { ...state, event: null };

        default:
            return state;
    }
}

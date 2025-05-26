import { resetPaymentInventory, makeSinglePayment, updateMoneyInventory } from "@utils/money";
import type { State, Action } from "./types";
import { coinValues, EventEnum, productPrices } from "./types";
import { getChange } from "@utils/money";

export function vendingMachineReducer(state: State, action: Action): State {
    switch (action.type) {
        case "DEPOSIT": {
            const value = coinValues[action.coin];
            const singleDeposit = makeSinglePayment(action.coin);
            const updatedInventory = updateMoneyInventory(
                state.moneyInventory,
                singleDeposit,
                "add"
            );

            return {
                ...state,
                insertedAmount: state.insertedAmount + value,
                moneyInventory: updatedInventory,
                insertedPaymentInventory: updateMoneyInventory(
                    state.insertedPaymentInventory,
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
                return { ...state, event: EventEnum.INSERT_PAYMENT };
            }

            const changeNeeded = state.insertedAmount - price;
            const change = getChange(changeNeeded, state.moneyInventory);

            if (!change) {
                return { ...state, event: EventEnum.UNABLE_TO_GIVE_CHANGE };
            }

            return {
                ...state,
                insertedAmount: 0,
                insertedPaymentInventory: resetPaymentInventory(),
                moneyInventory: updateMoneyInventory(state.moneyInventory, change, "subtract"),
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
                moneyInventory: updateMoneyInventory(
                    state.moneyInventory,
                    state.insertedPaymentInventory,
                    "subtract"
                ),
                insertedPaymentInventory: resetPaymentInventory(),
                changeToReturn: { ...state.insertedPaymentInventory },
                event: EventEnum.CANCELLED
            };
        }

        case "CLEAR_EVENT":
            return { ...state, event: null };

        default:
            return state;
    }
}

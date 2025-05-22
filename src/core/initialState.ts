import type { State } from "./types";
import { CurrencyEnum, ProductEnum } from "./types";

export const initialState: State = {
    insertedAmount: 0,
    message: "Insert currency to begin.",

    currencyInventory: {
        [CurrencyEnum.NICKEL]: 5,
        [CurrencyEnum.DIME]: 5,
        [CurrencyEnum.QUARTER]: 5
    },

    productInventory: {
        [ProductEnum.COLA]: 10,
        [ProductEnum.DIETCOLA]: 8,
        [ProductEnum.LIMESODA]: 0,
        [ProductEnum.WATER]: 2
    },

    insertedCurrencies: {
        [CurrencyEnum.NICKEL]: 0,
        [CurrencyEnum.DIME]: 0,
        [CurrencyEnum.QUARTER]: 0
    }
};

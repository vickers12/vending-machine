import type { State } from "./types";
import { CoinEnum, ProductEnum } from "./types";

export const initialState: State = {
    insertedAmount: 0,

    moneyInventory: {
        [CoinEnum.NICKEL]: 5,
        [CoinEnum.DIME]: 5,
        [CoinEnum.QUARTER]: 5
    },

    productInventory: {
        [ProductEnum.COLA]: 10,
        [ProductEnum.DIETCOLA]: 8,
        [ProductEnum.LIMESODA]: 0,
        [ProductEnum.WATER]: 2
    },

    insertedPaymentInventory: {
        [CoinEnum.NICKEL]: 0,
        [CoinEnum.DIME]: 0,
        [CoinEnum.QUARTER]: 0
    },

    selectedProduct: null,
    changeToReturn: {
        [CoinEnum.NICKEL]: 0,
        [CoinEnum.DIME]: 0,
        [CoinEnum.QUARTER]: 0
    },
    event: null
};

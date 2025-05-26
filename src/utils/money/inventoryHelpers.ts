import { CoinEnum, type MoneyInventory } from "../../core/types";

export function resetPaymentInventory(): MoneyInventory {
    return {
        [CoinEnum.QUARTER]: 0,
        [CoinEnum.DIME]: 0,
        [CoinEnum.NICKEL]: 0
    };
}

export function makeSinglePayment(coinKey: CoinEnum): MoneyInventory {
    return {
        [CoinEnum.QUARTER]: coinKey === CoinEnum.QUARTER ? 1 : 0,
        [CoinEnum.DIME]: coinKey === CoinEnum.DIME ? 1 : 0,
        [CoinEnum.NICKEL]: coinKey === CoinEnum.NICKEL ? 1 : 0
    };
}

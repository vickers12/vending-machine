import { CurrencyEnum, type CurrencyInventory } from "../../core/types";

export function emptyCurrencyInventory(): CurrencyInventory {
    return {
        [CurrencyEnum.QUARTER]: 0,
        [CurrencyEnum.DIME]: 0,
        [CurrencyEnum.NICKEL]: 0
    };
}

export function makeSingleCurrencyInventory(currency: CurrencyEnum): CurrencyInventory {
    return {
        [CurrencyEnum.QUARTER]: currency === CurrencyEnum.QUARTER ? 1 : 0,
        [CurrencyEnum.DIME]: currency === CurrencyEnum.DIME ? 1 : 0,
        [CurrencyEnum.NICKEL]: currency === CurrencyEnum.NICKEL ? 1 : 0
    };
}

import { CurrencyEnum, currencyValues, type CurrencyInventory } from "@core/types";
import { getSortedCurrenciesDescending } from "./getSortedCurrencies";

/**
 * Attempts to return exact change using available currencies.
 * Returns a map of currency -> amount of currencies to return, or null if not possible.
 */
export const getChange = (
    amount: number,
    availableInventory: CurrencyInventory
): CurrencyInventory | null => {
    const sortedCurrencies = getSortedCurrenciesDescending();
    return getOptimalCurrencyChange(amount, sortedCurrencies, availableInventory);
};

/**
 * Fills changeToReturn using the largest available currencies first.
 * Mutates tempInventory and changeToReturn.
 * Returns true if exact change can be made, false otherwise.
 */
const getOptimalCurrencyChange = (
    amount: number,
    sortedCurrencies: CurrencyEnum[],
    available: CurrencyInventory
): CurrencyInventory | null => {
    const result: CurrencyInventory = {
        [CurrencyEnum.QUARTER]: 0,
        [CurrencyEnum.DIME]: 0,
        [CurrencyEnum.NICKEL]: 0
    };

    const tempInventory = { ...available };
    let remaining = amount;

    for (const currency of sortedCurrencies) {
        const value = currencyValues[currency];

        while (remaining >= value && tempInventory[currency] > 0) {
            remaining -= value;
            tempInventory[currency]--;
            result[currency]++;
        }
    }

    return remaining === 0 ? result : null;
};

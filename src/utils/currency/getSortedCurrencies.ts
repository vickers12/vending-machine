import { CurrencyEnum, currencyValues } from "@core/types";

/**
 * Returns all currencies sorted from highest to lowest value.
 */
export function getSortedCurrenciesDescending(): CurrencyEnum[] {
    return Object.values(CurrencyEnum).sort((a, b) => currencyValues[b] - currencyValues[a]);
}

import type { CurrencyEnum, CurrencyInventory } from "@core/types";
import { currencyValues } from "@core/types";

export const calculateChangeTotal = (inventory: CurrencyInventory): number => {
    return Object.entries(inventory).reduce((total, [currency, count]) => {
        return total + currencyValues[currency as CurrencyEnum] * count;
    }, 0);
};

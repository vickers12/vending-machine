import type { CurrencyEnum, CurrencyInventory } from "@core/types";

type CurrencyOperation = "add" | "subtract";

/**
 * Returns a new inventory by applying `change` to `inventory`.
 * - "add" adds the money (used for deposits)
 * - "subtract" subtracts the money (used for change/cancel)
 */
export function updateCurrencyInventory(
    inventory: CurrencyInventory,
    change: CurrencyInventory,
    operation: CurrencyOperation
): CurrencyInventory {
    const updated: CurrencyInventory = { ...inventory };

    (Object.entries(change) as [CurrencyEnum, number][]).forEach(([currency, count]) => {
        if (operation === "add") {
            updated[currency] += count;
        } else {
            updated[currency] = Math.max(0, updated[currency] - count);
        }
    });

    return updated;
}

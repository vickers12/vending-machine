import type { CoinEnum, MoneyInventory } from "@core/types";

type CoinOperation = "add" | "subtract";

/**
 * Returns a new inventory by applying `change` to `inventory`.
 * - "add" adds the money (used for deposits)
 * - "subtract" subtracts the money (used for change/cancel)
 */
export function updateMoneyInventory(
    inventory: MoneyInventory,
    change: MoneyInventory,
    operation: CoinOperation
): MoneyInventory {
    const updated: MoneyInventory = { ...inventory };

    (Object.entries(change) as [CoinEnum, number][]).forEach(([coinKey, count]) => {
        if (operation === "add") {
            updated[coinKey] += count;
        } else {
            updated[coinKey] = Math.max(0, updated[coinKey] - count);
        }
    });

    return updated;
}

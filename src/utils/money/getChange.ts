import { CoinEnum, type MoneyInventory } from "@core/types";
import { getSortedCoinsDescending } from "./getSortedCoins";
import { coinValues } from "@core/constants";

/**
 * Attempts to return exact change using available coins.
 * Returns a map of coins -> amount of coins to return, or null if not possible.
 */
export const getChange = (
    amount: number,
    availableInventory: MoneyInventory
): MoneyInventory | null => {
    const sortedCoins = getSortedCoinsDescending();
    return getOptimalCoinChange(amount, sortedCoins, availableInventory);
};

/**
 * Fills changeToReturn using the largest available coins first.
 * Mutates tempInventory and changeToReturn.
 * Returns true if exact change can be made, false otherwise.
 */
const getOptimalCoinChange = (
    amount: number,
    sortedCoins: CoinEnum[],
    available: MoneyInventory
): MoneyInventory | null => {
    const result: MoneyInventory = {
        [CoinEnum.QUARTER]: 0,
        [CoinEnum.DIME]: 0,
        [CoinEnum.NICKEL]: 0
    };

    const tempInventory = { ...available };
    let remaining = amount;

    for (const coinKey of sortedCoins) {
        const value = coinValues[coinKey];

        while (remaining >= value && tempInventory[coinKey] > 0) {
            remaining -= value;
            tempInventory[coinKey]--;
            result[coinKey]++;
        }
    }

    return remaining === 0 ? result : null;
};

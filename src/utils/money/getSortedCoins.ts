import { CoinEnum, coinValues } from "@core/types";

/**
 * Returns all coins sorted from highest to lowest value.
 */
export function getSortedCoinsDescending(): CoinEnum[] {
    return Object.values(CoinEnum).sort((a, b) => coinValues[b] - coinValues[a]);
}

import { coinValues } from "@core/constants";
import type { CoinEnum, MoneyInventory } from "@core/types";

export const calculateMoneyTotalByInventory = (inventory: MoneyInventory): number => {
    return Object.entries(inventory).reduce((total, [coinKey, count]) => {
        return total + calculateCoinTotalByKey(coinKey as CoinEnum, count);
    }, 0);
};

export const calculateCoinTotalByKey = (coinKey: CoinEnum, amount: number): number => {
    return coinValues[coinKey] * amount;
};

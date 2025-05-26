import { coinLimits, productLimits } from "@core/constants";
import type { CoinEnum, ProductEnum, State } from "@core/types";

export const isInventoryStocked = (
    moneyInventory: State["moneyInventory"],
    productInventory: State["productInventory"]
) => {
    const coinsAtLimit = Object.entries(moneyInventory).every(
        ([coin, count]) => count >= coinLimits[coin as CoinEnum]
    );

    const productsAtLimit = Object.entries(productInventory).every(
        ([product, count]) => count >= productLimits[product as ProductEnum]
    );

    return coinsAtLimit && productsAtLimit;
};

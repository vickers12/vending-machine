import { CoinEnum, ProductEnum } from "@core/types";

export const coinLabelKeys = {
    [CoinEnum.NICKEL]: "coin.nickel",
    [CoinEnum.DIME]: "coin.dime",
    [CoinEnum.QUARTER]: "coin.quarter"
} as const;

export const productLabelKeys = {
    [ProductEnum.COLA]: "product.cola",
    [ProductEnum.DIETCOLA]: "product.dietCola",
    [ProductEnum.LIMESODA]: "product.limeSoda",
    [ProductEnum.WATER]: "product.water"
} as const;

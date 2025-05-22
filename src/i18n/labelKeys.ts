import { CurrencyEnum, ProductEnum } from "@core/types";

export const currencyLabelKeys = {
    [CurrencyEnum.NICKEL]: "currency.nickel",
    [CurrencyEnum.DIME]: "currency.dime",
    [CurrencyEnum.QUARTER]: "currency.quarter"
} as const;

export const productLabelKeys = {
    [ProductEnum.COLA]: "product.cola",
    [ProductEnum.DIETCOLA]: "product.dietCola",
    [ProductEnum.LIMESODA]: "product.limeSoda",
    [ProductEnum.WATER]: "product.water"
} as const;

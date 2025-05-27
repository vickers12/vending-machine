import { CoinEnum, EventEnum, ProductEnum } from "./types";

export const breakpoints = {
    sm: "(min-width: 640px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 1024px)",
    xl: "(min-width: 1280px)"
};

/* Coins */
export const coinValues: Record<CoinEnum, number> = {
    [CoinEnum.NICKEL]: 5,
    [CoinEnum.DIME]: 10,
    [CoinEnum.QUARTER]: 25
};

export const coinLimits: Record<CoinEnum, number> = {
    [CoinEnum.NICKEL]: 20,
    [CoinEnum.DIME]: 20,
    [CoinEnum.QUARTER]: 20
};

/* Products */
export const productPrices: Record<ProductEnum, number> = {
    [ProductEnum.COLA]: 25,
    [ProductEnum.DIETCOLA]: 35,
    [ProductEnum.LIMESODA]: 25,
    [ProductEnum.WATER]: 45
};

export const productLimits: Record<ProductEnum, number> = {
    [ProductEnum.COLA]: 10,
    [ProductEnum.DIETCOLA]: 10,
    [ProductEnum.LIMESODA]: 10,
    [ProductEnum.WATER]: 10
};

/* Events */
export const eventTimeoutDurations: Partial<Record<EventEnum, number>> = {
    [EventEnum.INSERT_PAYMENT]: 3000,
    [EventEnum.OUT_OF_STOCK]: 2600,
    [EventEnum.UNABLE_TO_GIVE_CHANGE]: 3200,
    [EventEnum.CANCELLED]: 3000,
    [EventEnum.PRODUCT_DISPENSED]: 3500
};

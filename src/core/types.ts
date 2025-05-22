// ========== Currency ==========

export enum CurrencyEnum {
    NICKEL = "NICKEL",
    DIME = "DIME",
    QUARTER = "QUARTER"
}

export const currencyValues: Record<CurrencyEnum, number> = {
    [CurrencyEnum.NICKEL]: 5,
    [CurrencyEnum.DIME]: 10,
    [CurrencyEnum.QUARTER]: 25
};

export type CurrencyInventory = Record<CurrencyEnum, number>;

// ========== Products ==========

export enum ProductEnum {
    COLA = "COLA",
    DIETCOLA = "DIETCOLA",
    LIMESODA = "LIMESODA",
    WATER = "WATER"
}

export const productPrices: Record<ProductEnum, number> = {
    [ProductEnum.COLA]: 25,
    [ProductEnum.DIETCOLA]: 35,
    [ProductEnum.LIMESODA]: 25,
    [ProductEnum.WATER]: 45
};

export type ProductInventory = Record<ProductEnum, number>;

// ========== Events ==========

export enum EventEnum {
    DEPOSITED = "DEPOSITED",
    PRODUCT_DISPENSED = "PRODUCT_DISPENSED",
    CANCELLED = "CANCELLED",
    INSUFFICIENT_FUNDS = "INSUFFICIENT_FUNDS",
    OUT_OF_STOCK = "OUT_OF_STOCK",
    UNABLE_TO_GIVE_CHANGE = "UNABLE_TO_GIVE_CHANGE",
    INSERT_PAYMENT = "INSERT_PAYMENT"
}

export const eventTimeoutDurations: Partial<Record<EventEnum, number>> = {
    [EventEnum.INSERT_PAYMENT]: 2000,
    [EventEnum.INSUFFICIENT_FUNDS]: 2000,
    [EventEnum.OUT_OF_STOCK]: 2000,
    [EventEnum.UNABLE_TO_GIVE_CHANGE]: 2500,
    [EventEnum.CANCELLED]: 2000,
    [EventEnum.PRODUCT_DISPENSED]: 2500
};

// ========== State & Actions ==========

export interface MessageState {
    key: string;
    values?: Record<string, string | number>;
}

export interface State {
    insertedAmount: number;
    insertedCurrencies: CurrencyInventory;
    currencyInventory: CurrencyInventory;
    productInventory: Record<ProductEnum, number>;
    selectedProduct: ProductEnum | null;
    changeToReturn: CurrencyInventory;
    event: EventEnum | null;
}

export type Action =
    | { type: "DEPOSIT"; currency: CurrencyEnum }
    | { type: "SELECT_PRODUCT"; productKey: ProductEnum }
    | { type: "CANCEL" }
    | { type: "CLEAR_EVENT" };

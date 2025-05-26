// ========== Coins ==========

export enum CoinEnum {
    NICKEL = "NICKEL",
    DIME = "DIME",
    QUARTER = "QUARTER"
}

export const coinValues: Record<CoinEnum, number> = {
    [CoinEnum.NICKEL]: 5,
    [CoinEnum.DIME]: 10,
    [CoinEnum.QUARTER]: 25
};

export type MoneyInventory = Record<CoinEnum, number>;

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
    OUT_OF_STOCK = "OUT_OF_STOCK",
    UNABLE_TO_GIVE_CHANGE = "UNABLE_TO_GIVE_CHANGE",
    INSERT_PAYMENT = "INSERT_PAYMENT"
}

export const eventTimeoutDurations: Partial<Record<EventEnum, number>> = {
    [EventEnum.INSERT_PAYMENT]: 2500,
    [EventEnum.OUT_OF_STOCK]: 2500,
    [EventEnum.UNABLE_TO_GIVE_CHANGE]: 3000,
    [EventEnum.CANCELLED]: 2500,
    [EventEnum.PRODUCT_DISPENSED]: 3000
};

// ========== State & Actions ==========

export interface MessageState {
    key: string;
    values?: Record<string, string | number>;
}

export interface State {
    insertedAmount: number;
    insertedPaymentInventory: MoneyInventory;
    moneyInventory: MoneyInventory;
    productInventory: Record<ProductEnum, number>;
    selectedProduct: ProductEnum | null;
    changeToReturn: MoneyInventory;
    event: EventEnum | null;
}

export type Action =
    | { type: "DEPOSIT"; coin: CoinEnum }
    | { type: "SELECT_PRODUCT"; productKey: ProductEnum }
    | { type: "CANCEL" }
    | { type: "CLEAR_EVENT" };

// ========== Coins ==========

export enum CoinEnum {
    NICKEL = "NICKEL",
    DIME = "DIME",
    QUARTER = "QUARTER"
}

export type MoneyInventory = Record<CoinEnum, number>;

// ========== Products ==========

export enum ProductEnum {
    COLA = "COLA",
    DIETCOLA = "DIETCOLA",
    LIMESODA = "LIMESODA",
    WATER = "WATER"
}

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

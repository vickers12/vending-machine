import { makeAutoObservable } from "mobx";
import {
    emptyCurrencyInventory,
    getChange,
    makeSingleCurrencyInventory,
    updateCurrencyInventory
} from "@utils/currency";
import type { State, CurrencyEnum, ProductEnum } from "@core/types";
import { currencyValues, EventEnum, eventTimeoutDurations, productPrices } from "@core/types";

export class VendingMachineStore {
    insertedAmount = 0;
    insertedCurrencies: State["insertedCurrencies"];
    currencyInventory: State["currencyInventory"];
    productInventory: State["productInventory"];
    selectedProduct: State["selectedProduct"] = null;
    changeToReturn: State["changeToReturn"] = emptyCurrencyInventory();
    event: State["event"] = null;

    private _eventTimer: ReturnType<typeof setTimeout> | null = null;

    constructor(initialState: State) {
        this.insertedAmount = initialState.insertedAmount;
        this.insertedCurrencies = initialState.insertedCurrencies;
        this.currencyInventory = initialState.currencyInventory;
        this.productInventory = initialState.productInventory;
        this.selectedProduct = initialState.selectedProduct;
        this.changeToReturn = initialState.changeToReturn;
        this.event = initialState.event;

        makeAutoObservable(this);
    }

    deposit(currency: CurrencyEnum) {
        const value = currencyValues[currency];
        const singleDeposit = makeSingleCurrencyInventory(currency);
        this.insertedAmount += value;
        this.currencyInventory = updateCurrencyInventory(
            this.currencyInventory,
            singleDeposit,
            "add"
        );
        this.insertedCurrencies = updateCurrencyInventory(
            this.insertedCurrencies,
            singleDeposit,
            "add"
        );
        this.setEvent(EventEnum.DEPOSITED);
    }

    selectProduct(productKey: ProductEnum) {
        const price = productPrices[productKey];
        const stock = this.productInventory[productKey];

        if (stock <= 0) {
            this.setEvent(EventEnum.OUT_OF_STOCK);
            return;
        }

        if (this.insertedAmount < price) {
            if (this.insertedAmount > 0) {
                this.insertPaymentReminder(productKey);
                return;
            }
            this.setEvent(EventEnum.INSUFFICIENT_FUNDS);
            return;
        }

        const changeNeeded = this.insertedAmount - price;
        const change = getChange(changeNeeded, this.currencyInventory);

        if (!change) {
            this.setEvent(EventEnum.UNABLE_TO_GIVE_CHANGE);
            return;
        }

        this.insertedAmount = 0;
        this.insertedCurrencies = emptyCurrencyInventory();
        this.currencyInventory = updateCurrencyInventory(
            this.currencyInventory,
            change,
            "subtract"
        );
        this.productInventory = {
            ...this.productInventory,
            [productKey]: stock - 1
        };
        this.selectedProduct = productKey;
        this.changeToReturn = change;
        this.setEvent(EventEnum.PRODUCT_DISPENSED);
    }

    cancel() {
        this.insertedAmount = 0;
        this.currencyInventory = updateCurrencyInventory(
            this.currencyInventory,
            this.insertedCurrencies,
            "subtract"
        );
        this.changeToReturn = { ...this.insertedCurrencies };
        this.insertedCurrencies = emptyCurrencyInventory();
        this.setEvent(EventEnum.CANCELLED);
    }

    insertPaymentReminder(productKey: ProductEnum) {
        this.selectedProduct = productKey;
        this.setEvent(EventEnum.INSERT_PAYMENT);
    }

    setEvent(event: EventEnum) {
        this.event = event;

        if (this._eventTimer) {
            clearTimeout(this._eventTimer);
            this._eventTimer = null;
        }

        const timeout = eventTimeoutDurations[event];
        if (timeout) {
            this._eventTimer = setTimeout(() => {
                if (this.event === event) {
                    this.clearEvent();
                }
            }, timeout);
        }
    }

    clearEvent() {
        this.event = null;

        if (this._eventTimer) {
            clearTimeout(this._eventTimer);
            this._eventTimer = null;
        }
    }
}

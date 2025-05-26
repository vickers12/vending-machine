import { makeAutoObservable } from "mobx";
import { resetPaymentInventory, makeSinglePayment, updateMoneyInventory } from "@utils/money";
import type { State, CoinEnum, ProductEnum } from "@core/types";
import { coinValues, EventEnum, eventTimeoutDurations, productPrices } from "@core/types";
import { getChange } from "@utils/money";

export class VendingMachineStore {
    insertedAmount: State["insertedAmount"];
    insertedPaymentInventory: State["insertedPaymentInventory"];
    moneyInventory: State["moneyInventory"];
    productInventory: State["productInventory"];
    selectedProduct: State["selectedProduct"] = null;
    changeToReturn: State["changeToReturn"] = resetPaymentInventory();
    event: State["event"] = null;

    private _eventTimer: ReturnType<typeof setTimeout> | null = null;
    private _lastStableEvent: EventEnum | null = null;

    constructor(initialState: State) {
        this.insertedAmount = initialState.insertedAmount;
        this.insertedPaymentInventory = initialState.insertedPaymentInventory;
        this.moneyInventory = initialState.moneyInventory;
        this.productInventory = initialState.productInventory;
        this.selectedProduct = initialState.selectedProduct;
        this.changeToReturn = initialState.changeToReturn;
        this.event = initialState.event;

        makeAutoObservable(this);
    }

    deposit = (coinKey: CoinEnum) => {
        const value = coinValues[coinKey];
        const singleDeposit = makeSinglePayment(coinKey);
        this.insertedAmount += value;
        this.moneyInventory = updateMoneyInventory(this.moneyInventory, singleDeposit, "add");
        this.insertedPaymentInventory = updateMoneyInventory(
            this.insertedPaymentInventory,
            singleDeposit,
            "add"
        );
        this.setEvent(EventEnum.DEPOSITED);
    };

    selectProduct = (productKey: ProductEnum) => {
        const price = productPrices[productKey];
        const stock = this.productInventory[productKey];

        /* Needs to be before events for the messages to be right */
        this.selectedProduct = productKey;

        if (stock <= 0) {
            this.setEvent(EventEnum.OUT_OF_STOCK);
            return;
        }

        if (this.insertedAmount < price) {
            this.setEvent(EventEnum.INSERT_PAYMENT);
            return;
        }

        const changeNeeded = this.insertedAmount - price;
        const change = getChange(changeNeeded, this.moneyInventory);

        if (!change) {
            this.setEvent(EventEnum.UNABLE_TO_GIVE_CHANGE);
            return;
        }

        this.insertedAmount = 0;
        this.insertedPaymentInventory = resetPaymentInventory();
        this.moneyInventory = updateMoneyInventory(this.moneyInventory, change, "subtract");
        this.productInventory = {
            ...this.productInventory,
            [productKey]: stock - 1
        };
        this.changeToReturn = change;
        // Reset last stable event once product is dispensed
        this._lastStableEvent = null;
        this.setEvent(EventEnum.PRODUCT_DISPENSED);
    };

    increaseProductInventory = (productKey: ProductEnum, amount: number = 1) => {
        this.productInventory = {
            ...this.productInventory,
            [productKey]: this.productInventory[productKey] + amount
        };
    };

    decreaseProductInventory = (productKey: ProductEnum, amount: number = 1) => {
        const current = this.productInventory[productKey];
        this.productInventory = {
            ...this.productInventory,
            [productKey]: Math.max(0, current - amount)
        };
    };

    cancel = () => {
        this.insertedAmount = 0;
        this.moneyInventory = updateMoneyInventory(
            this.moneyInventory,
            this.insertedPaymentInventory,
            "subtract"
        );
        this.changeToReturn = { ...this.insertedPaymentInventory };
        this.insertedPaymentInventory = resetPaymentInventory();
        // Reset last stable event once operation is cancelled
        this._lastStableEvent = null;
        this.setEvent(EventEnum.CANCELLED);
    };

    setEvent = (event: EventEnum) => {
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
        } else {
            this._lastStableEvent = event;
        }
    };

    clearEvent = () => {
        this.event = this._lastStableEvent ?? null;

        if (this._eventTimer) {
            clearTimeout(this._eventTimer);
            this._eventTimer = null;
        }
    };
}

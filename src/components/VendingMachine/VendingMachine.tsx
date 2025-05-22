import { CancelButton } from "@components/CancelButton";
import { CurrencyButton } from "@components/CurrencyButton";
import { DisplayPanel } from "@components/DisplayPanel";
import { ProductButton } from "@components/ProductButton";
import { initialState } from "@core/initialState";
import type { ProductEnum } from "@core/types";
import { productPrices, CurrencyEnum } from "@core/types";
import { vendingMachineReducer } from "@core/VendingMachineReducer";
import { useReducer } from "react";

export const VendingMachine: React.FC = () => {
    const [state, dispatch] = useReducer(vendingMachineReducer, initialState);

    const handleDeposit = (currency: CurrencyEnum) => {
        dispatch({ type: "DEPOSIT", currency });
    };

    const handleSelectProduct = (productKey: ProductEnum) => {
        dispatch({ type: "SELECT_PRODUCT", productKey });
    };

    return (
        <>
            <DisplayPanel
                changeToReturn={state.changeToReturn}
                event={state.event}
                selectedProduct={state.selectedProduct}
                insertedAmount={state.insertedAmount}
            />
            <div className="product-grid">
                {Object.entries(productPrices).map(([productKey, price]) => (
                    <ProductButton
                        key={productKey}
                        productKey={productKey as ProductEnum}
                        price={price}
                        quantity={state.productInventory[productKey as ProductEnum]}
                        insertedAmount={state.insertedAmount}
                        onSelect={handleSelectProduct}
                    />
                ))}
            </div>
            <div className="currency-tray">
                {Object.values(CurrencyEnum).map((currency) => (
                    <CurrencyButton key={currency} currency={currency} onInsert={handleDeposit} />
                ))}
            </div>
            Currency inventory:
            <div className="currency-inventory">
                {Object.entries(state.currencyInventory).map(([currency, count]) => (
                    <div key={currency}>
                        {currency}: {count}
                    </div>
                ))}
            </div>
            <CancelButton onCancel={() => dispatch({ type: "CANCEL" })} />
        </>
    );
};

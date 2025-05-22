import { CurrencyEnum } from "@core/types";
import { useVendingMachineStore } from "@stores/useVendingMachineStore";
import { observer } from "mobx-react-lite";
import { CancelButton } from "@components/CancelButton";
import { CurrencyButton } from "@components/CurrencyButton";

import styles from "./Panel.module.css";

export interface PanelProps {}

export const Panel: React.FC<PanelProps> = observer(() => {
    const store = useVendingMachineStore();

    const handleDeposit = (currency: CurrencyEnum) => {
        store.deposit(currency);
    };

    return (
        <div className={styles.panel}>
            <div className="currency-tray">
                {Object.values(CurrencyEnum).map((currency) => (
                    <CurrencyButton key={currency} currency={currency} onInsert={handleDeposit} />
                ))}
            </div>
            Currency inventory:
            <div className="currency-inventory">
                {Object.entries(store.currencyInventory).map(([currency, count]) => (
                    <div key={currency}>
                        {currency}: {count}
                    </div>
                ))}
            </div>
            <CancelButton onCancel={() => store.cancel()} />
        </div>
    );
});

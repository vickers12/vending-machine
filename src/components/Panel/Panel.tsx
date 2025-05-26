import { CoinEnum } from "@core/types";
import { useVendingMachineStore } from "@stores/useVendingMachineStore";
import { observer } from "mobx-react-lite";
import { CancelButton } from "@components/CancelButton";
import { CoinButton } from "@components/CoinButton";

import styles from "./Panel.module.css";
import { DisplayPanel } from "@components/DisplayPanel";
import { Dispenser } from "@components/Dispenser";

export interface PanelProps {}

export const Panel: React.FC<PanelProps> = observer(() => {
    const store = useVendingMachineStore();

    const handleDeposit = (payment: CoinEnum) => {
        store.deposit(payment);
    };

    return (
        <aside className={styles.panel}>
            <DisplayPanel />
            <div className={styles["panel__content"]}>
                <div className={styles["panel__coin-tray"]}>
                    {Object.values(CoinEnum).map((coinKey) => (
                        <CoinButton key={coinKey} coinKey={coinKey} onInsert={handleDeposit} />
                    ))}
                </div>
                <CancelButton onCancel={() => store.cancel()} />
                <Dispenser />
            </div>
        </aside>
    );
});

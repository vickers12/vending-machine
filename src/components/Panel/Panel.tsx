import { CoinEnum } from "@core/types";
import { useVendingMachineStore } from "@stores/useVendingMachineStore";
import { observer } from "mobx-react-lite";
import { CancelButton } from "@components/CancelButton";
import { CoinButton } from "@components/CoinButton";

import styles from "./Panel.module.css";
import { DisplayPanel } from "@components/DisplayPanel";
import { Dispenser } from "@components/Dispenser";
import { breakpoints } from "@core/constants";
import { useMediaQuery } from "@hooks";
import { TooltipTrigger } from "react-aria-components";
import { Tooltip } from "@components/Tooltip";
import { coinLabelKeys } from "@i18n/labelKeys";
import { useTranslation } from "react-i18next";

export interface PanelProps {}

export const Panel: React.FC<PanelProps> = observer(() => {
    const { t } = useTranslation();
    const store = useVendingMachineStore();
    const isDesktop = useMediaQuery(breakpoints.sm);

    const handleDeposit = (payment: CoinEnum) => {
        store.deposit(payment);
    };

    return (
        <aside className={styles.panel}>
            <DisplayPanel />
            <div className={styles["panel__content"]}>
                <div className={styles["panel__coin-tray"]}>
                    {Object.values(CoinEnum).map((coinKey) => (
                        <TooltipTrigger key={coinKey} delay={600}>
                            <CoinButton coinKey={coinKey} onInsert={handleDeposit} />
                            <Tooltip offset={6}>
                                {t("coinButton.tooltip", {
                                    label: t(coinLabelKeys[coinKey as CoinEnum])
                                })}
                            </Tooltip>
                        </TooltipTrigger>
                    ))}
                </div>
                <CancelButton onCancel={() => store.cancel()} />
                {isDesktop && <Dispenser />}
            </div>
        </aside>
    );
});

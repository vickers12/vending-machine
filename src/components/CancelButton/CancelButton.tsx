import { useTranslation } from "react-i18next";
import styles from "./CancelButton.module.css";
import { observer } from "mobx-react-lite";
import { useVendingMachineStore } from "@stores/useVendingMachineStore";
import { Button } from "@components/Button";
import { TooltipTrigger } from "react-aria-components";
import { Tooltip } from "@components/Tooltip";

interface CancelButtonProps {
    onCancel: () => void;
}

export const CancelButton: React.FC<CancelButtonProps> = observer(({ onCancel }) => {
    const { t } = useTranslation();
    const { insertedAmount } = useVendingMachineStore();

    return (
        <TooltipTrigger delay={600}>
            <Button
                className={styles["cancel-button"]}
                onPress={onCancel}
                isDisabled={insertedAmount === 0}
                variant="danger"
                aria-label={t("cancelButton.ariaLabel")}
            >
                {t("cancelButton.label")}
            </Button>
            <Tooltip offset={6}>{t("cancelButton.tooltip")}</Tooltip>
        </TooltipTrigger>
    );
});

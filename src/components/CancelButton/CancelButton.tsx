import { Button } from "react-aria-components";
import { useTranslation } from "react-i18next";
import styles from "./CancelButton.module.css";
import { observer } from "mobx-react-lite";
import { useVendingMachineStore } from "@stores/useVendingMachineStore";

interface CancelButtonProps {
    onCancel: () => void;
}

export const CancelButton: React.FC<CancelButtonProps> = observer(({ onCancel }) => {
    const { t } = useTranslation();
    const { insertedAmount } = useVendingMachineStore();

    return (
        <Button
            className={styles["cancel-button"]}
            onPress={onCancel}
            isDisabled={insertedAmount === 0}
            aria-label={t("cancelButton.ariaLabel")}
        >
            {t("cancelButton.label")}
        </Button>
    );
});

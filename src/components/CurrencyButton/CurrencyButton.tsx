import { Button } from "react-aria-components";
import type { CurrencyEnum } from "@core/types";
import styles from "./CurrencyButton.module.css";
import { useTranslation } from "react-i18next";
import { currencyLabelKeys } from "@i18n/labelKeys";

interface CurrencyButtonProps {
    currency: CurrencyEnum;
    onInsert: (currency: CurrencyEnum) => void;
}

export const CurrencyButton: React.FC<CurrencyButtonProps> = ({ currency, onInsert }) => {
    const { t } = useTranslation();
    const label = t(currencyLabelKeys[currency]);

    return (
        <Button
            className={styles.currencyButton}
            onPress={() => onInsert(currency)}
            aria-label={t("currencyButton.ariaLabel", { label: label })}
        >
            {label}
        </Button>
    );
};

import { Button } from "react-aria-components";
import type { CoinEnum } from "@core/types";
import { useTranslation } from "react-i18next";
import { coinLabelKeys } from "@i18n/labelKeys";
import styles from "./CoinButton.module.css";
import { geCoinImage } from "@utils/money";

interface CoinButtonProps {
    coinKey: CoinEnum;
    onInsert: (payment: CoinEnum) => void;
}

export const CoinButton: React.FC<CoinButtonProps> = ({ coinKey, onInsert }) => {
    const { t } = useTranslation();
    const label = t(coinLabelKeys[coinKey]);
    const coinImg = geCoinImage(coinKey);

    return (
        <Button
            className={styles["coin-button"]}
            onPress={() => onInsert(coinKey)}
            aria-label={t("coinButton.ariaLabel", { label: label })}
        >
            <img className={styles["coin-button__image"]} src={coinImg} alt={label} />
        </Button>
    );
};

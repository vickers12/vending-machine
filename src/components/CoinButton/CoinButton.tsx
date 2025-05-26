import { Button } from "react-aria-components";
import type { CoinEnum } from "@core/types";
import { useTranslation } from "react-i18next";
import { coinLabelKeys } from "@i18n/labelKeys";
import styles from "./CoinButton.module.css";
import { getCoinImage } from "@utils/money";
import classNames from "classnames";

interface CoinButtonProps {
    coinKey: CoinEnum;
    onInsert: (payment: CoinEnum) => void;
}

export const CoinButton: React.FC<CoinButtonProps> = ({ coinKey, onInsert }) => {
    const { t } = useTranslation();
    const label = t(coinLabelKeys[coinKey]);
    const coinImg = getCoinImage(coinKey);

    return (
        <Button
            className={classNames(
                styles["coin-button"],
                styles[`coin-button--${coinKey.toLowerCase()}`]
            )}
            onPress={() => onInsert(coinKey)}
            aria-label={t("coinButton.ariaLabel", { label: label })}
        >
            <img className={styles["coin-button__image"]} src={coinImg} alt={label} />
        </Button>
    );
};

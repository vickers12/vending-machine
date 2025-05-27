import { useVendingMachineStore } from "@stores/useVendingMachineStore";
import { observer } from "mobx-react-lite";

import { useTranslation } from "react-i18next";
import { TooltipTrigger } from "react-aria-components";
import { Fragment } from "react";
import classNames from "classnames";
import { coinLabelKeys } from "@i18n/labelKeys";
import { type CoinEnum } from "@core/types";
import { calculateCoinTotalByKey, calculateMoneyTotalByInventory } from "@utils/money";
import { useMoneyFormat } from "@hooks";
import AddIcon from "@assets/add.svg?react";
import MinusIcon from "@assets/minus.svg?react";

import styles from "./Inventory.module.css";
import { Button } from "@components/Button";
import { Tooltip } from "@components/Tooltip";

export interface CoinInventoryProps {}

export const CoinInventory: React.FC<CoinInventoryProps> = observer(() => {
    const { t } = useTranslation();
    const { moneyInventory, decreaseCoinInventory, increaseCoinInventory } =
        useVendingMachineStore();
    const { format } = useMoneyFormat();

    let totalNumberOfCoins = 0;
    const totalCoinAmount = calculateMoneyTotalByInventory(moneyInventory);

    return (
        <div className={styles["inventory__content-group"]}>
            <h1 className={styles["inventory__header"]}>{t("inventory.coins")}</h1>
            <div className={styles["inventory__data"]}>
                {Object.entries(moneyInventory).map(([coinKey, count]) => {
                    totalNumberOfCoins += count;
                    return (
                        <Fragment key={`${coinKey}`}>
                            <span key={`label_${coinKey}`} className={styles["inventory__label"]}>
                                {t(coinLabelKeys[coinKey as CoinEnum])}
                            </span>
                            <span
                                key={`summary_${coinKey}`}
                                className={styles["inventory__summary"]}
                            >
                                <TooltipTrigger delay={600}>
                                    <Button
                                        className={styles["inventory__summary-btn"]}
                                        onPress={() => {
                                            decreaseCoinInventory(coinKey as CoinEnum);
                                        }}
                                        isDisabled={count <= 0}
                                        variant="secondary"
                                        icon={<MinusIcon />}
                                        aria-label={t("inventory.decreaseCoin", {
                                            coin: t(coinLabelKeys[coinKey as CoinEnum])
                                        })}
                                    />
                                    <Tooltip offset={4}>
                                        {t("inventory.decreaseCoinTooltip", {
                                            coin: t(coinLabelKeys[coinKey as CoinEnum])
                                        })}
                                    </Tooltip>
                                </TooltipTrigger>
                                <span className={styles["inventory__count"]}>{count}</span>
                                <TooltipTrigger delay={600}>
                                    <Button
                                        className={styles["inventory__summary-btn"]}
                                        onPress={() => {
                                            increaseCoinInventory(coinKey as CoinEnum);
                                        }}
                                        variant="secondary"
                                        icon={<AddIcon />}
                                        aria-label={t("inventory.increaseCoin", {
                                            coin: t(coinLabelKeys[coinKey as CoinEnum])
                                        })}
                                    />
                                    <Tooltip offset={4}>
                                        {t("inventory.increaseCoinTooltip", {
                                            coin: t(coinLabelKeys[coinKey as CoinEnum])
                                        })}
                                    </Tooltip>
                                </TooltipTrigger>
                                |
                                <span className={styles["inventory__price"]}>
                                    {format(calculateCoinTotalByKey(coinKey as CoinEnum, count))}
                                </span>
                            </span>
                        </Fragment>
                    );
                })}
                <div className={styles["inventory__total"]}>
                    <span key={`label_total`} className={classNames(styles["inventory__label"])}>
                        {t("inventory.total")}
                    </span>
                    <span
                        key={`summary_total`}
                        className={classNames(styles["inventory__summary"])}
                    >
                        <span className={styles["inventory__count"]}>{totalNumberOfCoins}</span>|
                        <span className={styles["inventory__price"]}>
                            {format(totalCoinAmount)}
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
});

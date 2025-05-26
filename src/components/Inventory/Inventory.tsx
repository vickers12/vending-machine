import { useVendingMachineStore } from "@stores/useVendingMachineStore";
import { observer } from "mobx-react-lite";

import { useTranslation } from "react-i18next";
import { Button, ToggleButton } from "react-aria-components";
import { useState, Fragment } from "react";
import classNames from "classnames";
import { coinLabelKeys, productLabelKeys } from "@i18n/labelKeys";
import { productPrices, type CoinEnum, type ProductEnum } from "@core/types";
import { calculateCoinTotalByKey, calculateMoneyTotalByInventory } from "@utils/money";
import { useMoneyFormat } from "@hooks";
import AddIcon from "@assets/add.svg?react";
import MinusIcon from "@assets/minus.svg?react";

import styles from "./Inventory.module.css";

export interface InventoryProps {}

export const Inventory: React.FC<InventoryProps> = observer(() => {
    const { t } = useTranslation();
    const { moneyInventory, productInventory, decreaseProductInventory, increaseProductInventory } =
        useVendingMachineStore();
    const [inventoryOpen, setInventoryOpen] = useState(false);
    const { format } = useMoneyFormat();

    let totalNumberOfCoins = 0;
    let totalNumberOfProducts = 0;
    let totalProductAmount = 0;
    const totalCoinAmount = calculateMoneyTotalByInventory(moneyInventory);

    const toggleInventory = () => {
        setInventoryOpen((prev) => !prev);
    };

    return (
        <div
            className={classNames(styles["inventory"], {
                [styles["inventory--open"]]: inventoryOpen
            })}
        >
            <div className={styles["inventory__tab-container"]}>
                <ToggleButton
                    className={styles["inventory__tab"]}
                    onPress={toggleInventory}
                    isSelected={inventoryOpen}
                    aria-label={t("inventory.tab")}
                >
                    {t("inventory.tab")}
                </ToggleButton>
            </div>
            <div className={styles["inventory__content"]}>
                <div className={styles["inventory__content-group"]}>
                    <h1 className={styles["inventory__header"]}>{t("inventory.coins")}</h1>
                    <div className={styles["inventory__data"]}>
                        {Object.entries(moneyInventory).map(([coinKey, count]) => {
                            totalNumberOfCoins += count;
                            return (
                                <Fragment key={`${coinKey}`}>
                                    <span
                                        key={`label_${coinKey}`}
                                        className={styles["inventory__label"]}
                                    >
                                        {t(coinLabelKeys[coinKey as CoinEnum])}
                                    </span>
                                    <span
                                        key={`summary_${coinKey}`}
                                        className={styles["inventory__summary"]}
                                    >
                                        <span className={styles["inventory__count"]}>{count}</span>|
                                        <span className={styles["inventory__price"]}>
                                            {format(
                                                calculateCoinTotalByKey(coinKey as CoinEnum, count)
                                            )}
                                        </span>
                                    </span>
                                </Fragment>
                            );
                        })}
                        <div className={styles["inventory__total"]}>
                            <span
                                key={`label_total`}
                                className={classNames(styles["inventory__label"])}
                            >
                                {t("inventory.total")}
                            </span>
                            <span
                                key={`summary_total`}
                                className={classNames(styles["inventory__summary"])}
                            >
                                <span className={styles["inventory__count"]}>
                                    {totalNumberOfCoins}
                                </span>
                                |
                                <span className={styles["inventory__price"]}>
                                    {format(totalCoinAmount)}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles["inventory__content-group"]}>
                    <h1 className={styles["inventory__header"]}>{t("inventory.products")}</h1>
                    <div className={styles["inventory__data"]}>
                        {Object.entries(productInventory).map(([productKey, count]) => {
                            totalNumberOfProducts += count;
                            totalProductAmount += productPrices[productKey as ProductEnum] * count;

                            return (
                                <Fragment key={`${productKey}`}>
                                    <span
                                        key={`label_${productKey}`}
                                        className={styles["inventory__label"]}
                                    >
                                        {t(productLabelKeys[productKey as ProductEnum])}
                                    </span>
                                    <span
                                        key={`summary_${productKey}`}
                                        className={styles["inventory__summary"]}
                                    >
                                        <Button
                                            className={styles["inventory__summary-btn"]}
                                            onPress={() => {
                                                decreaseProductInventory(productKey as ProductEnum);
                                            }}
                                            isDisabled={count === 0}
                                        >
                                            <MinusIcon />
                                        </Button>
                                        <span className={styles["inventory__count"]}>{count}</span>
                                        <Button
                                            className={styles["inventory__summary-btn"]}
                                            onPress={() => {
                                                increaseProductInventory(productKey as ProductEnum);
                                            }}
                                        >
                                            <AddIcon />
                                        </Button>
                                        |
                                        <span className={styles["inventory__price"]}>
                                            {format(productPrices[productKey as ProductEnum])}
                                        </span>
                                    </span>
                                </Fragment>
                            );
                        })}

                        <div className={styles["inventory__total"]}>
                            <span
                                key={`label_total`}
                                className={classNames(styles["inventory__label"])}
                            >
                                {t("inventory.total")}
                            </span>
                            <span
                                key={`summary_total`}
                                className={classNames(styles["inventory__summary"])}
                            >
                                <span className={styles["inventory__count"]}>
                                    {totalNumberOfProducts}
                                </span>
                                |
                                <span className={styles["inventory__price"]}>
                                    {format(totalProductAmount)}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

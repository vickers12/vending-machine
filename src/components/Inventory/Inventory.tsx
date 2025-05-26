import { useVendingMachineStore } from "@stores/useVendingMachineStore";
import { observer } from "mobx-react-lite";

import { useTranslation } from "react-i18next";
import { Dialog, ToggleButton, TooltipTrigger } from "react-aria-components";
import { useState, Fragment, useRef } from "react";
import classNames from "classnames";
import { coinLabelKeys, productLabelKeys } from "@i18n/labelKeys";
import { type CoinEnum, type ProductEnum } from "@core/types";
import { calculateCoinTotalByKey, calculateMoneyTotalByInventory } from "@utils/money";
import { useMoneyFormat } from "@hooks";
import AddIcon from "@assets/add.svg?react";
import MinusIcon from "@assets/minus.svg?react";

import styles from "./Inventory.module.css";
import { Button } from "@components/Button";
import { coinLimits, productLimits, productPrices } from "@core/constants";
import { Overlay, useOverlayTrigger, usePopover } from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import { Tooltip } from "@components/Tooltip";
import { isInventoryStocked } from "@utils/inventory";

export interface InventoryProps {}

export const Inventory: React.FC<InventoryProps> = observer(() => {
    const { t } = useTranslation();
    const {
        moneyInventory,
        productInventory,
        decreaseProductInventory,
        increaseProductInventory,
        restockAll,
        decreaseCoinInventory,
        increaseCoinInventory
    } = useVendingMachineStore();
    const [inventoryOpen, setInventoryOpen] = useState(false);
    const { format } = useMoneyFormat();

    let totalNumberOfCoins = 0;
    let totalNumberOfProducts = 0;
    let totalProductAmount = 0;
    const totalCoinAmount = calculateMoneyTotalByInventory(moneyInventory);

    const toggleInventory = () => {
        setInventoryOpen((prev) => !prev);
    };

    const popoverRef = useRef(null);
    const triggerRef = useRef(null);

    const popoverState = useOverlayTriggerState({
        isOpen: inventoryOpen,
        onOpenChange: toggleInventory
    });

    const { popoverProps } = usePopover(
        { triggerRef, popoverRef, shouldUpdatePosition: false, shouldFlip: false },
        popoverState
    );
    const { triggerProps, overlayProps } = useOverlayTrigger(
        { type: "dialog" },
        popoverState,
        triggerRef
    );

    console.log("inventory: ", moneyInventory, productInventory);
    console.log(coinLimits, productLimits);

    return (
        <Overlay>
            <div
                {...popoverProps}
                ref={popoverRef}
                className={classNames(styles["inventory"], {
                    [styles["inventory--open"]]: inventoryOpen
                })}
            >
                <div className={styles["inventory__tab-container"]}>
                    <ToggleButton
                        {...triggerProps}
                        ref={triggerRef}
                        className={styles["inventory__tab"]}
                        isSelected={inventoryOpen}
                        aria-label={t("inventory.tab")}
                    >
                        {t("inventory.tab")}
                    </ToggleButton>
                </div>
                <Dialog
                    {...overlayProps}
                    className={styles["inventory__content"]}
                    aria-label={t("inventory.tab")}
                >
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
                                            <span className={styles["inventory__count"]}>
                                                {count}
                                            </span>
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
                                                {format(
                                                    calculateCoinTotalByKey(
                                                        coinKey as CoinEnum,
                                                        count
                                                    )
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
                                totalProductAmount +=
                                    productPrices[productKey as ProductEnum] * count;
                                const max = productLimits[productKey as ProductEnum];

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
                                            <TooltipTrigger delay={600}>
                                                <Button
                                                    className={styles["inventory__summary-btn"]}
                                                    onPress={() => {
                                                        decreaseProductInventory(
                                                            productKey as ProductEnum
                                                        );
                                                    }}
                                                    isDisabled={count <= 0}
                                                    variant="secondary"
                                                    icon={<MinusIcon />}
                                                    aria-label={t("inventory.decreaseProduct", {
                                                        product: t(
                                                            productLabelKeys[
                                                                productKey as ProductEnum
                                                            ]
                                                        )
                                                    })}
                                                />
                                                <Tooltip offset={4}>
                                                    {t("inventory.decreaseProductTooltip", {
                                                        product: t(
                                                            productLabelKeys[
                                                                productKey as ProductEnum
                                                            ]
                                                        )
                                                    })}
                                                </Tooltip>
                                            </TooltipTrigger>
                                            <span className={styles["inventory__count"]}>
                                                {count}
                                            </span>
                                            <TooltipTrigger delay={600}>
                                                <Button
                                                    className={styles["inventory__summary-btn"]}
                                                    onPress={() => {
                                                        increaseProductInventory(
                                                            productKey as ProductEnum
                                                        );
                                                    }}
                                                    isDisabled={count >= max}
                                                    variant="secondary"
                                                    icon={<AddIcon />}
                                                    aria-label={t("inventory.increaseProduct", {
                                                        product: t(
                                                            productLabelKeys[
                                                                productKey as ProductEnum
                                                            ]
                                                        )
                                                    })}
                                                />
                                                <Tooltip offset={4}>
                                                    {t("inventory.increaseProductTooltip", {
                                                        product: t(
                                                            productLabelKeys[
                                                                productKey as ProductEnum
                                                            ]
                                                        )
                                                    })}
                                                </Tooltip>
                                            </TooltipTrigger>
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

                    <div className={styles["inventory__btn-group"]}>
                        <TooltipTrigger delay={600}>
                            <Button
                                className={styles["inventory__restock-btn"]}
                                onPress={restockAll}
                                isDisabled={isInventoryStocked(moneyInventory, productInventory)}
                            >
                                {t("inventory.restockAll")}
                            </Button>
                            <Tooltip offset={6}>{t("inventory.restockAllTooltip")}</Tooltip>
                        </TooltipTrigger>
                    </div>
                </Dialog>
            </div>
        </Overlay>
    );
});

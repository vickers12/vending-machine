import { useVendingMachineStore } from "@stores/useVendingMachineStore";
import { observer } from "mobx-react-lite";

import { useTranslation } from "react-i18next";
import { TooltipTrigger } from "react-aria-components";
import { Fragment } from "react";
import classNames from "classnames";
import { productLabelKeys } from "@i18n/labelKeys";
import type { ProductEnum } from "@core/types";
import { useMoneyFormat } from "@hooks";
import AddIcon from "@assets/add.svg?react";
import MinusIcon from "@assets/minus.svg?react";

import styles from "./Inventory.module.css";
import { Button } from "@components/Button";
import { coinLimits, productLimits, productPrices } from "@core/constants";
import { Tooltip } from "@components/Tooltip";

export interface ProductInventoryProps {}

export const ProductInventory: React.FC<ProductInventoryProps> = observer(() => {
    const { t } = useTranslation();
    const { moneyInventory, productInventory, decreaseProductInventory, increaseProductInventory } =
        useVendingMachineStore();
    const { format } = useMoneyFormat();

    let totalNumberOfProducts = 0;
    let totalProductAmount = 0;

    console.log("inventory: ", moneyInventory, productInventory);
    console.log(coinLimits, productLimits);

    return (
        <div className={styles["inventory__content-group"]}>
            <h1 className={styles["inventory__header"]}>{t("inventory.products")}</h1>
            <div className={styles["inventory__data"]}>
                {Object.entries(productInventory).map(([productKey, count]) => {
                    totalNumberOfProducts += count;
                    totalProductAmount += productPrices[productKey as ProductEnum] * count;
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
                                            decreaseProductInventory(productKey as ProductEnum);
                                        }}
                                        isDisabled={count <= 0}
                                        variant="secondary"
                                        icon={<MinusIcon />}
                                        aria-label={t("inventory.decreaseProduct", {
                                            product: t(productLabelKeys[productKey as ProductEnum])
                                        })}
                                    />
                                    <Tooltip offset={4}>
                                        {t("inventory.decreaseProductTooltip", {
                                            product: t(productLabelKeys[productKey as ProductEnum])
                                        })}
                                    </Tooltip>
                                </TooltipTrigger>
                                <span className={styles["inventory__count"]}>{count}</span>
                                <TooltipTrigger delay={600}>
                                    <Button
                                        className={styles["inventory__summary-btn"]}
                                        onPress={() => {
                                            increaseProductInventory(productKey as ProductEnum);
                                        }}
                                        isDisabled={count >= max}
                                        variant="secondary"
                                        icon={<AddIcon />}
                                        aria-label={t("inventory.increaseProduct", {
                                            product: t(productLabelKeys[productKey as ProductEnum])
                                        })}
                                    />
                                    <Tooltip offset={4}>
                                        {t("inventory.increaseProductTooltip", {
                                            product: t(productLabelKeys[productKey as ProductEnum])
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
                    <span key={`label_total`} className={classNames(styles["inventory__label"])}>
                        {t("inventory.total")}
                    </span>
                    <span
                        key={`summary_total`}
                        className={classNames(styles["inventory__summary"])}
                    >
                        <span className={styles["inventory__count"]}>{totalNumberOfProducts}</span>|
                        <span className={styles["inventory__price"]}>
                            {format(totalProductAmount)}
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
});

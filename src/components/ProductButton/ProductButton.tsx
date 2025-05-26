import { Button } from "react-aria-components";
import type { ProductEnum } from "core/types";
import { productLabelKeys } from "@i18n/labelKeys";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { useVendingMachineStore } from "@stores/useVendingMachineStore";
import { useContainerHeight, useMoneyFormat } from "@hooks";
import { useRef, type CSSProperties } from "react";

import styles from "./ProductButton.module.css";
import { getProductImage } from "@utils/product";
import classNames from "classnames";

export interface ProductButtonProps {
    price: number;
    productKey: ProductEnum;
    onSelect: (selectedProductKey: ProductEnum) => void;
}

const TOTAL_BUBBLES = 20;

const randomNumFromRange = (min: number, max: number) => {
    return Math.random() * (max - min + 1) + min;
};

export const ProductButton: React.FC<ProductButtonProps> = observer(
    ({ price, productKey, onSelect }) => {
        const { t } = useTranslation();
        const { productInventory } = useVendingMachineStore();
        const { format } = useMoneyFormat();
        //const canAfford = store.insertedAmount >= price;
        const quantity = productInventory[productKey as ProductEnum];
        const isOutOfStock = quantity === 0;
        const productName = t(productLabelKeys[productKey]);
        const productImageSrc = getProductImage(productKey);
        const containerRef = useRef<HTMLButtonElement>(null);

        const containerHeight = useContainerHeight(containerRef);
        const ty = `-${(containerHeight + randomNumFromRange(10, 40)).toFixed(0)}px`;
        const tx = `${randomNumFromRange(-20, 20).toFixed(1)}px`;

        return (
            <Button
                ref={containerRef}
                className={classNames(styles["product-button"], {
                    [styles["product-button--out-of-stock"]]: isOutOfStock
                })}
                onPress={() => onSelect(productKey)}
                aria-label={t("productButton.ariaLabel", {
                    label: t(productLabelKeys[productKey])
                })}
            >
                <div className={styles["product-button__bubble-container"]}>
                    {Array.from({ length: TOTAL_BUBBLES }).map((_, index) => (
                        <div
                            key={index}
                            className={styles["product-button__bubble"]}
                            style={
                                {
                                    "--left": `${randomNumFromRange(0, 100)}%`,
                                    "--top": `${randomNumFromRange(20, 180)}%`,
                                    "--tx": tx,
                                    "--ty": ty,
                                    "--scale": randomNumFromRange(0.3, 0.6).toFixed(2),
                                    "--opacity": randomNumFromRange(0.1, 0.6).toFixed(2),
                                    "--duration": `${randomNumFromRange(8, 20).toFixed(1)}s`
                                } as CSSProperties
                            }
                        ></div>
                    ))}
                </div>

                {isOutOfStock && (
                    <div className={styles["product-button__ribbon"]}>
                        {t("productButton.outOfStock")}
                    </div>
                )}

                <div className={styles["product-button__price"]}>
                    {format(price, { rawUnderDollar: true })}
                </div>
                <img
                    className={styles["product-button__img"]}
                    src={productImageSrc}
                    alt={productName}
                />
                <div className={styles["product-button__name"]}>{productName}</div>
            </Button>
        );
    }
);

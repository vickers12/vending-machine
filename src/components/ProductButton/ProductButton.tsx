import { Button } from "react-aria-components";
import styles from "./ProductButton.module.css";
import type { ProductEnum } from "core/types";
import { productLabelKeys } from "@i18n/labelKeys";
import { useTranslation } from "react-i18next";

export interface ProductButtonProps {
    price: number;
    productKey: ProductEnum;
    quantity: number;
    insertedAmount: number;
    onSelect: (selectedProductKey: ProductEnum) => void;
}

export function ProductButton({
    price,
    productKey,
    quantity,
    insertedAmount,
    onSelect
}: ProductButtonProps) {
    const { t } = useTranslation();
    const canAfford = insertedAmount >= price;
    const isOutOfStock = quantity === 0;

    return (
        <Button
            className={styles.productButton}
            isDisabled={isOutOfStock || !canAfford}
            onPress={() => onSelect(productKey)}
            aria-label={t("productButton.ariaLabel", {
                label: t(productLabelKeys[productKey])
            })}
        >
            <strong>{productLabelKeys[productKey]}</strong>
            <div>{price}¢</div>
            <div>
                {isOutOfStock
                    ? t("productButton.outOfStock")
                    : t("quantity", { quantity: quantity })}
            </div>
        </Button>
    );
}

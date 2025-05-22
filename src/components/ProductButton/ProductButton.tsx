import { Button } from "react-aria-components";
import styles from "./ProductButton.module.css";
import type { ProductEnum } from "core/types";
import { productLabelKeys } from "@i18n/labelKeys";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { useVendingMachineStore } from "@stores/useVendingMachineStore";

export interface ProductButtonProps {
    price: number;
    productKey: ProductEnum;
    onSelect: (selectedProductKey: ProductEnum) => void;
}

export const ProductButton: React.FC<ProductButtonProps> = observer(
    ({ price, productKey, onSelect }) => {
        const { t } = useTranslation();
        const store = useVendingMachineStore();
        //const canAfford = store.insertedAmount >= price;
        const quantity = store.productInventory[productKey as ProductEnum];
        const isOutOfStock = quantity === 0;

        return (
            <Button
                className={styles.productButton}
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
);

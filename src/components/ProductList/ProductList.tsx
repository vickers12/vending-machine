import { type ProductEnum } from "@core/types";
import { ProductButton } from "@components/ProductButton";
import { useVendingMachineStore } from "@stores/useVendingMachineStore";
import { observer } from "mobx-react-lite";
import styles from "./ProductList.module.css";
import { productPrices } from "@core/constants";
import { TooltipTrigger } from "react-aria-components";
import { Tooltip } from "@components/Tooltip";
import { useTranslation } from "react-i18next";
import { productLabelKeys } from "@i18n/labelKeys";

export interface ProductListProps {}

export const ProductList: React.FC<ProductListProps> = observer(() => {
    const { t } = useTranslation();
    const store = useVendingMachineStore();

    const handleSelectProduct = (productKey: ProductEnum) => {
        store.selectProduct(productKey);
    };

    return (
        <div className={styles["product-list"]}>
            {Object.entries(productPrices).map(([productKey, price]) => (
                <TooltipTrigger key={productKey} delay={600}>
                    <ProductButton
                        productKey={productKey as ProductEnum}
                        price={price}
                        onSelect={handleSelectProduct}
                    />
                    <Tooltip offset={6}>
                        {t("productButton.tooltip", {
                            label: t(productLabelKeys[productKey as ProductEnum])
                        })}
                    </Tooltip>
                </TooltipTrigger>
            ))}
        </div>
    );
});

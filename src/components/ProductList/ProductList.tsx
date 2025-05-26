import { productPrices, type ProductEnum } from "@core/types";
import { ProductButton } from "@components/ProductButton";
import { useVendingMachineStore } from "@stores/useVendingMachineStore";
import { observer } from "mobx-react-lite";
import styles from "./ProductList.module.css";

export interface ProductListProps {}

export const ProductList: React.FC<ProductListProps> = observer(() => {
    const store = useVendingMachineStore();

    const handleSelectProduct = (productKey: ProductEnum) => {
        store.selectProduct(productKey);
    };

    return (
        <div className={styles["product-list"]}>
            {Object.entries(productPrices).map(([productKey, price]) => (
                <ProductButton
                    key={productKey}
                    productKey={productKey as ProductEnum}
                    price={price}
                    onSelect={handleSelectProduct}
                />
            ))}
        </div>
    );
});

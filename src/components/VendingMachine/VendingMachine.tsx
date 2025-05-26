import { Panel } from "@components/Panel";
import { ProductList } from "@components/ProductList";

import styles from "./VendingMachine.module.css";
import { Inventory } from "@components/Inventory";

export const VendingMachine: React.FC = () => {
    return (
        <section className={styles["vending-machine"]}>
            <ProductList />
            <Panel />
            <Inventory />
        </section>
    );
};

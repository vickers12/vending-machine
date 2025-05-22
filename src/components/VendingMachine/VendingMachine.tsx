import { DisplayPanel } from "@components/DisplayPanel";
import { Panel } from "@components/Panel";
import { ProductList } from "@components/ProductList";

import styles from "./VendingMachine.module.css";

export const VendingMachine: React.FC = () => {
    return (
        <section className={styles["vending-machine"]}>
            <DisplayPanel />
            <ProductList />
            <Panel />
        </section>
    );
};

import { Panel } from "@components/Panel";
import { ProductList } from "@components/ProductList";

import styles from "./VendingMachine.module.css";
import { Inventory } from "@components/Inventory";
import { useMediaQuery } from "@hooks";
import { breakpoints } from "@core/constants";
import { Dispenser } from "@components/Dispenser";

export const VendingMachine: React.FC = () => {
    const isMobile = !useMediaQuery(breakpoints.md);

    return (
        <section className={styles["vending-machine"]}>
            <div className={styles["vending-machine__content"]}>
                <ProductList />
                {isMobile && <Dispenser />}
            </div>
            <Panel />
            <Inventory />
        </section>
    );
};

import { Provider } from "./components/Provider";
import { VendingMachine } from "@components/VendingMachine";
import styles from "./App.module.css";
import "@i18n";

function App() {
    return (
        <Provider>
            <main>
                <article className={styles["vending-machine-container"]}>
                    <VendingMachine />
                </article>
            </main>
        </Provider>
    );
}

export default App;

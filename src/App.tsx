import { VendingMachine } from "@components/VendingMachine/VendingMachine";
import { Provider } from "./components/Provider";
import "@i18n";

function App() {
    return (
        <Provider>
            <main>
                <VendingMachine />
            </main>
        </Provider>
    );
}

export default App;

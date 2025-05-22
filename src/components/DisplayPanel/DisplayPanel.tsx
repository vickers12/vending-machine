import type { CurrencyInventory, EventEnum, ProductEnum } from "@core/types";
import { useDisplayPanelMessage } from "@hooks";

interface DisplayPanelProps {
    changeToReturn?: CurrencyInventory;
    event: EventEnum | null;
    insertedAmount?: number;
    selectedProduct?: ProductEnum | null;
}

export function DisplayPanel({
    changeToReturn,
    event,
    insertedAmount,
    selectedProduct
}: DisplayPanelProps) {
    const message = useDisplayPanelMessage({
        event: event,
        insertedAmount: insertedAmount,
        changeToReturn: changeToReturn,
        selectedProduct: selectedProduct
    });

    return (
        <div className="display-panel">
            <p>{message}</p>
        </div>
    );
}

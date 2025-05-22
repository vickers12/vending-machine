import { useObservedDisplayMessage } from "@hooks/useObservedDisplayMessage";
import { observer } from "mobx-react-lite";
import classNames from "classnames";
import { useVendingMachineStore } from "@stores/useVendingMachineStore";

interface DisplayPanelProps {}

export const DisplayPanel: React.FC<DisplayPanelProps> = observer(() => {
    const { event } = useVendingMachineStore();
    const message = useObservedDisplayMessage();

    return (
        <div
            className={classNames("display-panel", {
                highlighted: event === "INSERT_PAYMENT"
            })}
        >
            <p>{message}</p>
        </div>
    );
});

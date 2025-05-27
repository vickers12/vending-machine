import { useObservedDisplayMessage, useTypingEffect } from "@hooks";
import { observer } from "mobx-react-lite";
import classNames from "classnames";
import { useVendingMachineStore } from "@stores/useVendingMachineStore";

import styles from "./DisplayPanel.module.css";

interface DisplayPanelProps {}

export const DisplayPanel: React.FC<DisplayPanelProps> = observer(() => {
    const { event } = useVendingMachineStore();
    const message = useObservedDisplayMessage();
    const defaultEvent = event === null;
    const noAnimation = defaultEvent;
    const animatedMessage = useTypingEffect(message, 15, noAnimation);

    return (
        <div
            className={classNames(styles["display-panel"], {
                [styles["display-panel--default-event"]]: defaultEvent
            })}
        >
            <div className={styles["display-panel__message"]}>{animatedMessage}</div>
        </div>
    );
});

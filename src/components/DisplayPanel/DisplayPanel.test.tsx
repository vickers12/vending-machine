import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { DisplayPanel } from "./DisplayPanel";
import { EventEnum } from "@core/types";
import styles from "./DisplayPanel.module.css";

// Mock hooks
vi.mock("@hooks", () => ({
    useObservedDisplayMessage: vi.fn(),
    useTypingEffect: vi.fn()
}));

vi.mock("@stores/useVendingMachineStore", () => ({
    useVendingMachineStore: vi.fn()
}));

import { useTypingEffect, useObservedDisplayMessage } from "@hooks";
import { useVendingMachineStore } from "@stores/useVendingMachineStore";

describe("DisplayPanel", () => {
    it("renders the animated message", () => {
        const message = "Insert Coin";
        (useObservedDisplayMessage as any).mockReturnValue(message);
        (useTypingEffect as any).mockReturnValue(message);
        (useVendingMachineStore as any).mockReturnValue({ event: EventEnum.INSERT_PAYMENT });

        render(<DisplayPanel />);

        expect(screen.getByText(message)).toBeInTheDocument();
    });

    it("applies the default-event modifier when event is null", () => {
        (useObservedDisplayMessage as any).mockReturnValue("Welcome");
        (useTypingEffect as any).mockReturnValue("Welcome");
        (useVendingMachineStore as any).mockReturnValue({ event: null });

        const { container } = render(<DisplayPanel />);
        const panel = container.querySelector(`.${styles["display-panel"]}`);

        expect(panel).toHaveClass(styles["display-panel--default-event"]);
    });

    it("does not apply default-event class when event is active", () => {
        const message = "Thanks!";
        (useObservedDisplayMessage as any).mockReturnValue(message);
        (useTypingEffect as any).mockReturnValue(message);
        (useVendingMachineStore as any).mockReturnValue({ event: EventEnum.PRODUCT_DISPENSED });

        const { container } = render(<DisplayPanel />);
        const panel = container.querySelector(`.${styles["display-panel"]}`);

        expect(panel).not.toHaveClass(styles["display-panel--default-event"]);
    });
});

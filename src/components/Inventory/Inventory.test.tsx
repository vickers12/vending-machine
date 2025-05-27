import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Inventory } from "./Inventory";
import styles from "./Inventory.module.css";

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => key
    })
}));

vi.mock("@stores/useVendingMachineStore", () => ({
    useVendingMachineStore: vi.fn()
}));

vi.mock("@utils/inventory", () => ({
    isInventoryStocked: vi.fn()
}));

vi.mock("./CoinInventory", () => ({
    CoinInventory: () => <div data-testid="coin-inventory" />
}));

vi.mock("./ProductInventory", () => ({
    ProductInventory: () => <div data-testid="product-inventory" />
}));

import { useVendingMachineStore } from "@stores/useVendingMachineStore";
import { isInventoryStocked } from "@utils/inventory";

describe("Inventory", () => {
    const mockStore = {
        moneyInventory: { 5: 0, 10: 0, 25: 0 },
        productInventory: { cola: 0 },
        restockAll: vi.fn()
    };

    beforeEach(() => {
        vi.clearAllMocks();
        (useVendingMachineStore as any).mockReturnValue(mockStore);
    });

    it("renders the toggle button", () => {
        render(<Inventory />);
        const toggle = screen.getByRole("button", { name: "inventory.tab" });
        expect(toggle).toBeInTheDocument();
        expect(toggle).toHaveClass(styles["inventory__tab"]);
    });

    it("opens the inventory panel when clicked", async () => {
        render(<Inventory />);
        const toggle = screen.getByRole("button", { name: "inventory.tab" });

        await userEvent.click(toggle);

        const panel = screen.getByRole("dialog");
        expect(panel.parentElement).toHaveClass(styles["inventory--open"]);
    });

    it("renders coin and product inventory components", async () => {
        render(<Inventory />);
        const toggle = screen.getByRole("button", { name: "inventory.tab" });
        await userEvent.click(toggle);

        expect(screen.getByTestId("coin-inventory")).toBeInTheDocument();
        expect(screen.getByTestId("product-inventory")).toBeInTheDocument();
    });

    it("disables restock button when inventory is stocked", async () => {
        (isInventoryStocked as any).mockReturnValue(true);

        render(<Inventory />);
        const toggle = screen.getByRole("button", { name: "inventory.tab" });
        await userEvent.click(toggle);

        const restockBtn = screen.getByRole("button", { name: "inventory.restockAll" });
        expect(restockBtn).toBeDisabled();
    });

    it("calls restockAll when button is pressed", async () => {
        (isInventoryStocked as any).mockReturnValue(false);

        render(<Inventory />);
        const toggle = screen.getByRole("button", { name: "inventory.tab" });
        await userEvent.click(toggle);

        const restockBtn = screen.getByRole("button", { name: "inventory.restockAll" });
        await userEvent.click(restockBtn);

        expect(mockStore.restockAll).toHaveBeenCalled();
    });
});

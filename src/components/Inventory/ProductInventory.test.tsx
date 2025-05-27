import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ProductInventory } from "./ProductInventory";
import styles from "./Inventory.module.css";

// Mocks
vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string, opts?: Record<string, any>) =>
            opts?.product ? `${key}:${opts.product}` : key
    })
}));

vi.mock("@hooks", () => ({
    useMoneyFormat: () => ({
        format: (n: number) => `$${(n / 100).toFixed(2)}`
    })
}));

vi.mock("@core/constants", async () => {
    const actual = await vi.importActual("@core/constants");
    return {
        ...actual,
        productLimits: {
            COLA: 10,
            WATER: 5
        },
        productPrices: {
            COLA: 200,
            WATER: 150
        }
    };
});

vi.mock("@stores/useVendingMachineStore", () => ({
    useVendingMachineStore: vi.fn()
}));

import { useVendingMachineStore } from "@stores/useVendingMachineStore";
import { productLabelKeys } from "@i18n/labelKeys";

describe("ProductInventory", () => {
    const increaseProductInventory = vi.fn();
    const decreaseProductInventory = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        (useVendingMachineStore as any).mockReturnValue({
            productInventory: {
                COLA: 2,
                WATER: 5
            },
            increaseProductInventory,
            decreaseProductInventory
        });
    });

    it("renders product names and values", () => {
        render(<ProductInventory />);

        expect(screen.getByText(productLabelKeys.COLA)).toBeInTheDocument();
        expect(screen.getByText(productLabelKeys.WATER)).toBeInTheDocument();
        expect(screen.getAllByText("$2.00")).toHaveLength(1);
        expect(screen.getAllByText("$1.50")).toHaveLength(1);
    });

    it("disables decrement button when count is 0", () => {
        (useVendingMachineStore as any).mockReturnValue({
            productInventory: {
                COLA: 0
            },
            increaseProductInventory,
            decreaseProductInventory
        });

        render(<ProductInventory />);
        const buttons = screen.getAllByRole("button", { name: /decreaseProduct/ });
        expect(buttons[0]).toBeDisabled();
    });

    it("disables increment button when count is at max", () => {
        (useVendingMachineStore as any).mockReturnValue({
            productInventory: {
                WATER: 5 // max based on productLimits
            },
            increaseProductInventory,
            decreaseProductInventory
        });

        render(<ProductInventory />);
        const buttons = screen.getAllByRole("button", { name: /increaseProduct/ });
        expect(buttons[0]).toBeDisabled();
    });

    it("calls increase and decrease handlers", async () => {
        render(<ProductInventory />);
        const decButton = screen.getAllByRole("button", { name: /decreaseProduct/ })[0];
        const incButton = screen.getAllByRole("button", { name: /increaseProduct/ })[0];

        await userEvent.click(decButton);
        await userEvent.click(incButton);

        expect(decreaseProductInventory).toHaveBeenCalledWith("COLA");
        expect(increaseProductInventory).toHaveBeenCalledWith("COLA");
    });

    it("renders the correct total count and total price", () => {
        render(<ProductInventory />);
        expect(screen.getByText("7")).toBeInTheDocument(); // 2 + 5
        expect(screen.getByText("$11.50")).toBeInTheDocument(); // (2*2) + (5*1.5)
    });

    it("uses correct CSS classes", () => {
        render(<ProductInventory />);
        const header = screen.getByText("inventory.products");
        expect(header).toHaveClass(styles["inventory__header"]);
    });
});

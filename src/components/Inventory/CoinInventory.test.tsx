import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { CoinInventory } from "./CoinInventory";
import styles from "./Inventory.module.css";
import type { CoinEnum } from "@core/types";
import { coinLabelKeys } from "@i18n/labelKeys";

// Mocks
vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string, opts?: Record<string, any>) => (opts?.coin ? `${key}:${opts.coin}` : key)
    })
}));

vi.mock("@hooks", () => ({
    useMoneyFormat: () => ({
        format: (n: number) => `$${(n / 100).toFixed(2)}`
    })
}));

vi.mock("@utils/money", () => ({
    calculateCoinTotalByKey: (coin: CoinEnum, count: number) => {
        const values = { NICKEL: 5, DIME: 10, QUARTER: 25 };
        return values[coin] * count;
    },
    calculateMoneyTotalByInventory: (inventory: Record<CoinEnum, number>) => {
        return (
            (inventory.NICKEL || 0) * 5 + (inventory.DIME || 0) * 10 + (inventory.QUARTER || 0) * 25
        );
    }
}));

vi.mock("@stores/useVendingMachineStore", () => ({
    useVendingMachineStore: vi.fn()
}));

import { useVendingMachineStore } from "@stores/useVendingMachineStore";

describe("CoinInventory", () => {
    const increaseCoinInventory = vi.fn();
    const decreaseCoinInventory = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        (useVendingMachineStore as any).mockReturnValue({
            moneyInventory: {
                NICKEL: 2,
                DIME: 1,
                QUARTER: 0
            },
            increaseCoinInventory,
            decreaseCoinInventory
        });
    });

    it("renders all coin labels", () => {
        render(<CoinInventory />);
        expect(screen.getByText(coinLabelKeys.NICKEL)).toBeInTheDocument();
        expect(screen.getByText(coinLabelKeys.DIME)).toBeInTheDocument();
        expect(screen.getByText(coinLabelKeys.QUARTER)).toBeInTheDocument();
    });

    it("disables decrease button when count is 0", () => {
        render(<CoinInventory />);
        const buttons = screen.getAllByRole("button", { name: /decreaseCoin/ });
        const quarterBtn = buttons.find((btn) =>
            btn.getAttribute("aria-label")?.includes(coinLabelKeys.QUARTER)
        );
        expect(quarterBtn).toBeDisabled();
    });

    it("calls increase and decrease handlers", async () => {
        render(<CoinInventory />);
        const decreaseBtn = screen.getAllByRole("button", { name: /decreaseCoin/ })[1];
        const increaseBtn = screen.getAllByRole("button", { name: /increaseCoin/ })[0];

        await userEvent.click(decreaseBtn);
        await userEvent.click(increaseBtn);

        expect(decreaseCoinInventory).toHaveBeenCalledWith("DIME");
        expect(increaseCoinInventory).toHaveBeenCalledWith("NICKEL");
    });

    it("renders total number of coins and total value", () => {
        render(<CoinInventory />);
        // 2 nickels + 1 dime = 3 coins
        // Total = (2×5) + (1×10) = 20 cents = $0.20
        expect(screen.getByText("3")).toBeInTheDocument();
        expect(screen.getByText("$0.20")).toBeInTheDocument();
    });

    it("uses correct CSS classes", () => {
        render(<CoinInventory />);
        const header = screen.getByText("inventory.coins");
        expect(header).toHaveClass(styles["inventory__header"]);
    });
});

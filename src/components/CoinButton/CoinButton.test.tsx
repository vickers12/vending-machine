import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CoinButton } from "./CoinButton";
import { CoinEnum } from "@core/types";
import styles from "./CoinButton.module.css";

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string, options?: Record<string, any>) =>
            options?.label ? `aria: ${options.label}` : key
    })
}));

vi.mock("@utils/money", () => ({
    getCoinImage: (coinKey: CoinEnum) => `/images/${coinKey.toLowerCase()}.svg`
}));

describe("CoinButton", () => {
    const mockInsert = vi.fn();

    it("renders the correct coin label and image", () => {
        render(<CoinButton coinKey={CoinEnum.QUARTER} onInsert={mockInsert} />);

        const button = screen.getByRole("button", { name: /aria:/ });
        const img = screen.getByRole("img");

        expect(button).toBeInTheDocument();
        expect(img).toHaveAttribute("src", "/images/quarter.svg");
        expect(img).toHaveAttribute("alt", "coin.quarter");
    });

    it("calls onInsert with the correct coinKey when pressed", async () => {
        render(<CoinButton coinKey={CoinEnum.DIME} onInsert={mockInsert} />);

        await userEvent.click(screen.getByRole("button"));
        expect(mockInsert).toHaveBeenCalledWith("DIME");
    });

    it("applies the correct class modifier based on coinKey", () => {
        render(<CoinButton coinKey={CoinEnum.NICKEL} onInsert={mockInsert} />);
        const button = screen.getByRole("button");

        expect(button).toHaveClass(styles["coin-button--nickel"]);
    });
});

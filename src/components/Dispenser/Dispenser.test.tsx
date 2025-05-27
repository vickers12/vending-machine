import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Dispenser } from "./Dispenser";
import { EventEnum, ProductEnum } from "@core/types";
import styles from "./Dispenser.module.css";

// Mocks
vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => key
    })
}));

vi.mock("@stores/useVendingMachineStore", () => ({
    useVendingMachineStore: vi.fn()
}));

vi.mock("@utils/product", () => ({
    getProductImage: (key: string) => `/images/${key}.png`
}));

import { useVendingMachineStore } from "@stores/useVendingMachineStore";

describe("Dispenser", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("does not render product image when no product is selected", () => {
        (useVendingMachineStore as any).mockReturnValue({
            selectedProduct: null,
            event: null
        });

        render(<Dispenser />);
        expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });

    it("renders product image and shadow when product is dispensed", () => {
        (useVendingMachineStore as any).mockReturnValue({
            selectedProduct: ProductEnum.WATER,
            event: EventEnum.PRODUCT_DISPENSED
        });

        const { container } = render(<Dispenser />);
        const img = screen.getByRole("img");
        expect(img).toHaveAttribute("src", "/images/WATER.png");
        expect(img).toHaveAttribute("alt", "product.water");

        const shadow = container.querySelector(`.${styles["dispenser__shadow"]}`);
        expect(shadow).toBeInTheDocument();
    });
});

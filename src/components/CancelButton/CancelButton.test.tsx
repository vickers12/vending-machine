import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CancelButton } from "./CancelButton";

// Mocks
vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => key
    })
}));

vi.mock("@stores/useVendingMachineStore", () => ({
    useVendingMachineStore: vi.fn()
}));

import { useVendingMachineStore } from "@stores/useVendingMachineStore";

describe("CancelButton", () => {
    const mockOnCancel = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders with translated label", () => {
        (useVendingMachineStore as any).mockReturnValue({ insertedAmount: 25 });

        render(<CancelButton onCancel={mockOnCancel} />);

        expect(screen.getByRole("button", { name: "cancelButton.ariaLabel" })).toBeInTheDocument();

        expect(screen.getByText("cancelButton.label")).toBeInTheDocument();
    });

    it("disables the button when insertedAmount is 0", () => {
        (useVendingMachineStore as any).mockReturnValue({ insertedAmount: 0 });

        render(<CancelButton onCancel={mockOnCancel} />);

        expect(screen.getByRole("button")).toBeDisabled();
    });

    it("calls onCancel when pressed", async () => {
        (useVendingMachineStore as any).mockReturnValue({ insertedAmount: 25 });

        render(<CancelButton onCancel={mockOnCancel} />);
        await userEvent.click(screen.getByRole("button"));

        expect(mockOnCancel).toHaveBeenCalled();
    });

    it("renders tooltip content", async () => {
        (useVendingMachineStore as any).mockReturnValue({ insertedAmount: 25 });

        render(<CancelButton onCancel={mockOnCancel} />);

        await userEvent.hover(screen.getByRole("button"));

        expect(await screen.findByText("cancelButton.tooltip")).toBeInTheDocument();
    });
});

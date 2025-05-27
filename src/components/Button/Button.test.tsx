import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";
import PlusIcon from "@assets/add.svg?react";

import styles from "./Button.module.css";

describe("Button", () => {
    it("renders with text content", () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
    });

    it("renders with an icon only", () => {
        render(<Button icon={<PlusIcon data-testid="icon" />} />);
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(screen.getByTestId("icon")).toBeInTheDocument();
        expect(button).toHaveClass(styles["button--icon-only"]);
    });

    it("applies the correct variant class", () => {
        render(<Button variant="danger">Delete</Button>);
        const button = screen.getByRole("button");
        expect(button).toHaveClass(styles["button--danger"]);
    });

    it("applies the fluid class when isFluid is true", () => {
        render(<Button isFluid>Wide</Button>);
        const button = screen.getByRole("button");
        expect(button).toHaveClass(styles["button--fluid"]);
    });

    it("handles onPress callback", async () => {
        const onPress = vi.fn();
        render(<Button onPress={onPress}>Submit</Button>);
        const button = screen.getByRole("button");
        fireEvent.click(button);
        expect(onPress).toHaveBeenCalled();
    });

    it("passes through disabled prop", () => {
        render(<Button isDisabled>Disabled</Button>);
        const button = screen.getByRole("button");
        expect(button).toBeDisabled();
    });
});

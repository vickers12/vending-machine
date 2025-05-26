import type { ButtonProps as RACButtonProps } from "react-aria-components";
import { composeRenderProps, Button as RACButton } from "react-aria-components";
import styles from "./Button.module.css";
import classNames from "classnames";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps extends RACButtonProps {
    icon?: ReactNode;
    isFluid?: boolean;
    variant?: ButtonVariant;
}

export const Button: React.FC<ButtonProps> = ({
    icon,
    children: childrenProp,
    isFluid = false,
    className: classNameProp,
    variant,
    ...rest
}) => {
    const iconOnly = !childrenProp && icon;
    const className = composeRenderProps(classNameProp, (prev) => {
        return classNames(prev, styles["button"], styles[`button--${variant || "primary"}`], {
            [styles["button--icon-only"]]: iconOnly,
            [styles["button--fluid"]]: isFluid
        });
    });

    const children = composeRenderProps(childrenProp, (prev) => {
        return prev;
    });

    return (
        <RACButton className={className} {...rest}>
            {(buttonRenderProps) => {
                return (
                    <>
                        {icon}
                        {children(buttonRenderProps)}
                    </>
                );
            }}
        </RACButton>
    );
};

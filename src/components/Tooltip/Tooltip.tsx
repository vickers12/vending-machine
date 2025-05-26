import type { TooltipProps as RACTooltipProps } from "react-aria-components";
import { composeRenderProps, Tooltip as RACTooltip } from "react-aria-components";
import styles from "./Tooltip.module.css";
import classNames from "classnames";

interface TooltipProps extends RACTooltipProps {}

export const Tooltip: React.FC<TooltipProps> = ({
    children,
    className: classNameProp,
    ...rest
}) => {
    const className = composeRenderProps(classNameProp, (prev) => {
        return classNames(prev, styles["tooltip"]);
    });

    return (
        <RACTooltip className={className} {...rest}>
            {children}
        </RACTooltip>
    );
};

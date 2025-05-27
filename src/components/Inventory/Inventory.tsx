import { useVendingMachineStore } from "@stores/useVendingMachineStore";
import { observer } from "mobx-react-lite";

import { useTranslation } from "react-i18next";
import { Dialog, ToggleButton, TooltipTrigger } from "react-aria-components";
import { useState, useRef } from "react";
import classNames from "classnames";

import styles from "./Inventory.module.css";
import { Button } from "@components/Button";
import { Overlay, useOverlayTrigger, usePopover } from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import { Tooltip } from "@components/Tooltip";
import { isInventoryStocked } from "@utils/inventory";
import { CoinInventory } from "./CoinInventory";
import { ProductInventory } from "./ProductInventory";

export interface InventoryProps {}

export const Inventory: React.FC<InventoryProps> = observer(() => {
    const { t } = useTranslation();
    const { moneyInventory, productInventory, restockAll } = useVendingMachineStore();
    const [inventoryOpen, setInventoryOpen] = useState(false);

    const toggleInventory = () => {
        setInventoryOpen((prev) => !prev);
    };

    const popoverRef = useRef(null);
    const triggerRef = useRef(null);

    const popoverState = useOverlayTriggerState({
        isOpen: inventoryOpen,
        onOpenChange: toggleInventory
    });

    const { popoverProps } = usePopover(
        { triggerRef, popoverRef, shouldUpdatePosition: false, shouldFlip: false },
        popoverState
    );
    const { triggerProps, overlayProps } = useOverlayTrigger(
        { type: "dialog" },
        popoverState,
        triggerRef
    );

    return (
        <Overlay>
            <div
                {...popoverProps}
                ref={popoverRef}
                className={classNames(styles["inventory"], {
                    [styles["inventory--open"]]: inventoryOpen
                })}
            >
                <ToggleButton
                    {...triggerProps}
                    ref={triggerRef}
                    className={styles["inventory__tab"]}
                    isSelected={inventoryOpen}
                    aria-label={t("inventory.tab")}
                >
                    {t("inventory.tab")}
                </ToggleButton>
                <Dialog
                    {...overlayProps}
                    className={styles["inventory__content"]}
                    aria-label={t("inventory.tab")}
                >
                    <CoinInventory />
                    <ProductInventory />
                    <div className={styles["inventory__btn-group"]}>
                        <TooltipTrigger delay={600}>
                            <Button
                                className={styles["inventory__restock-btn"]}
                                onPress={restockAll}
                                isDisabled={isInventoryStocked(moneyInventory, productInventory)}
                            >
                                {t("inventory.restockAll")}
                            </Button>
                            <Tooltip offset={6}>{t("inventory.restockAllTooltip")}</Tooltip>
                        </TooltipTrigger>
                    </div>
                </Dialog>
            </div>
        </Overlay>
    );
});

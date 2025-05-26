import { observer } from "mobx-react-lite";
import classNames from "classnames";
import { useVendingMachineStore } from "@stores/useVendingMachineStore";

import styles from "./Dispenser.module.css";
import { getProductImage } from "@utils/product";
import { productLabelKeys } from "@i18n/labelKeys";
import { useTranslation } from "react-i18next";
import { EventEnum } from "@core/types";
import { useEffect, useState } from "react";

interface DispenserProps {}

export const Dispenser: React.FC<DispenserProps> = observer(() => {
    const { event, selectedProduct } = useVendingMachineStore();
    const { t } = useTranslation();
    const isDispenseInProgress = event === EventEnum.PRODUCT_DISPENSED;
    const productImageSrc = getProductImage(selectedProduct);
    const productName = selectedProduct ? t(productLabelKeys[selectedProduct]) : "";

    const [showImage, setShowImage] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (selectedProduct && isDispenseInProgress) {
            setShowImage(true);
            setIsExiting(false);
        } else if (showImage) {
            setIsExiting(true);
            const timeout = setTimeout(() => {
                setShowImage(false);
                setIsExiting(false);
            }, 600);

            return () => clearTimeout(timeout);
        }
    }, [selectedProduct, isDispenseInProgress, showImage]);

    return (
        <div
            className={classNames(styles["dispenser"], {
                [styles["dispenser--animating"]]: showImage
            })}
        >
            <div className={styles["dispenser__overlay"]}></div>
            <div className={styles["dispenser__box"]}>
                <div className={styles["dispenser__box-inner"]}>
                    {showImage && (
                        <img
                            className={classNames(styles["dispenser__product-img"], {
                                [styles["dispenser__product-img--exiting"]]: isExiting
                            })}
                            src={productImageSrc}
                            alt={productName}
                        />
                    )}
                    <div className={styles["dispenser__bottom"]}>
                        {showImage && (
                            <div
                                className={classNames(styles["dispenser__shadow"], {
                                    [styles["dispenser__shadow--exiting"]]: isExiting
                                })}
                            ></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

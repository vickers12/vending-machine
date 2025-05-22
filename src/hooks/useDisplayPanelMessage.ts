import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { CurrencyInventory, ProductEnum } from "@core/types";
import { EventEnum } from "@core/types";
import { productLabelKeys } from "@i18n/labelKeys";
import { useCurrency } from "@hooks/useCurrency";
import { calculateChangeTotal } from "@utils/currency";

interface Options {
    event: EventEnum | null;
    insertedAmount?: number;
    changeToReturn?: CurrencyInventory;
    selectedProduct?: ProductEnum | null;
}

export const useDisplayPanelMessage = ({
    event,
    insertedAmount,
    changeToReturn,
    selectedProduct
}: Options): string | null => {
    const { t } = useTranslation();
    const { format } = useCurrency();

    return useMemo(() => {
        if (!event) return null;

        switch (event) {
            case EventEnum.DEPOSITED:
                return t("displayPanel.totalInserted", { value: format(insertedAmount) });

            case EventEnum.PRODUCT_DISPENSED: {
                if (!selectedProduct) return null;

                const changeTotal = changeToReturn ? calculateChangeTotal(changeToReturn) : 0;
                return changeTotal > 0
                    ? t("displayPanel.dispensedWithChange", {
                          product: t(productLabelKeys[selectedProduct]),
                          value: format(changeTotal)
                      })
                    : t("displayPanel.dispensedWithoutChange", {
                          product: t(productLabelKeys[selectedProduct])
                      });
            }

            case EventEnum.CANCELLED:
                return t("displayPanel.cancelMsg");

            case EventEnum.INSUFFICIENT_FUNDS:
                return t("displayPanel.insufficientFunds");

            case EventEnum.OUT_OF_STOCK:
                return t("displayPanel.outOfStock");

            case EventEnum.UNABLE_TO_GIVE_CHANGE:
                return t("displayPanel.unableToGiveChange");

            default:
                return null;
        }
    }, [event, insertedAmount, changeToReturn, selectedProduct, t, format]);
};

import { useTranslation } from "react-i18next";
import { useCurrency } from "@hooks/useCurrency";
import { productLabelKeys } from "@i18n/labelKeys";
import { calculateChangeTotal } from "@utils/currency";
import { useVendingMachineStore } from "@stores/useVendingMachineStore";
import { EventEnum, productPrices } from "@core/types";

/**
 * Returns a localized message based on observable MobX store state.
 * Must be used inside an `observer()` component.
 */
export const useObservedDisplayMessage = (): string | null => {
    const { t } = useTranslation();
    const { format } = useCurrency();
    const store = useVendingMachineStore();

    const { event, insertedAmount, changeToReturn, selectedProduct } = store;

    if (!event) {
        return t("displayPanel.default");
    }

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

        case EventEnum.INSERT_PAYMENT:
            if (!selectedProduct) return null;
            return t("displayPanel.insertPayment", {
                product: t(productLabelKeys[selectedProduct]),
                value: format(productPrices[selectedProduct])
            });

        case EventEnum.INSUFFICIENT_FUNDS:
            return t("displayPanel.insufficientFunds");

        case EventEnum.OUT_OF_STOCK:
            return t("displayPanel.outOfStock");

        case EventEnum.UNABLE_TO_GIVE_CHANGE:
            return t("displayPanel.unableToGiveChange");

        default:
            return null;
    }
};

import { useTranslation } from "react-i18next";
import { useMoneyFormat } from "@hooks";
import { productLabelKeys } from "@i18n/labelKeys";
import { useVendingMachineStore } from "@stores/useVendingMachineStore";
import { EventEnum } from "@core/types";
import { calculateMoneyTotalByInventory } from "@utils/money";
import { productPrices } from "@core/constants";

/**
 * Returns a localized message based on observable MobX store state.
 * Must be used inside an `observer()` component.
 */
export const useObservedDisplayMessage = (): string | null => {
    const { t } = useTranslation();
    const { format } = useMoneyFormat();
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
            const changeTotal = changeToReturn ? calculateMoneyTotalByInventory(changeToReturn) : 0;

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

        case EventEnum.OUT_OF_STOCK:
            if (!selectedProduct) return null;
            return t("displayPanel.outOfStock", {
                product: t(productLabelKeys[selectedProduct])
            });

        case EventEnum.UNABLE_TO_GIVE_CHANGE:
            return t("displayPanel.unableToGiveChange");

        default:
            return null;
    }
};

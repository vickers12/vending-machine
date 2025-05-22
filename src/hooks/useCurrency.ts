import { useLocale } from "react-aria-components";
import { useNumberFormatter } from "react-aria";
import { useTranslation } from "react-i18next";

/**
 * Map region codes to ISO currency codes.
 */
const regionToCurrency: Record<string, string> = {
    CA: "CAD"
};

/**
 * Extracts currency based on region in locale string (e.g. "en-CA" → "CAD").
 */
const getCurrencyFromLocale = (locale: string): string => {
    const region = new Intl.Locale(locale).region;
    return regionToCurrency[region ?? ""] ?? "CAD";
};

/**
 * Hook to format cents as localized currency or raw cent symbol.
 */
export const useCurrency = () => {
    const { locale: ariaLocale } = useLocale();
    const { i18n, t } = useTranslation();

    const locale = i18n.language || ariaLocale;
    const currency = getCurrencyFromLocale(locale);

    const numberFormatter = useNumberFormatter({
        style: "currency",
        currency,
        minimumFractionDigits: 2
    });

    const format = (cents?: number, options?: { rawUnderDollar?: boolean }): string | null => {
        if (cents === undefined || cents === null) {
            return null;
        }
        if (options?.rawUnderDollar && cents < 100) {
            return t("centSymbol", { value: cents });
        }

        return numberFormatter.format(cents / 100);
    };

    return {
        format,
        currency,
        locale
    };
};

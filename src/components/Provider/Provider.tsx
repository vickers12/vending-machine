import i18n from "@i18n";
import type { ReactNode } from "react";
import { I18nProvider } from "react-aria-components";

interface ProviderProps {
    children: ReactNode;
}

export const Provider = ({ children }: ProviderProps) => {
    const currentLocale = i18n.language ?? "en-CA";
    return (
        <I18nProvider key={currentLocale} locale={currentLocale}>
            {children}
        </I18nProvider>
    );
};

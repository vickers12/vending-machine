import { Button } from "react-aria-components";
import { useTranslation } from "react-i18next";

interface CancelButtonProps {
    onCancel: () => void;
}

export function CancelButton({ onCancel }: CancelButtonProps) {
    const { t } = useTranslation();

    return (
        <Button
            className="cancel-button"
            onPress={onCancel}
            aria-label={t("cancelButton.ariaLabel")}
        >
            {t("cancelButton.label")}
        </Button>
    );
}

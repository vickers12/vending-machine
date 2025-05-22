import { Button } from "react-aria-components";
import { useTranslation } from "react-i18next";

interface CancelButtonProps {
    onCancel: () => void;
}

export const CancelButton: React.FC<CancelButtonProps> = ({ onCancel }) => {
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
};

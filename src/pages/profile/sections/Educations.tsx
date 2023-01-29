import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import Card from "../../../components/card/Card";

export default function Educations() {
    const { t } = useTranslation();
    return (
        <Card className="educations-container container-width">
            <Box className="card-heading">{t('profile.education-title')}</Box>
        </Card>
    )
}
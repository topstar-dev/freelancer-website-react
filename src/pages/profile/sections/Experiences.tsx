import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import Card from "../../../components/card/Card";

export default function Experiences() {
    const { t } = useTranslation();
    return (
        <Card className="experiences-container container-width">
            <Box className="card-heading">{t('profile.experience-title')}</Box>
        </Card>
    )
}
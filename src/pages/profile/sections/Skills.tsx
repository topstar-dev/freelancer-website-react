import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import Card from "../../../components/card/Card";

export default function Skills() {
    const { t } = useTranslation();
    return (
        <Card className="skills-container container-width">
            <Box className="card-heading">{t('profile.skills-title')}</Box>
        </Card>
    )
}
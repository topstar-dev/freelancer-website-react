import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import Card from "../../../components/card/Card";

export default function About({ about }: any) {
    const { t } = useTranslation();
    return (
        <Card className="about-container container-width">
            <Box className="card-heading">{t('profile.about-title')}</Box>
            <Box className="about-content">
                {about}
            </Box>
        </Card>
    )
}
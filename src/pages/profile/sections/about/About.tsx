import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import EditIcon from '@mui/icons-material/Edit';
import Card from "../../../../components/card/Card";

export default function About({ about, currentProfile }: any) {
    const { t } = useTranslation();
    return (
        <Card className="about-container container-width">
            <Box className="card-heading">
                {t('profile.about-title')}
                {currentProfile && <EditIcon className="edit-icon" />}
            </Box>
            <Box className="about-content">
                {about}
            </Box>
        </Card>
    )
}
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import EditIcon from '@mui/icons-material/Edit';
import Card from "../../../../components/card/Card";

export default function BasicInformation({
    location,
    join_date,
    currentProfile
}: any) {
    const { t } = useTranslation();

    return (
        <Card className="basicInfo-container container-width">
            <Box className="card-heading">
                {t('profile.basic-info-title')}
                {currentProfile && <EditIcon className="edit-icon" />}
            </Box>
            <Box className="basicInfo-location" style={{ marginBottom: 10 }}>
                <span>{t('profile.basic-info-location')}:</span> {location}
            </Box>
            <Box className="basicInfo-joining-date">
                <span>{t('profile.basic-info-join-date')}:</span> {join_date}
            </Box>
        </Card>
    )
}
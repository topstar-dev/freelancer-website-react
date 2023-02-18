import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import Card from "../../../../components/card/Card";
import EditBasicInformation from "./editBasicInformation";

export default function BasicInformation({
    location,
    join_date,
    city_id,
    province_id,
    country_id,
    currentProfile
}: any) {
    const { t } = useTranslation();

    return (
        <Card className="basicInfo-container container-width">
            <Box className={country_id || province_id || city_id ? "card-heading" : "card-heading-new-item"}>
                {t('profile.basic-info-title')}
                {currentProfile && <EditBasicInformation
                    city_id={city_id}
                    province_id={province_id}
                    country_id={country_id}
                />}
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
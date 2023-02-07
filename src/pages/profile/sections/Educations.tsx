import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import Card from "../../../components/card/Card";

export default function Educations({ educations }: any) {
    const { t } = useTranslation();

    const getDetailsLabel = (exp: any) => {
        if (exp.end_year) {
            return {
                first: `${exp.major_name}`,
                last: `${exp.start_year} - ${exp.end_year}`
            }
        } else {
            return {
                first: `${exp.major_name}`,
                last: `${exp.start_year} to date`
            }
        }
    }

    return (
        <Card className="educations-container container-width">
            <Box className="card-heading">{t('profile.educations-title')}</Box>
            <Box className="profile-educations-box">
                {educations?.map((edu: any, index: number) => (
                    <Box className="profile-educations-item" key={index}>
                        <Box>
                            <Box className="educations-title">{edu.school_name}</Box>
                            <Box className="educations-details">{getDetailsLabel(edu).first} &#183; {getDetailsLabel(edu).last}</Box>
                        </Box>
                        {edu.description && <Box className="educations-description">{edu.description}</Box>}
                    </Box>
                ))}
            </Box>
        </Card>
    )
}
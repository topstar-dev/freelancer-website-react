import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import Card from "../../../components/card/Card";

export default function Experiences({ experiences }: any) {
    const { t } = useTranslation();

    const getDetailsLabel = (exp: any) => {
        if (exp.end_year) {
            return {
                first: `${exp.job_title}`,
                last: `${exp.start_year} - ${exp.end_year}`
            }
        } else {
            return {
                first: `${exp.job_title}`,
                last: `${exp.start_year} to date`
            }
        }
    }
    return (
        <Card className="experiences-container container-width">
            <Box className="card-heading">{t('profile.experiences-title')}</Box>
            <Box className="profile-experience-box">
                {experiences?.map((exp: any, index: number) => (
                    <Box className="profile-experience-item" key={index}>
                        <Box>
                            <Box className="experience-title">{exp.company_name}</Box>
                            <Box className="experience-details">{getDetailsLabel(exp).first} &#183; {getDetailsLabel(exp).last}</Box>
                        </Box>
                        {exp.description && <Box className="experience-description">{exp.description}</Box>}
                    </Box>
                ))}
            </Box>
        </Card>
    )
}
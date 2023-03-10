import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import Card from "../../../../components/card/Card";
import SeeMore from "../../../../components/seeMore/SeeMore";
import { useState } from "react";
import EditExperiences from "./editExperiences";

export default function Experiences({ experiences, currentProfile }: any) {
    const { t } = useTranslation();
    const [currentLength, setCurrentLength] = useState(2);

    const getDetailsLabel = (exp: any) => {
        if (exp.end_year) {
            return {
                first: `${exp.job_title}`,
                last: `${exp.start_year} - ${exp.end_year}`
            }
        } else {
            return {
                first: `${exp.job_title}`,
                last: `${exp.start_year}${t('profile.present')}`
            }
        }
    }
    return (
        <Box>
            <Card className="see-more-container container-width">
                <Box className={experiences.length ? "card-heading" : "card-heading-new-item"}>
                    {t('profile.experiences-title')}
                    {currentProfile && <EditExperiences experiences={experiences} />}
                </Box>
                <Box className="profile-experience-box">
                    {experiences?.slice(0, currentLength)?.map((exp: any, index: number) => (
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
            <SeeMore
                loading={false}
                currentLength={currentLength}
                totalSize={experiences?.length}
                limit={2}
                onClick={() => {
                    setCurrentLength(experiences?.length)
                }}
                onClickLess={() => {
                    setCurrentLength(2);
                }}
            />
        </Box>
    )
}
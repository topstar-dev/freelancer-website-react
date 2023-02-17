import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import EditIcon from '@mui/icons-material/Edit';
import Card from "../../../../components/card/Card";
import SeeMore from "../../../../components/seeMore/SeeMore";
import { useState } from "react";

export default function Educations({ educations, currentProfile }: any) {
    const { t } = useTranslation();
    const [currentLength, setCurrentLength] = useState(2);

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
        <Box>
            <Card className="see-more-container container-width">
                <Box className="card-heading">
                    {t('profile.educations-title')}
                    {currentProfile && <EditIcon className="edit-icon" />}
                </Box>
                <Box className="profile-educations-box">
                    {educations?.slice(0, currentLength)?.map((edu: any, index: number) => (
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
            <SeeMore
                loading={false}
                currentLength={currentLength}
                totalSize={educations?.length}
                limit={2}
                onClick={() => {
                    setCurrentLength(currentLength + 2)
                }}
                onClickLess={() => {
                    setCurrentLength(2);
                }}
            />
        </Box>
    )
}
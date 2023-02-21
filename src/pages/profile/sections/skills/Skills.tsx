import { Box, Chip } from "@mui/material";
import { Stack } from "@mui/system";
import { useTranslation } from "react-i18next";
import Card from "../../../../components/card/Card";
import { useState } from "react";
import SeeMore from "../../../../components/seeMore/SeeMore";
import EditSkills from "./editSkills";

export default function Skills({ skills = [], occupation_category_id, currentProfile }: any) {
    const { t } = useTranslation();
    const [currentLength, setCurrentLength] = useState(7);
    return (
        <Box>
            <Card className="see-more-container container-width">
                <Box className={`${skills.length > 0 ? "card-heading" : "card-heading-new-item"}`}>
                    {t('profile.skills-title')}
                    {currentProfile && <EditSkills skills={skills} occupation_category_id={occupation_category_id} />}
                </Box>
                <Stack
                    display={'flex'}
                    direction='row'
                    flexWrap={'wrap'}
                    gap={'10px'}
                    alignItems='flex-start'
                    spacing={1}
                >

                    {skills?.slice(0, currentLength)?.map((skill: any, index: number) => {
                        return (
                            <Chip className="skill-chip" key={index} label={skill.skill_name} variant="outlined" />
                        )
                    })}
                    {skills.length > currentLength ?
                        <div
                            style={{
                                height: '32px',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                            className="skill-chip-extra"
                        >
                            {`+ ${skills.length - skills?.slice(0, currentLength)?.length}`}
                        </div>
                        :
                        ''
                    }
                </Stack>
            </Card >
            <SeeMore
                loading={false}
                currentLength={currentLength}
                totalSize={skills?.length}
                limit={7}
                onClick={() => {
                    setCurrentLength(skills.length)
                }}
                onClickLess={() => {
                    setCurrentLength(7);
                }}
            />
        </Box>
    )
}
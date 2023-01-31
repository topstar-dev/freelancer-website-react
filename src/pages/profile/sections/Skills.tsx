import { Box, Chip } from "@mui/material";
import { Stack } from "@mui/system";
import { useTranslation } from "react-i18next";
import Card from "../../../components/card/Card";

export default function Skills({ skills }: any) {
    const { t } = useTranslation();

    return (
        <Card className="skills-container container-width">
            <Box className="card-heading">{t('profile.skills-title')}</Box>
            <Stack
                display={'flex'}
                direction='row'
                flexWrap={'wrap'}
                gap={'10px'}
                alignItems='flex-start'
                spacing={1}
            >

                {skills?.map((skill: any, index: number) => {
                    return (
                        <Chip className="skill-chip" key={index} label={skill.skill_name} variant="outlined" />
                    )
                })}
            </Stack>
        </Card >
    )
}
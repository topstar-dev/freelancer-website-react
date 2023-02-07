import { Box, Rating } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import EditIcon from '@mui/icons-material/Edit';
import Card from "../../../../components/card/Card";
import { LANGUAGE_SKILLS } from "../../../../redux/constants";
import { useTranslation } from "react-i18next";

export default function Languages({ languages, currentProfile }: any) {
    const { t } = useTranslation();
    return (
        <Card className="languages-container container-width">
            <Box className="card-heading">
                {t('profile.language-title')}
                {currentProfile && <EditIcon className="edit-icon" />}
            </Box>
            <Box className="language-list-container">
                {languages && languages.map((lang: any, index: number) => (
                    <Box className="profile-language-box" key={index}>
                        <Box>
                            <Box className="language-box-name">{lang.language_name}</Box>
                            <Box className="language-box-skill">{t(`${Object.values(LANGUAGE_SKILLS)[Object.keys(LANGUAGE_SKILLS).findIndex(e => e === lang.language_skill)]}`)}</Box>
                        </Box>
                        <Box>
                            <Rating
                                readOnly
                                size="medium"
                                name="language-skill"
                                value={(Object.keys(LANGUAGE_SKILLS)).indexOf(lang.language_skill) + 1}
                                precision={1}
                                icon={<CircleIcon fontSize="inherit" />}
                                emptyIcon={<CircleIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                            />
                        </Box>
                    </Box>
                ))}
            </Box>
        </Card>
    )
}
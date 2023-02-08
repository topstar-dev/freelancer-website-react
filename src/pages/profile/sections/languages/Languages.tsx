import { Box, Rating } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import Card from "../../../../components/card/Card";
import { LANGUAGE_SKILLS } from "../../../../redux/constants";
import { useTranslation } from "react-i18next";
import SeeMore from "../../../../components/seeMore/SeeMore";
import { useState } from "react";
import EditLanguages from "./editLanguages";

export default function Languages({ languages, currentProfile }: any) {
    const { t } = useTranslation();
    const [currentLength, setCurrentLength] = useState(languages.length);

    return (
        <Box>
            <Card className="see-more-container container-width">
                <Box className={languages.length ? "card-heading" : "card-heading-new-item"}>
                    {t('profile.language-title')}
                    {currentProfile && <EditLanguages languages={languages} />}
                </Box>
                {languages.length ?
                    <Box className="language-list-container">
                        {languages && languages.slice(0, currentLength).map((lang: any, index: number) => (
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
                    :
                    ''
                }
            </Card>
            <SeeMore
                loading={false}
                currentLength={currentLength}
                totalSize={languages?.length}
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
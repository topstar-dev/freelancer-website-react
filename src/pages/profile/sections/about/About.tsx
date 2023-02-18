import { useState } from "react";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import Card from "../../../../components/card/Card";
import SeeMore from "../../../../components/seeMore/SeeMore";
import EditAbout from "./editAbout";

export default function About({ about, currentProfile }: any) {
    const { t } = useTranslation();
    const [currentLength, setCurrentLength] = useState(200);

    return (
        <Box>
            <Card className="see-more-container container-width">
                <Box className={about ? "card-heading" : "card-heading-new-item"}>
                    {t('profile.about-title')}
                    {currentProfile && <EditAbout about={about} />}
                </Box>
                <Box className="about-content">
                    {about?.substr(0, currentLength)}
                    {about?.length > currentLength ? '...' : ''}
                </Box>
            </Card>
            <SeeMore
                loading={false}
                currentLength={currentLength}
                totalSize={about?.length}
                limit={200}
                onClick={() => {
                    setCurrentLength(about?.length)
                }}
                onClickLess={() => {
                    setCurrentLength(200);
                }}
            />
        </Box>
    )
}
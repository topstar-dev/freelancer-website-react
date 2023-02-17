import { useState } from "react";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import EditIcon from '@mui/icons-material/Edit';
import Card from "../../../../components/card/Card";
import SeeMore from "../../../../components/seeMore/SeeMore";

export default function About({ about, currentProfile }: any) {
    const { t } = useTranslation();
    const [currentLength, setCurrentLength] = useState(50);

    return (
        <Box>
            <Card className="see-more-container container-width">
                <Box className="card-heading">
                    {t('profile.about-title')}
                    {currentProfile && <EditIcon className="edit-icon" />}
                </Box>
                <Box className="about-content">
                    {about.substr(0, currentLength)}
                    {currentLength !== about.length ? '...' : ''}
                </Box>
            </Card>
            <SeeMore
                loading={false}
                currentLength={currentLength}
                totalSize={about?.length}
                limit={2}
                onClick={() => {
                    setCurrentLength(about.length)
                }}
                onClickLess={() => {
                    setCurrentLength(50);
                }}
            />
        </Box>
    )
}
import { Typography } from "@mui/material";
import { Box } from "@mui/system"
import { useTranslation } from "react-i18next";
import MediaQuery from 'react-responsive'
import useBreakpoint from "../../../components/breakpoints/BreakpointProvider";
import Button from "../../../components/button/Button";
import { useAppSelector } from "../../../redux/hooks";
import { useNavigate } from "../../../routes/Router";

const SkillsSection = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { isMobile } = useBreakpoint();
    const { userInfo } = useAppSelector((state) => state.auth);

    return (
        <Box className={`home-skills-section ${isMobile ? 'home-skills-section-mobile' : ''}`}>
            <Box className="home-skills-left">
                <Box>
                    <Typography className="home-section-title">
                        {t('home-page-heading1')}
                        <MediaQuery maxWidth={550}>
                            <br />
                        </MediaQuery>
                        <MediaQuery minWidth={1088} maxWidth={1435}>
                            <br />
                        </MediaQuery>
                        {t('home-page-heading2')}
                    </Typography>
                    <div className="home-section-details">
                        <Typography className="home-section-info2" style={{ marginBottom: '24px' }}>
                            {t('home-page-heading1-details')}
                        </Typography>
                        <Typography className="home-section-info2">
                            {t('home-page-heading1-details2')}
                        </Typography>
                    </div>
                    {!userInfo && <Button onClick={() => navigate(`/sign-in`)}>{t('home-page-join-ronux-button')}</Button>}
                </Box>
            </Box>
            <Box className="home-skills-right">
                <img
                    alt="Skills"
                    className="home-skills-image"
                    src="/images/skills.png" />
            </Box>
        </Box>
    )
}

export default SkillsSection;
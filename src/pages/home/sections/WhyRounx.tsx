import { Typography } from "@mui/material";
import { Box } from "@mui/system"
import { useTranslation } from "react-i18next";
import useBreakpoint from "../../../components/breakpoints/BreakpointProvider";

const WhyRounxSection = () => {
    const { isMobile } = useBreakpoint();
    const { t } = useTranslation();

    return (
        <Box className="home-why-container">
            <Typography className="home-section-title" style={{ textAlign: 'center', marginBottom: '95px' }}>
                {t('home-page-why-ronux')}
            </Typography>
            <Box className={`home-why-section ${isMobile ? 'home-why-section-mobile' : ''}`}>
                <Box className="home-why-box">
                    <Box>
                        <img alt="Verified User" width='70px' src="/images/verified-user-icon.png" />
                        <br />
                        <br />
                        <Typography style={{ fontSize: '24px', fontWeight: '450' }}>{t('home-page-why-point1')}</Typography>
                        <br />
                        <Typography style={{ fontSize: '18px', color: '#757575' }}>{t('home-page-why-point1-info')}</Typography>
                        <br />
                    </Box>
                </Box>
                <Box className="home-why-box" style={{ margin: '0 3%' }}>
                    <Box>
                        <img alt="Public Icon" width='70px' src="/images/public-icon.png" />
                        <br />
                        <br />
                        <Typography style={{ fontSize: '24px', fontWeight: '450' }}>{t('home-page-why-point2')}</Typography>
                        <br />
                        <Typography style={{ fontSize: '18px', color: '#757575' }}>{t('home-page-why-point2-info')}</Typography>
                        <br />
                    </Box>
                </Box>
                <Box className="home-why-box">
                    <Box>
                        <img alt="Code Icon" width='70px' src="/images/code-icon.png" />
                        <br />
                        <br />
                        <Typography style={{ fontSize: '24px', fontWeight: '450' }}>{t('home-page-why-point3')}</Typography>
                        <br />
                        <Typography style={{ fontSize: '18px', color: '#757575' }}>{t('home-page-why-point3-info')}</Typography>
                        <br />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default WhyRounxSection;
import React from "react";
import { useTranslation } from 'react-i18next';
import { Box, Divider } from "@mui/material";
import { pageView } from "../../services/eventTracker";
import SkillsSection from "./sections/SkillsSection";
import WhyRounxSection from "./sections/WhyRounx";
import FAQ from "./sections/FAQ";
import WorkPlateformSection from "./sections/WorkPlateform";
import './home.css'

export default function HomePage() {
    const { t } = useTranslation();

    React.useEffect(() => {
        document.title = t('title.home');
        sessionStorage.removeItem('signup-info')
        sessionStorage.removeItem('freelancer-application-info');
        sessionStorage.removeItem('freelancer-application-status');
        pageView(window.location.pathname)
    })

    return (
        <Box className='container'>
            <SkillsSection />
            <Divider style={{ margin: '96px 0' }} />
            <WhyRounxSection />
            <Divider style={{ margin: '96px 0' }} />
            <FAQ />
            <Divider style={{ margin: '96px 0' }} />
            <WorkPlateformSection />
        </Box>
    )
}
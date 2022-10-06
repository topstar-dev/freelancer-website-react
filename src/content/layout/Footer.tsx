import React from "react";
import { useTranslation } from 'react-i18next';
import { Paper, Select, MenuItem, Box, Typography } from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import { TextButton } from "../commonStyle/CommonStyle";
import { useNavigate } from "react-router-dom";
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();

    const [language, setLanguage] = React.useState(localStorage.getItem('i18nextLng') || 'en');

    const changeLang = (lang: string) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('i18nextLng', lang);
        setLanguage(lang);
    }

    return (<Paper variant="outlined" sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: { lg: '50px', xs: '100px' }, display: { lg: 'flex', xs: 'block' }, justifyContent: { lg: 'space-between' } }} >
        <Box sx={{ display: 'flex', mt: { xs: 2 }, alignItems: 'center', justifyContent: 'center', ml: { lg: '15%' } }}>
            <LanguageIcon />
            <Select
                sx={{ ml: 1, mr: 3 }}
                onChange={(e) => changeLang(e.target.value)}
                defaultValue={language}
                value={language}
                variant="standard"
            >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="cn">{t('footer-chinese-language')}</MenuItem>
            </Select>
            <TextButton mr={3} onClick={() => navigate('/privacy')}>{t('footer-privacy-policy')}</TextButton>
            <TextButton mr={3} onClick={() => navigate('/terms')}>{t('footer-terms-of-service')}</TextButton>
            <Typography>&copy; Rounx {new Date().getFullYear()}</Typography>
        </Box>
        <Box sx={{ display: 'flex', mt: { xs: 2 }, alignItems: 'center', justifyContent: 'center', mr: '15%' }} >
            <TwitterIcon sx={{ mr: 2, ":hover": { color: '#1DA1F2' } }} />
            <LinkedInIcon sx={{ mr: 2, ":hover": { color: '#0073B1' } }} />
        </Box>
    </Paper>)

}
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive'
import { Select, MenuItem, Box, Typography } from "@mui/material";
import { TextButton } from "../pages/commonStyle";
import LanguageIcon from '@mui/icons-material/Language';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();

    const isWeb = useMediaQuery({ query: '(min-width: 901px)' });

    const [language, setLanguage] = React.useState(localStorage.getItem('i18nextLng') || 'en');

    const changeLang = (lang: string) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('i18nextLng', lang);
        setLanguage(lang);
    }

    const fontSizeValue = { fontSize: '12px' };

    return (
        <Box style={{
            display: 'flex',
            justifyContent: isWeb ? 'space-between' : 'initial',
            flexWrap: 'wrap',
            position: 'fixed',
            width: '100%',
            height: isWeb ? '50px' : '100px',
            bottom: '0',
            marginTop: isWeb ? '50px' : '100px',
            boxShadow: '0 0px 10px rgb(0 0 0 / 20%)',
            backgroundColor: '#fff'
        }}>
            <Box style={{
                width: isWeb ? '50%' : '100%',
                marginTop: isWeb ? '0' : '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <LanguageIcon />
                <Select
                    style={fontSizeValue}
                    sx={{ ml: 1, mr: 3 }}
                    onChange={(e) => changeLang(e.target.value)}
                    defaultValue={language}
                    value={language}
                    variant="standard"
                >
                    <MenuItem style={fontSizeValue} value="en">English</MenuItem>
                    <MenuItem style={fontSizeValue} value="cn">{t('footer-chinese-language')}</MenuItem>
                </Select>
                <TextButton style={fontSizeValue} mr={3} onClick={() => navigate('/privacy')}>{t('footer-privacy-policy')}</TextButton>
                <TextButton style={fontSizeValue} mr={3} onClick={() => navigate('/terms')}>{t('footer-terms-of-service')}</TextButton>
                <Typography style={fontSizeValue}>&copy; Rounx {new Date().getFullYear()}</Typography>
            </Box>
            <Box style={{
                width: isWeb ? '50%' : '100%',
                display: 'flex',
                marginTop: isWeb ? '0' : '20px',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <TwitterIcon sx={{ mr: 2, ":hover": { color: '#1DA1F2' } }} />
                <LinkedInIcon sx={{ mr: 2, ":hover": { color: '#0073B1' } }} />
            </Box>
        </Box>
    )
}
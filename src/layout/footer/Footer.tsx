import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Select, MenuItem, Box, Typography } from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeLanguage } from "../../redux/resources/resourcesSlice";
import './footer.css';

export default function Footer() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { i18n, t } = useTranslation();

    const { language } = useAppSelector(state => state.resources);

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language, i18n])

    const changeLang = (lang: string) => {
        dispatch(changeLanguage(lang))
    }

    return (
        <Box className="rounx-footer-container">
            <Box className="rounx-footer-left-content">
                <Box className="rounx-language-box">
                    <LanguageIcon className="rounx-language-icon" />
                    <Select
                        className="rounx-language-select"
                        onChange={(e) => changeLang(e.target.value)}
                        defaultValue={language}
                        value={language}
                        variant="standard"
                    >
                        <MenuItem value="en">English</MenuItem>
                        <MenuItem value="zh-CN">中文</MenuItem>
                    </Select>
                </Box>
                <Box className="rounx-nav-items-box">
                    <Typography className="rounx-footer-items" onClick={() => navigate('/privacy')}>{t('footer-privacy-policy')}</Typography>
                    <Typography className="rounx-footer-items" onClick={() => navigate('/terms')}>{t('footer-terms-of-service')}</Typography>
                    <Typography className="rounx-footer-items">&copy; Rounx {new Date().getFullYear()}</Typography>
                </Box>
            </Box>
            <Box className="rounx-footer-right-content">
                <img className="rounx-footer-brand-icon" src='/images/wechat.svg' alt="wechat-icon" />
                <img className="rounx-footer-brand-icon" src='/images/weibo.svg' alt="weibo-icon" />
                <TwitterIcon className="rounx-footer-brand-icon" />
                <LinkedInIcon className="rounx-footer-brand-icon" />
            </Box>
        </Box>
    )
}
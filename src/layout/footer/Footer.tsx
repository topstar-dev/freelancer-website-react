import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { MenuItem, Box, Typography, Menu } from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import Modal from '@mui/material/Modal';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeLanguage } from "../../redux/resources/resourcesSlice";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import './footer.css';
import { eventTracker } from "../../services/eventTracker";

export default function Footer() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { i18n, t } = useTranslation();
    const { language } = useAppSelector(state => state.resources);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language, i18n])

    const handleMenu = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const changeLang = (lang: string) => {
        eventTracker("Footer", "Language change", `Language changed from ${language} to ${lang}`)
        document.documentElement.lang = lang;
        setAnchorEl(null);
        dispatch(changeLanguage(lang))
    }

    return (
        <Box className="rounx-footer-container">
            <Box className="rounx-footer-left-content">
                <Box className="rounx-language-box" onClick={(e) => handleMenu(e)}>
                    <LanguageIcon className="rounx-language-icon" />
                    <Typography className="rounx-language-select">
                        {language === 'en' ? 'English' : '中文'}
                    </Typography>
                    {anchorEl ?
                        <ArrowDropUpIcon />
                        :
                        <ArrowDropDownIcon />
                    }
                </Box>
                <Menu
                    id="menu-language"
                    className='rounx-language-menu'
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    keepMounted={false}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem selected={language === 'en'} onClick={() => changeLang("en")}>English</MenuItem>
                    <MenuItem selected={language === 'zh-CN'} onClick={() => changeLang("zh-CN")}>中文</MenuItem>
                </Menu>
                <Box className="rounx-nav-items-box">
                    <Typography className="rounx-footer-items" onClick={() => {
                        navigate('/privacy')
                    }}>{t('footer-privacy-policy')}</Typography>
                    <Typography className="rounx-footer-items" onClick={() => {
                        navigate('/terms')
                    }}>{t('footer-terms-of-service')}</Typography>
                    <Typography className="rounx-footer-items">&copy; Rounx {new Date().getFullYear()}</Typography>
                </Box>
            </Box>
            <Box className="rounx-footer-right-content">
                <img className="rounx-footer-brand-icon" src='/images/wechat.svg' onClick={() => setOpen(true)} alt="wechat-icon" />
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <img
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            margin: 'auto',
                            outline: 'none',
                            transform: 'translate(-50%, -50%)'
                        }}
                        className="rounx-qr-code-image"
                        alt="rounx-qrcode"
                        src="/images/rounx-qrcode.jpg"
                    />
                </Modal>
                <a target="_blank" rel="noreferrer" href="https://weibo.com/rounx">
                    <img className="rounx-footer-brand-icon" src='/images/weibo.svg' alt="weibo-icon" />
                </a>
                <a target="_blank" rel="noreferrer" href="https://twitter.com/rounxofficial">
                    <TwitterIcon className="rounx-footer-brand-icon" />
                </a>
                <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/company/rounx">
                    <LinkedInIcon className="rounx-footer-brand-icon" />
                </a>
            </Box>
        </Box >
    )
}
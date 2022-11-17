import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { MenuItem, Box, Typography, FormControl, Select } from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import Modal from '@mui/material/Modal';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeLanguage } from "../../redux/resources/resourcesSlice";
import { eventTracker } from "../../services/eventTracker";
import './footer.css';

export default function Footer() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { i18n, t } = useTranslation();
    const { language } = useAppSelector(state => state.resources);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language, i18n])

    const changeLang: any = (event: any) => {
        const lang = event.target.value;
        eventTracker("Footer", "Language change", `Language changed from ${language} to ${lang}`)
        document.documentElement.lang = lang;
        dispatch(changeLanguage(lang))
    }

    return (
        <Box className="rounx-footer-container">
            <Box className="rounx-footer-left-content">
                <FormControl className="rounx-language-box">
                    <Select
                        id='rounx-language-switcher'
                        sx={{ height: 20 }}
                        className="rounx-language-select"
                        labelId="language"
                        value={language}
                        label={t('language')}
                        MenuProps={{
                            className: "rounx-language-menu"
                        }}
                        renderValue={(value) => {
                            return <Box
                                className="rounx-language-value"
                                id="language-button"
                            >
                                <LanguageIcon className="rounx-language-icon" />
                                {value === 'en' ? 'English' : '中文'}
                            </Box>
                        }}
                        onChange={changeLang}>
                        <MenuItem value="en">
                            English
                        </MenuItem>
                        <MenuItem value="zh-CN">
                            中文
                        </MenuItem>
                    </Select>
                </FormControl>
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
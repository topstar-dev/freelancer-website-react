import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { MenuItem, Box, Typography, FormControl, Select } from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeLanguage } from "../../redux/resources/resourcesSlice";
import { eventTracker } from "../../services/eventTracker";
import './footer.css';
import { useMediaQuery } from "react-responsive";

export default function Footer() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { i18n, t } = useTranslation();
    const { language } = useAppSelector(state => state.resources);
    const [open, setOpen] = React.useState(false);
    const isWeb = useMediaQuery({ query: '(min-width: 1001px)' })

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language, i18n])

    const changeLang: any = (event: any) => {
        const lang = event.target.value;
        eventTracker("Footer", "Language change", `Language changed from ${language} to ${lang}`)
        document.documentElement.lang = lang;
        dispatch(changeLanguage(lang))
    }

    const isReplace = () => {
        const replace = [
            '/contact',
            '/about',
            '/help',
            '/blog',
            '/settings/personal'
        ].includes(location.pathname)

        return !replace;
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
                    {language === 'zh-CN' && isWeb &&
                        <a
                            href="https://beian.miit.gov.cn/"
                            target="_blank"
                            style={{ wordWrap: 'break-word' }}
                            className="rounx-footer-items"
                            rel="noreferrer"
                        >
                            辽ICP备2021011574号-1
                        </a>
                    }
                    <Typography className="rounx-footer-items" onClick={() => {
                        navigate('/privacy', { replace: isReplace() })
                    }}>{t('footer-privacy-policy')}</Typography>
                    <Typography className="rounx-footer-items" onClick={() => {
                        navigate('/terms', { replace: isReplace() })
                    }}>{t('footer-terms-of-service')}</Typography>
                    <Typography className="rounx-footer-items">&copy; Rounx {new Date().getFullYear()}</Typography>
                </Box>
            </Box>
            <Box className="rounx-footer-right-content">
                <div className="rounx-footer-brand-icon">
                    <img className="brand-normal" src='/images/wechat.png' onClick={() => setOpen(true)} alt="wechat-icon" />
                    <img className="brand-hover" src='/images/wechat_hover.png' onClick={() => setOpen(true)} alt="wechat-icon" />
                </div>
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
                <a className="rounx-footer-brand-icon" target="_blank" rel="noreferrer" href="https://weibo.com/rounx">
                    <img className="brand-normal" src='/images/weibo.png' alt="weibo-icon" />
                    <img className="brand-hover" src='/images/weibo_hover.png' alt="weibo-icon" />
                </a>
                <a className="rounx-footer-brand-icon" target="_blank" rel="noreferrer" href="https://twitter.com/rounxofficial">
                    <img className="brand-normal" src='/images/twitter.png' alt="twitter-icon" />
                    <img className="brand-hover" src='/images/twitter_hover.png' alt="twitter-icon" />
                </a>
                <a className="rounx-footer-brand-icon" target="_blank" rel="noreferrer" href="https://www.linkedin.com/company/rounx">
                    <img className="brand-normal" src='/images/linkedin.png' alt="linkedin-icon" />
                    <img className="brand-hover" src='/images/linkedin_hover.png' alt="linkedin-icon" />
                </a>
            </Box>
        </Box >
    )
}
import React from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Box, Typography } from "@mui/material";
import Modal from '@mui/material/Modal';
import { useAppSelector } from "../../redux/hooks";
import { returnUrlByLang, useNavigate } from "../../routes/Router";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import useBreakpoint from "../../components/breakpoints/BreakpointProvider";
import './footer.css';

export default function Footer() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const { language } = useAppSelector(state => state.resources);

    const [open, setOpen] = React.useState(false);
    const { isDesktop, isMobile } = useBreakpoint();

    const isReplace = () => {
        let urls: any = [];
        [
            '',
            `/contact`,
            `/about`,
            `/help`,
            `/blog`,
            `/settings/personal`
        ].forEach(pageUrl => {
            urls = [...urls, ...returnUrlByLang(pageUrl)]
        })
        return !Boolean(urls.includes(location.pathname));
    }

    return (
        <Box className={`footer-container ${isMobile ? 'footer-container-mobile' : ''}`}>
            <Box className={`footer-left-content`}>
                <LanguageSwitcher />
                <Box className="nav-items-box">
                    {language === 'zh-CN' && isDesktop &&
                        <a
                            href="https://beian.miit.gov.cn/"
                            target="_blank"
                            style={{ wordWrap: 'break-word' }}
                            className="footer-items"
                            rel="noreferrer"
                        >
                            辽ICP备2021011574号
                        </a>
                    }
                    <Typography className="footer-items" onClick={() => {
                        navigate(`/privacy`, { replace: isReplace() })
                    }}>{t('footer-privacy-policy')}</Typography>
                    <Typography className="footer-items" onClick={() => {
                        navigate(`/terms`, { replace: isReplace() })
                    }}>{t('footer-terms-of-service')}</Typography>
                    <Typography className="footer-items">&copy; Rounx {new Date().getFullYear()}</Typography>
                </Box>
            </Box>
            <Box className={`footer-right-content ${isMobile ? 'footer-right-content-mobile' : ''}`}>
                <div className="footer-brand-icon">
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
                        className="qr-code-image"
                        alt="qrcode"
                        src="/images/rounx-qrcode.jpg"
                    />
                </Modal>
                <a className="footer-brand-icon" target="_blank" rel="noreferrer" href="https://weibo.com/rounx">
                    <img className="brand-normal" src='/images/weibo.png' alt="weibo-icon" />
                    <img className="brand-hover" src='/images/weibo_hover.png' alt="weibo-icon" />
                </a>
                <a className="footer-brand-icon" target="_blank" rel="noreferrer" href="https://twitter.com/rounxofficial">
                    <img className="brand-normal" src='/images/twitter.png' alt="twitter-icon" />
                    <img className="brand-hover" src='/images/twitter_hover.png' alt="twitter-icon" />
                </a>
                <a className="footer-brand-icon" target="_blank" rel="noreferrer" href="https://www.linkedin.com/company/rounx">
                    <img className="brand-normal" src='/images/linkedin.png' alt="linkedin-icon" />
                    <img className="brand-hover" src='/images/linkedin_hover.png' alt="linkedin-icon" />
                </a>
            </Box>
        </Box >
    )
}
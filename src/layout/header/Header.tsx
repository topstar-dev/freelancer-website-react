import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import UserMenu from "./UserMenu";
import { resetDefault } from "../../redux/auth/authSlice";
import { returnLangLabel, useNavigate } from "../../routes/Router";
import useBreakpoint from "../../components/breakpoints/BreakpointProvider";
import { languages } from '../../i18n/i18nextConf';
import './header.css';

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedPage, setSelectedPage] = useState(location.pathname);
    const { userInfo, success, message } = useAppSelector((state) => state.auth);

    const { t } = useTranslation();
    const { isMobile } = useBreakpoint();

    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setSelectedPage(location.pathname)
    }, [location])

    useEffect(() => {
        if (message) {
            enqueueSnackbar(t(message));
        }
        if (success && !userInfo) {
            dispatch(resetDefault())
        }
    }, [t, enqueueSnackbar, navigate, dispatch, userInfo, success, message])

    const pages: { name: string; url: string; }[] = [
        { name: t('header-help'), url: '/help' },
        { name: t('header-blog'), url: '/blog' },
        { name: t('header-contact-us'), url: '/contact' },
        { name: t('header-about-us'), url: '/about' }
    ];

    const userMenu = userInfo ? <UserMenu userInfo={userInfo} /> : ''

    const propsToPass = {
        pages: pages,
        userMenu: userMenu,
        selectedPage: selectedPage,
        setSelectedPage: (url: string) => {
            if (selectedPage !== url) {
                setSelectedPage(url)
                const replace = [
                    `/contact`,
                    `/about`,
                    `/help`,
                    `/blog`,
                    '/terms',
                    '/privacy'
                ].find(e => location.pathname.endsWith(e));
                navigate(`${url}`, {
                    replace:
                        Boolean(replace)
                        ||
                        (
                            url === '/'
                            &&
                            languages.map(lang => `/${returnLangLabel(lang)}`).includes(location.pathname)
                        )
                })
            }
        }
    }
    return (
        <Box className="header-wrapper">
            {isMobile ?
                <MobileHeader {...propsToPass} />
                :
                <DesktopHeader {...propsToPass} />
            }
        </Box >
    );
}

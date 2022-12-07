import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
import { useTranslation } from 'react-i18next';
import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import UserMenu from "./UserMenu";
import { resetDefault } from "../../redux/auth/authSlice";
import './header.css';
import { getBaseUrl } from "../../routes/Router";

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedPage, setSelectedPage] = useState(location.pathname);
    const { userInfo, success, message } = useAppSelector((state) => state.auth);

    const { t } = useTranslation();
    const isTabOrMobile = useMediaQuery({ query: '(max-width: 1000.99px)' });

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
                    `${getBaseUrl()}/contact`,
                    `${getBaseUrl()}/about`,
                    `${getBaseUrl()}/help`,
                    `${getBaseUrl()}/blog`
                ].includes(location.pathname)
                navigate(`${getBaseUrl()}${url}`, { replace })
            }
        }
    }
    return (
        <Box className="rounx-header-wrapper">
            {isTabOrMobile ?
                <MobileHeader {...propsToPass} />
                :
                <DesktopHeader {...propsToPass} />
            }
        </Box >
    );
}

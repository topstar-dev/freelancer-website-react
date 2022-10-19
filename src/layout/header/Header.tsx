import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
import { useTranslation } from 'react-i18next';
import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
    signOutUser
} from '../../redux/auth/authActions';
import UserMenu from "./UserMenu";
import { resetDefault } from "../../redux/auth/authSlice";
import './header.css';

export default function Header() {
    const navigate = useNavigate();
    const [selectedPage, setSelectedPage] = useState(window.location.pathname);
    const { userInfo, success, message } = useAppSelector((state) => state.auth);

    const { t } = useTranslation();
    const isTabOrMobile = useMediaQuery({ query: '(max-width: 900px)' });

    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();


    useEffect(() => {
        if (message) {
            enqueueSnackbar(message);
        }
        if (success && !userInfo) {
            dispatch(resetDefault())
            navigate('/sign-in');
        }
    }, [enqueueSnackbar, navigate, dispatch, userInfo, success, message])

    const signOut = () => {
        dispatch(signOutUser());
    }

    const pages: { name: string; url: string; }[] = [
        { name: t('header-help'), url: '/help' },
        { name: t('header-blog'), url: '/blog' },
        { name: t('header-contact-us'), url: '/contact' },
        { name: t('header-about-us'), url: '/about' }
    ];

    const userMenu = userInfo ? <UserMenu signOut={signOut} userInfo={userInfo} /> : '';

    const propsToPass = {
        pages: pages,
        userMenu: userMenu,
        selectedPage: selectedPage,
        setSelectedPage: (url: string) => {
            setSelectedPage(url)
            navigate(url)
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

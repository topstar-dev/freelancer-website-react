import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
import { useTranslation } from 'react-i18next';
import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import {
    isLoggedIn,
    user,
    signOutAsync,
    resetUserData
} from '../pages/auth/authSlice';
import UserMenu from "./UserMenu";

export default function Header() {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const alreadyLoggedIn = useAppSelector(isLoggedIn);
    const userData = useAppSelector(user);
    const isTabOrMobile = useMediaQuery({ query: '(max-width: 900px)' });

    useEffect(() => {
        if (!alreadyLoggedIn && userData.status === 200) {
            dispatch(resetUserData())
            navigate('/sign-in')
        } else if (userData.status === 401) {
            enqueueSnackbar(userData.message, { variant: 'error' })
        }
    }, [alreadyLoggedIn])
    const signOut = () => {
        dispatch(signOutAsync());
    }

    const pages: { name: string; url: string; }[] = [
        { name: t('header-help'), url: '/' },
        { name: t('header-blog'), url: '/' },
        { name: t('header-contact-us'), url: '/contact' },
        { name: t('header-about-us'), url: '/about' }
    ];

    const userMenu = alreadyLoggedIn ? <UserMenu signOut={signOut} /> : "";

    return (
        <Box sx={{ flexGrow: 1 }}>
            {isTabOrMobile ?
                <MobileHeader pages={pages} userMenu={userMenu} />
                :
                <DesktopHeader pages={pages} userMenu={userMenu} />
            }
        </Box >
    );
}

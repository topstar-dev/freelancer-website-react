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
    signOutUser
} from '../redux/auth/authActions';
import UserMenu from "./UserMenu";
import { resetDefault } from "../redux/auth/authSlice";

export default function Header() {
    const navigate = useNavigate();
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
        { name: t('header-help'), url: '/' },
        { name: t('header-blog'), url: '/' },
        { name: t('header-contact-us'), url: '/contact' },
        { name: t('header-about-us'), url: '/about' }
    ];

    const userMenu = userInfo ? <UserMenu signOut={signOut} userInfo={userInfo} /> : "";

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

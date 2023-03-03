import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import { Box } from '@mui/system';
import { Crisp } from "crisp-sdk-web";

import AuthGuard from "../pages/auth/AuthGuard";

import Footer from '../layout/footer/Footer';
import Header from '../layout/header/Header';
import useBreakpoint from '../components/breakpoints/BreakpointProvider';
import { returnUrlByLang } from './Router';

interface RoutesInterface {
    isHeader: boolean,
    protectedRoute: boolean
}
const CustomRouter = ({ isHeader, protectedRoute }: RoutesInterface) => {
    const { isDesktop } = useBreakpoint();
    const location = useLocation();

    useEffect(() => {
        document.documentElement.lang = localStorage.getItem('i18nextLng') || 'en';
    })

    useEffect(() => {
        try {
            if (Crisp.chat) {
                if (isHeader && [...returnUrlByLang('/'), ...returnUrlByLang('/zh-CN'), ...returnUrlByLang('/contact')].includes(location.pathname)) {
                    Crisp.chat.show()
                } else {
                    Crisp.chat.hide()
                }
            }
        } catch (err) { }
    }, [location.pathname, isHeader])

    const getContentHeight = () => {
        const headerHeight = !isHeader ? 0 : (isDesktop ? 72 : 73);
        const footerHeight = 0;
        return (headerHeight + footerHeight);
    }

    const content = <>
        {isHeader && <Header />}
        <Box style={{
            overflowY: 'auto',
            overflowX: 'hidden',
            position: 'relative',
            height: `calc(100% - ${getContentHeight()}px)`,
        }}>
            <Box style={{
                minHeight: `calc(100% - ${isDesktop ? 72 : 119}px`
            }}>
                <Outlet />
            </Box>
            <Footer />
        </Box>
    </>

    return protectedRoute ? <AuthGuard>{content}</AuthGuard> : content;
}

export default CustomRouter
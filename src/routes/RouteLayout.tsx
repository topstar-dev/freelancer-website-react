import { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from "react-responsive";
import { Box } from '@mui/system';

import TawkProvider from '../components/TawkProvider';
import AuthGuard from "../pages/auth/AuthGuard";

import Footer from '../layout/footer/Footer';
import Header from '../layout/header/Header';

interface RoutesInterface {
    isHeader: boolean,
    protectedRoute: boolean
}
const CustomRouter = ({ isHeader, protectedRoute }: RoutesInterface) => {
    const isWeb = useMediaQuery({ query: '(min-width: 1001px)' });

    useEffect(() => {
        document.documentElement.lang = localStorage.getItem('i18nextLng') || 'en';
    })

    const getContentHeight = () => {
        const headerHeight = !isHeader ? 0 : (isWeb ? 72 : 73);
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
                padding: isWeb ? '24px 16%' : '24px',
                minHeight: `calc(100% - ${isWeb ? 72 : 119}px`
            }}>
                <Outlet />
            </Box>
            <Footer />
        </Box>
        <TawkProvider isHeader={isHeader} />
    </>

    return protectedRoute ? <AuthGuard>{content}</AuthGuard> : content;
}

export default CustomRouter
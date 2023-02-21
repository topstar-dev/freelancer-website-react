import * as React from 'react';
import { useTranslation } from 'react-i18next';
import './notFound.css';
import { Typography } from "@mui/material";

export default function NotFound() {
    const { t } = useTranslation()
    React.useEffect(() => {
        document.title = t('title.error-page')
    })
    return (
        <div className='error-container'>
            <img alt="error-symbol" className='error-symbol' src="/images/rounx-symbol-black.png" height="100" />
            <Typography style={{ fontSize: '40px', fontWeight: 'bold', letterSpacing: 1, marginBottom: '64px', marginTop: '12px' }}>404</Typography>
        </div>
    )
}
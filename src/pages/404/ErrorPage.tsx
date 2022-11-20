import * as React from 'react';
import { useTranslation } from 'react-i18next';
import './errorPage.css';

export default function ErrorPage() {
    const { t } = useTranslation()
    React.useEffect(() => {
        document.title = t('title.error-page')
    })
    return (
        <div className='error-container'>
            <img alt="error-symbol" className='error-symbol' src="/images/rounx-symbol-black.png" height="100" />
            <h1>404</h1>
        </div>
    )
}
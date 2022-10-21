import * as React from 'react';
import { useTranslation } from 'react-i18next';

export default function ErrorPage() {
    const { t } = useTranslation()
    React.useEffect(() => {
        document.title = t('title.error-page')
    })
    return (
        <>
            <h1>404 - Page not found</h1>
        </>
    )
}
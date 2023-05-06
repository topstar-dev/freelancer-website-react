import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const WithTranslateFormErrors = ({ errors, touched, setFieldTouched, setFieldError, children }: any) => {
    const { i18n } = useTranslation();

    useEffect(() => {
        i18n.on('languageChanged', (lng: any) => {
            setTimeout(() => {
                Object.keys(errors).forEach(fieldName => {
                    if (Object.keys(touched).includes(fieldName)) {
                        setFieldTouched(fieldName, true, true);
                    }
                });
            }, 0);
        });
        return () => {
            i18n.off('languageChanged', (lng: any) => { });
        };
    }, [i18n, setFieldTouched, touched, errors]);
    return <>{children}</>;
};

export default WithTranslateFormErrors;
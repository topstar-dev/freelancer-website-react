import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

if (!localStorage.getItem('i18nextLng')) {
    localStorage.setItem('i18nextLng', 'en')
}

const DETECTION_OPTIONS = {
    order: ['localStorage', 'navigator'],
    caches: ['localStorage']
};

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        // fallbackLng: 'en',
        // lng: 'en',
        resources: {
            en: {
                translations: require('./en/translations.json')
            },
            'zh-CN': {
                translations: require('./cn/translations.json')
            }
        },
        detection: DETECTION_OPTIONS,
        ns: ['translations'],
        defaultNS: 'translations'
    });

i18n.languages = ['en', 'cn'];

export default i18n;
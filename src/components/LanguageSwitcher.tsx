import { Backdrop, CircularProgress, FormControl, MenuItem, Select } from '@mui/material';
import { Box } from '@mui/system';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import { eventTracker } from "../services/eventTracker";
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { personalSettingsUpdate } from '../redux/settings/settingsActions';
import { changeLanguage } from '../redux/resources/resourcesSlice';
import { getBaseUrl } from '../routes/Router';

const LanguageSwitcher = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar();
    const { i18n, t } = useTranslation();

    const [backdrop, setBackdrop] = React.useState(false);
    const { userInfo } = useAppSelector(state => state.auth);
    const { language } = useAppSelector(state => state.resources);

    const languageSet = React.useCallback(
        (lang: string) => {
            document.documentElement.lang = lang;
            eventTracker("Footer", "Language change", `Language changed from ${language} to ${lang}`)
            if (lang === 'zh-CN' && !location.pathname.includes(lang)) {
                navigate(`${lang}${location.pathname}`)
                if (location.pathname.includes('/settings/personal')) {
                    window.location.reload();
                }
            }
            if (lang === 'en' && location.pathname.includes('zh-CN')) {
                navigate(`${location.pathname.replace('/zh-CN', '')}`)
                if (location.pathname.includes('/settings/personal')) {
                    window.location.reload();
                }
            }
        }, [language, location.pathname, navigate])

    const changeLang: any = React.useCallback((event: any) => {
        const lang = event.target.value;
        if (userInfo) {
            setBackdrop(true);
            dispatch(personalSettingsUpdate({ language_code: lang })).then((res) => {
                enqueueSnackbar(res.payload.message);
                dispatch(changeLanguage(lang))
                languageSet(lang)
            }).catch((err: any) => {
                enqueueSnackbar(err.message);
            }).finally(() => {
                setBackdrop(false)
            })
        } else {
            dispatch(changeLanguage(lang))
            languageSet(lang)
        }
    }, [dispatch, enqueueSnackbar, languageSet, userInfo])

    React.useEffect(() => {
        if (language !== i18n.language) {
            i18n.changeLanguage(language);
            languageSet(language)
        }
    }, [i18n, language, languageSet])

    React.useEffect(() => {
        const baseUrl = getBaseUrl();
        const isCNUrl = location.pathname.includes('zh-CN')
        if (isCNUrl) {
            if (baseUrl !== '/zh-CN') {
                // changeLang({ target: { value: 'zh-CN' } })
            }
        } else {
            if (baseUrl === '/zh-CN') {
                // changeLang({ target: { value: 'en' } })
            }
        }
    }, [language, location.pathname, languageSet, changeLang]);

    return (
        <FormControl className="rounx-language-box">
            <Select
                id='rounx-language-switcher'
                sx={{ height: 20 }}
                className="rounx-language-select"
                labelId="language"
                value={language}
                label={t('language')}
                MenuProps={{
                    className: "rounx-language-menu"
                }}
                renderValue={(value) => {
                    return <Box
                        className="rounx-language-value"
                        id="language-button"
                    >
                        <LanguageIcon className="rounx-language-icon" />
                        {value === 'en' ? 'English' : '中文'}
                    </Box>
                }}
                onChange={changeLang}>
                <MenuItem value="en">
                    English
                </MenuItem>
                <MenuItem value="zh-CN">
                    中文
                </MenuItem>
            </Select>
            <Backdrop
                sx={{ color: '#fff', zIndex: 999 }}
                open={backdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </FormControl>
    )
}

export default LanguageSwitcher;
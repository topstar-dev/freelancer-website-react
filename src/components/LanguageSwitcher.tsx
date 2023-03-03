import { FormControl, MenuItem, Select } from '@mui/material';
import { Box } from '@mui/system';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import { eventTracker } from "../services/eventTracker";
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { personalSettingsUpdate } from '../redux/settings/settingsActions';
import { changeLanguage } from '../redux/resources/resourcesSlice';
import { useNavigate } from '../routes/Router';
import useBreakpoint from './breakpoints/BreakpointProvider';
import CustomBackdrop from './customBackdrop/CustomBackdrop';

const LanguageSwitcher = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar();
    const { i18n, t } = useTranslation();
    const { isMobile } = useBreakpoint();

    const [backdrop, setBackdrop] = React.useState(false);
    const [currentPath, setCurrentPath] = React.useState('');
    const { userInfo } = useAppSelector(state => state.auth);
    const { language } = useAppSelector(state => state.resources);

    const changeLang: any = React.useCallback((event: any) => {
        const lang = event.target.value;
        if (userInfo) {
            setBackdrop(true);
            dispatch(personalSettingsUpdate({ language_code: lang })).then((res) => {
                if (res.payload.success) {
                    dispatch(changeLanguage(lang))
                } else {
                    enqueueSnackbar(res.payload.message);
                }
            }).catch((err: any) => {
                enqueueSnackbar(err.message);
            }).finally(() => {
                setBackdrop(false)
            })
        } else {
            dispatch(changeLanguage(lang))
        }
    }, [dispatch, enqueueSnackbar, userInfo])

    const updateUrl = React.useCallback((lang: string) => {
        const currentUrl = location.pathname;
        if (lang !== 'en') {
            if (!currentUrl.startsWith(`/${lang}`)) {
                navigate(`${location.pathname}${location.search}`, { replace: true });
            }
        } else {
            if (currentUrl.startsWith('/zh-CN')) {
                const newLocation = `${currentUrl.replace('/zh-CN', '')}${location.search}`;
                navigate(newLocation, { replace: true })
            }
        }
    }, [location.pathname, location.search, navigate])

    React.useEffect(() => {
        if (language && i18n.language && i18n.language !== language) {
            document.documentElement.lang = language;
            eventTracker("Footer", "Language change", `Language changed from ${i18n.language} to ${language}`)
            i18n.changeLanguage(language).then(() => {
                updateUrl(language);
            })
        }
    }, [i18n, language, updateUrl])

    React.useEffect(() => {
        const currentUrl = location.pathname;
        if (currentPath !== currentUrl) {
            setCurrentPath(currentUrl);
            if (currentUrl.startsWith('/zh-CN') && language !== 'zh-CN') {
                changeLang({ target: { value: 'zh-CN' } })
            } else if (!currentUrl.startsWith('/zh-CN') && language === 'zh-CN') {
                changeLang({ target: { value: 'en' } })
            }
        }
    }, [i18n, currentPath, language, location.pathname, changeLang]);

    return (
        <FormControl className="language-box">
            <Select
                id='language-switcher'
                sx={{ height: 20 }}
                className="language-select"
                labelId="language"
                value={language}
                label={t('language')}
                MenuProps={{
                    className: `language-menu ${isMobile ? 'language-menu-mobile' : ''}`
                }}
                renderValue={(value) => {
                    return <Box
                        className="language-value"
                        id="language-button"
                    >
                        <LanguageIcon className="language-icon" />
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
            <CustomBackdrop loading={backdrop} />
        </FormControl>
    )
}

export default LanguageSwitcher;
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import {
    Box,
    Select,
    Typography,
    FormControl,
    InputLabel,
    MenuItem,
    List,
    ListItemButton,
    ListItemText
} from "@mui/material";
import "./settings.css";
import { normalizeUrl, returnUrlByLang, useNavigate } from "../../routes/Router";
import useBreakpoint from "../../components/breakpoints/BreakpointProvider";
import { useAppSelector } from "../../redux/hooks";
import { USER_TYPES } from "../../redux/constants";

export default function Settings(props: any) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const { isMobile } = useBreakpoint();
    const { userInfo } = useAppSelector(state => state.auth)
    const [url, setUrl] = React.useState(
        [...returnUrlByLang('/settings')].includes(location.pathname) ?
            '/settings/personal'
            :
            normalizeUrl(location.pathname)
    );

    React.useEffect(() => {
        window.onpopstate = e => {
            e.preventDefault();
            if ([
                ...returnUrlByLang(`/settings/security`),
                ...returnUrlByLang(`/settings/currency`),
                ...returnUrlByLang(`/settings/personal`)
            ].includes(location.pathname)) {
                setUrl('/settings/personal')
            }
        };
    })

    const handleChange = (path: string) => {
        if (url !== path) {
            setUrl(path);
            navigate(path, { replace: true });
        }
    };

    return (
        <Box className="container settings">
            <Box>
                <Typography fontSize='24px'>{t('user-settings')}</Typography>
                <br />
                <br />
            </Box>

            <Box sx={{
                display: 'flex',
                width: '100%',
                flexDirection: isMobile ? 'column' : 'row',
                gap: '20px'
            }}>
                {isMobile ?
                    <FormControl fullWidth>
                        <InputLabel id="settings-select-label">{t('user-settings')}</InputLabel>
                        <Select
                            value={normalizeUrl(url)}
                            label="Settings"
                            MenuProps={
                                { className: isMobile ? "setting-menu setting-menu-mobile" : "setting-menu" }
                            }
                            labelId="settings-select-label"
                            onChange={(e) => handleChange(e.target.value as string)}
                        >
                            <MenuItem value={`/settings/personal`}>{t('user-settings-personal')}</MenuItem>
                            <MenuItem value={`/settings/security`}>{t('user-settings-security')}</MenuItem>
                            {userInfo?.user_type !== USER_TYPES.CLIENT && <MenuItem value={`/settings/currency`}>{t('user-settings-currency')}</MenuItem>}
                        </Select>
                    </FormControl>
                    :
                    <Box sx={{ width: '284px' }}>
                        <List className="settings-list" sx={{ width: '100%', paddingRight: '20px' }}>
                            <ListItemButton
                                selected={returnUrlByLang(url).includes('/settings/personal')}
                                onClick={() => handleChange('/settings/personal')} >
                                <img className="settings-icon" alt="personal" src="/images/account.png" />
                                <img className="settings-icon-hover" alt="personal" src="/images/account-hover.png" />
                                <ListItemText style={{ paddingLeft: '10px' }} primary={t('user-settings-personal')} />
                            </ListItemButton>
                            <ListItemButton
                                selected={returnUrlByLang(url).includes('/settings/security')}
                                onClick={() => handleChange('/settings/security')}>
                                <img className="settings-icon" alt="personal" src="/images/security.png" />
                                <img className="settings-icon-hover" alt="personal" src="/images/security-hover.png" />
                                <ListItemText style={{ paddingLeft: '10px' }} primary={t('user-settings-security')} />
                            </ListItemButton>
                            {userInfo?.user_type !== USER_TYPES.CLIENT && <ListItemButton
                                selected={returnUrlByLang(url).includes('/settings/currency')}
                                onClick={() => handleChange('/settings/currency')}>
                                <img className="settings-icon" alt="personal" src="/images/currency.png" />
                                <img className="settings-icon-hover" alt="personal" src="/images/currency-hover.png" />
                                <ListItemText style={{ paddingLeft: '10px' }} primary={t('user-settings-currency')} />
                            </ListItemButton>}
                        </List>
                    </Box>
                }
                <Box sx={{
                    width: isMobile ? '100%' : 'calc(100% - 284px)',
                    border: '1px solid #0000003b',
                    borderRadius: '4px',
                    padding: '20px'
                }}>
                    {props.children}
                </Box>
            </Box>
        </Box >
    );
}

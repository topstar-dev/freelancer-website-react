import React from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MediaQuery, { useMediaQuery } from 'react-responsive';
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
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import PaidIcon from '@mui/icons-material/Paid';
import "./settings.css";

export default function Settings() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const isWeb = useMediaQuery({ query: '(min-width: 1081px)' });
    const [url, setUrl] = React.useState(location.pathname === '/settings' ? '/settings/personal' : location.pathname);

    const handleChange = (path: string) => {
        const { pathname } = location;
        setUrl(path);
        navigate(path, { replace: pathname.startsWith('/settings/') && !(pathname === '/settings/personal') ? true : false });
    };

    return (
        <Box className="rounx-settings">
            <Box>
                <Typography fontSize='24px'>{t('user-settings')}</Typography>
                <br />
                <br />
            </Box>

            <Box sx={{
                display: 'flex',
                width: '100%',
                flexDirection: isWeb ? 'row' : 'column',
                gap: '20px'
            }}>
                <MediaQuery maxWidth='1080px'>
                    <FormControl fullWidth>
                        <InputLabel id="settings-select-label">{t('user-settings')}</InputLabel>
                        <Select
                            value={url}
                            label="Settings"
                            MenuProps={
                                { className: "rounx-setting-menu" }
                            }
                            labelId="settings-select-label"
                            onChange={(e) => handleChange(e.target.value as string)}
                        >
                            <MenuItem value={'/settings/personal'}>{t('user-settings-personal')}</MenuItem>
                            <MenuItem value={'/settings/security'}>{t('user-settings-security')}</MenuItem>
                            <MenuItem value={'/settings/currency'}>{t('user-settings-currency')}</MenuItem>
                        </Select>
                    </FormControl>
                </MediaQuery>
                <MediaQuery minWidth='1081px'>
                    <Box sx={{ width: '284px' }}>
                        <List className="rounx-settings-list" sx={{ width: '100%', paddingRight: '20px' }}>
                            <ListItemButton
                                selected={url === '/settings/personal'}
                                onClick={() => handleChange('/settings/personal')} >
                                <PersonIcon className="rounx-settings-icon" />
                                <ListItemText style={{ paddingLeft: '10px' }} primary={t('user-settings-personal')} />
                            </ListItemButton>
                            <ListItemButton
                                selected={url === '/settings/security'}
                                onClick={() => handleChange('/settings/security')}>
                                <SecurityIcon className="rounx-settings-icon" />
                                <ListItemText style={{ paddingLeft: '10px' }} primary={t('user-settings-security')} />
                            </ListItemButton>
                            <ListItemButton
                                selected={url === '/settings/currency'}
                                onClick={() => handleChange('/settings/currency')}>
                                <PaidIcon className="rounx-settings-icon" />
                                <ListItemText style={{ paddingLeft: '10px' }} primary={t('user-settings-currency')} />
                            </ListItemButton>
                        </List>
                    </Box>
                </MediaQuery>
                <Box sx={{
                    width: isWeb ? 'calc(100% - 284px)' : '100%',
                    border: '1px solid #0000003b',
                    borderRadius: '4px',
                    padding: '20px'
                }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}

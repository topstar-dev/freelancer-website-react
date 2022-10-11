import React from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router-dom";
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

export default function Settings() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const isWeb = useMediaQuery({ query: '(min-width: 901px)' });
    const [url, setUrl] = React.useState(window.location.pathname);

    const handleChange = (path: string) => {
        setUrl(path);
        navigate(path);
    };

    return (
        <Box className="settings" style={{
            width: isWeb ? '900px' : '100%',
            padding: '15px',
            marginRight: 'auto',
            marginLeft: 'auto'
        }}>
            <Box style={{ padding: '20px' }}>
                <Typography fontSize='24px' variant='h6' mb={3}>{t('user-settings')}</Typography>
            </Box>
            <MediaQuery maxWidth='900px'>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{t('user-settings')}</InputLabel>
                    <Select
                        value={url}
                        label="Settings"
                        onChange={(e) => handleChange(e.target.value as string)}
                    >
                        <MenuItem value={'/settings/personal'}>{t('user-settings-personal')}</MenuItem>
                        <MenuItem value={'/settings/security'}>{t('user-settings-security')}</MenuItem>
                        <MenuItem value={'/settings/currency'}>{t('user-settings-currency')}</MenuItem>
                    </Select>
                </FormControl>
            </MediaQuery>
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                width: '100%',
                padding: isWeb ? '0' : '20px 0'
            }}>
                <MediaQuery minWidth='901px'>
                    <Box sx={{ width: '284px' }}>
                        <List sx={{ width: '100%', paddingRight: '20px' }}>
                            <ListItemButton
                                selected={url === '/settings/personal'}
                                onClick={() => handleChange('/settings/personal')} >
                                <PersonIcon />
                                <ListItemText style={{ paddingLeft: '10px' }} primary={t('user-settings-personal')} />
                            </ListItemButton>
                            <ListItemButton
                                selected={url === '/settings/security'}
                                onClick={() => handleChange('/settings/security')}>
                                <SecurityIcon />
                                <ListItemText style={{ paddingLeft: '10px' }} primary={t('user-settings-security')} />
                            </ListItemButton>
                            <ListItemButton
                                selected={url === '/settings/currency'}
                                onClick={() => handleChange('/settings/currency')}>
                                <PaidIcon />
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

import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { AppBar, Toolbar, Button, Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import UserMenu from './UserMenu';

export interface PropsInterface {
    pages: { name: string; url: string; }[],
    userMenu: React.ReactNode
}

export default function DesktopHeader({ pages, userMenu }: PropsInterface) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <AppBar sx={{ background: '#757575' }} position="static">
            <Toolbar sx={{ backgroundColor: "#ffffff" }}>
                <Box sx={{ flexGrow: 1, cursor: "pointer", display: 'flex' }}>
                    <img
                        src="/images/rounx-logo.png"
                        alt="Rounx admin"
                        width="140px"
                        height="40px"
                        onClick={() => navigate("/")}
                        style={{ margin: 'auto 20px auto 0px' }}
                    />
                    <Box sx={{ flexGrow: 1, display: 'flex' }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={() => navigate(`${page.url}`)}
                                sx={{ my: 2, mr: 1, color: '#000000', display: 'block', textTransform: 'none' }}>
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                </Box>
                <Box sx={{ display: 'flex-end' }}>
                    <TextField
                        style={{ height: '40px', verticalAlign: 'inherit' }}
                        placeholder={t('header-search-freelancers')}
                        InputProps={{ style: { height: 40, borderRadius: '20px' }, startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
                    />
                    {userMenu}
                </Box>
            </Toolbar>
        </AppBar>
    )
}
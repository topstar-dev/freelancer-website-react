import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { AppBar, Toolbar, List, Box, IconButton, TextField, InputAdornment, Divider } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import UserMenu from './UserMenu';
import { PropsInterface } from './DesktopHeader';

export default function MobileHeader({ pages, userMenu }: PropsInterface) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = React.useState<boolean>(false);

    return (
        <>
            <AppBar style={{ background: '#757575' }} position="static">
                <Toolbar sx={{ backgroundColor: "#ffffff" }}>
                    <Box style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <Box style={{ cursor: "pointer", display: 'flex', alignItems: 'center' }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                                onClick={() => setMenuOpen(!menuOpen)}
                            >
                                <MenuIcon style={{ color: "#757575" }} />
                            </IconButton>
                        </Box>
                        <Box style={{ display: 'flex', alignItems: 'center' }}>
                            <img
                                src="/images/rounx-symbol.png"
                                alt="Rounx user"
                                width="40px"
                                height="40px"
                                onClick={() => navigate("/")}
                            />
                        </Box>
                        {userMenu}
                    </Box>
                </Toolbar>
            </AppBar>
            {menuOpen && <Box style={{ backgroundColor: '#fff', height: '100vh', overflow: 'hidden' }}>
                <Divider />

                <TextField
                    style={{ padding: '10px 0' }}
                    fullWidth
                    placeholder={t('header-search-freelancers')}
                    InputProps={{ sx: { height: 40, borderRadius: '20px' }, startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
                />
                <Divider />
                <List style={{ color: '#000', padding: '15px' }}>
                    {pages.map((page) => (
                        <React.Fragment key={page.name}>
                            <ListItemButton
                            // selected={selectedIndex === index}
                            // onClick={() => infoClick(index, page.url)}
                            >
                                {page.name}
                            </ListItemButton>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            </Box>}
        </>
    )
}
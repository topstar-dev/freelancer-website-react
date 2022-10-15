import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Divider, IconButton, ListItemText, Menu, MenuItem, MenuList } from "@mui/material"
import AccountCircle from "@mui/icons-material/AccountCircle";
import { UserInterface } from '../redux/auth/authSlice';

interface UserMenuPropsInterface {
    signOut: Function,
    userInfo: UserInterface | null
}

export default function UserMenu({ signOut, userInfo }: UserMenuPropsInterface) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleMenu = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const settingsClick = () => {
        setAnchorEl(null);
        navigate('/settings/personal')
    }

    return (
        <>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                {userInfo?.avatar_url ?
                    <img src={userInfo?.avatar_url} alt="Rounx user" width="40" height="40" />
                    :
                    <AccountCircle style={{ width: "40px", height: "40px", color: '#757575' }} />
                }
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuList
                    sx={{ width: "250px", maxWidth: "100%" }}
                >
                    <ListItemText
                        sx={{
                            flexGrow: 1,
                            alignItems: "center",
                            textAlign: "center",
                        }}
                    >
                        {userInfo?.name}
                        <br />
                        {userInfo?.email}
                    </ListItemText>
                    <Divider />
                    <MenuItem style={{ padding: "15px" }}>
                        {t('header-user-submit-freelancer')}
                    </MenuItem>
                    <MenuItem style={{ padding: "15px" }}>
                        {t('header-user-profile')}
                    </MenuItem>
                    <MenuItem style={{ padding: "15px" }} onClick={settingsClick}>
                        {t('header-user-settings')}
                    </MenuItem>
                    <MenuItem style={{ padding: "15px" }} onClick={() => signOut()}>
                        {t('header-user-signout')}
                    </MenuItem>
                </MenuList>
            </Menu>
        </>
    )
}
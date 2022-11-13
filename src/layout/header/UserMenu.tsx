import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// import { useNavigate } from 'react-router-dom';
import { Divider, Menu, MenuItem, MenuList } from "@mui/material"
import AccountCircle from "@mui/icons-material/AccountCircle";
import { UserInterface } from '../../redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { signOutUser } from '../../redux/auth/authActions';

interface UserMenuPropsInterface {
    userInfo: UserInterface | null
}

export default function UserMenu({ userInfo }: UserMenuPropsInterface) {
    // const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { userAvatar } = useAppSelector(state => state.other);

    useEffect(() => {
    }, [userAvatar])

    const handleMenu = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const signOutMethod = () => {
        dispatch(signOutUser());
    }

    // const settingsClick = () => {
    //     setAnchorEl(null);
    //     navigate('/settings/personal')
    // }

    return (
        <>
            {userAvatar ?
                <img className='rounx-signin-handle' onClick={handleMenu} src={userAvatar} alt="Rounx user" />
                :
                <AccountCircle className='rounx-signin-handle' onClick={handleMenu} />
            }
            <Menu
                id="menu-appbar"
                className='rounx-user-menu-list'
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                keepMounted={false}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <div className='rounx-user-menu-info'>
                    <div className='user-name'>{userInfo?.name}</div>
                    <div className='user-email'>{userInfo?.email}</div>
                </div>
                <Divider />
                <MenuList sx={{ width: "270px", maxWidth: "100%", padding: 0 }}>
                    <MenuItem className='rounx-user-menu-items'>
                        {t('header-user-submit-freelancer')}
                    </MenuItem>
                    <MenuItem className='rounx-user-menu-items'>
                        {t('header-user-profile')}
                    </MenuItem>
                    <MenuItem className='rounx-user-menu-items'>
                        {t('header-user-settings')}
                    </MenuItem>
                    <MenuItem className='rounx-user-menu-items' onClick={() => signOutMethod()}>
                        {t('header-user-signout')}
                    </MenuItem>
                </MenuList>
            </Menu>
        </>
    )
}
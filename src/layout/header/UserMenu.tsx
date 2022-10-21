import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Divider, Menu, MenuItem, MenuList } from "@mui/material"
import AccountCircle from "@mui/icons-material/AccountCircle";
import { UserInterface } from '../../redux/auth/authSlice';
import { useAppDispatch } from '../../redux/hooks';
import { imageDownload } from '../../redux/other/otherActions';

interface UserMenuPropsInterface {
    signOut: Function,
    userInfo: UserInterface | null
}

export default function UserMenu({ signOut, userInfo }: UserMenuPropsInterface) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [userPic, setUserPic] = useState(null)

    useEffect(() => {
        if (userInfo?.avatar_url && !userPic) {
            dispatch(imageDownload({ functionType: 'USER_AVATAR', fileName: '/image/870461589e6dbdb2.png' })).then((res) => {
                if (res.payload.success) {
                    setUserPic(res.payload.file);
                }
            })
        }
    })

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
            {userPic ?
                <img className='rounx-signin-handle' onClick={handleMenu} src={URL.createObjectURL(userPic)} alt="Rounx user" />
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
                keepMounted
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
                    <MenuItem className='rounx-user-menu-items' onClick={settingsClick}>
                        {t('header-user-settings')}
                    </MenuItem>
                    <MenuItem className='rounx-user-menu-items' onClick={() => signOut()}>
                        {t('header-user-signout')}
                    </MenuItem>
                </MenuList>
            </Menu>
        </>
    )
}
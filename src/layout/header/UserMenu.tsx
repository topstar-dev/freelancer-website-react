import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// import { useNavigate } from 'react-router-dom';
import { Divider, Menu, MenuItem, MenuList } from "@mui/material"
import AccountCircle from "@mui/icons-material/AccountCircle";
import { updateUserInfo, UserInterface } from '../../redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { imageDownload } from '../../redux/other/otherActions';
import { refreshToken } from '../../redux/account/accountApi';
import axios from 'axios';

interface UserMenuPropsInterface {
    signOut: Function,
    userInfo: UserInterface | null
}

let source = axios.CancelToken.source();
export default function UserMenu({ signOut, userInfo }: UserMenuPropsInterface) {
    // const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { userAvatar, loading } = useAppSelector(state => state.other);

    useEffect(() => {
        if (userInfo?.avatar_url && !userAvatar && !loading) {
            dispatch(imageDownload({ functionType: 'USER_AVATAR', fileName: userInfo?.avatar_url }))
        }
    }, [dispatch, userInfo?.avatar_url, userAvatar, loading])

    const handleMenu = (event: any) => {
        source = axios.CancelToken.source();
        setAnchorEl(event.currentTarget);
        refreshToken(false, null, source).then((res) => {
            dispatch(updateUserInfo(res.data))
        })
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                    <MenuItem className='rounx-user-menu-items' onClick={() => {
                        if (source) {
                            source.cancel();
                        }
                        signOut()
                    }}>
                        {t('header-user-signout')}
                    </MenuItem>
                </MenuList>
            </Menu>
        </>
    )
}
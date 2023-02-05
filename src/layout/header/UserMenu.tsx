import React, { useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Backdrop, CircularProgress, Divider, Menu, MenuItem, MenuList } from "@mui/material"
import AccountCircle from "@mui/icons-material/AccountCircle";
import { updateUserInfo, UserInterface } from '../../redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAccountInfo, signOutUser } from '../../redux/auth/authActions';
import { imageDownload } from '../../redux/other/otherActions';
import { useNavigate } from '../../routes/Router';
import useBreakpoint from '../../components/breakpoints/BreakpointProvider';
import { getFreelancerApplicationAction } from '../../redux/freelancer/freelancerActions';
import { useSnackbar } from 'notistack';
import { getProfileAction } from '../../redux/profile/profileActions';
import { clearAvatar } from '../../redux/other/otherSlice';
import { setTokens } from '../../redux/account/accountApi';
import { changeLanguage } from '../../redux/resources/resourcesSlice';
import { languages } from '../../i18n/i18nextConf';
import { FUNCTION_TYPES } from '../../redux/constants';

interface UserMenuPropsInterface {
    userInfo: UserInterface | null
}

let source = axios.CancelToken.source();
export default function UserMenu({ userInfo }: UserMenuPropsInterface) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { isMobile } = useBreakpoint();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [backdrop, setBackdrop] = React.useState(false);
    const { userAvatar, loading } = useAppSelector(state => state.other);


    useEffect(() => {
        source = axios.CancelToken.source();
        if (userInfo && userInfo.avatar_file_name && !userAvatar && !loading) {
            dispatch(imageDownload({ functionType: FUNCTION_TYPES.USER_AVATAR, fileName: userInfo.avatar_file_name }))
        }
    }, [dispatch, userInfo, userAvatar, loading])

    const handleMenu = (event: any) => {
        dispatch(getAccountInfo(source.token)).then((res: any) => {
            if (res.payload && res.payload.success && userInfo) {
                const newUserData = { ...userInfo, ...res.payload.data };
                dispatch(updateUserInfo({ ...userInfo, ...res.payload.data }))
                setTokens(newUserData);
                const currentLang = `${localStorage.getItem('i18nextLng')}`;
                if (currentLang !== res.payload.data.language) {
                    dispatch(changeLanguage(languages.includes(res.payload.data.language) ? res.payload.data.language : 'en'))
                }
                if (userInfo.avatar_file_name !== newUserData.avatar_file_name) {
                    dispatch(clearAvatar());
                }
            }
        }).catch(err => {
            if (err) {
                enqueueSnackbar(err && err.payload.message)
            }
        })
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const freelancerApplicationClick = (pageUrl: string) => {
        setAnchorEl(null);
        setBackdrop(true);
        dispatch(getFreelancerApplicationAction()).then((res) => {
            if (res.payload && res.payload.success) {
                const status = res.payload.data.status;
                sessionStorage.setItem('freelancer-application-status', JSON.stringify(res.payload.data))
                if (['NO_APPLICATION'].includes(status)) {
                    dispatch(getProfileAction({ username: `${userInfo?.username}` })).then((res: any) => {
                        if (res.payload && res.payload.success) {
                            sessionStorage.setItem('freelancer-application-info', JSON.stringify(res.payload.data))
                            setBackdrop(false);
                            navigate(`${pageUrl.trim()}/skills`);
                        }
                    }).catch((err: any) => {
                        setBackdrop(false);
                    })
                } else {
                    setBackdrop(false);
                    navigate(`${pageUrl}/status`)
                }
            }
        }).catch((err) => {
            setBackdrop(false);
            if (err) {
                enqueueSnackbar(err && err.payload.message)
            }
        })
    }

    const userProfileClick = () => {
        navigate(`/${userInfo?.username}`)
    }

    const signOutMethod = () => {
        if (source) {
            source.cancel();
        }
        setAnchorEl(null);
        dispatch(signOutUser());
    }

    return (
        <>
            <div className='signin-handle' onClick={handleMenu}>
                {userAvatar ?
                    <img className='signin-handle-child' src={userAvatar} alt="Rounx user" />
                    :
                    <AccountCircle className='signin-handle-child' />
                }
            </div>
            <Menu
                id="menu-appbar"
                className={`user-menu-list ${isMobile ? 'user-menu-list-mobile' : ''}`}
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
                <div className='user-menu-info'>
                    <div className='user-name'>{userInfo?.name}</div>
                    <div className='user-email'>{userInfo?.email}</div>
                </div>
                <Divider />
                <MenuList sx={{ width: "270px", maxWidth: "100%", padding: 0 }}>
                    {userInfo && userInfo.user_type === 'FREELANCER' ?
                        <MenuItem className='user-menu-items' onClick={() => freelancerApplicationClick(`/apply-freelancer`)}>
                            {t('header-user-submit-freelancer')}
                        </MenuItem>
                        :
                        ('')
                    }
                    <MenuItem className='user-menu-items' onClick={() => {
                        setAnchorEl(null);
                        userProfileClick();
                    }}>
                        {t('header-user-profile')}
                    </MenuItem>
                    <MenuItem className='user-menu-items' onClick={() => {
                        setAnchorEl(null);
                        navigate(`/settings/personal`)
                    }}>
                        {t('header-user-settings')}
                    </MenuItem>
                    <MenuItem className='user-menu-items' onClick={() => signOutMethod()}>
                        {t('header-user-signout')}
                    </MenuItem>
                </MenuList>
            </Menu>
            <Backdrop
                className='only-backdrop'
                sx={{ color: '#fff', zIndex: 999 }}
                open={backdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}
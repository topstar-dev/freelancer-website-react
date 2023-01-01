import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Backdrop, CircularProgress, Divider, Menu, MenuItem, MenuList } from "@mui/material"
import AccountCircle from "@mui/icons-material/AccountCircle";
import { UserInterface } from '../../redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { signOutUser } from '../../redux/auth/authActions';
import { imageDownload } from '../../redux/other/otherActions';
import { useNavigate } from '../../routes/Router';
import useBreakpoint from '../../components/breakpoints/BreakpointProvider';
import { getFreelancerApplicationAction } from '../../redux/freelancer/freelancerActions';
import { useSnackbar } from 'notistack';

interface UserMenuPropsInterface {
    userInfo: UserInterface | null
}

export default function UserMenu({ userInfo }: UserMenuPropsInterface) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isMobile } = useBreakpoint();
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [backdrop, setBackdrop] = React.useState(false);
    const { userAvatar, loading } = useAppSelector(state => state.other);

    useEffect(() => {
        if (userInfo && userInfo.avatar_url && !userAvatar && !loading) {
            dispatch(imageDownload({ functionType: 'USER_AVATAR', fileName: userInfo.avatar_url }))
        }
    }, [dispatch, userInfo, userAvatar, loading])

    const handleMenu = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const signOutMethod = () => {
        dispatch(signOutUser());
    }

    const freelancerApplicationClick = (pageUrl: string) => {
        setAnchorEl(null);
        setBackdrop(true);
        dispatch(getFreelancerApplicationAction()).then((res) => {
            if (res.payload && res.payload.success) {
                const status = res.payload.data.status;
                sessionStorage.setItem('freelancer-application-status', JSON.stringify(res.payload.data))
                if (['NO_APPLICATION'].includes(status)) {
                    navigate(pageUrl);
                } else {
                    navigate(`${pageUrl}/status`)
                }
            }
        }).catch((err) => {
            if (err) {
                enqueueSnackbar(err && err.payload.message)
            }
        }).finally(() => {
            setBackdrop(false);
        })
    }

    return (
        <>
            <div className='rounx-signin-handle' onClick={handleMenu}>
                {userAvatar ?
                    <img className='rounx-signin-handle-child' src={userAvatar} alt="Rounx user" />
                    :
                    <AccountCircle className='rounx-signin-handle-child' />
                }
            </div>
            <Menu
                id="menu-appbar"
                className={`rounx-user-menu-list ${isMobile ? 'rounx-user-menu-list-mobile' : ''}`}
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
                    {userInfo && userInfo.user_type === 'FREELANCER' ?
                        <MenuItem className='rounx-user-menu-items' onClick={() => freelancerApplicationClick(`/apply-freelancer`)}>
                            {t('header-user-submit-freelancer')}
                        </MenuItem>
                        :
                        ('')
                    }
                    <MenuItem className='rounx-user-menu-items'>
                        {t('header-user-profile')}
                    </MenuItem>
                    <MenuItem className='rounx-user-menu-items' onClick={() => {
                        setAnchorEl(null);
                        navigate(`/settings/personal`)
                    }}>
                        {t('header-user-settings')}
                    </MenuItem>
                    <MenuItem className='rounx-user-menu-items' onClick={() => signOutMethod()}>
                        {t('header-user-signout')}
                    </MenuItem>
                </MenuList>
            </Menu>
            <Backdrop
                sx={{ color: '#fff', zIndex: 999 }}
                open={backdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}
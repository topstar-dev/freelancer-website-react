import { Backdrop, CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router-dom";
import { USER_TYPES } from "../../redux/constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { getProfileAction } from "../../redux/profile/profileActions";
import NotFound from "../error/NotFound";
import ClientProfile from "./ClientProfile";
import FreelancerProfile from "./FreelancerProfile";
import './profile.css'

export default function Profile(props: any) {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar()
    const { i18n } = useTranslation();
    const { language } = useAppSelector(state => state.resources);
    const { username } = useParams();

    const [profile, setProfile] = useState<any>(null);
    const [called, setCalled] = useState(false);
    const [backdrop, setBackdrop] = useState(false);
    const [errorPage, setErrorPage] = useState(false);

    useEffect(() => {
        if (!called) {
            setCalled(true);
            if (username) {
                setBackdrop(true)
                dispatch(getProfileAction({ username })).then((res: any) => {
                    const { payload } = res;
                    if (payload.success) {
                        document.title = `${payload.data.full_name} - Rounx`
                        setProfile(payload.data);
                    } else if (payload.error === "NOT_FOUND") {
                        setErrorPage(true);
                    } else {
                        enqueueSnackbar(payload.message)
                    }
                }).catch((err: any) => {
                    enqueueSnackbar(err.message)
                }).finally(() => {
                    setBackdrop(false)
                })
            }
        }
    }, [dispatch, enqueueSnackbar, called, username, errorPage])

    useEffect(() => {
        setErrorPage(false)
        setCalled(false);
    }, [location.pathname])

    useEffect(() => {
        if (language && i18n.language && i18n.language !== language) {
            setCalled(false)
        }
    }, [i18n, language])

    if (errorPage) {
        return <NotFound />
    }

    if (backdrop) {
        return <Backdrop
            className='only-backdrop'
            sx={{ color: '#fff', zIndex: 999 }}
            open={backdrop}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    }

    if (profile) {
        switch (profile.user_type) {
            case USER_TYPES.CLIENT:
                return <ClientProfile profile={profile} />
            case USER_TYPES.FREELANCER:
                return <FreelancerProfile profile={profile} />
            default:
                return <>Invalid user</>
        }
    } else {
        return <>No Data</>
    }
}
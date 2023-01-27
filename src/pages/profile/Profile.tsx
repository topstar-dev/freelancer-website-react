import { Backdrop, CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { USER_TYPES } from "../../redux/constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { getClientProfileAction, getFreelancerProfileAction } from "../../redux/profile/profileActions";
import ClientProfile from "./ClientProfile";
import FreelancerProfile from "./FreelancerProfile";
import './profile.css'

export default function Profile(props: any) {
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar()
    const { userInfo } = useAppSelector(state => state.auth);
    const { username } = useParams();

    const [profile, setProfile] = useState<any>(null);
    const [called, setCalled] = useState(false);
    const [backdrop, setBackdrop] = useState(false);

    useEffect(() => {
        if (!called) {
            setCalled(true);
            if (userInfo && userInfo.user_type && username) {
                setBackdrop(true)
                const getActionPromise = () => {
                    if (userInfo.user_type === USER_TYPES.CLIENT) {
                        return dispatch(getClientProfileAction({ username }))
                    } else {
                        return dispatch(getFreelancerProfileAction({ username }))
                    }
                }
                getActionPromise().then((res) => {
                    const { payload } = res;
                    if (payload.success) {
                        setProfile(payload.data);
                    }
                }).catch((err) => {
                    enqueueSnackbar(err.message)
                }).finally(() => {
                    setBackdrop(false)
                })
            }
        }
    }, [dispatch, enqueueSnackbar, called, userInfo, username])

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
        switch (userInfo?.user_type) {
            case USER_TYPES.CLIENT:
                return <ClientProfile profile={profile} />
            case USER_TYPES.FREELANCER:
                return <FreelancerProfile profile={profile} />
            default:
                return <>Invalid USER</>
        }
    } else {
        return <>No Data</>
    }
}
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import CustomBackdrop from "../../components/customBackdrop/CustomBackdrop";
import { USER_TYPES } from "../../redux/constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { getProfileAction } from "../../redux/profile/profileActions";
import NotFound from "../error/NotFound";
import ClientProfile from "./ClientProfile";
import FreelancerProfile from "./FreelancerProfile";
import './profile.css'

const ProfileContext = React.createContext<any>({
    updateProfileData: () => { }
})

export default function Profile(props: any) {
    const dispatch = useAppDispatch();
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
        setCalled(false)
    }, [username])

    useEffect(() => {
        const currentLang = i18n.language;
        if (language && currentLang && currentLang !== language) {
            setCalled(false)
        }
    }, [i18n, language])

    if (errorPage) {
        return <NotFound />
    }

    if (profile) {
        switch (profile.user_type) {
            case USER_TYPES.CLIENT:
                return <ProfileContext.Provider value={{
                    updateProfileData: (data: any) => {
                        setProfile({ ...profile, ...data });
                    }
                }}>
                    <ClientProfile profile={profile} />
                    <CustomBackdrop loading={backdrop} />
                </ProfileContext.Provider>
            case USER_TYPES.FREELANCER:
                return <ProfileContext.Provider value={{
                    updateProfileData: (data: any) => {
                        setProfile({ ...profile, ...data });
                    }
                }}>
                    <FreelancerProfile profile={profile} />
                    <CustomBackdrop loading={backdrop} />
                </ProfileContext.Provider>
            default:
                return <>Invalid user</>
        }
    } else {
        return <>No Data</>
    }
}

export const useProfileContext = () => {
    return React.useContext(ProfileContext);
}
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
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
    const { enqueueSnackbar } = useSnackbar();
    const { language } = useAppSelector(state => state.resources);
    const { username } = useParams();

    const [lang, setLang] = useState<any>('')
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
        if (language && lang !== language) {
            setLang(language);
            setCalled(false)
        }
    }, [lang, language])

    if (errorPage) {
        return <NotFound />
    }

    return (
        <>
            {
                profile ?
                    profile?.user_type === USER_TYPES.CLIENT ?
                        <ProfileContext.Provider value={{
                            updateProfileData: (data: any) => {
                                setProfile({ ...profile, ...data });
                            }
                        }}>
                            <ClientProfile profile={profile || {}} />
                        </ProfileContext.Provider>
                        :
                        <ProfileContext.Provider value={{
                            updateProfileData: (data: any) => {
                                setProfile({ ...profile, ...data });
                            }
                        }}>
                            <FreelancerProfile profile={profile || {}} />
                        </ProfileContext.Provider>
                    :
                    ''
            }
            <CustomBackdrop loading={backdrop} />
        </>
    )
}

export const useProfileContext = () => {
    return React.useContext(ProfileContext);
}
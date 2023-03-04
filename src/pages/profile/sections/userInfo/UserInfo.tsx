import { Avatar, Box } from "@mui/material";
import { useEffect, useState } from "react";
import VerifiedIcon from '@mui/icons-material/Verified';
import Card from '../../../../components/card/Card'
import { FUNCTION_TYPES, ONLINE_STATUS } from "../../../../redux/constants";
import { useAppDispatch } from "../../../../redux/hooks";
import { profileImageDownload } from "../../../../redux/profile/profileActions";
import EditUserInfo from "./EditUserInfo";
import PreviewUserInfoActions from "./previewUserInfoActions";

export default function UserInfo({
    full_name,
    first_name,
    last_name,
    username,
    avatar_file_name,
    profile_file_name,
    identity_status,
    currentProfile,
    online_status,
    ...rest
}: any) {
    const dispatch = useAppDispatch();
    const [currentAvatarImage, setCurrentAvatarImage] = useState<any>(null);
    const [userAvatar, setUserAvatar] = useState<any>(null);
    const [loadingAvatar, setLoadingAvatar] = useState(false);
    const [currentProfileImage, setCurrentProfileImage] = useState<any>(null);
    const [userProfile, setUserProfile] = useState<any>(null);
    const [loadingProfile, setLoadingProfile] = useState(false);

    useEffect(() => {
        if (avatar_file_name && !userAvatar && !loadingAvatar) {
            setLoadingAvatar(true)
            dispatch(profileImageDownload({ functionType: FUNCTION_TYPES.USER_AVATAR, fileName: avatar_file_name })).then((res: any) => {
                if (res.payload.success) {
                    setUserAvatar(URL.createObjectURL(res.payload.file))
                }
            }).catch(() => { })
                .finally(() => {
                    setLoadingAvatar(false);
                })
        }
    }, [dispatch, loadingAvatar, avatar_file_name, userAvatar])

    useEffect(() => {
        if (profile_file_name && !userProfile && !loadingProfile) {
            setLoadingProfile(true)
            dispatch(profileImageDownload({ functionType: FUNCTION_TYPES.USER_PROFILE, fileName: profile_file_name })).then((res: any) => {
                if (res.payload.success) {
                    setUserProfile(URL.createObjectURL(res.payload.file))
                }
            }).catch(() => { })
                .finally(() => {
                    setLoadingProfile(false);
                })
        }
    }, [dispatch, loadingProfile, profile_file_name, userProfile])

    useEffect(() => {
        if (avatar_file_name !== currentAvatarImage) {
            setCurrentAvatarImage(avatar_file_name)
            setUserAvatar(null);
        }
    }, [avatar_file_name, currentAvatarImage])

    useEffect(() => {
        if (profile_file_name !== currentProfileImage) {
            setCurrentProfileImage(profile_file_name)
            setUserProfile(null);
        }
    }, [profile_file_name, currentProfileImage])

    return (
        <Card className="userInfo-container container-width">
            <Box style={{ marginBottom: -28 }}>
                <Box className="userInfo-profile-image-box">
                    {userProfile ?
                        <img className='userInfo-profile-image' alt="profile_image" src={userProfile} />
                        :
                        <img className='userInfo-profile-image' alt="profile_image" src="/images/profile-placeholder.png" />
                    }
                </Box>
                <Box style={{ display: 'flex' }}>
                    <Box className="userInfo-avatar-image-box">
                        {userAvatar ?
                            <Avatar className='userInfo-avatar-image' alt="avatar_image" src={userAvatar} />
                            :
                            <Avatar className='userInfo-avatar-image' alt="avatar_image" src="/images/avatar-placeholder.png" />
                        }
                        {online_status === ONLINE_STATUS.ONLINE ?
                            <div className="online-status-dot"></div>
                            :
                            ""
                        }
                    </Box>
                    {currentProfile ?
                        <EditUserInfo
                            first_name={first_name}
                            last_name={last_name}
                            userAvatar={userAvatar}
                            userProfile={userProfile}
                            setUserAvatar={setUserAvatar}
                            setUserProfile={setUserProfile}
                            loadingAvatar={loadingAvatar}
                            loadingProfile={loadingProfile}
                        />
                        :
                        <PreviewUserInfoActions username={username} />
                    }
                </Box>
            </Box>
            <Box className="userInfo-user-details">
                <Box className="userInfo-user-name">
                    {full_name}
                    {identity_status === 'PASSED' && <VerifiedIcon className="userInfo-user-verified-icon" />}
                </Box>
                <Box className="userInfo-user-id">@{username}</Box>
            </Box>
        </Card>
    )
}
import { Avatar, Box } from "@mui/material";
import { useEffect } from "react";
import Card from '../../../components/card/Card'
import { FUNCTION_TYPES } from "../../../redux/constants";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { imageDownload } from "../../../redux/other/otherActions";

export default function UserInfo({
    full_name,
    username,
    avatar_file_name,
    profile_file_name,
    ...rest
}: any) {
    const dispatch = useAppDispatch();
    const { userAvatar, loading, userProfile, loadingProfile } = useAppSelector(state => state.other);

    useEffect(() => {
        if (avatar_file_name && !userAvatar && !loading) {
            dispatch(imageDownload({ functionType: FUNCTION_TYPES.USER_AVATAR, fileName: avatar_file_name, isCurrentAvatar: true }))
        }
    }, [dispatch, loading, avatar_file_name, userAvatar])

    useEffect(() => {
        if (profile_file_name && !userProfile && !loadingProfile) {
            dispatch(imageDownload({ functionType: FUNCTION_TYPES.USER_PROFILE, fileName: profile_file_name }))
        }
    }, [dispatch, loadingProfile, profile_file_name, userProfile])

    return (
        <Card className="userInfo-container container-width">
            <Box style={{ marginBottom: -24 }}>
                <Box className="userInfo-profile-image-box">
                    {userProfile ?
                        <img className='userInfo-profile-image' alt="profile_image" src={userProfile} />
                        :
                        <img className='userInfo-profile-image' alt="profile_image" src="/images/profile-placeholder.png" />
                    }
                </Box>
                <Box className="userInfo-avatar-image-box">
                    {userAvatar ?
                        <Avatar className='userInfo-avatar-image' alt="avatar_image" src={userAvatar} />
                        :
                        <Avatar className='userInfo-avatar-image' alt="profile_image" src="/images/avatar-placeholder.png" />
                    }
                </Box>
            </Box>
            <Box className="userInfo-user-details">
                <Box className="userInfo-user-name">{full_name}</Box>
                <Box className="userInfo-user-id">@{username}</Box>
            </Box>
        </Card>
    )
}
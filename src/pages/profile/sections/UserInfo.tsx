import { Avatar, Box } from "@mui/material";
import Card from '../../../components/card/Card'
import { useAppSelector } from "../../../redux/hooks";

export default function UserInfo() {
    const { userAvatar, userProfile } = useAppSelector(state => state.other)
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
                <Box className="userInfo-user-name">Perry lance</Box>
                <Box className="userInfo-user-id">@asdf</Box>
            </Box>
        </Card>
    )
}
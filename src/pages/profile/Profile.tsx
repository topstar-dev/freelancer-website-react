import { USER_TYPES } from "../../redux/constants";
import { useAppSelector } from "../../redux/hooks"
import ClientProfile from "./ClientProfile";
import FreelancerProfile from "./FreelancerProfile";
import './profile.css'

export default function Profile(props: any) {
    const { userInfo } = useAppSelector(state => state.auth);

    switch (userInfo?.user_type) {
        case USER_TYPES.CLIENT:
            return <ClientProfile />
        case USER_TYPES.FREELANCER:
            return <FreelancerProfile />
        default:
            return <>Invalid USER</>
    }
}
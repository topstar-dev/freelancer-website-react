import BasicInformation from "./sections/basicInformation/BasicInformation";
import JobFeedback from "./sections/jobFeedback/JobFeedback";
import { transformUBasicInformationData, transformUserInfoData } from "./transformers/sectionsTransformer";
import UserInfo from "./sections/userInfo/UserInfo";
import useBreakpoint from "../../components/breakpoints/BreakpointProvider";
import { useAppSelector } from "../../redux/hooks";

export default function ClientProfile({ profile }: any) {
    const { isDesktop } = useBreakpoint();
    const profileUserInfo = transformUserInfoData(profile);
    const basicInfo = transformUBasicInformationData(profile);

    const { userInfo } = useAppSelector(state => state.auth);

    const currentProfile = profileUserInfo.username === userInfo?.username;

    if (isDesktop) {
        return (
            <div className={'profile-layout-container'}>
                <div className="right-profile-section">
                    <JobFeedback username={profile.username} />
                </div>
                <div className="left-profile-section">
                    <UserInfo {...profileUserInfo} currentProfile={currentProfile} />
                    <BasicInformation {...basicInfo} currentProfile={currentProfile} />
                </div>
            </div>
        )
    }

    return (
        <div className={'profile-layout-container profile-layout-container-mobile'}>
            <div className="right-profile-section">
                <BasicInformation {...basicInfo} />
                <JobFeedback username={profile.username} />
            </div>
            <div className="left-profile-section">
                <UserInfo {...userInfo} />
            </div>
        </div>
    )
}
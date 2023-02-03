import BasicInformation from "./sections/BasicInformation";
import JobFeedback from "./sections/JobFeedback";
import { transformUBasicInformationData, transformUserInfoData } from "./transformers/sectionsTransformer";
import UserInfo from "./sections/UserInfo";
import useBreakpoint from "../../components/breakpoints/BreakpointProvider";

export default function ClientProfile({ profile }: any) {
    const { isDesktop } = useBreakpoint();
    const userInfo = transformUserInfoData(profile);
    const basicInfo = transformUBasicInformationData(profile);

    if (isDesktop) {
        return (
            <div className={'profile-layout-container'}>
                <div className="right-profile-section">
                    <JobFeedback username={profile.username} />
                </div>
                <div className="left-profile-section">
                    <UserInfo {...userInfo} />
                    <BasicInformation {...basicInfo} />
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
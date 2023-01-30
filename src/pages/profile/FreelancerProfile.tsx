import useBreakpoint from "../../components/breakpoints/BreakpointProvider";
import About from "./sections/About";
import BasicInformation from "./sections/BasicInformation";
import Educations from "./sections/Educations";
import Experiences from "./sections/Experiences";
import JobFeedback from "./sections/JobFeedback";
import Languages from "./sections/Languages";
import Skills from "./sections/Skills";
import UserInfo from "./sections/UserInfo";
import { transformUBasicInformationData, transformUserInfoData } from "./transformers/sectionsTransformer";

export default function FreelancerProfile({ profile }: any) {
    const { isDesktop } = useBreakpoint();
    const userInfo = transformUserInfoData(profile);
    const basicInfo = transformUBasicInformationData(profile);

    return (
        <div className={isDesktop ?
            'profile-layout-container'
            :
            'profile-layout-container profile-layout-container-mobile'
        }>
            <div className="right-profile-section">
                <About />
                <Skills />
                <Experiences />
                <Educations />
            </div>
            <div className="left-profile-section">
                <UserInfo {...userInfo} />
                <BasicInformation {...basicInfo} />
                <Languages languages={profile.languages} />
                <JobFeedback username={profile.username} />
            </div>
        </div>
    )
}
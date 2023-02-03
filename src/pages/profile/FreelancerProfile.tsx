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

    if (isDesktop) {
        return (
            <div className={'profile-layout-container'}>
                <div className="right-profile-section">
                    <About about={profile.about} />
                    <Skills skills={profile.skills} />
                    <Experiences experiences={profile.experiences} />
                    <Educations educations={profile.educations} />
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

    return (
        <div className={'profile-layout-container profile-layout-container-mobile'}>
            <div className="right-profile-section">
                <Languages languages={profile.languages} />
                <BasicInformation {...basicInfo} />
                <JobFeedback username={profile.username} />
            </div>
            <div className="left-profile-section">
                <UserInfo {...userInfo} />
                <About about={profile.about} />
                <Skills skills={profile.skills} />
                <Experiences experiences={profile.experiences} />
                <Educations educations={profile.educations} />
            </div>
        </div>
    )

}
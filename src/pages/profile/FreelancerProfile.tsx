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

    const isAboutDisplay = profile.about;
    const isSkillDisplay = profile.skills && profile.skills.length > 0;
    const isExperienceDisplay = profile.experiences && profile.experiences.length > 0;
    const isEducationDisplay = profile.educations && profile.educations.length > 0;
    const isLanguageDisplay = profile.languages && profile.languages.length > 0;

    if (isDesktop) {
        return (
            <div className={'profile-layout-container'}>
                <div className="right-profile-section">
                    {isAboutDisplay && <About about={profile.about} />}
                    {isSkillDisplay && <Skills skills={profile.skills} />}
                    {isExperienceDisplay && <Experiences experiences={profile.experiences} />}
                    {isEducationDisplay && <Educations educations={profile.educations} />}
                </div>
                <div className="left-profile-section">
                    <UserInfo {...userInfo} />
                    <BasicInformation {...basicInfo} />
                    {isLanguageDisplay && <Languages languages={profile.languages} />}
                    <JobFeedback username={profile.username} />
                </div>
            </div>
        )
    }

    return (
        <div className={'profile-layout-container profile-layout-container-mobile'}>
            <div className="right-profile-section">
                {isLanguageDisplay && <Languages languages={profile.languages} />}
                <BasicInformation {...basicInfo} />
                <JobFeedback username={profile.username} />
            </div>
            <div className="left-profile-section">
                <UserInfo {...userInfo} />
                {isAboutDisplay && <About about={profile.about} />}
                {isSkillDisplay && <Skills skills={profile.skills} />}
                {isExperienceDisplay && <Experiences experiences={profile.experiences} />}
                {isEducationDisplay && <Educations educations={profile.educations} />}
            </div>
        </div>
    )

}
import useBreakpoint from "../../components/breakpoints/BreakpointProvider";
import { useAppSelector } from "../../redux/hooks";
import About from "./sections/about/About";
import BasicInformation from "./sections/basicInformation/BasicInformation";
import Educations from "./sections/educations/Educations";
import Experiences from "./sections/experiences/Experiences";
import JobFeedback from "./sections/jobFeedback/JobFeedback";
import Languages from "./sections/languages/Languages";
import Skills from "./sections/skills/Skills";
import UserInfo from "./sections/userInfo/UserInfo";
import { transformUBasicInformationData, transformUserInfoData } from "./transformers/sectionsTransformer";

export default function FreelancerProfile({ profile }: any) {
    const { isDesktop } = useBreakpoint();
    const profileUserInfo = transformUserInfoData(profile);
    const basicInfo = transformUBasicInformationData(profile);
    const { userInfo } = useAppSelector(state => state.auth);

    const currentProfile = profileUserInfo.username === userInfo?.username;
    const isAboutDisplay = profile.about || currentProfile;
    const isSkillDisplay = (profile.skills && profile.skills.length > 0) || currentProfile;
    const isExperienceDisplay = (profile.experiences && profile.experiences.length > 0) || currentProfile;
    const isEducationDisplay = (profile.educations && profile.educations.length > 0) || currentProfile;
    const isLanguageDisplay = (profile.languages && profile.languages.length > 0) || currentProfile;

    if (isDesktop) {
        return (
            <div className={'profile-layout-container'}>
                <div className="right-profile-section">
                    {isAboutDisplay && <About about={profile.about} currentProfile={currentProfile} />}
                    {isSkillDisplay && <Skills skills={profile.skills} currentProfile={currentProfile} />}
                    {isExperienceDisplay && <Experiences experiences={profile.experiences} currentProfile={currentProfile} />}
                    {isEducationDisplay && <Educations educations={profile.educations} currentProfile={currentProfile} />}
                </div>
                <div className="left-profile-section">
                    <UserInfo {...profileUserInfo} currentProfile={currentProfile} />
                    <BasicInformation {...basicInfo} currentProfile={currentProfile} />
                    {isLanguageDisplay && <Languages languages={profile.languages} currentProfile={currentProfile} />}
                    <JobFeedback username={profile.username} />
                </div>
            </div>
        )
    }

    return (
        <div className={'profile-layout-container profile-layout-container-mobile'}>
            <div className="right-profile-section">
                {isLanguageDisplay && <Languages languages={profile.languages} currentProfile={currentProfile} />}
                <BasicInformation {...basicInfo} currentProfile={currentProfile} />
                <JobFeedback username={profile.username} />
            </div>
            <div className="left-profile-section">
                <UserInfo {...profileUserInfo} currentProfile={currentProfile} />
                {isAboutDisplay && <About about={profile.about} currentProfile={currentProfile} />}
                {isSkillDisplay && <Skills skills={profile.skills} currentProfile={currentProfile} />}
                {isExperienceDisplay && <Experiences experiences={profile.experiences} currentProfile={currentProfile} />}
                {isEducationDisplay && <Educations educations={profile.educations} currentProfile={currentProfile} />}
            </div>
        </div>
    )

}
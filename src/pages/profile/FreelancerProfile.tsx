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
    const userInfo = transformUserInfoData(profile);
    const basicInfo = transformUBasicInformationData(profile);

    return (
        <div style={{ display: 'flex', width: '100%', flexDirection: 'row-reverse', gap: 16 }}>
            <div style={{ display: 'flex', width: '50%', flexDirection: 'column', gap: 16 }}>
                <About />
                <Skills />
                <Experiences />
                <Educations />
            </div>
            <div style={{ display: 'flex', width: '50%', flexDirection: 'column', gap: 16 }}>
                <UserInfo {...userInfo} />
                <BasicInformation {...basicInfo} />
                <Languages languages={profile.languages} />
                <JobFeedback />
            </div>
        </div>
    )
}
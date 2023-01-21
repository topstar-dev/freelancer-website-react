import About from "./sections/About";
import BasicInformation from "./sections/BasicInformation";
import Educations from "./sections/Educations";
import Experiences from "./sections/Experiences";
import JobFeedback from "./sections/JobFeedback";
import Languages from "./sections/Languages";
import Skills from "./sections/Skills";
import UserInfo from "./sections/UserInfo";

export default function FreelancerProfile(props: any) {
    return (
        <div style={{ display: 'flex', width: '100%', flexDirection: 'row-reverse', gap: 16 }}>
            <div style={{ display: 'flex', width: '50%', flexDirection: 'column', gap: 16 }}>
                <About />
                <Skills />
                <Experiences />
                <Educations />
            </div>
            <div style={{ display: 'flex', width: '50%', flexDirection: 'column', gap: 16 }}>
                <UserInfo />
                <BasicInformation />
                <Languages />
                <JobFeedback />
            </div>
        </div>
    )
}
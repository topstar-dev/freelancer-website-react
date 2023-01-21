import BasicInformation from "./sections/BasicInformation";
import JobFeedback from "./sections/JobFeedback";
import UserInfo from "./sections/UserInfo";

export default function ClientProfile(props: any) {
    return (
        <div>
            <div>
                <UserInfo />
            </div>
            <div>
                <BasicInformation />
                <JobFeedback />
            </div>
        </div>
    )
}
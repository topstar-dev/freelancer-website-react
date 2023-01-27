import BasicInformation from "./sections/BasicInformation";
import JobFeedback from "./sections/JobFeedback";
import { transformUBasicInformationData, transformUserInfoData } from "./transformers/sectionsTransformer";
import UserInfo from "./sections/UserInfo";

export default function ClientProfile({ profile }: any) {
    const userInfo = transformUserInfoData(profile);
    const basicInfo = transformUBasicInformationData(profile);

    return (
        <div>
            <div>
                <UserInfo {...userInfo} />
            </div>
            <div>
                <BasicInformation {...basicInfo} />
                <JobFeedback />
            </div>
        </div>
    )
}
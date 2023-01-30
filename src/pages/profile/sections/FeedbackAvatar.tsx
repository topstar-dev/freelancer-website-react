import { useEffect, useState } from "react";
import { FUNCTION_TYPES } from "../../../redux/constants";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { addJobFeedbackAvatar } from "../../../redux/jobFeedback/jobFeedbackSlice";
import { imageDownload } from "../../../redux/other/otherActions";

const FeedbackAvatar = ({ avatar_file_name }: any) => {
    const dispatch = useAppDispatch();
    const { jobFeedbackAvatars } = useAppSelector(state => state.jobFeedback)
    const [called, setCalled] = useState(false);

    useEffect(() => {
        if (avatar_file_name && !jobFeedbackAvatars[avatar_file_name] && !called) {
            setCalled(true);
            dispatch(imageDownload({ functionType: FUNCTION_TYPES.USER_AVATAR, fileName: avatar_file_name })).then((res) => {
                if (res.payload.success) {
                    dispatch(addJobFeedbackAvatar({ imageName: avatar_file_name, image: URL.createObjectURL(res.payload.file) }))
                }
            }).catch(() => { })
        }
    }, [dispatch, called, avatar_file_name, jobFeedbackAvatars])

    if (!jobFeedbackAvatars[avatar_file_name]) {
        return <img className="feedback-avatar" alt="feedback_image" src="/images/avatar-placeholder.png" />
    }
    return <img className="feedback-avatar" alt="feedback_image" src={jobFeedbackAvatars[avatar_file_name]} />
}

export default FeedbackAvatar;
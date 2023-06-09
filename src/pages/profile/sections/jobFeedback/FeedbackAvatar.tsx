import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { FUNCTION_TYPES } from "../../../../redux/constants";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { feedbackImageDownload } from "../../../../redux/jobFeedback/jobFeedbackActions";

const FeedbackAvatar = ({ avatar_file_name }: any) => {
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { jobFeedbackAvatars } = useAppSelector(state => state.jobFeedback)
    const [called, setCalled] = useState(false);

    useEffect(() => {
        if (avatar_file_name && !jobFeedbackAvatars[avatar_file_name] && !called) {
            setCalled(true);
            dispatch(feedbackImageDownload({ functionType: FUNCTION_TYPES.USER_AVATAR, fileName: avatar_file_name })).then((res) => {
                if (!res.payload.success) {
                    enqueueSnackbar(res.payload.message)
                }
            }).catch((err) => {
                enqueueSnackbar(err.message)
            });
        }
    }, [dispatch, called, avatar_file_name, jobFeedbackAvatars, enqueueSnackbar])

    if (!jobFeedbackAvatars[avatar_file_name]) {
        return <img className="feedback-avatar" alt="feedback_image" src="/images/avatar-placeholder.png" />
    }
    return <img className="feedback-avatar" alt="feedback_image" src={jobFeedbackAvatars[avatar_file_name]} />
}

export default FeedbackAvatar;
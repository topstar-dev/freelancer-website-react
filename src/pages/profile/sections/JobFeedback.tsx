import { Avatar, CircularProgress, Divider, LinearProgress, Rating } from "@mui/material";
import { Box } from "@mui/system";
import StarIcon from '@mui/icons-material/Star';
import Card from "../../../components/card/Card";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getJobFeedbackAction } from "../../../redux/jobFeedback/jobFeedbackActions";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const reviewComments = [
    {
        name: "Perry Lance",
        rating: 4,
        date: new Date(),
        comment: "Delivered good work on this Node JS development project and I enjoyed working with him. His skills were reasonably strong. I enjoyed working with him."
    },
    {
        name: "Davide S.",
        rating: 5,
        date: new Date(),
        comment: "Delivered good work on this Node JS development project and I enjoyed working with him. His skills were reasonably strong. I enjoyed working with him."
    }
]

export default function JobFeedback({ username }: any) {
    const dispatch = useAppDispatch();

    const { t } = useTranslation();
    const { jobFeedbackData, loading } = useAppSelector(state => state.jobFeedback);
    const [called, setCalled] = useState(false);

    useEffect(() => {
        if (!called) {
            setCalled(true);
            dispatch(getJobFeedbackAction({ username }));
        }
    }, [dispatch, called, username])

    return (
        <Card className="jobFeedback-container container-width">
            <Box className="card-heading">{t('profile.job-feedback-title')}</Box>
            <Box className="progress-container">
                <Box className="progress-ratings">
                    <Box className="progress-value">
                        <span className="rating-number">5</span>
                        <LinearProgress variant="determinate" value={100} />
                    </Box>
                    <Box className="progress-value">
                        <span className="rating-number">4</span>
                        <LinearProgress variant="determinate" value={80} />
                    </Box>
                    <Box className="progress-value">
                        <span className="rating-number">3</span>
                        <LinearProgress variant="determinate" value={33} />
                    </Box>
                    <Box className="progress-value">
                        <span className="rating-number">2</span>
                        <LinearProgress variant="determinate" value={60} />
                    </Box>
                    <Box className="progress-value">
                        <span className="rating-number">1</span>
                        <LinearProgress variant="determinate" value={10} />
                    </Box>
                </Box>
                <Box className="progress-reviews">
                    <Box className="rating-rate">{jobFeedbackData?.records?.overall_rating}</Box>
                    <Box className="rating-box">
                        <Rating
                            readOnly
                            size="small"
                            name="rating"
                            value={jobFeedbackData?.records?.star_count || 0}
                            precision={1}
                            onChange={(event, newValue) => {
                            }}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                    </Box>
                    <Box>{jobFeedbackData?.records?.review_count || 0} {t('profile.job-feedback-reviews')}</Box>
                </Box>
            </Box>
            <Divider style={{ margin: '14px 0' }} />
            <Box>
                {reviewComments.map((review: any, index) => (
                    <Box className="review-list-container" key={index}>
                        <Box className="review-box">
                            <Box className="review-owner-avatar">
                                <Avatar />
                            </Box>
                            <Box>
                                <Box className="review-owner-name">{review.name}</Box>
                                <Box className="review-rating-date">
                                    <Rating
                                        readOnly
                                        size="small"
                                        name="rating"
                                        value={review.rating}
                                        precision={1}
                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                    />
                                    <span className="review-date">{dayjs(review.date).format('YYYY-MM-DD')}</span>
                                </Box>
                            </Box>
                        </Box>
                        <Box className="review-owner-comment">
                            {review.comment}
                        </Box>
                    </Box>
                ))}
            </Box>

            <Box className="circular-progress-loader">
                {loading ?
                    <CircularProgress size={26} />
                    :
                    <>
                        {t('profile.see-more')}
                        <ExpandMoreIcon className="expand-icon" />
                    </>
                }
            </Box>
        </Card>
    )
}
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Divider, LinearProgress, Rating } from "@mui/material";
import { Box } from "@mui/system";
import StarIcon from '@mui/icons-material/Star';
import { useTranslation } from "react-i18next";
import Card from "../../../components/card/Card";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getJobFeedbackAction } from "../../../redux/jobFeedback/jobFeedbackActions";
import FeedbackAvatar from "./FeedbackAvatar";
import SeeMore from "../../../components/seeMore/SeeMore";

export default function JobFeedback({ username }: any) {
    const dispatch = useAppDispatch();

    const { t } = useTranslation();
    const { jobFeedbackData, loading } = useAppSelector(state => state.jobFeedback);
    const [called, setCalled] = useState(false);
    const [pageIndex, setPageIndex] = useState(1)

    useEffect(() => {
        if (!called) {
            setCalled(true);
            dispatch(getJobFeedbackAction({ username, page_size: 10, page_index: pageIndex }));
        }
    }, [dispatch, called, username, pageIndex])

    const getRatingCounts = (rating_star: number) => {
        const ratingArr = jobFeedbackData?.records?.ratings;
        if (ratingArr?.length) {
            const star = ratingArr.find((e: any) => e.rating_star === rating_star);
            return star ? (star.count * 100) / (jobFeedbackData?.records?.review_count || 1) : 0;
        }
        return 0;
    }

    return (
        <Box>
            <Card className="see-more-container container-width">
                <Box className="card-heading">{t('profile.job-feedback-title')}</Box>
                <Box className="progress-container">
                    <Box className="progress-ratings">
                        <Box className="progress-value">
                            <span className="rating-number">5</span>
                            <LinearProgress variant="determinate" value={getRatingCounts(5)} />
                        </Box>
                        <Box className="progress-value">
                            <span className="rating-number">4</span>
                            <LinearProgress variant="determinate" value={getRatingCounts(4)} />
                        </Box>
                        <Box className="progress-value">
                            <span className="rating-number">3</span>
                            <LinearProgress variant="determinate" value={getRatingCounts(3)} />
                        </Box>
                        <Box className="progress-value">
                            <span className="rating-number">2</span>
                            <LinearProgress variant="determinate" value={getRatingCounts(2)} />
                        </Box>
                        <Box className="progress-value">
                            <span className="rating-number">1</span>
                            <LinearProgress variant="determinate" value={getRatingCounts(1)} />
                        </Box>
                    </Box>
                    <Box className="progress-reviews">
                        <Box className="rating-rate">{(jobFeedbackData?.records?.overall_rating)?.toPrecision(2)}</Box>
                        <Box className="rating-box">
                            <Rating
                                readOnly
                                size="small"
                                name="rating"
                                value={jobFeedbackData?.records?.overall_rating || 0}
                                precision={0.1}
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
                    {jobFeedbackData?.records?.job_feedbacks?.map((review: any, index: number) => (
                        <Box className="review-list-container" key={index}>
                            <Box className="review-box">
                                <Box className="review-owner-avatar">
                                    <FeedbackAvatar avatar_file_name={review.avatar_file_name ? review.avatar_file_name : ''} />
                                </Box>
                                <Box>
                                    <Box className="review-owner-name">{review.name}</Box>
                                    <Box className="review-rating-date">
                                        <Rating
                                            readOnly
                                            size="small"
                                            name="rating"
                                            value={review.rating_stars || 0}
                                            precision={1}
                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                        />
                                        <span className="review-date">{dayjs(review.review_time).format('YYYY-MM-DD')}</span>
                                    </Box>
                                </Box>
                            </Box>
                            <Box className="review-owner-comment">
                                {review.review_content}
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Card>
            <SeeMore
                loading={loading}
                currentLength={jobFeedbackData?.records?.job_feedbacks?.length}
                totalSize={jobFeedbackData?.total_size}
                onClick={() => {
                    dispatch(getJobFeedbackAction({ username, page_size: 10, page_index: pageIndex + 1 }));
                    setPageIndex(pageIndex + 1)
                }}
            />
        </Box>
    )
}
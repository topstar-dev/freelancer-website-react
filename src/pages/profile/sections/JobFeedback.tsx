import { Avatar, Divider, LinearProgress, Rating } from "@mui/material";
import { Box } from "@mui/system";
import StarIcon from '@mui/icons-material/Star';
import Card from "../../../components/card/Card";
import dayjs from "dayjs";

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

export default function JobFeedback() {
    return (
        <Card className="jobFeedback-container container-width">
            <Box className="card-heading">Job Feedback</Box>
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
                    <Box className="rating-rate">4.5</Box>
                    <Box className="rating-box">
                        <Rating
                            readOnly
                            size="small"
                            name="rating"
                            value={3}
                            precision={1}
                            onChange={(event, newValue) => {
                            }}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                    </Box>
                    <Box>58 Reviews</Box>
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
                                        onChange={(event, newValue) => {
                                        }}
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
        </Card>
    )
}
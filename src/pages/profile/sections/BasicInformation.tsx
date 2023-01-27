import { Box } from "@mui/system";
import Card from "../../../components/card/Card";

export default function BasicInformation({
    location,
    join_date
}: any) {
    return (
        <Card className="basicInfo-container container-width">
            <Box className="card-heading">Basic information</Box>
            <Box className="basicInfo-location" style={{ marginBottom: 10 }}>
                <span>Location:</span> {location}
            </Box>
            <Box className="basicInfo-joining-date">
                <span>Join date:</span> {join_date}
            </Box>
        </Card>
    )
}
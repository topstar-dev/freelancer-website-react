import { Box } from "@mui/system";
import Card from "../../../components/card/Card";

export default function BasicInformation() {
    return (
        <Card className="basicInfo-container container-width">
            <Box className="basicInfo-heading">Basic information</Box>
            <Box className="basicInfo-location">
                Location: <span>China - Liaoning - Dalian</span>
            </Box>
            <Box className="basicInfo-joining-date">
                Join date: <span>2020-03-06</span>
            </Box>
        </Card>
    )
}
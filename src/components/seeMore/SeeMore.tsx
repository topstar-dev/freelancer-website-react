import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from "react-i18next";
import './seeMore.css';
import Card from "../card/Card";

const SeeMore = ({
    loading,
    currentLength,
    totalSize,
    onClick
}: any) => {
    const { t } = useTranslation();

    return currentLength !== totalSize ?
        <Card className="circular-progress-loader">
            {loading ?
                <CircularProgress size={26} />
                :
                <Box style={{ display: 'flex', alignItems: 'center' }} onClick={onClick}>
                    {t('profile.see-more')}
                    <ExpandMoreIcon className="expand-icon" />
                </Box>
            }
        </Card>
        :
        <Card className="circular-progress-loader-empty"></Card>
}

export default SeeMore;
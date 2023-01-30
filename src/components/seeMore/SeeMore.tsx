import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from "react-i18next";
import Button from "../button/Button";
import './seeMore.css';

const SeeMore = ({
    loading,
    currentLength,
    totalSize,
    onClick
}: any) => {
    const { t } = useTranslation();

    return currentLength !== totalSize ?
        <Box className="circular-progress-loader">
            {loading ?
                <CircularProgress size={26} />
                :
                <Button variant="text" style={{ display: 'flex', alignItems: 'center' }} onClick={onClick}>
                    {t('profile.see-more')}
                    <ExpandMoreIcon className="expand-icon" />
                </Button>
            }
        </Box>
        :
        <></>
}

export default SeeMore;
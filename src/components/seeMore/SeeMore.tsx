import { ButtonBase, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from "react-i18next";
import Card from "../card/Card";
import './seeMore.css';

const SeeMore = ({
    loading,
    currentLength,
    totalSize,
    onClick
}: any) => {
    const { t } = useTranslation();

    return currentLength !== totalSize ?
        <ButtonBase className="see-more-base" style={{ width: '100%' }}>
            <Card className="circular-progress-loader" onClick={!loading ? onClick : () => { }}>
                {loading ?
                    <CircularProgress size={26} />
                    :
                    <Box className="see-more-text">
                        {t('profile.see-more')}
                        <ExpandMoreIcon className="expand-icon" />
                    </Box>
                }
            </Card>
        </ButtonBase>
        :
        <Card className="circular-progress-loader-empty"></Card>
}

export default SeeMore;
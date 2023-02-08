import { ButtonBase, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useTranslation } from "react-i18next";
import Card from "../card/Card";
import './seeMore.css';

const SeeMore = ({
    loading,
    currentLength,
    totalSize,
    onClick,
    onClickLess,
    showEmpltyOnLast,
    limit
}: any) => {
    const { t } = useTranslation();

    if (currentLength < totalSize) {
        return <ButtonBase className="see-more-base" style={{ width: '100%' }}>
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
    } else if (currentLength >= totalSize) {
        if (showEmpltyOnLast || totalSize === 0 || totalSize === limit) {
            return <Card className="circular-progress-loader-empty"></Card>
        }
        return <ButtonBase className="see-more-base" style={{ width: '100%' }}>
            <Card className="circular-progress-loader" onClick={!loading ? onClickLess : () => { }}>
                {loading ?
                    <CircularProgress size={26} />
                    :
                    <Box className="see-more-text">
                        {t('profile.see-less')}
                        <ExpandLessIcon className="expand-icon" />
                    </Box>
                }
            </Card>
        </ButtonBase>
    }
    return <Card className="circular-progress-loader-empty"></Card>
}

export default SeeMore;
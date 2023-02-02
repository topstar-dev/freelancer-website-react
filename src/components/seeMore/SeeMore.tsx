import { ButtonBase, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from "react-i18next";
import './seeMore.css';
import Card from "../card/Card";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";

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
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
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
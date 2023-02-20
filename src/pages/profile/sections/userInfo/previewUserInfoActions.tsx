import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ShareIcon from '@mui/icons-material/Share';
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

const PreviewUserInfoActions = () => {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

    return (<Box className="user-info-edit">
        <IconButton style={{ marginLeft: 'auto', paddingLeft: 6, paddingRight: 6 }}>
            <StarOutlineIcon style={{ fontSize: '29px' }} className="user-info-edit-icon" />
        </IconButton>
        <IconButton onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            enqueueSnackbar(t('profile.share-link-copied-to-clipboard'))
        }}>
            <ShareIcon className="user-info-edit-icon" />
        </IconButton>

    </Box>)
}

export default PreviewUserInfoActions;
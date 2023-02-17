import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import { Box } from '@mui/system';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

const EditUserInfo = () => {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

    return (<Box className="user-info-edit">
        <EditIcon
            className="user-info-edit-icon"
            style={{ marginLeft: 'auto' }}
        />
        <ShareIcon
            className="user-info-edit-icon"
            onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                enqueueSnackbar(t('profile.share-link-copied-to-clipboard'))
            }} />
    </Box>)
}

export default EditUserInfo;
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ShareIcon from '@mui/icons-material/Share';
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import CustomBackdrop from '../../../../components/customBackdrop/CustomBackdrop';

const PreviewUserInfoActions = ({ }: any) => {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

    const [backdrop, setBackdrop] = useState(false);

    return (<Box className="user-info-edit">
        <IconButton style={{ marginLeft: 'auto' }}>
            <StarBorderIcon className="user-info-edit-icon" />
        </IconButton>
        <IconButton onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            enqueueSnackbar(t('profile.share-link-copied-to-clipboard'))
        }}>
            <ShareIcon className="user-info-edit-icon" />
        </IconButton>

        <CustomBackdrop loading={backdrop} />
    </Box>)
}

export default PreviewUserInfoActions;
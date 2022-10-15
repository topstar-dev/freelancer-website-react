import * as React from 'react';
import { IconButton } from '@mui/material';
import { Close as IconClose } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

function SnackbarCloseButton({ snackbarKey }: any) {
    const { closeSnackbar } = useSnackbar();

    return (
        <IconButton onClick={() => closeSnackbar(snackbarKey)}>
            <IconClose />
        </IconButton>
    );
}

export default SnackbarCloseButton;
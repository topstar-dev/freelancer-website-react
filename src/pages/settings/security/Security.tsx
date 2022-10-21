import React from "react";
import { useTranslation } from "react-i18next";
import { TextField, Typography, Box } from "@mui/material";
import useSecurity from "./useSecurity";
import BlueButton from "../../../components/blueButton/BlueButton";

export default function Security() {
    const { t } = useTranslation();
    useSecurity();

    React.useEffect(() => {
        document.title = t('title.security')
    })

    return (
        <>
            <Box id="account email">
                <Typography fontSize='20px'>
                    {t('user-security-change-password')}
                </Typography>
                <Typography color='#757575' mt={1} fontSize='14px'>
                    {t('user-security-change-password-last-time')}: 2018-02-25
                </Typography>
                <br />
                <TextField fullWidth label={t('user-security-change-password-current')}></TextField>
                <br />
                <br />
                <TextField fullWidth label={t('user-security-change-password-new')}></TextField>
                <br />
                <br />
                <TextField fullWidth label={t('user-security-change-password-confirm')}></TextField >
                <br />
                <br />
                <BlueButton>{t('user-security-change-password-change-button')}</BlueButton>
            </Box >
            <br />
            <br />
            <Box id="birthday">
                <Typography fontSize='20px'>
                    {t('user-security-recovery-email')}
                </Typography>
                <br />
                <TextField
                    fullWidth
                    helperText={t('user-security-recovery-email-note')}
                    label={t('user-security-recovery-email')}
                ></TextField>
                <br />
                <br />
                <BlueButton sx={{ mr: 2 }}>{t('user-security-recovery-email-delete')}</BlueButton>
                <BlueButton>{t('user-security-recovery-email-change')}</BlueButton>
            </Box>
        </>
    )
}
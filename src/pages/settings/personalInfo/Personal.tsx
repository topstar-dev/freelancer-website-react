import React from "react";
import { TextField, Typography, Box } from "@mui/material";
import { BlueButton } from "../../commonStyle";
import { useTranslation } from "react-i18next";

export default function Personal() {
    const { t } = useTranslation();
    return (
        <>
            <Box id="account email">
                <Typography fontSize='20px'>
                    {t('user-personal-account-email')}
                </Typography>
                <br />
                <TextField
                    fullWidth
                    helperText={t('user-personal-account-email-note')}
                    label={t('user-personal-account-email')}
                >
                </TextField>
                <br />
                <br />
                <BlueButton>{t('user-personal-account-email-change-button')}</BlueButton>
            </Box>
            <br />
            <br />
            <Box id="birthday">
                <Typography fontSize='20px'>
                    {t('user-personal-account-birthday')}
                </Typography>
                <Typography color='#757575' mt={1} fontSize='14px'>
                    {t('user-personal-account-birthday-info')}
                </Typography>
                <br />
                <TextField
                    fullWidth
                    helperText={t('user-personal-account-birthday-note')}
                    label={t('user-personal-account-birthday')}
                ></TextField>
                <br />
                <br />
            </Box>
            <Box id="account email">
                <Typography fontSize='20px'>
                    {t('user-personal-account-gender')}
                </Typography>
                <Typography color='#757575' mt={1} fontSize='14px'>
                    {t('user-personal-account-gender-info')}
                </Typography>
                <br />
                <TextField
                    fullWidth
                    helperText={t('user-personal-account-gender-note')}
                    label={t('user-personal-account-gender')}
                ></TextField>
                <br />
                <br />
            </Box>
            <Box id="account email">
                <Typography fontSize='20px'>
                    {t('user-personal-account-language')}
                </Typography>
                <br />
                <TextField fullWidth label={t('user-personal-account-language')}></TextField>
                <br />
                <br />
                <BlueButton>{t('user-personal-account-save')}</BlueButton>
            </Box>
        </>
    )
}
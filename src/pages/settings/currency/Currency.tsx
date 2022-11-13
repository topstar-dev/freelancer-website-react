import React from "react";
import { useTranslation } from "react-i18next";
import { TextField, Typography } from "@mui/material";
import axios from 'axios';
import { useSnackbar } from "notistack";

export default function Currency() {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const [currency, setCurrency] = React.useState([]);

    const getCurrency = () => {
        const headers = {
            "Content-Type": "application/json",
            "Accept-Language": 'en',
            "device-type": 'WEB'
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/user/v1/settings/currency`, {
            headers: headers
        }).then((res) => {
            setCurrency(res.data);
            enqueueSnackbar(res.data.message, { variant: 'success' });
        }).catch((error) => {
            enqueueSnackbar(error.response.data.message, { variant: 'error' });
        });
    }

    React.useEffect(() => {
        document.title = t('title.currency')
    })

    React.useEffect(() => {
        getCurrency();
    });

    return (
        <>
            <Typography fontSize='20px'>
                {t('user-currency-title')}
            </Typography>
            <br />
            <TextField fullWidth label={currency[0]}></TextField>
        </>
    )
}
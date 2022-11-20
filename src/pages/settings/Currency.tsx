import React from "react";
import { useTranslation } from "react-i18next";
import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getCurrencyList } from "../../redux/resources/resourcesActions";
import { currencySettings, currencySettingsUpdate } from "../../redux/settings/settingsActions";

export default function Currency() {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();
    const { currencyData } = useAppSelector(state => state.resources)
    const { selectedCurrency } = useAppSelector(state => state.settings)

    const [currency, setCurrency] = React.useState(currencyData);
    const [called, setCalled] = React.useState(false);

    React.useEffect(() => {
        document.title = t('title.currency');
    })

    React.useEffect(() => {
        if (!called) {
            setCalled(true)
            dispatch(currencySettings());
            dispatch(getCurrencyList()).then((res) => {
                setCurrency(res.payload.data);
            }).then((err: any) => {
                enqueueSnackbar(err.payload.message)
            })
        }
    }, [called, dispatch, enqueueSnackbar]);

    return (
        <>
            <Typography fontSize='20px'>
                {t('user-currency-title')}
            </Typography>
            <br />
            <FormControl fullWidth>
                <InputLabel id="personal-currency">{selectedCurrency.currency_code}</InputLabel>
                <Select
                    fullWidth
                    labelId="personal-currency"
                    label={selectedCurrency.currency_code}
                    value={selectedCurrency.currency_code ? selectedCurrency.currency_code : ''}
                    onChange={(e) => {
                        dispatch(currencySettingsUpdate({ currency_code: e.target.value })).then((res) => {
                            dispatch(currencySettings());
                            enqueueSnackbar(res.payload.message);
                        }).catch((err) => {
                            enqueueSnackbar(err.payload.message);
                        })
                    }}
                >
                    {currency?.map((e: any, i: any) => (
                        <MenuItem key={i} value={e.currency_code}>{`${e.currency_symbol} ${e.currency_name} ${e.currency_code}`}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    )
}
import React from "react";
import { useTranslation } from "react-i18next";
import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getCurrencyList } from "../../redux/resources/resourcesActions";
import { currencySettings, currencySettingsUpdate } from "../../redux/settings/settingsActions";
import Button from "../../components/button/Button";

export default function Currency() {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();
    const { currencyData } = useAppSelector(state => state.resources);
    const { selectedCurrency } = useAppSelector(state => state.settings)

    const [selectedValue, setSelectedValue] = React.useState(selectedCurrency)
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
                {/* <InputLabel id="personal-currency">{selectedValue.currency_code}</InputLabel> */}
                <Select
                    fullWidth
                    labelId="personal-currency"
                    // label={selectedValue.currency_code}
                    value={selectedValue.currency_code ? selectedValue.currency_code : ''}
                    onChange={(e) => {
                        setSelectedValue(currency.find((c: any) => c.currency_code === e.target.value))
                    }}
                >
                    {currency?.map((e: any, i: any) => (
                        <MenuItem key={i} value={e.currency_code}>{e.currency_code}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <br />
            <br />
            <Button
                disabled={!selectedValue?.currency_code || selectedCurrency?.currency_code === selectedValue?.currency_code}
                onClick={() => {
                    dispatch(currencySettingsUpdate({ currency_code: selectedValue?.currency_code })).then((res) => {
                        dispatch(currencySettings());
                        enqueueSnackbar(res.payload.message);
                    }).catch((err) => {
                        enqueueSnackbar(err.payload.message);
                    })
                }}
            >
                {t('user-personal-account-save')}
            </Button>
        </>
    )
}
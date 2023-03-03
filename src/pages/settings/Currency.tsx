import React from "react";
import { useTranslation } from "react-i18next";
import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getCurrencyList } from "../../redux/resources/resourcesActions";
import { currencySettings, currencySettingsUpdate } from "../../redux/settings/settingsActions";
import Button from "../../components/button/Button";
import Form from "../../components/form/Form";
import useBreakpoint from "../../components/breakpoints/BreakpointProvider";
import CustomBackdrop from "../../components/customBackdrop/CustomBackdrop";

export default function Currency() {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();
    const { isMobile } = useBreakpoint();
    const { currencyData } = useAppSelector(state => state.resources);
    const { selectedCurrency, loading } = useAppSelector(state => state.settings)
    const [backdrop, setBackdrop] = React.useState(false);

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
                if (res.payload && res.payload.success) {
                    setCurrency(res.payload.data);
                }
            }).then((err: any) => {
                if (err) {
                    enqueueSnackbar(err && err.payload.message)
                }
            })
        }
    }, [called, dispatch, enqueueSnackbar]);

    return (
        <>
            <Typography fontSize='20px'>
                {t('user-currency-title')}
            </Typography>
            <br />
            <Form>
                <FormControl fullWidth>
                    <InputLabel id="personal-currency">{t('user-settings-currency')}</InputLabel>
                    <Select
                        fullWidth
                        labelId="personal-currency"
                        label={t('user-settings-currency')}
                        MenuProps={{
                            className: isMobile ? 'personal-select-menu personal-select-menu-mobile' : 'personal-select-menu'
                        }}
                        value={selectedValue?.currency_code || selectedCurrency?.currency_code || ''}
                        onChange={(e) => {
                            setSelectedValue(currency.find((c: any) => c.currency_code === e.target.value))
                        }}
                    >
                        {currency?.map((e: any, i: any) => (
                            <MenuItem key={i} value={e.currency_code}>{e.currency_code}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    variant="outlined"
                    style={{
                        width: 'fit-content',
                        marginTop: "10px"
                    }}
                    disabled={!selectedValue?.currency_code || selectedCurrency?.currency_code === selectedValue?.currency_code}
                    onClick={() => {
                        setBackdrop(true);
                        dispatch(currencySettingsUpdate({ currency_code: selectedValue?.currency_code })).then((res) => {
                            dispatch(currencySettings());
                            enqueueSnackbar(res.payload.message);
                        }).catch((err) => {
                            enqueueSnackbar(err.payload.message);
                        }).finally(() => {
                            setBackdrop(false);
                        })
                    }}
                >
                    {t('user-personal-account-save')}
                </Button>
            </Form >
            <CustomBackdrop loading={backdrop || loading} />
        </>
    )
}
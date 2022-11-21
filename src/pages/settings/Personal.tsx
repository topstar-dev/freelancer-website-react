import React from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField, Typography, Box, FormControl, Select, MenuItem, InputLabel, FormHelperText } from "@mui/material";
import Button from "../../components/button/Button";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { PersonalDataInterface, personalSettings, personalSettingsUpdate } from "../../redux/settings/settingsActions";

export default function Personal() {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { personal } = useAppSelector(state => state.settings)

    const [personalData, setPersonalData] = React.useState<PersonalDataInterface>(personal);
    const [called, setCalled] = React.useState(false)

    React.useEffect(() => {
        document.title = t('title.personal')
    })

    React.useEffect(() => {
        if (!called) {
            setCalled(true);
            dispatch(personalSettings()).then((res: any) => {
                setPersonalData(res.payload.data);
            }).catch((err: any) => {
                enqueueSnackbar(err.message);
            })
        }
    }, [dispatch, called, enqueueSnackbar])

    const changeData = (e: any, key: "birthday" | "language_code" | "gender" | "primary_email") => {
        const data = { ...personalData };
        console.log(data)
        data[key] = e.target.value;
        setPersonalData(data);
    }

    const submitEmail = () => {
        console.log(personal.primary_email, personalData.primary_email)
    }

    const updatePersonalData = () => {
        const { birthday, language_code, gender } = personalData;
        if (birthday !== personal.birthday ||
            language_code !== personal.language_code ||
            gender !== personal.gender) {
            dispatch(personalSettingsUpdate({ birthday, language_code, gender })).then((res) => {
                enqueueSnackbar(res.payload.message);
            }).catch((err: any) => {
                enqueueSnackbar(err.message);
                setPersonalData(personal);
            })
        }
    }

    return (
        <>
            <Box id="account email">
                <Typography fontSize='20px'>
                    {t('user-personal-account-email')}
                </Typography>
                <br />
                <TextField
                    fullWidth
                    type="text"
                    value={personalData?.primary_email ? personalData.primary_email : ''}
                    onChange={(e: any) => changeData(e, "primary_email")}
                    helperText={t('user-personal-account-email-note')}
                    label={t('user-personal-account-email')}
                >
                </TextField>
                <br />
                <br />
                <Button
                    disabled={personal?.primary_email === personalData?.primary_email}
                    onClick={submitEmail}
                >
                    {t('user-personal-account-email-change-button')}
                </Button>
            </Box>
            <br />
            <br />
            <Box id="birthday">
                <Typography fontSize='20px'>
                    {t('user-personal-account-birthday')}
                </Typography>
                <Typography color='#757575' mt={1} fontSize='15px'>
                    {t('user-personal-account-birthday-info')}
                </Typography>
                <br />
                <LocalizationProvider adapterLocale={`${localStorage.getItem('i18nextLng')}`.toLowerCase()} dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        label={t('birthday')}
                        inputFormat="YYYY-MM-DD"
                        value={personalData.birthday || null}
                        onChange={(e) => {
                        }}
                        maxDate={dayjs()}
                        renderInput={(params: any) => {
                            const newParams = {
                                ...params,
                                inputProps: {
                                    ...params.inputProps,
                                    placeholder: ''
                                }
                            }
                            return <TextField
                                fullWidth
                                {...newParams}
                                helperText={t('user-personal-account-birthday-note')}
                            />
                        }}
                    />
                </LocalizationProvider>
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
                <FormControl fullWidth>
                    <InputLabel id="personal-gender">{t('user-personal-account-gender')}</InputLabel>
                    <Select
                        fullWidth
                        labelId="personal-gender"
                        label={t('user-personal-account-gender')}
                        value={personalData.gender && personalData.gender !== "UNSPECIFIED" ? personalData.gender : ''}
                        onChange={(e) => {
                            changeData(e, "gender")
                        }}
                    >
                        <MenuItem value="MALE">Male</MenuItem>
                        <MenuItem value="FEMALE">Female</MenuItem>
                    </Select>
                    <FormHelperText>{t('user-personal-account-gender-note')}</FormHelperText>
                </FormControl>
                <br />
                <br />
            </Box>
            <Box id="account email">
                <Typography fontSize='20px'>
                    {t('user-personal-account-language')}
                </Typography>
                <br />
                <FormControl fullWidth>
                    <InputLabel id="personal-language">{t('user-personal-account-language')}</InputLabel>
                    <Select
                        fullWidth
                        labelId="personal-language"
                        label={t('user-personal-account-language')}
                        value={personalData.language_code ? personalData.language_code : ''}
                        onChange={(e) => {
                            changeData(e, "language_code")
                        }}
                    >
                        <MenuItem value="en">English</MenuItem>
                        <MenuItem value="zh-CN">中文</MenuItem>
                    </Select>
                </FormControl>
                <br />
                <br />
                <Button onClick={updatePersonalData}>{t('user-personal-account-save')}</Button>
            </Box>
        </>
    )
}
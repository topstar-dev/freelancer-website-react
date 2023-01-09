import React, { ReactNode, useCallback } from "react";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField, Typography, Box, FormControl, Select, MenuItem, InputLabel, FormHelperText, Dialog, DialogTitle, DialogContent, DialogActions, Backdrop, CircularProgress, InputAdornment, IconButton } from "@mui/material";
import Button from "../../components/button/Button";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { PersonalDataInterface, personalSettings, personalSettingsUpdate } from "../../redux/settings/settingsActions";
import Form from "../../components/form/Form";
import WithTranslateFormErrors from "../../services/validationScemaOnLangChange";
import { Formik } from "formik";
import { sendCodeToEmail } from "../../redux/auth/authActions";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ChangeEmailInterface, changePrimaryEmailAction } from "../../redux/account/accountActions";
import { changeLanguage } from "../../redux/resources/resourcesSlice";
import { getLanguageList } from "../../redux/resources/resourcesActions";
import { languages } from '../../i18n/i18nextConf';
import useBreakpoint from "../../components/breakpoints/BreakpointProvider";
import { useNavigate } from "../../routes/Router";
import { removeTokens } from "../../redux/account/accountApi";
import { updateUserInfo } from "../../redux/auth/authSlice";

export default function Personal() {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { isMobile } = useBreakpoint();
    const { personal, loading } = useAppSelector(state => state.settings)

    const [personalData, setPersonalData] = React.useState<PersonalDataInterface>(personal);
    const [backdrop, setBackdrop] = React.useState(false);
    const [called, setCalled] = React.useState(false);
    const [showEmailChangePassword, setShowEmailChangePassword] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [languageList, setLanguageList] = React.useState([]);

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

            dispatch(getLanguageList()).then((res) => {
                if (res.payload && res.payload.success) {
                    setLanguageList(res.payload.data.records);
                }
            }).catch((err: any) => {
                if (err) {
                    enqueueSnackbar(err && err.payload.message)
                }
            })
        }
    }, [dispatch, called, enqueueSnackbar])

    const changeData = useCallback((e: any, key: "birthday" | "language_code" | "gender" | "primary_email") => {
        const data = { ...personalData };
        data[key] = e.target.value;
        setPersonalData(data);
    }, [personalData])

    const updatePersonalData = useCallback(() => {
        const { birthday, language_code, gender } = personalData;
        if (dayjs(birthday).format('YYYY-MM-DD') !== personal.birthday ||
            language_code !== personal.language_code ||
            gender !== personal.gender) {

            if (language_code !== personal.language_code) {
                dispatch(changeLanguage(language_code && languages.includes(language_code) ? language_code : 'en'))
            }

            dispatch(personalSettingsUpdate({ birthday: dayjs(birthday).format('YYYY-MM-DD'), language_code, gender })).then((res) => {
                setCalled(false)
                enqueueSnackbar(res.payload.message);
            }).catch((err: any) => {
                enqueueSnackbar(err.message);
                setPersonalData(personal);
            })
        }
    }, [dispatch, enqueueSnackbar, personal, personalData])

    React.useEffect(() => {
        if (Object.keys(personal).length === 0) {
            setCalled(false)
        }
    }, [personal])

    return (
        <>
            <Box id="account email">
                <Typography fontSize='20px'>
                    {t('user-personal-account-email')}
                </Typography>
                <br />
                <Formik
                    initialValues={
                        {
                            new_email: personalData?.primary_email,
                            email_code: "",
                            password: ""
                        }
                    }
                    validationSchema={yup.object({
                        new_email: yup
                            .string()
                            .required(t('validation.email-required')),
                        email_code: yup
                            .string()
                            .required(t('validation.code-required')),
                        password: yup
                            .string()
                            .required(t('validation.set-password-required'))
                    })}
                    onSubmit={() => { }}
                >
                    {formik => (
                        <WithTranslateFormErrors {...formik}>
                            <Form>
                                <TextField
                                    fullWidth
                                    id="new_email"
                                    name="new_email"
                                    type="text"
                                    value={formik.values.new_email ? formik.values.new_email : (personalData?.primary_email || '')}
                                    onChange={formik.handleChange}
                                    label={t('user-personal-account-email')}
                                    error={formik.touched.new_email && Boolean(formik.errors.new_email)}
                                    helperText={(formik.touched.new_email && Boolean(formik.errors.new_email) ? formik.errors.new_email : t('user-personal-account-email-note')) as ReactNode}
                                >
                                </TextField>
                                <Button
                                    disabled={!formik.values.new_email || formik.values.new_email === personalData.primary_email}
                                    variant="outlined"
                                    style={{ width: 'fit-content', marginTop: '10px' }}
                                    onClick={() => {
                                        formik.validateForm().then((res: any) => {
                                            const { new_email } = res;
                                            if (new_email) {
                                                formik.setFieldTouched('new_email', true, true);
                                                formik.setFieldError('new_email', new_email);
                                            } else {
                                                if (!new_email && formik.values.new_email !== personalData.primary_email) {
                                                    const sendEmailCodeObj = {
                                                        email: formik.values.new_email as string,
                                                        function_type: "CHANGE_EMAIL"
                                                    }
                                                    setBackdrop(true);
                                                    dispatch(sendCodeToEmail(sendEmailCodeObj)).then((res: any) => {
                                                        const { payload } = res;
                                                        const { message, success } = payload;
                                                        enqueueSnackbar(message);
                                                        if (success) {
                                                            setOpen(true)
                                                        }
                                                        setBackdrop(false);
                                                    }).catch((err) => {
                                                        enqueueSnackbar(err.payload.message)
                                                    }).finally(() => {
                                                        setBackdrop(false);
                                                    })
                                                }
                                            }
                                        })
                                    }}
                                >
                                    {t('user-personal-account-email-change-button')}
                                </Button>
                                <Dialog
                                    open={open}
                                    onClose={() => setOpen(false)}
                                    maxWidth="lg"
                                    className="deleteEmailModal"
                                >
                                    <DialogTitle>Change email</DialogTitle>
                                    <DialogContent>
                                        <Form>
                                            <TextField
                                                fullWidth
                                                id="email_code"
                                                name="email_code"
                                                style={{ marginTop: 6 }}
                                                value={formik.values.email_code}
                                                onChange={formik.handleChange}
                                                label={t('code')}
                                                error={formik.touched.email_code && Boolean(formik.errors.email_code)}
                                                helperText={formik.touched.email_code && formik.errors.email_code as ReactNode}
                                            ></TextField>
                                            <TextField
                                                fullWidth
                                                id="password"
                                                name="password"
                                                style={{ marginBottom: 6 }}
                                                value={formik.values.password}
                                                label={t('signin-password')}
                                                type={showEmailChangePassword ? 'text' : 'password'}
                                                onChange={formik.handleChange}
                                                error={formik.touched.password && Boolean(formik.errors.password)}
                                                helperText={(formik.touched.password && formik.errors.password) as ReactNode}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={() => setShowEmailChangePassword(!showEmailChangePassword)}
                                                                edge="end"
                                                            >
                                                                {showEmailChangePassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            ></TextField>
                                            <DialogActions style={{ padding: 0, marginBottom: -6 }}>
                                                <Button variant="text" onClick={() => setOpen(false)}>{t('cancel')}</Button>
                                                <Button variant="text" style={{ marginLeft: 0 }} onClick={() => {
                                                    formik.validateForm().then((res: any) => {
                                                        const { password } = res;
                                                        if (password) {
                                                            formik.setFieldTouched('password', true, true);
                                                            formik.setFieldError('password', password);
                                                        } else {
                                                            setBackdrop(true);
                                                            const dataObj: ChangeEmailInterface = {
                                                                email_code: formik.values.email_code,
                                                                new_email: formik.values.new_email as string,
                                                                password: formik.values.password
                                                            }
                                                            dispatch(changePrimaryEmailAction(dataObj)).then((response: any) => {
                                                                const { payload } = response;
                                                                if (payload.success) {
                                                                    const message = `${payload.message}${t('please-re-sign-in')}`;
                                                                    enqueueSnackbar(message);
                                                                    navigate('/');
                                                                    dispatch(updateUserInfo(null));
                                                                    removeTokens();
                                                                    formik.resetForm();
                                                                } else {
                                                                    enqueueSnackbar(payload.message)
                                                                }
                                                            }).catch((err) => {
                                                                if (err && err.payload) {
                                                                    enqueueSnackbar(err.payload.message);
                                                                }
                                                            }).finally(() => {
                                                                formik.resetForm();
                                                                setBackdrop(false);
                                                                setOpen(false)
                                                            })
                                                        }
                                                    })
                                                }}>{t('confirm')}</Button>
                                            </DialogActions>
                                        </Form>
                                    </DialogContent>
                                </Dialog>
                            </Form>
                        </WithTranslateFormErrors>
                    )}
                </Formik>
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
                        value={personalData?.birthday || null}
                        onChange={(e) => {
                            changeData({ target: { value: e } }, 'birthday');
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
                        MenuProps={{
                            className: isMobile ? 'personal-select-menu personal-select-menu-mobile' : 'personal-select-menu'
                        }}
                        label={t('user-personal-account-gender')}
                        value={personalData?.gender ? personalData?.gender : ''}
                        onChange={(e) => {
                            changeData(e, "gender")
                        }}
                    >
                        <MenuItem value="UNSPECIFIED">{t('user-personal-account-gender-items.unspecified')}</MenuItem>
                        <MenuItem value="MALE">{t('user-personal-account-gender-items.male')}</MenuItem>
                        <MenuItem value="FEMALE">{t('user-personal-account-gender-items.female')}</MenuItem>
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
                <Form>

                    <FormControl fullWidth>
                        <InputLabel id="personal-language">{t('user-personal-account-language')}</InputLabel>
                        <Select
                            fullWidth
                            labelId="personal-language"
                            label={t('user-personal-account-language')}
                            MenuProps={{
                                className: isMobile ? 'personal-select-menu personal-select-menu-mobile' : 'personal-select-menu'
                            }}
                            value={personalData?.language_code ? personalData?.language_code : ''}
                            onChange={(e) => {
                                changeData(e, "language_code")
                            }}
                        >
                            {languageList.map((lang: any) => (
                                <MenuItem key={lang.language_code} value={lang.language_code}>{lang.language_name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        variant="outlined"
                        style={{
                            width: 'fit-content',
                            marginTop: '10px'
                        }}
                        disabled={(personalData?.birthday === personal?.birthday &&
                            personalData?.language_code === personal?.language_code &&
                            personalData?.gender === personal?.gender)
                        }
                        onClick={updatePersonalData}
                    >
                        {t('user-personal-account-save')}
                    </Button>
                </Form>
            </Box>
            <Backdrop
                sx={{ color: '#fff', zIndex: 999 }}
                open={backdrop || loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}
import React, { ReactNode } from "react";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { TextField, Typography, Box, InputAdornment, IconButton, Backdrop, CircularProgress } from "@mui/material";
import Button from "../../components/button/Button";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useSnackbar } from "notistack";
import { SecurityInterface, securitySettings } from "../../redux/settings/settingsActions";
import WithTranslateFormErrors from "../../services/validationScemaOnLangChange";
import { Formik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { changePasswordAction } from "../../redux/account/accountActions";

export default function Security() {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { security } = useAppSelector(state => state.settings)

    const [securityData, setSecurityData] = React.useState<SecurityInterface>(security);
    const [called, setCalled] = React.useState(false)
    const [backdrop, setBackdrop] = React.useState(false);
    const [showCurrentPassword, setCurrentShowPassword] = React.useState(false);
    const [showNewPassword, setNewShowPassword] = React.useState(false);

    React.useEffect(() => {
        document.title = t('title.security')
    })

    React.useEffect(() => {
        if (!called) {
            setCalled(true);
            dispatch(securitySettings()).then((res: any) => {
                console.log(res.payload)
                setSecurityData(res.payload.data);
            }).catch((err: any) => {
                enqueueSnackbar(err.message);
            })
        }
    }, [dispatch, called, enqueueSnackbar])

    const handleClickShowCurrentPassword = () => {
        setCurrentShowPassword(!showCurrentPassword);
    };

    const handleClickShowNewPassword = () => {
        setNewShowPassword(!showNewPassword);
    };

    const { password_change_time } = securityData;
    return (
        <>
            <Box id="account email">
                <Typography fontSize='20px'>
                    {t('user-security-change-password')}
                </Typography>
                <Typography color='#757575' mt={1} fontSize='14px'>
                    {t('user-security-change-password-last-time')}: {password_change_time ? password_change_time?.split('T')[0] : ''}
                </Typography>
                <br />
                <Formik
                    initialValues={
                        {
                            old_password: "",
                            new_password: "",
                            confirm_password: ""
                        }
                    }
                    validationSchema={yup.object({
                        old_password: yup
                            .string()
                            .required(t('validation.email-required')),
                        new_password: yup
                            .string()
                            .required(t('validation.set-password-required')),
                        confirm_password: yup
                            .string()
                            .required(t('validation.confirm-password-required'))
                            .min(8, t('validation.password-length'))
                            .when("new_password", {
                                is: (value: string) => (value && value.length > 0 ? true : false),
                                then: yup.string().oneOf([yup.ref("new_password")], t('validation.passwords-not-match')),
                            })
                    })}
                    onSubmit={() => { }}
                >
                    {formik => (
                        <WithTranslateFormErrors {...formik}>
                            <TextField
                                fullWidth
                                id="old_password"
                                name="old_password"
                                type={showCurrentPassword ? "text" : "password"}
                                value={formik.values.old_password}
                                onChange={formik.handleChange}
                                label={t('user-security-change-password-current')}
                                error={formik.touched.old_password && Boolean(formik.errors.old_password)}
                                helperText={(formik.touched.old_password && formik.errors.old_password) as ReactNode}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowCurrentPassword}
                                                edge="end"
                                            >
                                                {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <br />
                            <br />
                            <TextField
                                fullWidth
                                id="new_password"
                                name="new_password"
                                type={showNewPassword ? "text" : "password"}
                                value={formik.values.new_password || ''}
                                onChange={formik.handleChange}
                                label={t('user-security-change-password-new')}
                                error={formik.touched.new_password && Boolean(formik.errors.new_password)}
                                helperText={(formik.touched.new_password && Boolean(formik.errors.new_password) ? formik.errors.new_password : t('at_least_8_characters')) as ReactNode}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowNewPassword}
                                                edge="end"
                                            >
                                                {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <br />
                            <br />
                            <TextField
                                fullWidth
                                id="confirm_password"
                                name="confirm_password"
                                type={showNewPassword ? "text" : "password"}
                                value={formik.values.confirm_password || ''}
                                onChange={formik.handleChange}
                                label={t('user-security-change-password-confirm')}
                                error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                                helperText={(formik.touched.confirm_password && formik.errors.confirm_password) as ReactNode}
                            />
                            <br />
                            <br />
                            <Button
                                onClick={() => {
                                    formik.validateForm().then((res: any) => {
                                        const { old_password, new_password, confirm_password } = res;

                                        if (old_password) {
                                            formik.setFieldTouched('old_password', true, true);
                                            formik.setFieldError('old_password', old_password);
                                        }
                                        if (new_password) {
                                            formik.setFieldTouched('new_password', true, true);
                                            formik.setFieldError('new_password', new_password);
                                        }
                                        if (confirm_password) {
                                            formik.setFieldTouched('confirm_password', true, true);
                                            formik.setFieldError('confirm_password', confirm_password);
                                        }
                                        if (!(old_password || new_password || confirm_password)) {
                                            setBackdrop(true);
                                            dispatch(changePasswordAction({
                                                old_password: formik.values.old_password,
                                                new_password: formik.values.new_password
                                            })).then((response) => {
                                                const { payload } = response;
                                                if (payload.success) {
                                                    enqueueSnackbar(payload.message)
                                                    formik.resetForm();
                                                } else {
                                                    enqueueSnackbar(payload.message)
                                                }
                                            }).catch((err) => {
                                                enqueueSnackbar(err.payload.message)
                                            }).finally(() => {
                                                setBackdrop(false)
                                            })
                                        }
                                    })
                                }}
                            >
                                {t('user-security-change-password-change-button')}
                            </Button>
                        </WithTranslateFormErrors>
                    )}
                </Formik>
            </Box>
            <br />
            <br />
            <Backdrop
                sx={{ color: '#fff', zIndex: 999 }}
                open={backdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box id="birthday">
                <Typography fontSize='20px'>
                    {t('user-security-recovery-email')}
                </Typography>
                <br />
                <TextField
                    fullWidth
                    value={securityData.recovery_email || ''}
                    helperText={t('user-security-recovery-email-note')}
                    label={t('user-security-recovery-email')}
                ></TextField>
                <br />
                <br />
                <Button sx={{ mr: 2 }}>{t('user-security-recovery-email-delete')}</Button>
                <Button>{t('user-security-recovery-email-change')}</Button>
            </Box>
        </>
    )
}
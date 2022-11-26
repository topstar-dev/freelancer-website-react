import React, { ReactNode } from "react";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { TextField, Typography, Box, InputAdornment, IconButton, Backdrop, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Button from "../../components/button/Button";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useSnackbar } from "notistack";
import { SecurityInterface, securitySettings } from "../../redux/settings/settingsActions";
import WithTranslateFormErrors from "../../services/validationScemaOnLangChange";
import { Formik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { changePasswordAction, changeRecoveryEmailAction, ChangeRecoveryEmailInterface, deleteRecoveryEmailAction, DeleteRecoveryEmailInterface } from "../../redux/account/accountActions";
import Form from "../../components/form/Form";
import { sendCodeToEmail } from "../../redux/auth/authActions";

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
    const [showEmailChangePassword, setShowEmailChangePassword] = React.useState(false);
    const [changeEmail, setChangeEmail] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        document.title = t('title.security')
    })

    React.useEffect(() => {
        if (!called) {
            setCalled(true);
            dispatch(securitySettings()).then((res: any) => {
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

    const { password_change_time } = securityData || {};
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
                            <Form>
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
                                <Button
                                    style={{
                                        width: 'fit-content',
                                        marginTop: '10px'
                                    }}
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
                            </Form>
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
            <Box>
                <Typography fontSize='20px'>
                    {t('user-security-recovery-email')}
                </Typography>
                <br />
                <Formik
                    initialValues={
                        {
                            new_email: securityData.recovery_email,
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
                                    value={formik.values.new_email || securityData.recovery_email || ''}
                                    onChange={formik.handleChange}
                                    label={t('user-security-recovery-email')}
                                    error={formik.touched.new_email && Boolean(formik.errors.new_email)}
                                    helperText={formik.touched.new_email && formik.errors.new_email as ReactNode}
                                ></TextField>
                                {changeEmail && <>
                                    <TextField
                                        fullWidth
                                        id="email_code"
                                        name="email_code"
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
                                </>}
                                <Box style={{ display: 'flex', marginTop: '10px' }}>
                                    <Button
                                        sx={{ mr: 2 }}
                                        onClick={() => {
                                            if (formik.values.new_email && formik.values.new_email !== securityData?.recovery_email) {
                                                setOpen(true)
                                            }
                                        }}
                                    >
                                        {t('user-security-recovery-email-delete')}
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            formik.validateForm().then((res: any) => {
                                                if (changeEmail) {
                                                    const { email_code, password } = res;

                                                    if (email_code) {
                                                        formik.setFieldTouched('email_code', true, true);
                                                        formik.setFieldError('email_code', email_code);
                                                    }
                                                    if (password) {
                                                        formik.setFieldTouched('password', true, true);
                                                        formik.setFieldError('password', password);
                                                    }

                                                    if (!(email_code && password)) {
                                                        const dataObj: ChangeRecoveryEmailInterface = {
                                                            email_code: formik.values.email_code,
                                                            new_email: formik.values.new_email,
                                                            password: formik.values.password
                                                        }
                                                        setBackdrop(true);
                                                        dispatch(changeRecoveryEmailAction(dataObj)).then((response) => {
                                                            const { payload } = response;
                                                            if (payload.success) {
                                                                enqueueSnackbar(payload.message)
                                                                setChangeEmail(false);
                                                                formik.resetForm();
                                                                formik.setFieldValue('new_email', dataObj.new_email);
                                                            } else {
                                                                enqueueSnackbar(payload.message)
                                                            }
                                                        }).catch((err) => {

                                                        }).finally(() => {
                                                            setBackdrop(false);
                                                        })
                                                    }
                                                } else {
                                                    const { new_email } = res;
                                                    if (new_email) {
                                                        formik.setFieldTouched('new_email', true, true);
                                                        formik.setFieldError('new_email', new_email);
                                                    }

                                                    if (!new_email && formik.values.new_email !== securityData.recovery_email) {
                                                        const sendEmailCodeObj = {
                                                            email: formik.values.new_email,
                                                            function_type: "CHANGE_EMAIL"
                                                        }
                                                        setBackdrop(true);
                                                        dispatch(sendCodeToEmail(sendEmailCodeObj)).then((res: any) => {
                                                            const { payload } = res;
                                                            const { message, success } = payload;
                                                            enqueueSnackbar(message);
                                                            if (success) {
                                                                setChangeEmail(true)
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
                                        {changeEmail ?
                                            t('submit')
                                            :
                                            t('user-security-recovery-email-change')
                                        }
                                    </Button>
                                    <Dialog
                                        open={open}
                                        onClose={() => setOpen(false)}
                                        maxWidth="lg"
                                        className="deleteEmailModal"
                                    >
                                        <DialogTitle>Delete email</DialogTitle>
                                        <DialogContent>
                                            <Formik
                                                initialValues={{
                                                    password: ""
                                                }}
                                                validationSchema={yup.object({
                                                    password: yup
                                                        .string()
                                                        .required(t('validation.set-password-required'))
                                                })}
                                                onSubmit={() => { }}
                                            >
                                                {formik => (
                                                    <WithTranslateFormErrors {...formik}>
                                                        <Form style={{ padding: '5px 0' }}>
                                                            <TextField
                                                                fullWidth
                                                                id="password"
                                                                name="password"
                                                                value={formik.values.password}
                                                                label={t('user-security-change-password-current')}
                                                                type='password'
                                                                onChange={formik.handleChange}
                                                                error={formik.touched.password && Boolean(formik.errors.password)}
                                                                helperText={(formik.touched.password && formik.errors.password) as ReactNode}
                                                            ></TextField>
                                                            <DialogActions>
                                                                <Button variant="text" onClick={() => setOpen(false)}>Cancel</Button>
                                                                <Button variant="text" onClick={() => {
                                                                    formik.validateForm().then((res: any) => {
                                                                        const { password } = res;
                                                                        if (password) {
                                                                            formik.setFieldTouched('password', true, true);
                                                                            formik.setFieldError('password', password);
                                                                        } else {
                                                                            const deleteEmailCodeObj: DeleteRecoveryEmailInterface = {
                                                                                password: formik.values.password
                                                                            }
                                                                            setBackdrop(true);
                                                                            dispatch(deleteRecoveryEmailAction(deleteEmailCodeObj)).then((res: any) => {
                                                                                const { payload } = res;
                                                                                const { message } = payload;
                                                                                enqueueSnackbar(message);
                                                                            }).catch((err) => {
                                                                                enqueueSnackbar(err.payload.message)
                                                                            }).finally(() => {
                                                                                setOpen(false)
                                                                                setBackdrop(false);
                                                                            })
                                                                        }
                                                                    })
                                                                }}>Confirm</Button>
                                                            </DialogActions>
                                                        </Form>
                                                    </WithTranslateFormErrors>
                                                )}
                                            </Formik>
                                        </DialogContent>
                                    </Dialog>
                                </Box>
                            </Form>
                        </WithTranslateFormErrors>
                    )}
                </Formik>
            </Box>
        </>
    )
}
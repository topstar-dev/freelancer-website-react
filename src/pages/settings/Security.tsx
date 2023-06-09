import React, { ReactNode } from "react";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { TextField, Typography, Box, InputAdornment, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Button from "../../components/button/Button";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useSnackbar } from "notistack";
import { SecurityInterface, securitySettings } from "../../redux/settings/settingsActions";
import WithTranslateFormErrors from "../../services/validationScemaOnLangChange";
import { Formik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { changePasswordAction, changeRecoveryEmailAction, ChangeEmailInterface, deleteRecoveryEmailAction, DeleteRecoveryEmailInterface } from "../../redux/account/accountActions";
import Form from "../../components/form/Form";
import { sendCodeToEmail } from "../../redux/auth/authActions";
import { useNavigate } from "../../routes/Router";
import { removeTokens } from "../../redux/account/accountApi";
import { updateUserInfo } from "../../redux/auth/authSlice";
import CustomBackdrop from "../../components/customBackdrop/CustomBackdrop";

export default function Security() {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { security, loading } = useAppSelector(state => state.settings)

    const [securityData, setSecurityData] = React.useState<SecurityInterface>(security);
    const [called, setCalled] = React.useState(false)
    const [backdrop, setBackdrop] = React.useState(false);
    const [showNewPassword, setNewShowPassword] = React.useState(false);
    const [showEmailChangePassword, setShowEmailChangePassword] = React.useState(false);
    const [showEmailDeletePassword, setShowEmailDeletePassword] = React.useState(false);
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
                    enableReinitialize
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
                                    type="password"
                                    value={formik.values.old_password}
                                    onChange={formik.handleChange}
                                    label={t('user-security-change-password-current')}
                                    error={formik.touched.old_password && Boolean(formik.errors.old_password)}
                                    helperText={(formik.touched.old_password && formik.errors.old_password) as ReactNode}
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
                                    helperText={(formik.touched.new_password && formik.errors.new_password) as ReactNode}
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
                                    helperText={(formik.touched.confirm_password && Boolean(formik.errors.confirm_password) ? formik.errors.confirm_password : t('at_least_8_characters')) as ReactNode}
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
                                <Button
                                    variant="outlined"
                                    style={{
                                        width: 'fit-content',
                                        marginTop: '10px'
                                    }}
                                    disabled={!(formik.values.old_password && formik.values.new_password && formik.values.confirm_password)}
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

            <Box>
                <Typography fontSize='20px'>
                    {t('user-security-recovery-email')}
                </Typography>
                <br />
                <Formik
                    enableReinitialize
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
                                    value={formik.values.new_email || ''}
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
                                        variant="outlined"
                                        disabled={!securityData?.recovery_email}
                                        sx={{ mr: 2 }}
                                        onClick={() => {
                                            if (securityData?.recovery_email) {
                                                setOpen(true)
                                            }
                                        }}
                                    >
                                        {t('user-security-recovery-email-delete')}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        disabled={!formik.values.new_email || formik.values.new_email === securityData?.recovery_email}
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
                                                        const dataObj: ChangeEmailInterface = {
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
                                                                setSecurityData({ ...securityData, recovery_email: dataObj.new_email })
                                                            } else {
                                                                enqueueSnackbar(payload.message)
                                                            }
                                                        }).catch((err) => {
                                                            if (err && err.payload) {
                                                                enqueueSnackbar(err.payload.message);
                                                            }
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
                                        <DialogTitle>{t('user-security-recovery-email-delete')}</DialogTitle>
                                        <DialogContent>
                                            <Formik
                                                enableReinitialize
                                                initialValues={{
                                                    password: ""
                                                }}
                                                validationSchema={yup.object({
                                                    password: yup
                                                        .string()
                                                        .required(t('validation.password-required'))
                                                })}
                                                onSubmit={() => { }}
                                            >
                                                {formik2 => (
                                                    <WithTranslateFormErrors {...formik2}>
                                                        <Form>
                                                            <TextField
                                                                fullWidth
                                                                id="password"
                                                                name="password"
                                                                style={{ marginTop: 6, marginBottom: 6 }}
                                                                value={formik2.values.password}
                                                                label={t('user-security-change-password-current')}
                                                                type={showEmailDeletePassword ? 'text' : 'password'}
                                                                onChange={formik2.handleChange}
                                                                error={formik2.touched.password && Boolean(formik2.errors.password)}
                                                                helperText={(formik2.touched.password && formik2.errors.password) as ReactNode}
                                                                InputProps={{
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            <IconButton
                                                                                aria-label="toggle password visibility"
                                                                                onClick={() => setShowEmailDeletePassword(!showEmailDeletePassword)}
                                                                                edge="end"
                                                                            >
                                                                                {showEmailDeletePassword ? <VisibilityOff /> : <Visibility />}
                                                                            </IconButton>
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                            ></TextField>
                                                            <DialogActions style={{ padding: 0, marginBottom: -6 }}>
                                                                <Button
                                                                    variant="text"
                                                                    onClick={() => {
                                                                        formik2.setFieldValue('password', '')
                                                                        setOpen(false)
                                                                    }}>
                                                                    {t('cancel')}
                                                                </Button>
                                                                <Button
                                                                    variant="text"
                                                                    style={{ marginLeft: 0 }}
                                                                    onClick={() => {
                                                                        formik2.validateForm().then((res: any) => {
                                                                            const { password } = res;
                                                                            if (password) {
                                                                                formik2.setFieldTouched('password', true, true);
                                                                                formik2.setFieldError('password', password);
                                                                            } else {
                                                                                const deleteEmailCodeObj: DeleteRecoveryEmailInterface = {
                                                                                    password: formik2.values.password
                                                                                }
                                                                                setBackdrop(true);
                                                                                dispatch(deleteRecoveryEmailAction(deleteEmailCodeObj)).then((res: any) => {
                                                                                    const { payload } = res;
                                                                                    const { message, success } = payload;
                                                                                    enqueueSnackbar(message);
                                                                                    if (success) {
                                                                                        setSecurityData({ ...securityData, recovery_email: '' })
                                                                                        dispatch(securitySettings());
                                                                                    }
                                                                                }).catch((err) => {
                                                                                    enqueueSnackbar(err.payload.message)
                                                                                }).finally(() => {
                                                                                    formik2.resetForm();
                                                                                    formik.resetForm();
                                                                                    setOpen(false)
                                                                                    setBackdrop(false);
                                                                                })
                                                                            }
                                                                        })
                                                                    }}>{t('confirm')}</Button>
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

            <CustomBackdrop loading={backdrop || loading} />
        </>
    )
}
import React, { ReactNode, useEffect, useState } from "react";
import * as yup from "yup";
import {
    TextField,
    Typography,
    Box,
    Backdrop,
    CircularProgress
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useAppDispatch } from "../../../redux/hooks";
import { sendCodeToEmail } from "../../../redux/auth/authActions";
import { resetDefault } from "../../../redux/auth/authSlice";
import { useTranslation } from "react-i18next";
import Button from "../../../components/button/Button";
import Card from "../../../components/card/Card";
import { Formik } from "formik";
import WithTranslateFormErrors from "../../../services/validationScemaOnLangChange";
import { CustomForm } from "../../commonStyle";
import { useNavigate } from "react-router-dom";


export default function Email(mainProps: any) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();

    const [backdrop, setBackdrop] = React.useState(false);
    const signupEmail = sessionStorage.getItem('signup-email');
    const [formData] = useState(signupEmail ? JSON.parse(signupEmail) : {
        primary_email: "",
    });

    useEffect(() => {
        document.title = t('title.signup');
        sessionStorage.removeItem('ssignup-code')
    })

    return (
        <Card className={`rounx-auth-card`}>
            <Formik
                enableReinitialize
                initialValues={formData}
                validationSchema={yup.object({
                    primary_email: yup
                        .string()
                        .email(t('validation.email-valid'))
                        .required(t('validation.email-required')),
                })}
                onSubmit={(values) => { }}
            >
                {formik =>
                    <WithTranslateFormErrors {...formik}>
                        <CustomForm>
                            <img
                                src="/images/rounx-symbol.png"
                                alt="Rounx admin"
                                width="60px"
                                height="60px"
                                style={{ alignSelf: "center", cursor: "pointer" }}
                                onClick={() => navigate('/')}
                            />
                            <Typography className="rounx-account-title-info">
                                <span>{t("signup-email-header")}</span>
                                <br />
                                <span style={{ fontSize: '16px' }}>{t('enter_email')}</span>
                            </Typography>
                            <TextField
                                fullWidth
                                id="primary_email"
                                name="primary_email"
                                label={t('email')}
                                value={formik.values.primary_email}
                                onChange={formik.handleChange}
                                error={formik.touched.primary_email && Boolean(formik.errors.primary_email)}
                                helperText={(formik.touched.primary_email && Boolean(formik.errors.primary_email) ? formik.errors.primary_email : t('signup-email-helper')) as ReactNode}
                            />
                            <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button style={{ float: "right" }} onClick={() => {
                                    formik.validateForm().then((res: any) => {
                                        const { primary_email } = res;

                                        if (primary_email) {
                                            formik.setFieldTouched('primary_email', true, true);
                                            formik.setFieldError('primary_email', primary_email);
                                        }
                                        if (!primary_email) {
                                            const sendEmailCodeObj = {
                                                email: formik.values.primary_email,
                                                function_type: "SIGN_UP"
                                            }
                                            setBackdrop(true);
                                            dispatch(sendCodeToEmail(sendEmailCodeObj)).then((res: any) => {
                                                const { payload } = res;
                                                const { message, success } = payload;
                                                enqueueSnackbar(message);
                                                if (success) {
                                                    dispatch(resetDefault());
                                                    sessionStorage.setItem('signup-email', JSON.stringify(formik.values))
                                                    navigate('/sign-up/code')
                                                }
                                                setBackdrop(false);
                                            }).catch((err) => {
                                                setBackdrop(false);
                                                enqueueSnackbar("Error occured");
                                            })
                                        }
                                    })
                                }}>
                                    {t('next')}
                                </Button>
                            </Box>
                        </CustomForm >
                    </WithTranslateFormErrors>
                }
            </Formik>
            <Backdrop
                sx={{ color: '#fff', zIndex: 999 }}
                open={backdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Card>
    );
}

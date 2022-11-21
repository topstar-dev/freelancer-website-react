import React, { ReactNode, useEffect, useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
    TextField,
    Typography,
    Box,
    Backdrop,
    CircularProgress,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useAppDispatch } from "../../../redux/hooks";
import { signInUser, signUpUser } from "../../../redux/auth/authActions";
import { resetDefault } from "../../../redux/auth/authSlice";
import Button from "../../../components/button/Button";
import { Formik } from "formik";
import Card from "../../../components/card/Card";
import WithTranslateFormErrors from "../../../services/validationScemaOnLangChange";
import Form from "../../../components/form/Form";
import '../auth.css';

export default function Code(mainProps: any) {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [backdrop, setBackdrop] = React.useState(false);
    const signupCode = sessionStorage.getItem('signup-info') ? JSON.parse(`${sessionStorage.getItem('signup-info')}`) : {};
    const [formData] = useState({
        email_code: "",
    });

    useEffect(() => {
        document.title = t('title.signup');
    })

    return (
        <Card className={`rounx-auth-card`}>
            <Formik
                enableReinitialize
                initialValues={formData}
                validationSchema={yup.object({
                    email_code: yup
                        .number()
                        .required(t('validation.code-required')),
                })}
                onSubmit={(values) => { }}
            >
                {formik =>
                    <WithTranslateFormErrors {...formik}>
                        <Form>
                            <img
                                src="/images/rounx-symbol.png"
                                alt="Rounx admin"
                                width="60px"
                                height="60px"
                                style={{ alignSelf: "center", cursor: "pointer" }}
                                onClick={() => navigate('/')}
                            />
                            <Typography className="rounx-account-title-info">
                                {t('signup-code-title')}
                                <br />
                                <span style={{
                                    alignSelf: 'center',
                                    fontWeight: 'bold',
                                    fontSize: '16px'
                                }}>{signupCode.primary_email}</span>
                            </Typography>
                            <TextField
                                fullWidth
                                id="email_code"
                                name="email_code"
                                label={t('code')}
                                value={formik.values.email_code}
                                onChange={formik.handleChange}
                                error={formik.touched.email_code && Boolean(formik.errors.email_code)}
                                helperText={(formik.touched.email_code && formik.errors.email_code) as ReactNode}
                            />
                            <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button style={{ float: "right" }} onClick={() => {
                                    formik.validateForm().then((res: any) => {
                                        const { email_code } = res;

                                        if (email_code) {
                                            formik.setFieldTouched('email_code', true, true);
                                            formik.setFieldError('email_code', email_code);
                                        }

                                        if (!email_code) {
                                            const { values } = formik;
                                            const { email_code } = values;
                                            const signupInfo = JSON.parse(`${sessionStorage.getItem('signup-info')}`);

                                            const signUpData = {
                                                user_type: signupInfo.type as 'CLIENT' | 'FREELANCER',
                                                first_name: signupInfo.first_name,
                                                last_name: signupInfo.last_name,
                                                birthday: signupInfo.birthday,
                                                country_id: signupInfo.country_id,
                                                password: signupInfo.confirm_password,
                                                primary_email: signupInfo.primary_email,
                                                email_code
                                            }

                                            setBackdrop(true);
                                            dispatch(signUpUser(signUpData)).then((res: any) => {
                                                const { payload } = res;
                                                const { success, message } = payload;
                                                enqueueSnackbar(message);
                                                if (success) {
                                                    dispatch(resetDefault());
                                                    sessionStorage.removeItem('signup-info')
                                                    dispatch(signInUser({ email: signUpData.primary_email, password: signUpData.password })).then((res) => {
                                                        enqueueSnackbar(res.payload.message);
                                                        dispatch(resetDefault())
                                                        navigate('/');
                                                    }).catch((_err) => {

                                                    })
                                                }
                                                setBackdrop(false);
                                            }).catch((err) => {
                                                setBackdrop(false);
                                                enqueueSnackbar("Error occured");
                                            })
                                        }
                                    })
                                }}>
                                    {t('submit')}
                                </Button>
                            </Box>
                        </Form >
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

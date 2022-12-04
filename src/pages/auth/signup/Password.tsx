import React, { ReactNode, useEffect, useState } from "react";
import * as yup from "yup";
import { useTranslation } from 'react-i18next';
import {
    TextField,
    Typography,
    InputAdornment,
    IconButton,
    Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Button from "../../../components/button/Button";
import { Formik } from "formik";
import Card from "../../../components/card/Card";
import WithTranslateFormErrors from "../../../services/validationScemaOnLangChange";
import Form from "../../../components/form/Form";
import { useNavigate } from "react-router-dom";
import '../auth.css';
import { getBaseUrl } from "../../Router";

export default function Password(mainProps: any) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const signupPassword = sessionStorage.getItem('signup-info') ? JSON.parse(`${sessionStorage.getItem('signup-info')}`) : {};
    const [formData] = useState({
        set_password: signupPassword.set_password || "",
        confirm_password: signupPassword.confirm_password || "",
    });
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        document.title = t('title.signup');
        if (signupPassword) {
            const temp = { ...signupPassword };
            delete temp['primary_email'];
            delete temp['email_code'];
            sessionStorage.setItem('signup-info', JSON.stringify(temp))
        }
    })

    return (
        <Card className={`rounx-auth-card`}>
            <Formik
                enableReinitialize
                initialValues={formData}
                validationSchema={yup.object({
                    set_password: yup
                        .string()
                        .required(t('validation.set-password-required')),
                    confirm_password: yup
                        .string()
                        .required(t('validation.confirm-password-required'))
                        .min(8, t('validation.password-length'))
                        .when("set_password", {
                            is: (value: string) => (value && value.length > 0 ? true : false),
                            then: yup.string().oneOf([yup.ref("set_password")], t('validation.passwords-not-match')),
                        })
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
                                onClick={() => navigate(`${getBaseUrl()}/`)}
                            />
                            <Typography className="rounx-account-title-info">
                                {t('signup-password-title')}
                            </Typography>
                            <TextField
                                fullWidth
                                id="set_password"
                                name="set_password"
                                label={t('set-password')}
                                type={showPassword ? "text" : "password"}
                                value={formik.values.set_password}
                                onChange={formik.handleChange}
                                error={formik.touched.set_password && Boolean(formik.errors.set_password)}
                                helperText={(formik.touched.set_password && Boolean(formik.errors.set_password) ? formik.errors.set_password : t('at_least_8_characters')) as ReactNode}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                fullWidth
                                id="confirm_password"
                                name="confirm_password"
                                type={showPassword ? "text" : "password"}
                                label={t('confirm-password')}
                                value={formik.values.confirm_password}
                                onChange={formik.handleChange}
                                error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                                helperText={(formik.touched.confirm_password && formik.errors.confirm_password) as ReactNode}
                            />
                            <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button onClick={() => {
                                    formik.validateForm().then((res: any) => {
                                        const { set_password, confirm_password } = res;

                                        if (set_password) {
                                            formik.setFieldTouched('set_password', true, true);
                                            formik.setFieldError('set_password', set_password);
                                        }
                                        if (confirm_password) {
                                            formik.setFieldTouched('confirm_password', true, true);
                                            formik.setFieldError('confirm_password', confirm_password);
                                        }
                                        if (!(set_password || confirm_password)) {
                                            sessionStorage.setItem('signup-info', JSON.stringify({ ...formik.values, ...JSON.parse(`${sessionStorage.getItem('signup-info')}`) }))
                                            navigate(`${getBaseUrl()}/sign-up/email`)
                                        }
                                    })
                                }} >
                                    {t('next')}
                                </Button>
                            </Box>
                        </Form >
                    </WithTranslateFormErrors>
                }
            </Formik>
        </Card>
    );
}

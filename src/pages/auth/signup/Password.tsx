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
import { CustomForm } from "../../commonStyle";
import { useNavigate } from "react-router-dom";

export default function Password(mainProps: any) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const signupPassword = sessionStorage.getItem('signup-password');
    const [formData] = useState(signupPassword ? JSON.parse(signupPassword) : {
        password: "",
        confirm_password: "",
    });
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        document.title = t('title.signup');
        sessionStorage.removeItem('signup-email')
        sessionStorage.removeItem('signup-code')
    })

    return (
        <Card className={`rounx-auth-card`}>
            <Formik
                enableReinitialize
                initialValues={formData}
                validationSchema={yup.object({
                    password: yup
                        .string()
                        .required(t('validation.set-password-required')),
                    confirm_password: yup
                        .string()
                        .required(t('validation.confirm-password-required'))
                        .min(8, t('validation.password-length'))
                        .when("password", {
                            is: (value: string) => (value && value.length > 0 ? true : false),
                            then: yup.string().oneOf([yup.ref("password")], t('validation.two-passwords-do-not-match')),
                        })
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
                                {t('signup-password-title')}
                            </Typography>
                            <TextField
                                fullWidth
                                id="password"
                                name="password"
                                label={t('set-password')}
                                type={showPassword ? "text" : "password"}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={(formik.touched.password && Boolean(formik.errors.password) ? formik.errors.password : t('at_least_8_characters')) as ReactNode}
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
                                        const { password, confirm_password } = res;

                                        if (password) {
                                            formik.setFieldTouched('password', true, true);
                                            formik.setFieldError('password', password);
                                        }
                                        if (confirm_password) {
                                            formik.setFieldTouched('confirm_password', true, true);
                                            formik.setFieldError('confirm_password', confirm_password);
                                        }
                                        if (!(password || confirm_password)) {
                                            sessionStorage.setItem('signup-password', JSON.stringify(formik.values))
                                            navigate('/sign-up/email')
                                        }
                                    })
                                }} >
                                    {t('next')}
                                </Button>
                            </Box>
                        </CustomForm >
                    </WithTranslateFormErrors>
                }
            </Formik>
        </Card>
    );
}

import React, { useState } from "react";
import {
    TextField,
    Typography,
    Box
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useAppDispatch } from "../../../redux/hooks";
import { sendCodeToEmail } from "../../../redux/auth/authActions";
import { resetDefault } from "../../../redux/auth/authSlice";
import { useTranslation } from "react-i18next";
import Button from "../../../components/button/Button";


export default function Email(mainProps: any) {
    const { t } = useTranslation();
    const { formik } = mainProps;
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();

    return (
        <>
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
                helperText={t('signup-email-helper')}
            />
            <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button disabled={loading} style={{ float: "right" }} onClick={() => {
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
                            setLoading(true);
                            dispatch(sendCodeToEmail(sendEmailCodeObj)).then((res: any) => {
                                const { payload } = res;
                                const { message, success } = payload;
                                enqueueSnackbar(message);
                                if (success) {
                                    dispatch(resetDefault());
                                    mainProps.handleNext({
                                        first_name: formik.values.first_name,
                                        last_name: formik.values.last_name,
                                        birthday: formik.values.birthday,
                                        country_id: formik.values.country_id,
                                        password: formik.values.password,
                                        confirm_password: formik.values.confirm_password,
                                        primary_email: formik.values.primary_email,
                                        email_code: ''
                                    }, formik);
                                }
                                setLoading(false);
                            }).catch((err) => {
                                setLoading(false);
                                enqueueSnackbar("Error occured");
                            })
                        }
                    })
                }}>
                    {t('next')}
                </Button>
            </Box>
        </>
    );
}

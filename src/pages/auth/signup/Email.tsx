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
import BlueButton from "../../../components/button/Button";


export default function Email(mainProps: any) {
    const { t } = useTranslation();
    const { formik } = mainProps;
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();

    return (
        <>
            <Typography className="rounx-account-title-info">
                <b>{t("signup-title.email-header")}</b>
                <br />
                <span style={{ fontSize: '16px' }}>{t('signup-title.email-title')}</span>
            </Typography>
            <TextField
                fullWidth
                id="primary_email"
                name="primary_email"
                label={t('signup-data.email')}
                value={formik.values.primary_email}
                onChange={formik.handleChange}
                error={formik.touched.primary_email && Boolean(formik.errors.primary_email)}
                helperText={t('signup-title.email-helper')}
            />
            <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <BlueButton disabled={loading} style={{ float: "right" }} onClick={() => {
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
                                    mainProps.handleNext();
                                }
                                setLoading(false);
                            }).catch((err) => {
                                setLoading(false);
                                enqueueSnackbar("Error occured");
                            })
                        }
                    })
                }}>
                    {t('signup-title.next-btn')}
                </BlueButton>
            </Box>
        </>
    );
}

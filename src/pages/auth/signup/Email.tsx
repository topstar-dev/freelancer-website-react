import React, { useState } from "react";
import {
    TextField,
    Typography,
    Box
} from "@mui/material";
import { useSnackbar } from "notistack";
import { DecideButton } from "../../commonStyle";
import { useAppDispatch } from "../../../redux/hooks";
import { sendCodeToEmail } from "../../../redux/auth/authActions";
import { resetDefault } from "../../../redux/auth/authSlice";
import { useTranslation } from "react-i18next";
import BlueButton from "../../../components/blueButton/BlueButton";


export default function Email(mainProps: any) {
    const { t } = useTranslation();
    const { formik } = mainProps;
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();

    return (
        <>
            <Typography
                style={{
                    fontSize: "16px",
                    textAlign: "center",
                    marginTop: "-10px",
                    marginBottom: "20px",
                }}>
                <b>{t("signup-title.email-header")}</b>
                <br />
                {t('signup-title.email-title')}
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
            <Box style={{ margin: "10px 0px", display: 'flex', justifyContent: 'flex-end' }}>
                <DecideButton
                    disabled={loading}
                    onClick={() => mainProps.handleBack()}
                    sx={{ marginRight: '10px' }}>
                    {t('signup-title.back-btn')}
                </DecideButton>
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

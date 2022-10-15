import React, { useState } from "react";
import {
    TextField,
    Typography,
    Box
} from "@mui/material";
import { useSnackbar } from "notistack";
import { BlueButton, DecideButton, CustomForm } from "../../commonStyle";
import { useAppDispatch } from "../../../redux/hooks";
import { sendCodeToEmail } from "../../../redux/auth/authActions";

export default function Email(mainProps: any) {
    const { formik } = mainProps;
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();

    return (
        <CustomForm>
            <img
                src="images/rounx-symbol.png"
                alt="Rounx admin"
                width="60px"
                height="60px"
                style={{ color: "#336def", alignSelf: "center" }}
            />
            <Typography
                style={{
                    fontSize: "16px",
                    textAlign: "center",
                    marginTop: "-10px",
                    marginBottom: "20px",
                }}>
                Enter your email address and we will send you a verification code.
            </Typography>
            <TextField
                fullWidth
                id="primary_email"
                name="primary_email"
                label="Email"
                value={formik.values.primary_email}
                onChange={formik.handleChange}
                error={formik.touched.primary_email && Boolean(formik.errors.primary_email)}
                helperText={formik.touched.primary_email && formik.errors.primary_email}
            />
            <Box style={{ margin: "10px 0px", display: 'flex', justifyContent: 'flex-end' }}>
                <DecideButton
                    disabled={loading}
                    onClick={() => mainProps.handleBack()}
                    sx={{ marginRight: '10px' }}>
                    Back
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
                                const { type, payload } = res;
                                if (type === 'user/sendEmailCode/rejected') {
                                    enqueueSnackbar(payload, { variant: 'error' });
                                } else {
                                    const { status, message } = payload;
                                    if (status === 200) {
                                        enqueueSnackbar(message, { variant: 'success' });
                                        mainProps.handleNext();
                                    } else {
                                        enqueueSnackbar(message, { variant: 'error' });
                                    }
                                }
                                setLoading(false);
                            }).catch((err) => {
                                setLoading(false);
                                enqueueSnackbar(err.response.data.message, { variant: 'error' });
                            })
                        }
                    })
                }}>
                    Next
                </BlueButton>
            </Box>
        </CustomForm>

    );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
    TextField,
    Typography,
    Box,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { CustomForm, BlueButton, DecideButton } from "../../commonStyle";
import { useAppDispatch } from "../../../redux/hooks";
import { signUpUser } from "../../../redux/auth/authActions";
import { resetDefault } from "../../../redux/auth/authSlice";

export default function Code(mainProps: any) {
    const { formik } = mainProps;
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

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
                    fontSize: "17px",
                    textAlign: "center",
                    marginTop: "-10px",
                }}
            >
                {t('signup-title.code-title')}
            </Typography>
            <Typography style={{ alignSelf: 'center', fontWeight: 'bold' }}>{formik.values.primary_email}</Typography>
            <TextField
                fullWidth
                id="email_code"
                name="email_code"
                label={t('signup-data.code')}
                value={formik.values.email_code}
                onChange={formik.handleChange}
                error={formik.touched.email_code && Boolean(formik.errors.email_code)}
                helperText={formik.touched.email_code && formik.errors.email_code}
            />
            <Box style={{ margin: "10px 0px", display: 'flex', justifyContent: 'flex-end' }}>
                <DecideButton
                    disabled={loading}
                    onClick={() => mainProps.handleBack()}
                    sx={{ marginRight: '10px' }}
                >
                    {t('signup-title.back-btn')}
                </DecideButton>
                <BlueButton disabled={loading} style={{ float: "right" }} onClick={() => {
                    formik.validateForm().then((res: any) => {
                        const { email_code } = res;

                        if (email_code) {
                            formik.setFieldTouched('email_code', true, true);
                            formik.setFieldError('email_code', email_code);
                        }

                        if (!email_code) {
                            const { values } = formik;
                            const { first_name, last_name, birthday, country_id, password, primary_email, email_code } = values;

                            const signUpData = {
                                account_type: mainProps.type,
                                first_name,
                                last_name,
                                birthday,
                                country_id,
                                password,
                                primary_email,
                                email_code
                            }

                            setLoading(true);
                            dispatch(signUpUser(signUpData)).then((res: any) => {
                                const { payload } = res;
                                const { success, message } = payload;
                                enqueueSnackbar(message);
                                if (success) {
                                    dispatch(resetDefault());
                                    navigate('/sign-in')
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
        </CustomForm>
    );
}

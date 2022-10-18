import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import {
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { BlueButton, DecideButton } from "../../commonStyle";
import { useAppDispatch } from "../../../redux/hooks";
import { sendCodeToEmail } from "../../../redux/auth/authActions";
import { resetDefault } from "../../../redux/auth/authSlice";

export default function EnterEmail(mainProps: any) {
  const { formik } = mainProps;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Typography
        style={{
          fontSize: "17px",
          textAlign: "center",
          marginTop: "-10px",
          marginBottom: "20px"
        }}
      >
        <b>{t('reset-password-title.title')}</b>
        <br />
        {t('reset-password-title.email-info')}
      </Typography>
      <TextField
        fullWidth
        id="email"
        name="email"
        label={t('reset-password-data.email')}
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <Box style={{ margin: "10px 0px", display: 'flex', justifyContent: 'space-between' }}>
        <DecideButton
          disabled={loading}
          onClick={() => navigate("/sign-in")}
          sx={{ marginRight: '10px' }}
        >
          {t('signup-title.back-btn')}
        </DecideButton>
        <BlueButton
          disabled={loading}
          onClick={() => {
            formik.validateForm().then((res: any) => {
              const { email } = res;
              if (email) {
                formik.setFieldTouched('email', true, true);
                formik.setFieldError('email', email);
              }

              if (!email) {
                const sendEmailCodeObj = {
                  email: formik.values.email,
                  function_type: "RESET_PASSWORD"
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

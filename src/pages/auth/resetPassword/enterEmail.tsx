import React from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import {
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { useAppDispatch } from "../../../redux/hooks";
import { sendCodeToEmail } from "../../../redux/auth/authActions";
import { resetDefault } from "../../../redux/auth/authSlice";
import Button from "../../../components/button/Button";

export default function EnterEmail(mainProps: any) {
  const { formik } = mainProps;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      <Typography className="rounx-account-title-info">
        <span>{t('reset-password')}</span>
        <br />
        <span style={{ fontSize: '16px' }}>{t('enter_email')}</span>
      </Typography>
      <TextField
        fullWidth
        id="email"
        name="email"
        label={t('email')}
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
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
                mainProps.setBackdrop(false);
                dispatch(sendCodeToEmail(sendEmailCodeObj)).then((res: any) => {
                  const { payload } = res;
                  const { message, success } = payload;
                  enqueueSnackbar(message);
                  if (success) {
                    dispatch(resetDefault());
                    mainProps.handleNext({
                      email: formik.values.email,
                      code: '',
                      password: '',
                      confirm_password: ''
                    }, formik);
                  }
                  mainProps.setBackdrop(false);
                }).catch((err) => {
                  mainProps.setBackdrop(false);
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

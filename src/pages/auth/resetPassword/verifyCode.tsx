import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import {
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { useAppDispatch } from "../../../redux/hooks";
import { checkCodeOfEmail } from "../../../redux/auth/authActions";
import { resetDefault } from "../../../redux/auth/authSlice";
import Button from "../../../components/button/Button";

export default function VerifyCode(mainProps: any) {
  const { formik } = mainProps;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Typography className="rounx-account-title-info">
        {t('signup-code-title')}
        <br />
        <span style={{
          alignSelf: 'center',
          fontWeight: 'bold',
          fontSize: '16px'
        }}>{formik.values.email}</span>
      </Typography>
      <TextField
        fullWidth
        id="code"
        name="code"
        label={t('code')}
        value={formik.values.code || ''}
        onChange={formik.handleChange}
        error={formik.touched.code && Boolean(formik.errors.code)}
        helperText={formik.touched.code && formik.errors.code}
      />
      <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button disabled={loading} onClick={() => {
          formik.validateForm().then((res: any) => {
            const { code } = res;
            if (code) {
              formik.setFieldTouched('code', true, true);
              formik.setFieldError('code', code);
            }

            if (!code) {
              const sendEmailCodeObj = {
                email: formik.values.email,
                code: formik.values.code,
                function_type: "RESET_PASSWORD"
              }
              setLoading(true);
              dispatch(checkCodeOfEmail(sendEmailCodeObj)).then((res: any) => {
                const { payload } = res;
                const { message, success } = payload;
                enqueueSnackbar(message);
                if (success) {
                  dispatch(resetDefault());
                  mainProps.handleNext({
                    email: formik.values.email,
                    code: formik.values.code,
                    password: '',
                    confirm_password: ''
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
    </ >
  );
}

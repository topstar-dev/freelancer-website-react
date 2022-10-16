import React, { useState } from "react";
import { BlueButton, DecideButton } from "../../commonStyle";
import {
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { useAppDispatch } from "../../../redux/hooks";
import { useSnackbar } from "notistack";
import { checkCodeOfEmail } from "../../../redux/auth/authActions";
import { resetDefault } from "../../../redux/auth/authSlice";

export default function VerifyCode(mainProps: any) {
  const { formik } = mainProps;
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Typography
        style={{
          fontSize: "17px",
          textAlign: "center",
        }}
      >
        Reset Password
      </Typography>
      <Typography style={{ alignSelf: 'center', fontSize: '20px' }}>An email with a verification code was just to</Typography>
      <Typography style={{ alignSelf: 'center', fontWeight: 'bold' }}>{formik.values.email}</Typography>
      <TextField
        fullWidth
        id="code"
        name="code"
        label="Enter code"
        value={formik.values.code}
        onChange={formik.handleChange}
        error={formik.touched.code && Boolean(formik.errors.code)}
        helperText={formik.touched.code && formik.errors.code}
      />
      <Box style={{ margin: "10px 0px", display: 'flex', justifyContent: 'space-between' }}>
        <DecideButton
          disabled={loading}
          onClick={() => mainProps.handleBack()}
          sx={{ marginRight: '10px' }}
        >
          Back
        </DecideButton>
        <BlueButton disabled={loading} onClick={() => {
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
          Next
        </BlueButton>
      </Box>
    </ >
  );
}

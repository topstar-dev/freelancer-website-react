import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import {
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { DecideButton } from "../../commonStyle";
import { useAppDispatch } from "../../../redux/hooks";
import { resetPasswordUser } from "../../../redux/auth/authActions";
import { resetDefault } from "../../../redux/auth/authSlice";
import BlueButton from "../../../components/blueButton/BlueButton";

export default function SetNewPassword(mainProps: any) {
  const { formik } = mainProps;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Typography
        style={{
          fontSize: "17px",
          textAlign: "center",
          marginTop: "-10px",
          marginBottom: "20px",
        }}
      >
        {t('reset-password-title.password-info')}
      </Typography>
      <TextField
        fullWidth
        id="password"
        name="password"
        label={t('reset-password-data.password')}
        type={showPassword ? "text" : "password"}
        value={formik.values.password}
        onChange={formik.handleChange}
        helperText={"At least 8 characters"}
        error={formik.touched.password && Boolean(formik.errors.password)}
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
        type="password"
        label={t('reset-password-data.confirm-password')}
        value={formik.values.confirm_password}
        onChange={formik.handleChange}
        error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
        helperText={formik.touched.confirm_password && formik.errors.confirm_password}
      />
      <Box style={{ margin: "10px 0px", display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        {/* <DecideButton
          disabled={loading}
          sx={{ mr: 2 }}
          onClick={() => mainProps.handleBack()}
        >
          {t('signup-title.back-btn')}
        </DecideButton> */}
        <BlueButton disabled={loading} onClick={() => {
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

            if (!confirm_password && !password) {
              const resetPasswordObj = {
                email: formik.values.email,
                code: formik.values.code,
                password: formik.values.password
              }
              setLoading(true);
              dispatch(resetPasswordUser(resetPasswordObj)).then((res: any) => {
                const { payload } = res;
                const { message, success } = payload;
                enqueueSnackbar(message);
                if (success) {
                  dispatch(resetDefault());
                  navigate('/sign-in');
                }
                setLoading(false);
              }).catch((err) => {
                setLoading(false);
                enqueueSnackbar("Error occured");
              })
            }
          })
        }}>
          {t('signup-title.submit-btn')}
        </BlueButton>
      </Box>
    </>
  );
}

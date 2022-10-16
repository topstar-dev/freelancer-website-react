import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { BlueButton, DecideButton } from "../../commonStyle";
import { useAppDispatch } from "../../../redux/hooks";
import { resetPasswordUser } from "../../../redux/auth/authActions";
import { resetDefault } from "../../../redux/auth/authSlice";

export default function SetNewPassword(mainProps: any) {
  const { formik } = mainProps;
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
        Create a strong password with a mix of letters, numbers and symbols
      </Typography>
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Set password"
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
        label="Confirm password"
        value={formik.values.confirm_password}
        onChange={formik.handleChange}
        error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
        helperText={formik.touched.confirm_password && formik.errors.confirm_password}
      />
      <Box style={{ margin: "10px 0px", display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <DecideButton
          disabled={loading}
          sx={{ mr: 2 }}
          onClick={() => mainProps.handleBack()}
        >
          Back
        </DecideButton>
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
          Submit
        </BlueButton>
      </Box>
    </>
  );
}

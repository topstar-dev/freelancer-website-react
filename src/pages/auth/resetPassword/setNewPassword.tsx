import React from "react";
import * as yup from "yup";
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSnackbar } from "notistack";
import {
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { CustomForm, BlueButton, DecideButton } from "../../commonStyle";
import { Formik } from "formik";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const validationSchema = yup.object({
  set_password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirm_password: yup
    .string()
    .when("password", {
      is: (value: string) => (value && value.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref("password")], "Passwords do not match"),
    })
    .required("This field is required")
});

export default function SetNewPassword(mainProps: any) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [data, setData] = useSearchParams();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Formik
      initialValues={{
        confirm_password: "",
        set_password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        axios.post(`${BASE_URL}/reset-password`, {
          code: `${data.get('code')}`,
          email: `${data.get('email')}`,
          password: values.set_password,
        }, {
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": 'en'
          }
        }).then((res) => {
          enqueueSnackbar(res.data.message, { variant: 'success' });
          navigate("/sign-in")
        }).catch((error) => {
          enqueueSnackbar(error.response.data.message, { variant: 'error' });
        });
      }}
    >
      {props => (
        <CustomForm onSubmit={props.handleSubmit}>
          <img
            src="images/rounx-symbol.png"
            alt="Rounx admin"
            width="60px"
            height="60px"
            style={{ alignSelf: "center" }}
          />
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
            id="set_password"
            name="set_password"
            label="Set password"
            type={showPassword ? "text" : "password"}
            value={props.values.set_password}
            onChange={props.handleChange}
            helperText={"At least 8 characters"}
            error={props.touched.set_password && Boolean(props.errors.set_password)}
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
            value={props.values.confirm_password}
            onChange={props.handleChange}
            error={props.touched.confirm_password && Boolean(props.errors.confirm_password)}
            helperText={props.touched.confirm_password && props.errors.confirm_password}
          />
          <Box style={{ margin: "10px 0px", display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <DecideButton
              sx={{ mr: 2 }}
              onClick={() => mainProps.handleBack()}
            >
              Back
            </DecideButton>
            <BlueButton type="submit" >
              Next
            </BlueButton>
          </Box>
        </CustomForm>
      )}
    </Formik>
  );
}

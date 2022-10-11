import React from "react";
import * as yup from "yup";
import axios from 'axios';
import { Formik } from "formik";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { CustomForm, FormBox, BlueButton, DecideButton } from "../../commonStyle";
import {
  TextField,
  Typography,
  Box,
} from "@mui/material";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const validationSchema = yup.object({
  code: yup
    .number()
    .required("Code is required"),
});

export default function VerifyCode(mainProps: any) {
  const [email, setEmail] = useSearchParams();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={
        { code: "" }
      }
      validationSchema={validationSchema}
      onSubmit={(values) => {
        axios.post(`${BASE_URL}/check-email-code`, {
          code: values.code,
          email: email.get('email'),
          function_type: "RESET_PASSWORD"
        }, {
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": 'en'
          }
        }).then((res) => {
          mainProps.handleNext();
          const params = { email: `${email.get('email')}`, code: `${values.code}` };
          navigate({
            pathname: '/reset-password',
            search: `?${createSearchParams(params)}`,
          })
          enqueueSnackbar(res.data.message, { variant: 'success' });
        })
          .catch((error) => {
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
            style={{ color: "#336def", alignSelf: "center" }}
          />
          <Typography
            style={{
              fontSize: "17px",
              textAlign: "center",
            }}
          >
            Reset Password
          </Typography>
          <Typography style={{ alignSelf: 'center', fontSize: '20px' }}>An email with a verification code was just to</Typography>
          <Typography style={{ alignSelf: 'center', fontWeight: 'bold' }}>{email.get('email')}</Typography>
          <TextField
            fullWidth
            id="code"
            name="code"
            label="Enter code"
            value={props.values.code}
            onChange={props.handleChange}
            error={props.touched.code && Boolean(props.errors.code)}
            helperText={props.touched.code && props.errors.code}
          />
          <Box style={{ margin: "10px 0px", display: 'flex', justifyContent: 'flex-end' }}>
            <DecideButton
              onClick={() => mainProps.handleBack()}
              sx={{ marginRight: '10px' }}
            >
              Back
            </DecideButton>
            <BlueButton style={{ float: "right" }} type="submit">
              Next
            </BlueButton>
          </Box>
        </CustomForm>
      )}
    </Formik >
  );
}

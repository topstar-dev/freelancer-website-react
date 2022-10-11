import React from "react";
import * as yup from "yup";
import axios from 'axios';
import { createSearchParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Formik } from "formik";
import {
  TextField,
  Typography,
  Box,
  Button
} from "@mui/material";
import { BlueButton, DecideButton, CustomForm } from "../../commonStyle";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});

export default function EnterEmail(mainProps: any) {
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        axios.post(`${BASE_URL}/send-email-code`, {
          email: values.email,
          function_type: "RESET_PASSWORD"
        }, {
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": 'en'
          }
        }).then((res) => {
          mainProps.handleNext();
          const params = { email: `${values.email}` };
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
          <Typography
            style={{
              fontSize: "16px",
              textAlign: "center",
              marginBottom: '20px',
              alignSelf: "center"
            }}>Enter your email address and we will send you a verification code.</Typography>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={props.values.email}
            onChange={props.handleChange}
            error={props.touched.email && Boolean(props.errors.email)}
            helperText={props.touched.email && props.errors.email}
          />
          <Box style={{ margin: "10px 0px", display: 'flex', justifyContent: 'flex-end' }}>
            <DecideButton
              onClick={() => navigate("/sign-in")}
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

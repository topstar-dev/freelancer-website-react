
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from 'axios';
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const validationSchema = yup.object({
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
});

export default function useEmail(handleNext: any) {
    const navigate = useNavigate();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [data, setData] = useSearchParams();
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            axios.post(`${BASE_URL}/send-email-code`, {
                email: values.email,
                function_type: "SIGN_UP"
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept-Language": 'en'
                }
            }).then((res) => {
                handleNext();
                const params = {
                    firstname: `${data.get('firstname')}`,
                    lastname: `${data.get('lastname')}`,
                    country_id: `${data.get('country_id')}`,
                    birthday: `${data.get('birthday')}`,
                    password: `${data.get('password')}`,
                    email: `${values.email}`
                };
                navigate({
                    pathname: '/sign-up',
                    search: `?${createSearchParams(params)}`,
                })
                enqueueSnackbar(res.data.message, { variant: 'success' });
            })
                .catch((error) => {
                    enqueueSnackbar(error.response.data.message, { variant: 'error' });
                });
        },
    });
    return { formik };
}
import * as yup from "yup";
import { useFormik } from "formik";
import axios from 'axios';
import { useSnackbar } from "notistack";

const validationSchema = yup.object({
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required")
});
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function useHome() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            axios.post(`${BASE_URL}/appointment-email`, {
                email: values.email,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept-Language": 'en',
                    "device-type": 'WEB'
                }
            }).then((res) => {
                enqueueSnackbar(res.data.message, { variant: 'success' });
                console.log(res.data.message);
            })
                .catch((error) => {
                    if (error.response.status == 403) enqueueSnackbar('Email already exists', { variant: 'error' });
                    if (error.response.status == 400) enqueueSnackbar('Invalid email format', { variant: 'error' });
                });
        },
    });
    return { formik };
}
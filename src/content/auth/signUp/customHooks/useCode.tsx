import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from 'axios';
import { createSearchParams, useSearchParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const validationSchema = yup.object({
    code: yup
        .number()
        .required("Code is required"),
});

export default function useCode() {
    const [data, setData] = useSearchParams();
    const email = data.get('email');
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            code: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            axios.post(`${BASE_URL}/check-email-code`, {
                code: values.code,
                firstname: `${data.get('firstname')}`,
                lastname: `${data.get('lastname')}`,
                country_id: `${data.get('country_id')}`,
                birthday: `${data.get('birthday')}`,
                password: `${data.get('password')}`,
                email: `${data.get('email')}`,
                function_type: "SIGN_UP"
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept-Language": 'en'
                }
            }).then((res) => {
                navigate('/sign-in');
                enqueueSnackbar(res.data.message, { variant: 'success' });
            })
                .catch((error) => {
                    enqueueSnackbar(error.response.data.message, { variant: 'error' });
                });
        },
    });
    return { formik, email };
}
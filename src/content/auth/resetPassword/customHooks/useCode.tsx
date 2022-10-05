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

export default function useCode(handleNext: any) {
    const [email, setEmail] = useSearchParams();
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
                email: email.get('email'),
                function_type: "RESET_PASSWORD"
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept-Language": 'en'
                }
            }).then((res) => {
                handleNext();
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
        },
    });
    return { formik, email };
}
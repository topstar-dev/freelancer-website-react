import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { IS_LOGIN } from "../actions/actionType";

const validationSchema = yup.object({
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string()
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
});
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function useSignin() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [showPassword, setShowPassword] = React.useState(false);
    const [type, setType] = React.useState<HTMLDivElement | null>(null);
    const open = Boolean(type);

    //button click handler
    const typeClick = (event: any) => {
        setType(event.currentTarget);
    };
    const handleClose = () => {
        setType(null);
    };
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            axios.post(`${BASE_URL}/sign-in`, {
                email: values.email,
                password: values.password
            }, {
                headers: {
                    "Accept-Language": 'en',
                    "device-type": 'WEB',

                }
            }).then((res) => {
                console.log(res.data.data);
                enqueueSnackbar(res.data.message, { variant: 'success' });
                localStorage.setItem('user', JSON.stringify(res.data.data));
                dispatch({ type: IS_LOGIN, payload: res.data.data });
                navigate("/")
            })
                .catch((error) => {
                    enqueueSnackbar(error.response.data.message, { variant: 'error' });
                });
        },
    });

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return { formik, handleClickShowPassword, showPassword, typeClick, handleClose, type, open }
}
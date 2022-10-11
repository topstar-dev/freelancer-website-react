import axios from 'axios';
import { useFormik } from "formik";
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import * as yup from "yup";

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
export default function usePassword(handleNext: any) {
    const [data, setData] = useSearchParams();
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            confirm_password: "",
            set_password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleNext();
            const params = {
                firstname: `${data.get('firstname')}`,
                lastname: `${data.get('lastname')}`,
                country_id: `${data.get('country_id')}`,
                birthday: `${data.get('birthday')}`,
                password: `${values.set_password}`
            };
            navigate({
                pathname: '/sign-up',
                search: `?${createSearchParams(params)}`,
            })
        },
    });
    return { formik };
}
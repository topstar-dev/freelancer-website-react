
import React from "react";
import { useFormik } from "formik";
import { SelectChangeEvent } from "@mui/material/Select";
import * as yup from "yup";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams, createSearchParams } from "react-router-dom";
import dayjs, { Dayjs } from 'dayjs';
import countryList from 'react-select-country-list';

const validationSchema = yup.object({
    firstname: yup
        .string()
        .required("First name is required"),
    lastname: yup
        .string()
        .required("Last name is required"),
});

export default function useSignup(handleNext: any) {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [country, setCountry] = React.useState('');
    const countryChange = (e: SelectChangeEvent) => setCountry(e.target.value);
    const headers = {
        "Content-Type": "application/json",
        "Accept-Language": 'en',
        "device-type": 'WEB',
        "page_index": 1,
        "page_size": 10,
    }
    const options = React.useEffect(() => {
        axios.get(`${BASE_URL}/countries`, { headers: headers })
            .then((res) => { console.log(res.data); return res.data.data })
            .catch((error) => {
                console.log(error);
            });
        //countryList().getData();
    }, []);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const [type, setType] = useSearchParams();
    const [birthday, setBirthday] = React.useState<Dayjs | null>(null);
    const handleChange = (newValue: Dayjs | null) => {
        setBirthday(newValue);
    };
    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleNext();
            const params = {
                firstname: `${values.firstname}`,
                lastname: `${values.lastname}`,
                birthday: `${birthday?.toString()}`,
                country_id: `1`
            };
            navigate({
                pathname: '/sign-up',
                search: `?${createSearchParams(params)}`,
            })
        },
    });
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return { formik, handleClickShowPassword, showPassword, birthday, handleChange, options, country, countryChange }
}
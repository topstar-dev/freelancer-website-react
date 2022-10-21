import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as yup from "yup";
import { Formik } from "formik";
import Info from './Info';
import Password from './Password';
import Email from './Email';
import Code from './Code';
import { CustomForm } from "../../commonStyle";
import { getCountriesList } from '../../../redux/resources/resourcesActions';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import Card from '../../../components/card/Card';
import '../auth.css';
import { useTranslation } from 'react-i18next';

const validationSchema = yup.object({
    first_name: yup
        .string()
        .required("First name is required"),
    last_name: yup
        .string()
        .required("Last name is required"),
    birthday: yup
        .string()
        .required("Birthday is required"),
    country_id: yup
        .string()
        .required("Country id is required"),
    password: yup
        .string()
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
    confirm_password: yup
        .string()
        .when("password", {
            is: (value: string) => (value && value.length > 0 ? true : false),
            then: yup.string().oneOf([yup.ref("password")], "Passwords do not match"),
        })
        .required("Confirm password is required"),
    primary_email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    email_code: yup
        .number()
        .required("Code is required"),
});

export default function SignUp() {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const type = searchParams.get('type');
    const [activeStep, setActiveStep] = useState<number>(0);
    const [countries, setCountries] = useState([]);
    const { loading, countryData } = useAppSelector(state => state.resources)

    React.useEffect(() => {
        document.title = t('title.signup')
    })

    useEffect(() => {
        if (!loading && !countryData.records) {
            dispatch(getCountriesList()).then(res => {
                const { success, data } = res.payload;
                if (success) {
                    setCountries(data.records);
                }
            })
        }
    })

    const handleNext = () => {
        const newActiveStep = activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const steps: any = {
        0: (props: any) => <Info formik={props} handleNext={handleNext} countries={countries} />,
        1: (props: any) => <Password formik={props} handleBack={handleBack} handleNext={handleNext} />,
        2: (props: any) => <Email formik={props} handleBack={handleBack} handleNext={handleNext} />,
        3: (props: any) => <Code formik={props} handleBack={handleBack} type={type} />
    }

    return (
        <Card className="rounx-auth-card">
            <Formik
                initialValues={{
                    first_name: "",
                    last_name: "",
                    confirm_password: "",
                    password: "",
                    primary_email: "",
                    email_code: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => { }}
            >
                {props =>
                    <CustomForm>
                        <img
                            src="images/rounx-symbol.png"
                            alt="Rounx admin"
                            width="60px"
                            height="60px"
                            style={{ alignSelf: "center", cursor: "pointer" }}
                            onClick={() => navigate('/')}
                        />
                        {steps[`${activeStep}`](props)}
                    </CustomForm >
                }
            </Formik>
        </Card>
    );
}

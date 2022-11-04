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
import WithTranslateFormErrors from '../../../services/validationScemaOnLangChange';
import { Backdrop, CircularProgress } from '@mui/material';

export default function SignUp() {
    const { t, i18n } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const type = searchParams.get('type');

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        confirm_password: "",
        password: "",
        primary_email: "",
        email_code: "",
    });
    const [activeStep, setActiveStep] = useState<number>(0);
    const { countryData } = useAppSelector(state => state.resources);
    const [backdrop, setBackdrop] = React.useState(false);

    React.useEffect(() => {
        document.title = t('title.signup');
        window.onpopstate = e => {
            e.preventDefault();
            if (activeStep > 0) {
                handleBack();
            }
        };
    })

    useEffect(() => {
        i18n.on('languageChanged', lng => {
            dispatch(getCountriesList());
        });
        return () => {
            i18n.off('languageChanged', lng => { });
        };
    }, [i18n, dispatch])

    useEffect(() => {
        if (!countryData.records) {
            dispatch(getCountriesList());
        }
    }, [countryData.records, dispatch])

    const handleNext = (values: any, formik?: any) => {
        const newActiveStep = activeStep + 1;
        setActiveStep(newActiveStep);
        formik.resetForm();
        setFormData(values);
        navigate(`/sign-up${window.location.search}`, { state: values })
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const steps: any = {
        0: (props: any) => <Info formik={props} handleNext={handleNext} countries={countryData?.records || []} />,
        1: (props: any) => <Password formik={props} handleBack={handleBack} handleNext={handleNext} />,
        2: (props: any) => <Email formik={props} handleBack={handleBack} handleNext={handleNext} setBackdrop={setBackdrop} />,
        3: (props: any) => <Code formik={props} handleBack={handleBack} type={type} setBackdrop={setBackdrop} />
    }

    return (
        <Card className={`rounx-auth-card`}>
            <Formik
                enableReinitialize
                initialValues={formData}
                validationSchema={yup.object({
                    first_name: yup
                        .string()
                        .required(t('validation.firstname-required')),
                    last_name: yup
                        .string()
                        .required(t('validation.lastname-required')),
                    birthday: yup
                        .string()
                        .required(t('validation.birthday-required')),
                    country_id: yup
                        .string()
                        .required(t('validation.country-required')),
                    password: yup
                        .string()
                        .required(t('validation.set-password-required')),
                    confirm_password: yup
                        .string()
                        .required(t('validation.confirm-password-required'))
                        .min(8, t('validation.password-length'))
                        .when("password", {
                            is: (value: string) => (value && value.length > 0 ? true : false),
                            then: yup.string().oneOf([yup.ref("password")], t('validation.two-passwords-do-not-match')),
                        }),
                    primary_email: yup
                        .string()
                        .email(t('validation.email-valid'))
                        .required(t('validation.email-required')),
                    email_code: yup
                        .number()
                        .required(t('validation.code-required')),
                })}
                onSubmit={(values) => { }}
            >
                {props =>
                    <WithTranslateFormErrors {...props}>
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
                    </WithTranslateFormErrors>
                }
            </Formik>
            <Backdrop
                sx={{ color: '#fff', zIndex: 999 }}
                open={backdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Card>
    );
}

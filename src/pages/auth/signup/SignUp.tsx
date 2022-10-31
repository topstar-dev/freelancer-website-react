import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
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

export default function SignUp() {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const { state } = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const type = searchParams.get('type');
    const [doCall, setCall] = useState(false)
    const [activeStep, setActiveStep] = useState<number>(0);
    const { countryData, language } = useAppSelector(state => state.resources)

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
        setCall(false);
    }, [language])

    useEffect(() => {
        if (!doCall && !countryData.records) {
            setCall(true)
            dispatch(getCountriesList());
        }
    }, [doCall, countryData.records, dispatch])

    const handleNext = (formik: any) => {
        const newActiveStep = activeStep + 1;
        setActiveStep(newActiveStep);
        navigate(`/sign-up${window.location.search}`, { state: formik.values })
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const steps: any = {
        0: (props: any) => <Info formik={props} handleNext={handleNext} countries={countryData?.records || []} />,
        1: (props: any) => <Password formik={props} handleBack={handleBack} handleNext={handleNext} />,
        2: (props: any) => <Email formik={props} handleBack={handleBack} handleNext={handleNext} />,
        3: (props: any) => <Code formik={props} handleBack={handleBack} type={type} />
    }

    return (
        <Card className="rounx-auth-card">
            <Formik
                initialValues={state || {
                    first_name: "",
                    last_name: "",
                    confirm_password: "",
                    password: "",
                    primary_email: "",
                    email_code: "",
                }}
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
                        .required(t('validation.set-password-required'))
                        .min(8, t('validation.password-length')),
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
        </Card>
    );
}

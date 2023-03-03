import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import * as yup from "yup";
import { Formik } from 'formik';
import { Backdrop, CircularProgress, Divider, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Button from '../../components/button/Button';
import Card from '../../components/card/Card';
import Form from '../../components/form/Form';
import { useNavigate } from '../../routes/Router';
import WithTranslateFormErrors from '../../services/validationScemaOnLangChange';
import './applyFreelancer.css';
import { ReactNode, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getCitiesList, getCountriesList, getProvincesList } from '../../redux/resources/resourcesActions';
import { submitFreelancerApplicationAction } from '../../redux/freelancer/freelancerActions';
import { useSnackbar } from 'notistack';
import { useEditFreelancer } from './useEditFreelancer';
import { COUNTRY_ID_CHINA } from '../../redux/constants';

const AboutMe = (props: any) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const editFreelancer = useEditFreelancer();
    const { userInfo } = useAppSelector(state => state.auth);
    const { language } = useAppSelector(state => state.resources);

    const [loading, setLoading] = useState(true);
    const [called, setCalled] = useState(false)
    const [countryList, setCountryList] = useState([]);
    const [provinceList, setProvinceList] = useState([]);
    const [cityList, setCityList] = useState([]);

    const freelancerApplicationInfo = sessionStorage.getItem('freelancer-application-info') ? JSON.parse(`${sessionStorage.getItem('freelancer-application-info')}`) : {};
    const [freelancerData] = useState({
        about: freelancerApplicationInfo.about || '',
        country_id: freelancerApplicationInfo?.country_id ? freelancerApplicationInfo?.country_id : '',
        province_id: freelancerApplicationInfo?.province_id ? freelancerApplicationInfo?.province_id : '',
        city_id: freelancerApplicationInfo?.city_id ? freelancerApplicationInfo?.city_id : ''
    });

    useEffect(() => {
        document.title = t('title.freelancer');
    })

    useEffect(() => {
        if (!called) {
            setCalled(true)
            setLoading(true);
            dispatch(getCountriesList()).then((res) => {
                if (res.payload && res.payload.success) {
                    setCountryList(res.payload.data.records);
                }
            }).catch((err: any) => {
            }).finally(() => {
                setLoading(false)
            })

            if (freelancerData.country_id && freelancerData.country_id?.toString() === COUNTRY_ID_CHINA) {
                dispatch(getProvincesList({ country_id: Number(freelancerData.country_id) })).then((res) => {
                    if (res.payload && res.payload.success) {
                        setProvinceList(res.payload.data.records);
                    }
                }).catch((err: any) => {
                }).finally(() => {
                    setLoading(false)
                })
            }

            if (freelancerData.province_id && freelancerData.country_id?.toString() === COUNTRY_ID_CHINA) {
                dispatch(getCitiesList({ province_id: Number(freelancerData.province_id), country_id: Number(freelancerData.country_id) })).then((res) => {
                    if (res.payload && res.payload.success) {
                        setCityList(res.payload.data.records);
                    }
                }).catch((err: any) => {
                }).finally(() => {
                    setLoading(false)
                })
            }
        }
    }, [dispatch, called, freelancerData.province_id, freelancerData.city_id, freelancerData.country_id])

    useEffect(() => {
        if (language && i18n.language && i18n.language !== language) {
            setCalled(false)
        }
    }, [i18n, language])

    return (
        <Box className="container">
            <Box className="freelancer-main-title">{t('freelancer.title')}</Box>
            <Card className={`freelancer-card`}>
                <Box className={`freelancer-heading`}>
                    <Box className='heading-title'>{t('freelancer.about.title')}</Box>
                    <Box className='heading-steps'>{t('freelancer.about.subtitle')}</Box>
                </Box>
                <Divider />
                <Formik
                    enableReinitialize
                    initialValues={freelancerData}
                    validationSchema={yup.object({
                        about: yup
                            .string()
                            .min(20, t('validation.characters-min', { min: 20 }))
                            .max(1000, t('validation.characters-max', { max: 1000 }))
                            .required(t('validation.about-required')),
                        country_id: yup
                            .string()
                            .required(t('validation.country-required')),
                        province_id: yup
                            .string(),
                        city_id: yup
                            .string()
                    })}
                    onSubmit={(values) => { }}
                >
                    {formik =>
                        <WithTranslateFormErrors {...formik}>
                            <Box className={`freelancer-body`}>
                                <Box className="freelancer-card-spacing" style={{ paddingTop: 40 }}>
                                    <TextField
                                        multiline={true}
                                        rows={8}
                                        fullWidth
                                        id='about'
                                        name='about'
                                        type="text"
                                        label={t('freelancer.about.about')}
                                        value={formik.values.about ? formik.values.about : ''}
                                        onChange={formik.handleChange}
                                        error={formik.touched.about && Boolean(formik.errors.about)}
                                        helperText={formik.touched.about && formik.errors.about && (formik.errors.about as ReactNode)}
                                    />
                                </Box>
                                <Box className="freelancer-card-spacing">
                                    <Divider />
                                </Box>
                                <Box className="freelancer-card-spacing">
                                    <Form>
                                        <FormControl fullWidth>
                                            <InputLabel id="freelancer-country-id-select-label">{t('freelancer.about.country')}</InputLabel>
                                            <Select
                                                label={t('freelancer.about.country')}
                                                labelId="freelancer-country-id-select-label"
                                                id="country_id"
                                                name="country_id"
                                                value={formik.values.country_id ? formik.values.country_id : ''}
                                                onChange={(e) => {
                                                    formik.setFieldValue('province_id', "")
                                                    formik.setFieldValue('city_id', "")
                                                    if (e.target.value.toString() === COUNTRY_ID_CHINA) {
                                                        setLoading(true)
                                                        dispatch(getProvincesList({ country_id: Number(e.target.value) })).then((res) => {
                                                            if (res.payload && res.payload.success) {
                                                                setProvinceList(res.payload.data.records);
                                                            }
                                                        }).catch((err: any) => {
                                                        }).finally(() => {
                                                            setLoading(false)
                                                        })
                                                    }
                                                    formik.handleChange(e)
                                                }}
                                            >
                                                {countryList.map((country: any) => (
                                                    <MenuItem key={country.country_id} value={country.country_id}>{country.country_name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        {formik.values.country_id?.toString() === COUNTRY_ID_CHINA && <FormControl fullWidth>
                                            <InputLabel id="freelancer-skills-select-label">{t('freelancer.about.province')}</InputLabel>
                                            <Select
                                                label={t('freelancer.about.province')}
                                                labelId="freelancer-skills-select-label"
                                                id="province_id"
                                                name="province_id"
                                                value={formik.values.province_id ? formik.values.province_id : ''}
                                                onChange={(e) => {
                                                    setLoading(true)
                                                    formik.setFieldValue('city_id', "")
                                                    dispatch(getCitiesList({ province_id: Number(e.target.value), country_id: Number(formik.values.country_id) })).then((res) => {
                                                        if (res.payload && res.payload.success) {
                                                            setCityList(res.payload.data.records);
                                                        }
                                                    }).catch((err: any) => {
                                                    }).finally(() => {
                                                        setLoading(false)
                                                    })
                                                    formik.handleChange(e)
                                                }}
                                            >
                                                {provinceList.map((province: any) => (
                                                    <MenuItem key={province.province_id} value={province.province_id}>{province.province_name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>}
                                        {formik.values.country_id?.toString() === COUNTRY_ID_CHINA && <FormControl fullWidth>
                                            <InputLabel id="freelancer-skills-select-label">{t('freelancer.about.city')}</InputLabel>
                                            <Select
                                                label={t('freelancer.about.city')}
                                                labelId="freelancer-skills-select-label"
                                                id="city_id"
                                                name="city_id"
                                                value={formik.values.city_id ? formik.values.city_id : ''}
                                                onChange={formik.handleChange}
                                            >
                                                {cityList.map((city: any) => (
                                                    <MenuItem key={city.city_id} value={city.city_id}>{city.city_name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>}
                                    </Form>
                                </Box>
                            </Box>
                            <Box className={`freelancer-footer`}>
                                <Button
                                    onClick={() => {
                                        formik.validateForm().then((res: any) => {
                                            const { about, country_id } = res;
                                            if (about || country_id) {
                                                formik.submitForm();
                                            } else {
                                                const saveData: any = {
                                                    about: formik.values.about,
                                                    location: {
                                                        country_id: formik.values.country_id
                                                    }
                                                }

                                                if (formik.values.province_id) {
                                                    saveData.location['province_id'] = formik.values.province_id;
                                                }

                                                if (formik.values.city_id) {
                                                    saveData.location['city_id'] = formik.values.city_id;
                                                }

                                                sessionStorage.setItem('freelancer-application-info', JSON.stringify({
                                                    ...freelancerApplicationInfo,
                                                    about: formik.values.about,
                                                    country_id: formik.values.country_id,
                                                    province_id: formik.values.province_id,
                                                    city_id: formik.values.city_id,
                                                    username: userInfo?.username
                                                }))

                                                setLoading(true);
                                                editFreelancer(saveData).then(() => {
                                                    dispatch(submitFreelancerApplicationAction()).then((res) => {
                                                        if (res.payload && res.payload.success) {
                                                            sessionStorage.setItem('freelancer-application-status', JSON.stringify({ status: 'APPLYING' }));
                                                            sessionStorage.removeItem('freelancer-application-info');
                                                            navigate('/apply-freelancer/status')
                                                        } else {
                                                            enqueueSnackbar(res.payload.message);
                                                        }
                                                    }).catch((err) => {
                                                        enqueueSnackbar(err.message);
                                                    }).finally(() => {
                                                        setLoading(false)
                                                    })
                                                }).catch(() => {
                                                    setLoading(false)
                                                })
                                            }
                                        })
                                    }}
                                    style={{ float: "right", marginLeft: 10 }}
                                >
                                    {t('submit')}
                                </Button>
                                <Button
                                    variant="text"
                                    onClick={() => {
                                        window.history.back()
                                    }}
                                    style={{ float: "right" }}
                                >
                                    {t('back')}
                                </Button>
                            </Box>
                        </WithTranslateFormErrors>
                    }
                </Formik>
            </Card>
            <Backdrop
                className='only-backdrop'
                sx={{ color: '#fff', zIndex: 999 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    )
}

export default AboutMe;
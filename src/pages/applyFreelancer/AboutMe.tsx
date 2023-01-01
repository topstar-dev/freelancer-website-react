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

const AboutMe = (props: any) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { userInfo } = useAppSelector(state => state.auth);

    const [loading, setLoading] = useState(true);
    const [called, setCalled] = useState(false)
    const [countryList, setCountryList] = useState([]);
    const [provinceList, setProvinceList] = useState([]);
    const [cityList, setCityList] = useState([]);

    const freelancerApplicationInfo = sessionStorage.getItem('freelancer-application-info') ? JSON.parse(`${sessionStorage.getItem('freelancer-application-info')}`) : {};
    const [freelancerData] = useState({
        about: freelancerApplicationInfo.about || '',
        country_id: freelancerApplicationInfo.location?.country_id ? freelancerApplicationInfo.location?.country_id : '',
        province_id: freelancerApplicationInfo.location?.province_id ? freelancerApplicationInfo.location?.province_id : '',
        city_id: freelancerApplicationInfo.location?.city_id ? freelancerApplicationInfo.location?.city_id : ''
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
        }
    }, [dispatch, called])

    return (
        <Box>
            <Box className="freelancer-main-title">{t('freelancer.title')}</Box>
            <Card className={`rounx-freelancer-card`}>
                <Box className={`rounx-freelancer-heading`}>
                    <Box className='heading-title'>{t('freelancer.about.title')}</Box>
                    <Box className='heading-steps'>{t('freelancer.about.subtitle')}</Box>
                </Box>
                <Divider />
                <Formik
                    initialValues={freelancerData}
                    validationSchema={yup.object({
                        about: yup
                            .string()
                            .required(t('validation.firstname-required')),
                        country_id: yup
                            .string()
                            .required(t('validation.lastname-required')),
                        province_id: yup
                            .string()
                            .required(t('validation.lastname-required')),
                        city_id: yup
                            .string()
                            .required(t('validation.lastname-required'))
                    })}
                    onSubmit={(values) => { }}
                >
                    {formik =>
                        <WithTranslateFormErrors {...formik}>
                            <Box className={`rounx-freelancer-body`}>
                                <Box className="freelancer-card-spacing">
                                    <TextField
                                        multiline={true}
                                        rows={8}
                                        fullWidth
                                        id='about'
                                        name='about'
                                        type="text"
                                        label={t('freelancer.about.about')}
                                        value={formik.values.about}
                                        onChange={formik.handleChange}
                                        error={formik.touched.about && Boolean(formik.errors.about)}
                                        helperText={formik.touched.about && formik.errors.about && (formik.errors.about as ReactNode)}
                                    />
                                </Box>
                                <Box className="freelancer-card-spacing-divider">
                                    <Divider />
                                </Box>
                                <Box className="freelancer-card-spacing">
                                    <Form>
                                        <FormControl fullWidth>
                                            <InputLabel id="freelancer-occupation-select-label">{t('freelancer.about.country')}</InputLabel>
                                            <Select
                                                label={t('freelancer.about.country')}
                                                labelId="freelancer-occupation-select-label"
                                                id="country_id"
                                                name="country_id"
                                                value={formik.values.country_id}
                                                onChange={(e) => {
                                                    setLoading(true)
                                                    dispatch(getProvincesList({ country_id: e.target.value })).then((res) => {
                                                        if (res.payload && res.payload.success) {
                                                            setProvinceList(res.payload.data.records);
                                                        }
                                                    }).catch((err: any) => {
                                                    }).finally(() => {
                                                        setLoading(false)
                                                    })
                                                    formik.handleChange(e)
                                                }}
                                            >
                                                {countryList.map((country: any) => (
                                                    <MenuItem key={country.country_id} value={country.country_id}>{country.country_name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <InputLabel id="freelancer-skills-select-label">{t('freelancer.about.province')}</InputLabel>
                                            <Select
                                                label={t('freelancer.about.province')}
                                                labelId="freelancer-skills-select-label"
                                                id="province_id"
                                                name="province_id"
                                                value={formik.values.province_id}
                                                onChange={(e) => {
                                                    setLoading(true)
                                                    dispatch(getCitiesList({ province_id: e.target.value })).then((res) => {
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
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <InputLabel id="freelancer-skills-select-label">{t('freelancer.about.city')}</InputLabel>
                                            <Select
                                                label={t('freelancer.about.city')}
                                                labelId="freelancer-skills-select-label"
                                                id="city_id"
                                                name="city_id"
                                                value={formik.values.city_id}
                                                onChange={formik.handleChange}
                                            >
                                                {cityList.map((city: any) => (
                                                    <MenuItem key={city.city_id} value={city.city_id}>{city.city_name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Form>
                                </Box>
                            </Box>
                            <Box className={`rounx-freelancer-footer`}>
                                <Button
                                    onClick={() => {
                                        formik.validateForm().then((res: any) => {
                                            // const { languages } = res;
                                            const isValid = false;
                                            if (!isValid) {
                                                formik.submitForm();
                                            }

                                            const saveData = {
                                                ...freelancerApplicationInfo,
                                                about: formik.values.about,
                                                location: {
                                                    country_id: formik.values.country_id,
                                                    province_id: formik.values.province_id,
                                                    city_id: formik.values.city_id
                                                },
                                                username: userInfo?.username
                                            }

                                            // if (isValid) {
                                            sessionStorage.setItem('freelancer-application-info', JSON.stringify(saveData))
                                            setLoading(true);
                                            dispatch(submitFreelancerApplicationAction(saveData)).then((res) => {
                                                if (res.payload && res.payload.success) {
                                                    navigate('/apply-freelancer')
                                                }
                                            }).catch(() => {

                                            }).finally(() => {
                                                setLoading(false)
                                            })
                                            // }
                                        })
                                    }}
                                    style={{ float: "right", marginLeft: 10 }}
                                >
                                    {t('submit')}
                                </Button>
                                <Button
                                    variant="text"
                                    onClick={() => {
                                        navigate('/apply-freelancer/languages', { replace: true })
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
                sx={{ color: '#fff', zIndex: 999 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    )
}

export default AboutMe;
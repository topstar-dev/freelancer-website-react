import { Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Button from "../../../../components/button/Button";
import { Formik } from "formik";
import WithTranslateFormErrors from "../../../../services/validationScemaOnLangChange";
import { Box } from "@mui/system";
import { useEditFreelancer } from "../../../applyFreelancer/useEditFreelancer";
import CustomBackdrop from "../../../../components/customBackdrop/CustomBackdrop";
import { useProfileContext } from "../../Profile";
import useBreakpoint from "../../../../components/breakpoints/BreakpointProvider";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { getCitiesList, getCountriesList, getProvincesList } from "../../../../redux/resources/resourcesActions";
import { COUNTRY_ID_CHINA, USER_TYPES } from "../../../../redux/constants";
import Form from "../../../../components/form/Form";

const EditBasicInformation = ({
    country_id,
    province_id,
    city_id,
    username,
    user_type
}: any) => {
    const { t, i18n } = useTranslation();
    const { isMobile } = useBreakpoint();
    const dispatch = useAppDispatch();
    const editFreelancer = useEditFreelancer();
    const { updateProfileData } = useProfileContext();
    const [basicInfo] = useState({
        country_id: country_id ? country_id : '',
        province_id: province_id ? province_id : '',
        city_id: city_id ? city_id : '',
        username: username ? username : ''
    });

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [called, setCalled] = useState(false)
    const [countryList, setCountryList] = useState([]);
    const [provinceList, setProvinceList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const { language } = useAppSelector(state => state.resources);

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

            if (basicInfo.country_id && basicInfo.country_id?.toString() === COUNTRY_ID_CHINA) {
                dispatch(getProvincesList({ country_id: Number(basicInfo.country_id) })).then((res) => {
                    if (res.payload && res.payload.success) {
                        setProvinceList(res.payload.data.records);
                    }
                }).catch((err: any) => {
                }).finally(() => {
                    setLoading(false)
                })
            }

            if (basicInfo.province_id && basicInfo.country_id?.toString() === COUNTRY_ID_CHINA) {
                dispatch(getCitiesList({ province_id: Number(basicInfo.province_id), country_id: Number(basicInfo.country_id) })).then((res) => {
                    if (res.payload && res.payload.success) {
                        setCityList(res.payload.data.records);
                    }
                }).catch((err: any) => {
                }).finally(() => {
                    setLoading(false)
                })
            }
        }
    }, [dispatch, called, basicInfo.province_id, basicInfo.city_id, basicInfo.country_id])

    useEffect(() => {
        if (language && i18n.language && i18n.language !== language) {
            setCalled(false)
        }
    }, [i18n, language])

    const getName = (id: number, type: string) => {
        if (type === 'country') {
            return (countryList.find((e: any) => e.country_id === id) as any)?.country_name;
        } else if (type === 'province') {
            return (provinceList.find((e: any) => e.province_id === id) as any)?.province_name;
        } else if (type === 'city') {
            return (cityList.find((e: any) => e.city_id === id) as any)?.city_name;
        }
    }

    return (
        <>
            {country_id || province_id || city_id ?
                <IconButton
                    className="edit-button-base"
                    onClick={() => setShow(true)}
                >
                    <EditIcon className="edit-icon" />
                </IconButton>
                :
                <Chip
                    className="add-new-chip"
                    onClick={() => setShow(true)}
                    variant="outlined"
                    style={{ paddingLeft: '10px', paddingRight: '10px' }}
                    avatar={<AddIcon />}
                    label={t('add-basic-info')}
                />
            }
            <Dialog
                fullScreen={isMobile}
                open={show}
                maxWidth="lg"
                className="editBasicInfoModal"
            >
                <Formik
                    enableReinitialize
                    initialValues={basicInfo}
                    validationSchema={yup.object({
                        username: yup
                            .string()
                            .required(t('validation.username-required')),
                        country_id: yup
                            .string()
                            .required(t('validation.country-required')),
                        province_id: yup
                            .string(),
                        city_id: yup
                            .string()
                    })}
                    onSubmit={values => {
                        console.log("onSubmit", JSON.stringify(values, null, 2));
                    }}
                >
                    {formik =>
                        <WithTranslateFormErrors {...formik}>
                            <DialogContent>
                                <DialogTitle>
                                    <Box className={`heading-flex`}>
                                        <Box>
                                            <Box className='profile-edit-heading-title'>{t('profile.basic-info-title')}</Box>
                                        </Box>
                                    </Box>
                                </DialogTitle>
                                <Box style={{ paddingTop: '10px' }} className={isMobile ? "profile-edit-dialog-body" : "profile-edit-dialog-body"}>
                                    <Form className="profile-card-spacing" style={{ paddingTop: 0, paddingBottom: 0 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="profile-country-id-select-label">{t('freelancer.about.country')}</InputLabel>
                                            <Select
                                                label={t('freelancer.about.country')}
                                                labelId="profile-country-id-select-label"
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

                                        {user_type === USER_TYPES.FREELANCER ?
                                            <Box>
                                                <Box style={{ marginTop: 16, marginBottom: 40 }}><Divider /></Box>
                                                <TextField
                                                    fullWidth
                                                    id="username"
                                                    name="username"
                                                    type="text"
                                                    label={t('profile.username')}
                                                    value={formik.values.username ? formik.values.username : ''}
                                                    onChange={formik.handleChange}
                                                    error={formik.touched.username && Boolean(formik.errors.username)}
                                                    helperText={formik.touched.username && formik.errors.username && formik.errors.username as ReactNode}
                                                />
                                            </Box>
                                            :
                                            ''
                                        }
                                    </Form>
                                </Box>
                                <DialogActions style={{ paddingBottom: '20px', paddingRight: '24px', paddingTop: '40px' }}>
                                    <Button
                                        variant="text"
                                        onClick={() => {
                                            setShow(false)
                                        }}>
                                        {t('cancel')}
                                    </Button>
                                    <Button
                                        style={{ marginLeft: 10 }}
                                        onClick={() => {
                                            formik.validateForm().then((res: any) => {
                                                const { country_id } = res;
                                                if (country_id || res.username) {
                                                    formik.submitForm();
                                                }

                                                const updatedValues: any = {
                                                    country_id: formik.values.country_id,
                                                    country_name: getName(formik.values.country_id, 'country'),
                                                    location: [getName(formik.values.country_id, 'country')]
                                                }

                                                const saveData: any = {
                                                    location: {
                                                        country_id: formik.values.country_id
                                                    }
                                                }

                                                if (user_type === USER_TYPES.FREELANCER && username !== formik.values.username) {
                                                    saveData['username'] = formik.values.username;
                                                    updatedValues.username = formik.values.username;
                                                }

                                                if (formik.values.province_id) {
                                                    saveData.location['province_id'] = formik.values.province_id;
                                                    updatedValues['province_id'] = formik.values.province_id;
                                                    updatedValues['province_name'] = getName(formik.values.province_id, 'province');
                                                    updatedValues.location.unshift(getName(formik.values.province_id, 'province'))
                                                }

                                                if (formik.values.city_id) {
                                                    saveData.location['city_id'] = formik.values.city_id;
                                                    updatedValues['city_id'] = formik.values.city_id;
                                                    updatedValues['city_name'] = getName(formik.values.city_id, 'city');
                                                    updatedValues.location.unshift(getName(formik.values.city_id, 'city'))
                                                }

                                                if (!(country_id || res.username)) {
                                                    setLoading(true);
                                                    updatedValues.location = i18n.language === 'zh-CN' ? updatedValues.location.reverse().join(', ') : updatedValues.location.join(', ');
                                                    editFreelancer(saveData).then(() => {
                                                        setShow(false)
                                                        updateProfileData(updatedValues)
                                                    })
                                                        .catch(() => { })
                                                        .finally(() => { setLoading(false) })
                                                }
                                            })
                                        }}>{t('user-personal-account-save')}</Button>
                                </DialogActions>
                            </DialogContent>
                        </WithTranslateFormErrors>
                    }
                </Formik>
                <CustomBackdrop loading={loading} />
            </Dialog>
        </>
    )
}

export default EditBasicInformation;
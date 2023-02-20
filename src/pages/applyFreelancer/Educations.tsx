import React, { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from "yup";
import { FieldArray, Formik, getIn } from 'formik';
import { Box } from '@mui/system';
import { Backdrop, CircularProgress, Divider, FormHelperText, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import Form from '../../components/form/Form';
import Button from '../../components/button/Button';
import Card from '../../components/card/Card';
import { useNavigate } from '../../routes/Router';
import WithTranslateFormErrors from '../../services/validationScemaOnLangChange';
import './applyFreelancer.css';
import { useEditFreelancer } from './useEditFreelancer';

const Educations = (props: any) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const editFreelancer = useEditFreelancer();
    let pushMethod: any = () => { }

    const freelancerApplicationInfo = sessionStorage.getItem('freelancer-application-info') ? JSON.parse(`${sessionStorage.getItem('freelancer-application-info')}`) : {};
    const [freelancerData] = useState({
        educations: freelancerApplicationInfo.educations && freelancerApplicationInfo.educations.length > 0 ?
            freelancerApplicationInfo.educations
            :
            [{
                major_name: '',
                school_name: '',
                start_year: '',
                end_year: '',
                description: '',
            }]
    });
    const [backdrop, setBackdrop] = useState(false);

    useEffect(() => {
        document.title = t('title.freelancer');
    })

    return (
        <Box>
            <Box className="freelancer-main-title">{t('freelancer.title')}</Box>
            <Card className={`freelancer-card`}>
                <Formik
                    enableReinitialize
                    initialValues={freelancerData}
                    validationSchema={yup.object({
                        educations: yup.array().of(
                            yup.object().shape({
                                major_name: yup.string().required(t('validation.major-name-required')),
                                school_name: yup.string().required(t('validation.school-name-required')),
                                start_year: yup
                                    .number()
                                    .integer()
                                    .min(1990, t('validation.start-year-max', { max: 1990 }))
                                    .required(t('validation.start-year-required')),
                                end_year: yup
                                    .number()
                                    .integer()
                                    .nullable()
                                    .min(yup.ref("start_year"), t('validation.end-year-min')),
                                description: yup.string()
                                    .min(20, t('validation.characters-min', { min: 20 }))
                                    .max(1000, t('validation.characters-max', { max: 1000 }))
                                    .nullable()
                            }))
                            .max(20)
                    })}
                    onSubmit={values => {
                        console.log("onSubmit", JSON.stringify(values, null, 2));
                    }}
                >
                    {formik =>
                        <WithTranslateFormErrors {...formik}>
                            <Box className={`freelancer-heading  heading-flex`}>
                                <Box>
                                    <Box className='heading-title'>{t('freelancer.educations.title')}</Box>
                                    <Box className='heading-steps'>{t('freelancer.educations.subtitle')}</Box>
                                </Box>
                                <Box className="center-item">
                                    {formik.values.educations.length < 20 &&
                                        <IconButton onClick={() => {
                                            pushMethod({
                                                major_name: '',
                                                school_name: '',
                                                start_year: '',
                                                end_year: '',
                                                description: '',
                                            })
                                        }}>
                                            <AddIcon className='add-icon' />
                                        </IconButton>
                                    }
                                </Box>
                            </Box>
                            <Divider />
                            <Box className={`freelancer-body`}>
                                <FieldArray name="educations">
                                    {({ unshift, remove }) => {
                                        pushMethod = unshift;
                                        return formik.values.educations.map((exp: any, index: number) => {

                                            const majorName = `educations[${index}].major_name`;
                                            const touchedMajorName = getIn(formik.touched, majorName);
                                            const errorMajorName = getIn(formik.errors, majorName);

                                            const schoolName = `educations[${index}].school_name`;
                                            const touchedSchoolName = getIn(formik.touched, schoolName);
                                            const errorSchoolName = getIn(formik.errors, schoolName);

                                            const startYear = `educations[${index}].start_year`;
                                            const touchedStartYear = getIn(formik.touched, startYear);
                                            const errorStartYear = getIn(formik.errors, startYear);

                                            const endYear = `educations[${index}].end_year`;
                                            const touchedEndYear = getIn(formik.touched, endYear);
                                            const errorEndYear = getIn(formik.errors, endYear);

                                            const description = `educations[${index}].description`;
                                            const touchedDescription = getIn(formik.touched, description);
                                            const errorDescription = getIn(formik.errors, description);

                                            return (
                                                <React.Fragment key={index}>
                                                    <Box className="freelancer-experience-flex">
                                                        <Box className="freelancer-card-spacing-close-icon">
                                                            <IconButton
                                                                className='close-icon'
                                                                onClick={() => {
                                                                    remove(index)
                                                                }}>
                                                                <CloseIcon />
                                                            </IconButton>
                                                        </Box>
                                                        <Box className="freelancer-card-spacing-multiple">
                                                            <Form>
                                                                <TextField
                                                                    fullWidth
                                                                    id={majorName}
                                                                    name={majorName}
                                                                    type="text"
                                                                    label={t('freelancer.educations.major')}
                                                                    value={exp.major_name ? exp.major_name : ''}
                                                                    onChange={formik.handleChange}
                                                                    error={touchedMajorName && Boolean(errorMajorName)}
                                                                    helperText={touchedMajorName && errorMajorName && (errorMajorName as ReactNode)}
                                                                />
                                                                <TextField
                                                                    fullWidth
                                                                    id={schoolName}
                                                                    name={schoolName}
                                                                    type="text"
                                                                    label={t('freelancer.educations.school')}
                                                                    value={exp.school_name ? exp.school_name : ''}
                                                                    onChange={formik.handleChange}
                                                                    error={touchedSchoolName && Boolean(errorSchoolName)}
                                                                    helperText={touchedSchoolName && errorSchoolName && (errorSchoolName as ReactNode)}
                                                                />
                                                                <Box style={{ display: 'flex', gap: '24px' }}>
                                                                    <TextField
                                                                        fullWidth
                                                                        id={startYear}
                                                                        name={startYear}
                                                                        type="text"
                                                                        label={t('freelancer.educations.start-year')}
                                                                        value={exp.start_year ? exp.start_year : ''}
                                                                        onChange={(e) => {
                                                                            if (!e.target.value) {
                                                                                formik.handleChange(e);
                                                                            } else if (!isNaN(Number(e.target.value))) {
                                                                                formik.handleChange(e);
                                                                            }
                                                                        }}
                                                                        error={touchedStartYear && Boolean(errorStartYear)}
                                                                        helperText={touchedStartYear && errorStartYear && (errorStartYear as ReactNode)}
                                                                    />
                                                                    <TextField
                                                                        fullWidth
                                                                        id={endYear}
                                                                        name={endYear}
                                                                        type="text"
                                                                        label={t('freelancer.educations.end-year')}
                                                                        value={exp.end_year ? exp.end_year : ''}
                                                                        onChange={(e) => {
                                                                            if (!e.target.value) {
                                                                                formik.handleChange(e);
                                                                            } else if (!isNaN(Number(e.target.value))) {
                                                                                formik.handleChange(e);
                                                                            }
                                                                        }}
                                                                        error={touchedEndYear && Boolean(errorEndYear)}
                                                                        helperText={touchedEndYear && errorEndYear && (errorEndYear as ReactNode)}
                                                                    />
                                                                </Box>
                                                                <TextField
                                                                    multiline={true}
                                                                    rows={5}
                                                                    fullWidth
                                                                    id={description}
                                                                    name={description}
                                                                    type="text"
                                                                    label={t('freelancer.educations.description')}
                                                                    value={exp.description ? exp.description : ''}
                                                                    onChange={formik.handleChange}
                                                                    error={touchedDescription && Boolean(errorDescription)}
                                                                    helperText={touchedDescription && errorDescription && (errorDescription as ReactNode)}
                                                                />
                                                            </Form>
                                                        </Box>
                                                    </Box>
                                                    {index < formik.values.educations.length - 1 && <Box className="right-divider"><Divider /></Box>}
                                                </React.Fragment>
                                            )
                                        })
                                    }}
                                </FieldArray>
                                {formik.touched.educations && formik.errors.educations && typeof formik.errors.educations === 'string' && <FormHelperText style={{ padding: '0 72px', color: '#d32f2f' }}>{formik.errors.educations as ReactNode}</FormHelperText>}
                            </Box>
                            <Box className={`freelancer-footer`}>
                                <Button
                                    onClick={() => {
                                        formik.validateForm().then((res: any) => {
                                            const { educations } = res;
                                            const isValid = educations ? educations.length < 1 : true;
                                            if (!isValid) {
                                                formik.submitForm();
                                            }

                                            const saveData = {
                                                educations: formik.values.educations.map((e: any, index: number) => {
                                                    const tempObj: any = { order: index };
                                                    tempObj['major_name'] = e.major_name;
                                                    tempObj['school_name'] = e.school_name;
                                                    tempObj['start_year'] = e.start_year;

                                                    if (e['end_year']) {
                                                        tempObj['end_year'] = e.end_year;
                                                    }

                                                    if (e['description']) {
                                                        tempObj['description'] = e.description;
                                                    }

                                                    return tempObj;
                                                })
                                            }

                                            if (isValid) {
                                                setBackdrop(true)
                                                editFreelancer(saveData).then(() => {
                                                    navigate('/apply-freelancer/languages')
                                                }).catch(() => { })
                                                    .finally(() => { setBackdrop(false) })
                                            }
                                        })
                                    }}
                                    style={{ float: "right", marginLeft: 10 }}
                                >
                                    {t('next')}
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
                open={backdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    )
}

export default Educations;
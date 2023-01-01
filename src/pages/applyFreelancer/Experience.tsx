import { ReactNode, useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import * as yup from "yup";
import { FieldArray, Formik, getIn } from 'formik';
import { Divider, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import Form from '../../components/form/Form';
import Button from '../../components/button/Button';
import Card from '../../components/card/Card';
import { useNavigate } from '../../routes/Router';
import WithTranslateFormErrors from '../../services/validationScemaOnLangChange';
import './applyFreelancer.css';

const Experience = (props: any) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    let pushMethod: any = () => { }

    const freelancerApplicationInfo = sessionStorage.getItem('freelancer-application-info') ? JSON.parse(`${sessionStorage.getItem('freelancer-application-info')}`) : {};
    const [freelancerData] = useState({
        experiences: freelancerApplicationInfo.experiences || [{
            company_name: '',
            job_title: '',
            start_year: '',
            end_year: '',
            description: '',
        }]
    });

    useEffect(() => {
        document.title = t('title.freelancer');
    })

    return (
        <Box>
            <Box className="freelancer-main-title">{t('freelancer.title')}</Box>
            <Card className={`rounx-freelancer-card`}>
                <Box className={`rounx-freelancer-heading heading-flex`}>
                    <Box>
                        <Box className='heading-title'>{t('freelancer.experience.title')}</Box>
                        <Box className='heading-steps'>{t('freelancer.experience.subtitle')}</Box>
                    </Box>
                    <Box className="center-item">
                        <AddIcon className='add-icon' onClick={() => {
                            pushMethod({
                                company_name: '',
                                job_title: '',
                                start_year: '',
                                end_year: '',
                                description: '',
                            })
                        }} />
                    </Box>
                </Box>
                <Divider />
                <Formik
                    enableReinitialize
                    initialValues={freelancerData}
                    validationSchema={yup.object({
                        experiences: yup.array()
                            .of(yup.object().shape({
                                job_title: yup.string().required("First name is required"),
                                company_name: yup.string().required("Last name is required"),
                                start_year: yup.string().required("Last name is required"),
                                end_year: yup.string().required("Last name is required"),
                                description: yup.string().required("Last name is required")
                            }))
                            .min(1)
                            .max(2, 'max 2p')
                    })}
                    onSubmit={values => {
                        console.log("onSubmit", JSON.stringify(values, null, 2));
                    }}
                >
                    {formik =>
                        <WithTranslateFormErrors {...formik}>
                            <Box className={`rounx-freelancer-body`}>
                                <FieldArray name="experiences">
                                    {({ unshift, remove }) => (
                                        formik.values.experiences.map((exp: any, index: number) => {
                                            pushMethod = unshift;

                                            const jobTitle = `experiences[${index}].job_title`;
                                            const touchedJobTitle = getIn(formik.touched, jobTitle);
                                            const errorJobTitle = getIn(formik.errors, jobTitle);

                                            const companyName = `experiences[${index}].company_name`;
                                            const touchedCompanyName = getIn(formik.touched, companyName);
                                            const errorCompanyName = getIn(formik.errors, companyName);

                                            const startYear = `experiences[${index}].start_year`;
                                            const touchedStartYear = getIn(formik.touched, startYear);
                                            const errorStartYear = getIn(formik.errors, startYear);

                                            const endYear = `experiences[${index}].end_year`;
                                            const touchedEndYear = getIn(formik.touched, endYear);
                                            const errorEndYear = getIn(formik.errors, endYear);

                                            const description = `experiences[${index}].description`;
                                            const touchedDescription = getIn(formik.touched, description);
                                            const errorDescription = getIn(formik.errors, description);

                                            return (
                                                <Box key={index} className="freelancer-experience-flex">
                                                    <Box className="freelancer-card-spacing">
                                                        <CloseIcon
                                                            className='close-icon'
                                                            onClick={() => {
                                                                if (formik.values.experiences.length > 1) {
                                                                    remove(index)
                                                                }
                                                            }}
                                                        />
                                                    </Box>
                                                    <Box className="freelancer-card-spacing" style={{ paddingLeft: 0, width: '100%' }}>
                                                        <Form>
                                                            <TextField
                                                                fullWidth
                                                                id={jobTitle}
                                                                name={jobTitle}
                                                                type="text"
                                                                label={t('freelancer.experience.position')}
                                                                value={exp.job_title}
                                                                onChange={formik.handleChange}
                                                                error={touchedJobTitle && Boolean(errorJobTitle)}
                                                                helperText={touchedJobTitle && errorJobTitle && (errorJobTitle as ReactNode)}
                                                            />
                                                            <TextField
                                                                fullWidth
                                                                id={companyName}
                                                                name={companyName}
                                                                type="text"
                                                                label={t('freelancer.experience.company')}
                                                                value={exp.company_name}
                                                                onChange={formik.handleChange}
                                                                error={touchedCompanyName && Boolean(errorCompanyName)}
                                                                helperText={touchedCompanyName && errorCompanyName && (errorCompanyName as ReactNode)}
                                                            />
                                                            <Box style={{ display: 'flex', gap: '24px' }}>
                                                                <TextField
                                                                    fullWidth
                                                                    id={startYear}
                                                                    name={startYear}
                                                                    type="text"
                                                                    label={t('freelancer.experience.start-year')}
                                                                    value={exp.start_year}
                                                                    onChange={formik.handleChange}
                                                                    error={touchedStartYear && Boolean(errorStartYear)}
                                                                    helperText={touchedStartYear && errorStartYear && (errorStartYear as ReactNode)}
                                                                />
                                                                <TextField
                                                                    fullWidth
                                                                    id={endYear}
                                                                    name={endYear}
                                                                    type="text"
                                                                    label={t('freelancer.experience.end-year')}
                                                                    value={exp.end_year}
                                                                    onChange={formik.handleChange}
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
                                                                label={t('freelancer.experience.description')}
                                                                value={exp.description}
                                                                onChange={formik.handleChange}
                                                                error={touchedDescription && Boolean(errorDescription)}
                                                                helperText={touchedDescription && errorDescription && (errorDescription as ReactNode)}
                                                            />
                                                        </Form>
                                                        {index < formik.values.experiences.length - 1 && <Divider className="freelancer-card-spacing" />}
                                                    </Box>
                                                </Box>
                                            )
                                        })
                                    )}
                                </FieldArray>
                            </Box>
                            <Box className={`rounx-freelancer-footer`}>
                                <Button
                                    onClick={() => {
                                        formik.validateForm().then((res: any) => {
                                            const { experiences } = res;
                                            const isValid = experiences ? experiences.length < 1 : true;
                                            if (!isValid) {
                                                formik.submitForm();
                                            }

                                            const saveData = {
                                                experiences: formik.values.experiences.map((e: any, index: number) => ({ ...e, order: index }))
                                            }

                                            sessionStorage.setItem('freelancer-application-info', JSON.stringify({ ...freelancerApplicationInfo, ...saveData }))
                                            if (isValid) {
                                                navigate('/apply-freelancer/education')
                                            }
                                        })
                                    }}
                                    style={{ float: "right" }}
                                >
                                    {t('next')}
                                </Button>
                                <Button
                                    variant="text"
                                    onClick={() => {
                                        navigate('/apply-freelancer/info')
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
        </Box>
    )
}

export default Experience;
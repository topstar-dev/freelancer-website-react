import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from "yup";
import { FieldArray, Formik, getIn } from 'formik';
import { Box } from '@mui/system';
import { Divider, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import Form from '../../components/form/Form';
import Button from '../../components/button/Button';
import Card from '../../components/card/Card';
import { useNavigate } from '../../routes/Router';
import WithTranslateFormErrors from '../../services/validationScemaOnLangChange';
import './applyFreelancer.css';

const Education = (props: any) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    let pushMethod: any = () => { }

    return (
        <Box>
            <Box className="freelancer-main-title">{t('freelancer.title')}</Box>
            <Card className={`rounx-freelancer-card`}>
                <Box className={`rounx-freelancer-heading  heading-flex`}>
                    <Box>
                        <Box className='heading-title'>{t('freelancer.education.title')}</Box>
                        <Box className='heading-steps'>{t('freelancer.education.subtitle')}</Box>
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
                <Box className={`rounx-freelancer-body`}>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            educations: [
                                {
                                    school_name: '',
                                    major_name: '',
                                    start_year: '',
                                    end_year: '',
                                    description: '',
                                }
                            ]
                        }}
                        validationSchema={yup.object({
                            educations: yup.array().of(
                                yup.object().shape({
                                    language_code: yup.string().required("First name is required"),
                                    language_skill: yup.string().required("Last name is required")
                                })
                            )
                        })}
                        onSubmit={values => {
                            console.log("onSubmit", JSON.stringify(values, null, 2));
                        }}
                    >
                        {formik =>
                            <WithTranslateFormErrors {...formik}>
                                <FieldArray name="educations">
                                    {({ push, remove }) => (
                                        formik.values.educations.map((exp, index) => {
                                            pushMethod = push;

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
                                                <Box className="freelancer-experience-flex">
                                                    <Box className="freelancer-card-spacing">
                                                        <CloseIcon
                                                            className='close-icon'
                                                            onClick={() => {
                                                                if (formik.values.educations.length > 1) {
                                                                    remove(index)
                                                                }
                                                            }}
                                                        />
                                                    </Box>
                                                    <Box className="freelancer-card-spacing" style={{ paddingLeft: 0, width: '100%' }}>
                                                        <Form>
                                                            <TextField
                                                                fullWidth
                                                                id={majorName}
                                                                name={majorName}
                                                                type="text"
                                                                label={t('freelancer.education.major')}
                                                                value={exp.major_name}
                                                                onChange={formik.handleChange}
                                                                error={touchedMajorName && Boolean(errorMajorName)}
                                                                helperText={touchedMajorName && errorMajorName && (errorMajorName as ReactNode)}
                                                            />
                                                            <TextField
                                                                fullWidth
                                                                id={schoolName}
                                                                name={schoolName}
                                                                type="text"
                                                                label={t('freelancer.education.school')}
                                                                value={exp.school_name}
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
                                                                    label={t('freelancer.education.start-year')}
                                                                    value={exp.start_year}
                                                                    onChange={formik.handleChange}
                                                                    error={touchedStartYear && Boolean(errorStartYear)}
                                                                    helperText={touchedStartYear && errorStartYear && (errorStartYear as ReactNode)}
                                                                />
                                                                <TextField
                                                                    fullWidth
                                                                    id="endYear"
                                                                    name="endYear"
                                                                    type="text"
                                                                    label={t('freelancer.education.end-year')}
                                                                    value={exp.end_year}
                                                                    onChange={formik.handleChange}
                                                                    error={touchedEndYear && Boolean(errorEndYear)}
                                                                    helperText={touchedEndYear && errorEndYear && (errorEndYear as ReactNode)}
                                                                />
                                                            </Box>
                                                            <TextField
                                                                multiline={true}
                                                                rows={5}
                                                                maxRows={5}
                                                                fullWidth
                                                                id={description}
                                                                name={description}
                                                                type="text"
                                                                label={t('freelancer.education.description')}
                                                                value={exp.description}
                                                                onChange={formik.handleChange}
                                                                error={touchedDescription && Boolean(errorDescription)}
                                                                helperText={touchedDescription && errorDescription && (errorDescription as ReactNode)}
                                                            />
                                                        </Form>
                                                    </Box>
                                                </Box>
                                            )
                                        })
                                    )}
                                </FieldArray>
                            </WithTranslateFormErrors>
                        }
                    </Formik>
                </Box>
                <Box className={`rounx-freelancer-footer`}>
                    <Button
                        // disabled={loading}
                        // type="submit"
                        onClick={() => {
                            navigate('/apply-freelancer/languages')
                        }}
                        style={{ float: "right" }}
                    >
                        {t('next')}
                    </Button>
                    <Button
                        // disabled={loading}
                        // type="submit"
                        variant="text"
                        onClick={() => {
                            navigate('/apply-freelancer/experience')
                        }}
                        style={{ float: "right" }}
                    >
                        {t('back')}
                    </Button>
                </Box>
            </Card>
        </Box>
    )
}

export default Education;
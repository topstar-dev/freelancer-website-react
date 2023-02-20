import { Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormHelperText, IconButton, TextField } from "@mui/material";
import React, { ReactNode, useState } from "react";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Button from "../../../../components/button/Button";
import { FieldArray, Formik, getIn } from "formik";
import WithTranslateFormErrors from "../../../../services/validationScemaOnLangChange";
import { Box } from "@mui/system";
import Form from "../../../../components/form/Form";
import { useEditFreelancer } from "../../../applyFreelancer/useEditFreelancer";
import CustomBackdrop from "../../../../components/customBackdrop/CustomBackdrop";
import { useProfileContext } from "../../Profile";
import useBreakpoint from "../../../../components/breakpoints/BreakpointProvider";

const EditExperiences = ({ experiences }: any) => {
    const { t } = useTranslation();
    const { isMobile } = useBreakpoint()
    const editFreelancer = useEditFreelancer();
    const { updateProfileData } = useProfileContext();

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    let pushMethod: any = () => { }

    return (
        <>
            {experiences && experiences.length > 0 ?
                <EditIcon
                    className="edit-icon"
                    onClick={() => setShow(true)}
                />
                :
                <Chip
                    className="add-new-chip"
                    onClick={() => setShow(true)}
                    variant="outlined"
                    style={{ paddingLeft: '10px', paddingRight: '10px' }}
                    avatar={<AddIcon />}
                    label={t('add-experience')}
                />
            }
            <Dialog
                fullScreen={isMobile}
                open={show}
                onClose={() => {
                    setShow(false)
                }}
                maxWidth="lg"
                className="editLanguagesModal"
            >
                <Formik
                    enableReinitialize
                    initialValues={{
                        experiences: experiences.length ?
                            experiences
                            :
                            [{
                                company_name: '',
                                job_title: '',
                                start_year: '',
                                end_year: '',
                                description: '',
                            }]
                    }}
                    validationSchema={yup.object({
                        experiences: yup.array()
                            .of(yup.object().shape({
                                job_title: yup.string().required(t('validation.job-title-required')),
                                company_name: yup.string().required(t('validation.company-name-required')),
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
                            .min(1)
                            .max(20)
                    })}
                    onSubmit={values => {
                        console.log("onSubmit", JSON.stringify(values, null, 2));
                    }}
                >
                    {formik =>
                        <WithTranslateFormErrors {...formik}>
                            <DialogContent>
                                <DialogTitle style={{ marginTop: 6 }}>
                                    <Box className={`heading-flex`}>
                                        <Box>
                                            <Box className='profile-edit-heading-title'>{t('freelancer.experiences.title')}</Box>
                                        </Box>
                                        <Box className="center-item">
                                            {formik.values.experiences.length < 20 &&
                                                <IconButton>
                                                    <AddIcon className='add-icon' onClick={() => {
                                                        pushMethod({
                                                            company_name: '',
                                                            job_title: '',
                                                            start_year: '',
                                                            end_year: '',
                                                            description: '',
                                                        })
                                                    }} />
                                                </IconButton>
                                            }
                                        </Box>
                                    </Box>
                                </DialogTitle>
                                <Box className={isMobile ? "profile-edit-dialog-body profile-edit-dialog-body-mobile" : "profile-edit-dialog-body"}>
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
                                                    <React.Fragment key={index}>
                                                        <Box className="flex-items">
                                                            <Box className="profile-card-spacing-close-icon">
                                                                <IconButton className='profile-close-icon'>
                                                                    <CloseIcon
                                                                        onClick={() => {
                                                                            if (formik.values.experiences.length > 1) {
                                                                                remove(index)
                                                                            }
                                                                        }}
                                                                    />
                                                                </IconButton>
                                                            </Box>
                                                            <Box className="profile-card-spacing-multiple">
                                                                <Form className="freelancer-form">
                                                                    <TextField
                                                                        fullWidth
                                                                        id={jobTitle}
                                                                        name={jobTitle}
                                                                        type="text"
                                                                        label={t('freelancer.experiences.position')}
                                                                        value={exp.job_title ? exp.job_title : ''}
                                                                        onChange={formik.handleChange}
                                                                        error={touchedJobTitle && Boolean(errorJobTitle)}
                                                                        helperText={touchedJobTitle && errorJobTitle && (errorJobTitle as ReactNode)}
                                                                    />
                                                                    <TextField
                                                                        fullWidth
                                                                        id={companyName}
                                                                        name={companyName}
                                                                        type="text"
                                                                        label={t('freelancer.experiences.company')}
                                                                        value={exp.company_name ? exp.company_name : ''}
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
                                                                            label={t('freelancer.experiences.start-year')}
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
                                                                            label={t('freelancer.experiences.end-year')}
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
                                                                        label={t('freelancer.experiences.description')}
                                                                        value={exp.description ? exp.description : ''}
                                                                        onChange={formik.handleChange}
                                                                        error={touchedDescription && Boolean(errorDescription)}
                                                                        helperText={touchedDescription && errorDescription && (errorDescription as ReactNode)}
                                                                    />
                                                                </Form>
                                                            </Box>
                                                        </Box>
                                                        {index < formik.values.experiences.length - 1 && <Box className="right-divider"><Divider /></Box>}
                                                    </React.Fragment>
                                                )
                                            })
                                        )}
                                    </FieldArray>
                                    {formik.touched.experiences && formik.errors.experiences && typeof formik.errors.experiences === 'string' && <FormHelperText style={{ padding: '0 72px', color: '#d32f2f' }}>{formik.errors.experiences as ReactNode}</FormHelperText>}
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
                                                const { experiences } = res;
                                                const isValid = experiences ? experiences.length < 1 : true;
                                                if (!isValid) {
                                                    formik.submitForm();
                                                }

                                                const saveData = {
                                                    experiences: formik.values.experiences.map((e: any, index: number) => {
                                                        const tempObj: any = { order: index };
                                                        tempObj['company_name'] = e.company_name;
                                                        tempObj['job_title'] = e.job_title;
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
                                                    setLoading(true);
                                                    editFreelancer(saveData).then(() => {
                                                        setShow(false)
                                                        updateProfileData(saveData)
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

export default EditExperiences;
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

const EditEducations = ({ educations }: any) => {
    const { t } = useTranslation();
    const { isMobile } = useBreakpoint()
    const editFreelancer = useEditFreelancer();
    const { updateProfileData } = useProfileContext();

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    let pushMethod: any = () => { }

    return (
        <>
            {educations && educations.length > 0 ?
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
                    label={t('add-educations')}
                />
            }
            <Dialog
                fullScreen={isMobile}
                open={show}
                maxWidth="lg"
                className="editLanguagesModal"
            >
                <Formik
                    enableReinitialize
                    initialValues={{
                        educations: educations.length ?
                            educations
                            :
                            [{
                                major_name: '',
                                school_name: '',
                                start_year: '',
                                end_year: '',
                                description: '',
                            }]
                    }}
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
                            <DialogContent>
                                <DialogTitle style={{ marginTop: 6 }}>
                                    <Box className={`heading-flex`}>
                                        <Box>
                                            <Box className='profile-edit-heading-title'>{t('freelancer.educations.title')}</Box>
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
                                </DialogTitle>
                                <Box className={isMobile ? "profile-edit-dialog-body profile-edit-dialog-body-mobile" : "profile-edit-dialog-body"}>
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
                                                        <Box className="flex-items">
                                                            <Box className="profile-card-spacing-close-icon">
                                                                <IconButton
                                                                    className='profile-close-icon'
                                                                    onClick={() => {
                                                                        remove(index)
                                                                    }}
                                                                >
                                                                    <CloseIcon />
                                                                </IconButton>
                                                            </Box>
                                                            <Box className="profile-card-spacing-multiple">
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

export default EditEducations;
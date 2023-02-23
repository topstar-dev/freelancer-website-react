import { Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import React, { ReactNode, useState } from "react";
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
import Form from "../../../../components/form/Form";

const EditAbout = ({ about }: any) => {
    const { t } = useTranslation();
    const { isMobile } = useBreakpoint()
    const editFreelancer = useEditFreelancer();
    const { updateProfileData } = useProfileContext();

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <>
            {about ?
                <IconButton
                    onClick={() => setShow(true)}
                    className="edit-button-base"
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
                    label={t('add-about')}
                />
            }
            <Dialog
                fullScreen={isMobile}
                open={show}
                maxWidth="lg"
                className="editAboutModal"
            >
                <Formik
                    enableReinitialize
                    initialValues={{ about: about || '' }}
                    validationSchema={yup.object({
                        about: yup
                            .string()
                            .min(20, t('validation.characters-min', { min: 20 }))
                            .max(1000, t('validation.characters-max', { max: 1000 }))
                            .required(t('validation.about-required'))
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
                                            <Box className='profile-edit-heading-title'>{t('freelancer.about.title')}</Box>
                                        </Box>
                                    </Box>
                                </DialogTitle>
                                <Box style={{ paddingTop: '10px' }} className={isMobile ? "profile-edit-dialog-body" : "profile-edit-dialog-body"}>
                                    <Form className="profile-card-spacing" style={{ paddingTop: 0, paddingBottom: 0 }}>
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
                                            style={{ width: '100%' }}
                                            error={formik.touched.about && Boolean(formik.errors.about)}
                                            helperText={formik.touched.about && formik.errors.about ? (formik.errors.about as ReactNode) : t('profile.write-a-short-summary')}
                                        />
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
                                                const { about } = res;
                                                if (about) {
                                                    formik.submitForm();
                                                }

                                                const saveData = {
                                                    about: formik.values.about
                                                }

                                                if (!about) {
                                                    setLoading(true);
                                                    editFreelancer(saveData, false).then(() => {
                                                        setShow(false)
                                                        updateProfileData({
                                                            about: formik.values.about
                                                        })
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

export default EditAbout;
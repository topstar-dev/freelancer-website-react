import { Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Select } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
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
import { LANGUAGE_SKILLS } from "../../../../redux/constants";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { getLanguageList } from '../../../../redux/resources/resourcesActions';
import { useEditFreelancer } from "../../../applyFreelancer/useEditFreelancer";
import CustomBackdrop from "../../../../components/customBackdrop/CustomBackdrop";
import { useProfileContext } from "../../Profile";
import useBreakpoint from "../../../../components/breakpoints/BreakpointProvider";

const EditLanguages = ({ languages }: any) => {
    const { t, i18n } = useTranslation();
    const dispatch = useAppDispatch();
    const { isMobile } = useBreakpoint()
    const editFreelancer = useEditFreelancer();
    const { updateProfileData } = useProfileContext();
    const { language } = useAppSelector(state => state.resources);

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [called, setCalled] = useState(false)
    const [languageList, setLanguageList] = useState([]);
    let pushMethod: any = () => { }

    useEffect(() => {
        if (!called) {
            setCalled(true)
            setLoading(true);
            dispatch(getLanguageList()).then((res) => {
                if (res.payload && res.payload.success) {
                    setLanguageList(res.payload.data.records);
                }
            }).catch((err: any) => {
            }).finally(() => {
                setLoading(false)
            })
        }
    }, [dispatch, called])

    useEffect(() => {
        if (language && i18n.language && i18n.language !== language) {
            setCalled(false)
        }
    }, [i18n, language])

    return (
        <>
            {languages && languages.length > 0 ?
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
                    label={t('add-languages')}
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
                    initialValues={{ languages: languages.length ? languages : [{ language_code: '', language_skill: '' }] }}
                    validationSchema={yup.object({
                        languages: yup.array().of(
                            yup.object().shape({
                                language_code: yup.string().required(t('validation.language-name-required')),
                                language_skill: yup.string().required(t('validation.language-skill-required'))
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
                                    <Box className={`heading-flex`} style={{ alignItems: 'center', marginTop: '-8px' }}>
                                        <Box>
                                            <Box className='profile-edit-heading-title'>{t('freelancer.languages.title')}</Box>
                                        </Box>
                                        <Box className="center-item">
                                            {formik.values.languages.length < 20 &&
                                                <IconButton
                                                    style={{ marginRight: '-8px' }}
                                                    onClick={() => {
                                                        pushMethod({
                                                            language_code: '',
                                                            language_skill: ''
                                                        })
                                                    }}>
                                                    <AddIcon className='add-icon' />
                                                </IconButton>
                                            }
                                        </Box>
                                    </Box>
                                </DialogTitle>
                                <Box className={isMobile ? "profile-edit-dialog-body profile-edit-dialog-body-mobile" : "profile-edit-dialog-body"}>
                                    <FieldArray name="languages">
                                        {({ unshift, remove }) => (
                                            formik.values.languages.map((lang: any, index: number) => {
                                                pushMethod = unshift;
                                                const languageCode = `languages[${index}].language_code`;
                                                const touchedLanguageCode = getIn(formik.touched, languageCode);
                                                const errorLanguageCode = getIn(formik.errors, languageCode);

                                                const languageSkill = `languages[${index}].language_skill`;
                                                const touchedLanguageSkill = getIn(formik.touched, languageSkill);
                                                const errorLanguageSkill = getIn(formik.errors, languageSkill);

                                                return (
                                                    <React.Fragment key={index}>
                                                        <Box key={index} className="flex-items">
                                                            <Box className="profile-card-spacing-close-icon">
                                                                <IconButton
                                                                    className='profile-close-icon'
                                                                    onClick={() => {
                                                                        if (formik.values.languages.length > 1) {
                                                                            remove(index)
                                                                        }
                                                                    }}>
                                                                    <CloseIcon />
                                                                </IconButton>
                                                            </Box>
                                                            <Box className="profile-card-spacing-multiple">
                                                                <Form>
                                                                    <FormControl error={touchedLanguageCode && Boolean(errorLanguageCode)} fullWidth>
                                                                        <InputLabel id="profile-language-select-label">{t('freelancer.languages.language')}</InputLabel>
                                                                        <Select
                                                                            label={t('freelancer.languages.language')}
                                                                            labelId="profile-language-select-label"
                                                                            MenuProps={{
                                                                                className: isMobile ? 'profile-edit-multiple-menu-mobile' : ''
                                                                            }}
                                                                            id={languageCode}
                                                                            name={languageCode}
                                                                            value={lang.language_code}
                                                                            onChange={formik.handleChange}
                                                                        >
                                                                            {languageList.map((lang: any) => (
                                                                                <MenuItem key={lang.language_code} value={lang.language_code}>{lang.language_name}</MenuItem>
                                                                            ))}
                                                                        </Select>
                                                                        {touchedLanguageCode && errorLanguageCode && <FormHelperText>{errorLanguageCode as ReactNode}</FormHelperText>}
                                                                    </FormControl>
                                                                    <FormControl error={touchedLanguageSkill && Boolean(errorLanguageSkill)} fullWidth>
                                                                        <InputLabel id="profile-language-skills-select-label">{t('freelancer.languages.language-skill')}</InputLabel>
                                                                        <Select
                                                                            label={t('freelancer.languages.language-skill')}
                                                                            labelId="profile-language-skills-select-label"
                                                                            id={languageSkill}
                                                                            name={languageSkill}
                                                                            MenuProps={{
                                                                                className: isMobile ? 'profile-edit-multiple-menu-mobile' : ''
                                                                            }}
                                                                            value={lang.language_skill}
                                                                            onChange={formik.handleChange}
                                                                        >
                                                                            {Object.keys(LANGUAGE_SKILLS).map((skill: any, index: number) => (
                                                                                <MenuItem value={skill}>{t(LANGUAGE_SKILLS[skill])}</MenuItem>
                                                                            ))}
                                                                        </Select>
                                                                        {touchedLanguageSkill && errorLanguageSkill && <FormHelperText>{errorLanguageSkill as ReactNode}</FormHelperText>}
                                                                    </FormControl>
                                                                </Form>
                                                            </Box>
                                                        </Box>
                                                        {index < formik.values.languages.length - 1 && <Box className="profile-edit-right-divider"><Divider /></Box>}
                                                    </React.Fragment>
                                                )
                                            })
                                        )}
                                    </FieldArray>
                                    {formik.touched.languages && formik.errors.languages && typeof formik.errors.languages === 'string' && <FormHelperText style={{ padding: '0 72px', color: '#d32f2f' }}>{formik.errors.languages as ReactNode}</FormHelperText>}
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
                                                const { languages } = res;
                                                const isValid = languages ? languages.length < 1 : true;
                                                if (!isValid) {
                                                    formik.submitForm();
                                                }

                                                const saveData = {
                                                    languages: formik.values.languages.map((e: any, index: number) => ({
                                                        language_code: e.language_code,
                                                        language_skill: e.language_skill,
                                                        order: index
                                                    }))
                                                }

                                                if (isValid) {
                                                    setLoading(true);
                                                    editFreelancer(saveData, false).then(() => {
                                                        setShow(false)
                                                        updateProfileData({
                                                            languages: saveData.languages.map((l: any) => {
                                                                return {
                                                                    ...l,
                                                                    ...(languageList.find((ll: any) => ll.language_code === l.language_code) || {})
                                                                }
                                                            })
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

export default EditLanguages;
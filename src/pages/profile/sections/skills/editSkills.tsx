import { Autocomplete, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Button from "../../../../components/button/Button";
import { FieldArray, Formik } from "formik";
import WithTranslateFormErrors from "../../../../services/validationScemaOnLangChange";
import { Box } from "@mui/system";
import { useEditFreelancer } from "../../../applyFreelancer/useEditFreelancer";
import CustomBackdrop from "../../../../components/customBackdrop/CustomBackdrop";
import { useProfileContext } from "../../Profile";
import useBreakpoint from "../../../../components/breakpoints/BreakpointProvider";
import Form from "../../../../components/form/Form";
import { useAppDispatch } from "../../../../redux/hooks";
import { getOccupationCategories, getSkillsList } from "../../../../redux/occupationSkills/occupationSkillsActions";

const EditSkills = ({
    occupation_category_id,
    skills
}: any) => {
    const { t } = useTranslation();
    const { isMobile } = useBreakpoint()
    const dispatch = useAppDispatch();
    const editFreelancer = useEditFreelancer();
    const { updateProfileData } = useProfileContext();

    const [skillsList, setSkillsList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [freelancerSkills, setFreelancerSkills] = useState({
        occupation_category_id: occupation_category_id || "",
        skills: skills || []
    });

    const [called, setCalled] = useState(false);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    let pushMethod: any = () => { };

    const getSkills = useCallback((occupationCategory: string) => {
        setLoading(true)
        dispatch(getSkillsList({ occupation_category_id: occupationCategory })).then((res) => {
            if (res.payload && res.payload.success) {
                setSkillsList(res.payload.data.records);
            }
        }).catch((err) => {
        }).finally(() => {
            setLoading(false);
        })
    }, [dispatch])

    useEffect(() => {
        if (!called) {
            setCalled(true);
            setLoading(true);
            dispatch(getOccupationCategories()).then((res) => {
                if (res.payload.success) {
                    setCategories(res.payload.data);
                }
            }).catch(() => {

            }).finally(() => {
                if (freelancerSkills.occupation_category_id) {
                    getSkills(freelancerSkills.occupation_category_id)
                } else {
                    setLoading(false);
                }
            })
        }
    }, [dispatch, called, freelancerSkills.occupation_category_id, getSkills])

    const getSkillLabel = (id: number) => {
        const skill: any = skillsList.find((s: any) => s.skill_id === id);
        if (skill) {
            return skill.skill_name;
        }
        return '';
    }

    const getError = (formik: any) => {
        const skills = formik.values.skills;
        if (skills.length === 0) {
            return t('validation.skills-required');
        } else if (skills.length > 0 && skills.length < 2) {
            return t('validation.skills-min')
        } else if (skills.length > 100) {
            return t('validation.skills-max')
        }
    }
    return (
        <>
            {skills.length > 0 ?
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
                    label={t('add-skills')}
                />
            }
            <Dialog
                fullScreen={isMobile}
                open={show}
                maxWidth="lg"
                className="editSkillsModal"
            >
                <Formik
                    enableReinitialize
                    initialValues={{
                        occupation_category_id: occupation_category_id || "",
                        skills: skills || []
                    }}
                    validationSchema={yup.object({
                        occupation_category_id: yup
                            .string()
                            .required(t('validation.occupation-category-required')),
                        skills: yup.array().of(
                            yup.object().shape({
                                skill_id: yup.string().required(t('validation.skills-required'))
                            })
                        )
                            .required(t('validation.skills-required'))
                            .min(2, t('validation.skills-min'))
                            .max(100, t('validation.skills-max'))
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
                                            <Box className='profile-edit-heading-title'>{t('freelancer.skills.title')}</Box>
                                        </Box>
                                    </Box>
                                </DialogTitle>
                                <Box style={{ paddingTop: '5px' }} className={isMobile ? "profile-edit-dialog-body" : "profile-edit-dialog-body"}>
                                    <Form className="profile-card-spacing" style={{ paddingTop: 9, paddingBottom: formik.values.skills.length ? 24 : 0 }}>
                                        <FormControl error={formik.touched.occupation_category_id && Boolean(formik.errors.occupation_category_id)} fullWidth>
                                            <InputLabel id="freelancer-occupation-select-label">{t('freelancer.skills.occupation')}</InputLabel>
                                            <Select
                                                label={t('freelancer.skills.occupation')}
                                                labelId="freelancer-occupation-select-label"
                                                id="occupation_category_id"
                                                name="occupation_category_id"
                                                MenuProps={{
                                                    className: isMobile ? 'profile-edit-single-menu-mobile' : ''
                                                }}
                                                value={formik.values.occupation_category_id ? formik.values.occupation_category_id : ''}
                                                onChange={(e) => {
                                                    formik.handleChange(e)
                                                    formik.setFieldValue('skills', [])
                                                    setFreelancerSkills({ occupation_category_id: e.target.value, skills: [] })
                                                    getSkills(e.target.value);
                                                }}
                                            >
                                                {categories.map((c: any) => (
                                                    <MenuItem key={c.occupation_category_id} value={c.occupation_category_id}>{c.occupation_category_name}</MenuItem>
                                                ))}
                                            </Select>
                                            {formik.touched.occupation_category_id && formik.errors.occupation_category_id && <FormHelperText>{formik.errors.occupation_category_id as ReactNode}</FormHelperText>}
                                        </FormControl>
                                        <FormControl
                                            error={formik.submitCount > 0 && formik.touched.skills && Boolean(formik.errors.skills)} fullWidth
                                            className={isMobile ? 'profile-edit-single-autocomplete-mobile' : ''}
                                        >
                                            <Autocomplete
                                                blurOnSelect
                                                value={null}

                                                onChange={(e, value) => {
                                                    let isExist = formik.values.skills.findIndex((s: any) => value?.id === s.skill_id)
                                                    if (isExist === -1) {
                                                        pushMethod({ skill_id: value?.id })
                                                    }
                                                }}
                                                options={skillsList.map((c: any) => ({
                                                    label: c.skill_name,
                                                    id: c.skill_id
                                                }))}
                                                renderInput={(params) => <TextField {...params} error={formik.submitCount > 0 && formik.touched.skills && Boolean(formik.errors.skills)} label={t('freelancer.skills.skills')} />}
                                            />
                                            {formik.submitCount > 0 && formik.touched.skills && formik.errors.skills && <FormHelperText>{getError(formik) as ReactNode}</FormHelperText>}
                                        </FormControl>
                                    </Form >
                                    {formik.values.skills.length > 0 && <Box className="freelancer-card-spacing">
                                        <Divider />
                                    </Box>}
                                    <Box className={formik.values.skills.length > 0 ? 'freelancer-card-spacing' : ''}>
                                        {formik.values.skills.length > 0 && <Box style={{ marginBottom: 24 }} className='heading-title'>{t('freelancer.skills.selected')}</Box>}
                                        <Box>
                                            <Stack
                                                display={'flex'}
                                                direction='row'
                                                flexWrap={'wrap'}
                                                gap={'10px'}
                                                alignItems='flex-start'
                                                spacing={1}
                                            >
                                                <FieldArray name="skills">
                                                    {({ unshift, remove }) => {
                                                        pushMethod = unshift;
                                                        return formik.values.skills.map((skill: any, index: number) => {
                                                            return (
                                                                <Chip style={{ marginLeft: 0 }} key={index} label={skill.skill_name ? skill.skill_name : getSkillLabel(skill.skill_id)} variant="outlined" onDelete={() => { remove(index) }} />
                                                            )
                                                        })
                                                    }}
                                                </FieldArray>
                                            </Stack>
                                        </Box>
                                    </Box>
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
                                                const { occupation_category_id, skills } = res;
                                                formik.submitForm();

                                                const saveData = {
                                                    occupation_category_id: formik.values.occupation_category_id,
                                                    skills: formik.values.skills.map((e: any, index: number) => ({ skill_id: e.skill_id, order: index }))
                                                }

                                                if (!(occupation_category_id || skills)) {
                                                    setLoading(true);
                                                    editFreelancer(saveData, false).then(() => {
                                                        setShow(false)
                                                        updateProfileData({
                                                            occupation_category_name: (categories.find((e: any) => e.occupation_category_id === formik.values.occupation_category_id) as any)?.occupation_category_name,
                                                            occupation_category_id: formik.values.occupation_category_id,
                                                            skills: formik.values.skills.map((e: any, index: number) => ({ skill_id: e.skill_id, skill_name: getSkillLabel(e.skill_id), order: index }))
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

export default EditSkills;
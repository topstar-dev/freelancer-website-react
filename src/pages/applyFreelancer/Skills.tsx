import { ReactNode, useCallback, useEffect, useState } from 'react';
import * as yup from "yup";
import { Box, Stack } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { FieldArray, Formik } from 'formik';
import Button from '../../components/button/Button';
import Card from '../../components/card/Card';
import { Autocomplete, Chip, Divider, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Form from '../../components/form/Form';
import { useNavigate } from '../../routes/Router';
import { useAppDispatch } from '../../redux/hooks';
import WithTranslateFormErrors from '../../services/validationScemaOnLangChange';
import { getOccupationCategories, getSkillsList } from '../../redux/occupationSkills/occupationSkillsActions';
import { useEditFreelancer } from './useEditFreelancer';
import CustomBackdrop from '../../components/customBackdrop/CustomBackdrop';
import './applyFreelancer.css';

const Skills = (props: any) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const editFreelancer = useEditFreelancer();
    const [called, setCalled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [skillsList, setSkillsList] = useState([]);
    const [categories, setCategories] = useState([]);

    const freelancerApplicationInfo = sessionStorage.getItem('freelancer-application-info') ? JSON.parse(`${sessionStorage.getItem('freelancer-application-info')}`) : {};
    const [freelancerSkills, setFreelancerSkills] = useState({
        occupation_category_id: freelancerApplicationInfo.occupation_category_id || "",
        skills: freelancerApplicationInfo.skills || []
    });

    useEffect(() => {
        document.title = t('title.freelancer');
    })

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

    let pushMethod: any = () => { };
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
        <Box className="container">
            <Box className="freelancer-main-title">{t('freelancer.title')}</Box>
            <Card className={`freelancer-card`}>
                <Box className={`freelancer-heading`}>
                    <Box className='heading-title'>{t('freelancer.skills.title')}</Box>
                    <Box className='heading-steps'>{t('freelancer.skills.subtitle')}</Box>
                </Box>
                <Divider />
                <Formik
                    enableReinitialize
                    initialValues={freelancerSkills}
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
                    onSubmit={(values) => { }}
                >
                    {formik =>
                        <WithTranslateFormErrors {...formik}>
                            <Box className={`freelancer-body`}>
                                <Form className="freelancer-card-spacing" style={{ paddingTop: 40 }}>
                                    <FormControl error={formik.touched.occupation_category_id && Boolean(formik.errors.occupation_category_id)} fullWidth>
                                        <InputLabel id="freelancer-occupation-select-label">{t('freelancer.skills.occupation')}</InputLabel>
                                        <Select
                                            label={t('freelancer.skills.occupation')}
                                            labelId="freelancer-occupation-select-label"
                                            id="occupation_category_id"
                                            name="occupation_category_id"
                                            value={formik.values.occupation_category_id ? formik.values.occupation_category_id : ''}
                                            onChange={(e) => {
                                                setLoading(true)
                                                formik.handleChange(e)
                                                formik.values.skills = [];
                                                setFreelancerSkills({ ...freelancerSkills, skills: [] })
                                                getSkills(e.target.value);
                                            }}
                                        >
                                            {categories.map((c: any) => (
                                                <MenuItem key={c.occupation_category_id} value={c.occupation_category_id}>{c.occupation_category_name}</MenuItem>
                                            ))}
                                        </Select>
                                        {formik.touched.occupation_category_id && formik.errors.occupation_category_id && <FormHelperText>{formik.errors.occupation_category_id as ReactNode}</FormHelperText>}
                                    </FormControl>
                                    <FormControl error={formik.submitCount > 0 && formik.touched.skills && Boolean(formik.errors.skills)} fullWidth>
                                        <Autocomplete
                                            disablePortal
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
                            <Box className={`freelancer-footer`}>
                                <Button
                                    disabled={loading}
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
                                                editFreelancer(saveData).then(() => {
                                                    navigate(`/apply-freelancer/name-photos`)
                                                })
                                                    .catch(() => { })
                                                    .finally(() => { setLoading(false) })
                                            }
                                        })
                                    }}
                                    style={{ float: "right" }}
                                >
                                    {t('next')}
                                </Button>
                            </Box>
                        </WithTranslateFormErrors>
                    }
                </Formik>
            </Card>
            <CustomBackdrop loading={loading} />
        </Box >
    )
}

export default Skills;
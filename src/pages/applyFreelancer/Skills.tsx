import { ReactNode, useCallback, useEffect, useState } from 'react';
import * as yup from "yup";
import { Box, Stack } from '@mui/system';
import { useTranslation } from 'react-i18next';
import Button from '../../components/button/Button';
import Card from '../../components/card/Card';
import { Backdrop, Chip, CircularProgress, Divider, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import Form from '../../components/form/Form';
import { useNavigate } from '../../routes/Router';
import './applyFreelancer.css';
import { useAppDispatch } from '../../redux/hooks';
import { getFreelancerApplicationAction } from '../../redux/freelancer/freelancerActions';
import { useSnackbar } from 'notistack';
import WithTranslateFormErrors from '../../services/validationScemaOnLangChange';
import { FieldArray, Formik } from 'formik';
import { getSkillsList } from '../../redux/occupationSkills/occupationSkillsActions';

const Skills = (props: any) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [called, setCalled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [skillsList, setSkillsList] = useState([]);

    const freelancerApplicationInfo = sessionStorage.getItem('freelancer-application-info') ? JSON.parse(`${sessionStorage.getItem('freelancer-application-info')}`) : {};
    const [freelancerSkills, setFreelancerSkills] = useState({
        occupation_category: freelancerApplicationInfo.occupation_category || "",
        skills: freelancerApplicationInfo.skills || []
    });

    useEffect(() => {
        document.title = t('freelancer.skills.title');
    })

    const getSkills = useCallback((occupationCategory: string) => {
        setLoading(true)
        dispatch(getSkillsList({ occupation_category: occupationCategory })).then((res) => {
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
            dispatch(getFreelancerApplicationAction()).then((res) => {
                if (res.payload && res.payload.success) {
                    if (freelancerSkills.occupation_category) {
                        getSkills(freelancerSkills.occupation_category)
                    }
                }
            }).catch((err) => {
                if (err) {
                    enqueueSnackbar(err && err.payload.message)
                }
            }).finally(() => {
                setLoading(false);
            })
        }
    }, [dispatch, enqueueSnackbar, called, loading, freelancerSkills.occupation_category, getSkills])

    let pushMethod: any = () => { };
    const getSkillLabel = (id: number) => {
        const skill: any = skillsList.find((s: any) => s.skill_id === id);
        if (skill) {
            return skill.skill_name;
        }
        return '';
    }

    return (
        <Box>
            <Box className="freelancer-main-title">{t('freelancer.title')}</Box>
            <Card className={`rounx-freelancer-card`}>
                <Box className={`rounx-freelancer-heading`}>
                    <Box className='heading-title'>{t('freelancer.skills.title')}</Box>
                    <Box className='heading-steps'>{t('freelancer.skills.subtitle')}</Box>
                </Box>
                <Divider />
                <Formik
                    enableReinitialize
                    initialValues={freelancerSkills}
                    validationSchema={yup.object({
                        occupation_category: yup
                            .string()
                            .required(t('validation.firstname-required')),
                        skills: yup.array().of(
                            yup.object().shape({
                                skill_id: yup.string().required("First name is required")
                            })
                        ).length(1, 'select')
                    })}
                    onSubmit={(values) => { }}
                >
                    {formik =>
                        <WithTranslateFormErrors {...formik}>
                            <Box className={`rounx-freelancer-body`}>
                                <Form className="freelancer-card-spacing">
                                    <FormControl error={formik.touched.occupation_category && Boolean(formik.errors.occupation_category)} fullWidth>
                                        <InputLabel id="freelancer-occupation-select-label">{t('freelancer.skills.occupation')}</InputLabel>
                                        <Select
                                            label={t('freelancer.skills.occupation')}
                                            labelId="freelancer-occupation-select-label"
                                            id="occupation_category"
                                            name="occupation_category"
                                            value={formik.values.occupation_category}
                                            onChange={(e) => {
                                                setLoading(true)
                                                formik.handleChange(e)
                                                formik.values.skills = [];
                                                setFreelancerSkills({ ...freelancerSkills, skills: [] })
                                                getSkills(e.target.value);
                                            }}
                                        >
                                            <MenuItem value={`DEVELOPMENT`}>{t('freelancer.skills.development')}</MenuItem>
                                            <MenuItem value={`DESIGN`}>{t('freelancer.skills.design')}</MenuItem>
                                        </Select>
                                        {formik.touched.occupation_category && formik.errors.occupation_category && <FormHelperText>{formik.errors.occupation_category as ReactNode}</FormHelperText>}
                                    </FormControl>
                                    <FormControl error={formik.touched.skills && Boolean(formik.errors.skills)} fullWidth>
                                        <InputLabel id="freelancer-skills-select-label">{t('freelancer.skills.skills')}</InputLabel>
                                        <Select
                                            label={t('freelancer.skills.skills')}
                                            labelId="freelancer-skills-select-label"
                                            name='skills'
                                            value={skillsList.length > 0 ? 'select-skill' : ''}
                                            onChange={(e) => {
                                                let isExist = formik.values.skills.findIndex((s: any) => e.target.value === s.skill_id)
                                                if (isExist === -1) {
                                                    pushMethod({ skill_id: e.target.value })
                                                }
                                            }}
                                        >
                                            <MenuItem value={'select-skill'}>Select skills</MenuItem>
                                            {skillsList.map((skill: any) => (
                                                <MenuItem key={skill.skill_id} value={skill.skill_id}>{skill.skill_name}</MenuItem>
                                            ))}
                                        </Select>
                                        {formik.touched.skills && formik.errors.skills && <FormHelperText>{formik.errors.skills as ReactNode}</FormHelperText>}
                                    </FormControl>
                                </Form >
                                <Box className="freelancer-card-spacing-divider">
                                    <Divider />
                                </Box>
                                <Box className="freelancer-card-spacing">
                                    <Box className='heading-title'>{t('freelancer.skills.selected')}</Box>
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
                                                            <Chip style={{ marginLeft: 0 }} key={index} label={getSkillLabel(skill.skill_id)} variant="outlined" onDelete={() => { remove(index) }} />
                                                        )
                                                    })
                                                }}
                                            </FieldArray>
                                        </Stack>
                                    </Box>
                                </Box>
                            </Box>
                            <Box className={`rounx-freelancer-footer`}>
                                <Button
                                    disabled={loading}
                                    onClick={() => {
                                        formik.validateForm().then((res: any) => {
                                            const { occupation_category, skills } = res;
                                            if (occupation_category) {
                                                formik.setFieldTouched('occupation_category', true, true);
                                                formik.setFieldError('occupation_category', occupation_category);
                                            }
                                            const skillsValidate = formik.values.skills.length < 1
                                            if (skillsValidate) {
                                                formik.setFieldTouched('skills', true, true);
                                                formik.setFieldError('skills', skills);
                                            }
                                            const saveData = {
                                                occupation_category: formik.values.occupation_category,
                                                skills: JSON.stringify(formik.values.skills.map((e: any, index: number) => ({ ...e, order: index })))
                                            }

                                            sessionStorage.setItem('freelancer-application-info', JSON.stringify({ ...freelancerApplicationInfo, ...saveData }))
                                            if (!(occupation_category || skillsValidate)) {
                                                navigate(`/apply-freelancer/info`)
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
            <Backdrop
                sx={{ color: '#fff', zIndex: 999 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box >
    )
}

export default Skills;
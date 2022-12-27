import { useEffect, useState } from 'react';
import * as yup from "yup";
import { Box, Stack } from '@mui/system';
import { useTranslation } from 'react-i18next';
import Button from '../../components/button/Button';
import Card from '../../components/card/Card';
import { Backdrop, Chip, CircularProgress, Divider, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Form from '../../components/form/Form';
import { useNavigate } from '../../routes/Router';
import './applyFreelancer.css';
import { useAppDispatch } from '../../redux/hooks';
import { getFreelancerApplicationAction } from '../../redux/freelancer/freelancerActions';
import { useSnackbar } from 'notistack';
import WithTranslateFormErrors from '../../services/validationScemaOnLangChange';
import { Formik } from 'formik';

const Skills = (props: any) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [called, setCalled] = useState(false);
    const [loading, setLoading] = useState(true);

    const dispatch = useAppDispatch();
    const [freelancerSkills] = useState({
        occupation: '',
        skills: ''
    });

    useEffect(() => {
        if (!called) {
            setCalled(true);
            dispatch(getFreelancerApplicationAction()).then((res) => {
                if (res.payload && res.payload.success) {
                    console.log(res.payload);
                }
            }).catch((err) => {
                if (err) {
                    enqueueSnackbar(err && err.payload.message)
                }
            }).finally(() => {
                setLoading(false);
            })
        }
    }, [dispatch, enqueueSnackbar, called, loading])

    return (
        <Box>
            <Box className="freelancer-main-title">{t('freelancer.title')}</Box>
            <Card className={`rounx-freelancer-card`}>
                <Box className={`rounx-freelancer-heading`}>
                    <Box className='heading-title'>{t('freelancer.skills.title')}</Box>
                    <Box className='heading-steps'>{t('freelancer.skills.subtitle')}</Box>
                </Box>
                <Divider />
                <Box className={`rounx-freelancer-body`}>
                    <Formik
                        initialValues={freelancerSkills}
                        validationSchema={yup.object({
                            occupation: yup
                                .string()
                                .required(t('validation.firstname-required')),
                            skills: yup
                                .string()
                                .required(t('validation.lastname-required'))
                        })}
                        onSubmit={(values) => { }}
                    >
                        {formik =>
                            <WithTranslateFormErrors {...formik}>
                                <Form className="freelancer-card-spacing">
                                    <FormControl fullWidth>
                                        <InputLabel id="freelancer-occupation-select-label">{t('freelancer.skills.occupation')}</InputLabel>
                                        <Select
                                            label={t('freelancer.skills.occupation')}
                                            labelId="freelancer-occupation-select-label"
                                            id="occupation"
                                            name="occupation"
                                            value={formik.values.occupation}
                                            onChange={formik.handleChange}
                                        >
                                            <MenuItem value={`/settings/personal`}>{t('user-settings-personal')}</MenuItem>
                                            <MenuItem value={`/settings/security`}>{t('user-settings-security')}</MenuItem>
                                            <MenuItem value={`/settings/currency`}>{t('user-settings-currency')}</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <InputLabel id="freelancer-skills-select-label">{t('freelancer.skills.skills')}</InputLabel>
                                        <Select
                                            label={t('freelancer.skills.skills')}
                                            labelId="freelancer-skills-select-label"
                                            id="skills"
                                            name="skills"
                                            value={formik.values.skills}
                                            onChange={formik.handleChange}
                                        >
                                            <MenuItem value={`/settings/personal`}>{t('user-settings-personal')}</MenuItem>
                                            <MenuItem value={`/settings/security`}>{t('user-settings-security')}</MenuItem>
                                            <MenuItem value={`/settings/currency`}>{t('user-settings-currency')}</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Form >
                                <Box className="freelancer-card-spacing-divider">
                                    <Divider />
                                </Box>
                                <Box className="freelancer-card-spacing">
                                    <Box className='heading-title'>{t('freelancer.skills.selected')}</Box>
                                    <Box>
                                        <Stack direction="row" spacing={1}>
                                            <Chip label="Android" variant="outlined" onDelete={() => { }} />
                                            <Chip label="Java" variant="outlined" onDelete={() => { }} />
                                            <Chip label="Kotlin" variant="outlined" onDelete={() => { }} />
                                        </Stack>
                                    </Box>
                                </Box>
                            </WithTranslateFormErrors>
                        }
                    </Formik>
                </Box>
                <Box className={`rounx-freelancer-footer`}>
                    <Button
                        disabled={loading}
                        onClick={() => {
                            navigate('/apply-freelancer/info')
                        }}
                        style={{ float: "right" }}
                    >
                        {t('next')}
                    </Button>
                </Box>
            </Card>
            <Backdrop
                sx={{ color: '#fff', zIndex: 999 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    )
}

export default Skills;
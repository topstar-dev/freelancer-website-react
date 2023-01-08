import { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from "yup";
import { FieldArray, Formik, getIn } from 'formik';
import { Box } from '@mui/system';
import { Backdrop, CircularProgress, Divider, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import Button from '../../components/button/Button';
import Card from '../../components/card/Card';
import Form from '../../components/form/Form';
import { useNavigate } from '../../routes/Router';
import WithTranslateFormErrors from '../../services/validationScemaOnLangChange';
import './applyFreelancer.css';
import { useAppDispatch } from '../../redux/hooks';
import { getLanguageList } from '../../redux/resources/resourcesActions';

const Languages = (props: any) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(true);
    const [called, setCalled] = useState(false)
    const [languageList, setLanguageList] = useState([]);
    let pushMethod: any = () => { }

    const freelancerApplicationInfo = sessionStorage.getItem('freelancer-application-info') ? JSON.parse(`${sessionStorage.getItem('freelancer-application-info')}`) : {};
    const [freelancerData] = useState({
        languages: freelancerApplicationInfo.languages || [{
            language_code: '',
            language_skill: ''
        }]
    });

    useEffect(() => {
        document.title = t('title.freelancer');
    })

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

    return (
        <Box>
            <Box className="freelancer-main-title">{t('freelancer.title')}</Box>
            <Card className={`freelancer-card`}>
                <Box className={`freelancer-heading heading-flex`}>
                    <Box>
                        <Box className='heading-title'>{t('freelancer.languages.title')}</Box>
                        <Box className='heading-steps'>{t('freelancer.languages.subtitle')}</Box>
                    </Box>
                    <Box className="center-item">
                        <AddIcon className='add-icon' onClick={() => {
                            pushMethod({
                                language_code: '',
                                language_skill: ''
                            })
                        }} />
                    </Box>
                </Box>
                <Divider />
                <Formik
                    enableReinitialize
                    initialValues={freelancerData}
                    validationSchema={yup.object({
                        languages: yup.array().of(
                            yup.object().shape({
                                language_code: yup.string().required(t('validation.language-name-required')),
                                language_skill: yup.string().required(t('validation.language-skill-required'))
                            }))
                            .max(20, t('validation.language-max'))
                    })}
                    onSubmit={values => {
                        console.log("onSubmit", JSON.stringify(values, null, 2));
                    }}
                >
                    {formik =>
                        <WithTranslateFormErrors {...formik}>
                            <Box className={`freelancer-body`}>
                                <FieldArray name="languages">
                                    {({ unshift, remove }) => (
                                        !loading && formik.values.languages.map((lang: any, index: number) => {
                                            pushMethod = unshift;
                                            const languageCode = `languages[${index}].language_code`;
                                            const touchedLanguageCode = getIn(formik.touched, languageCode);
                                            const errorLanguageCode = getIn(formik.errors, languageCode);

                                            const languageSkill = `languages[${index}].language_skill`;
                                            const touchedLanguageSkill = getIn(formik.touched, languageSkill);
                                            const errorLanguageSkill = getIn(formik.errors, languageSkill);

                                            return (
                                                <Box key={index} className="freelancer-experience-flex">
                                                    <Box className="freelancer-card-spacing">
                                                        <CloseIcon
                                                            className='close-icon'
                                                            onClick={() => {
                                                                if (formik.values.languages.length > 1) {
                                                                    remove(index)
                                                                }
                                                            }}
                                                        />
                                                    </Box>
                                                    <Box className="freelancer-card-spacing" style={{ paddingLeft: 0, width: '100%' }}>
                                                        <Form>
                                                            <FormControl error={touchedLanguageCode && Boolean(errorLanguageCode)} fullWidth>
                                                                <InputLabel id="freelancer-language-select-label">{t('freelancer.languages.language')}</InputLabel>
                                                                <Select
                                                                    label={t('freelancer.languages.language')}
                                                                    labelId="freelancer-language-select-label"
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
                                                                <InputLabel id="freelancer-language-skills-select-label">{t('freelancer.languages.language-skill')}</InputLabel>
                                                                <Select
                                                                    label={t('freelancer.languages.language-skill')}
                                                                    labelId="freelancer-language-skills-select-label"
                                                                    id={languageSkill}
                                                                    name={languageSkill}
                                                                    value={lang.language_skill}
                                                                    onChange={formik.handleChange}
                                                                >
                                                                    <MenuItem value={`BEGINNER`}>Beginner</MenuItem>
                                                                    <MenuItem value={`INTERMEDIATE`}>Intermediate</MenuItem>
                                                                    <MenuItem value={`PROFICIENT`}>Proficient</MenuItem>
                                                                    <MenuItem value={`FLUENT`}>Fluent</MenuItem>
                                                                    <MenuItem value={`NATIVE`}>Native</MenuItem>
                                                                </Select>
                                                                {touchedLanguageSkill && errorLanguageSkill && <FormHelperText>{errorLanguageSkill as ReactNode}</FormHelperText>}
                                                            </FormControl>
                                                        </Form>
                                                        {index < formik.values.languages.length - 1 && <Divider className="freelancer-card-spacing" />}
                                                    </Box>
                                                </Box>
                                            )
                                        })
                                    )}
                                </FieldArray>
                                {formik.touched.languages && formik.errors.languages && typeof formik.errors.languages === 'string' && <FormHelperText style={{ padding: '0 72px', color: '#d32f2f' }}>{formik.errors.languages as ReactNode}</FormHelperText>}
                            </Box>
                            <Box className={`freelancer-footer`}>
                                <Button
                                    onClick={() => {
                                        formik.validateForm().then((res: any) => {
                                            const { languages } = res;
                                            const isValid = languages ? languages.length < 1 : true;
                                            if (!isValid) {
                                                formik.submitForm();
                                            }

                                            const saveData = {
                                                languages: formik.values.languages.map((e: any, index: number) => ({ ...e, order: index }))
                                            }

                                            sessionStorage.setItem('freelancer-application-info', JSON.stringify({ ...freelancerApplicationInfo, ...saveData }))
                                            if (isValid) {
                                                navigate('/apply-freelancer/about-me')
                                            }
                                        })
                                    }}
                                    style={{ float: "right", marginLeft: 10 }}
                                >
                                    {t('next')}
                                </Button>
                                <Button
                                    variant="text"
                                    onClick={() => {
                                        window.history.back()
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
            <Backdrop
                sx={{ color: '#fff', zIndex: 999 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    )
}

export default Languages;
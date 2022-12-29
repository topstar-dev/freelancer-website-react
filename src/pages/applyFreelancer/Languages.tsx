import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from "yup";
import { FieldArray, Formik, getIn } from 'formik';
import { Box } from '@mui/system';
import { Divider, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import Button from '../../components/button/Button';
import Card from '../../components/card/Card';
import Form from '../../components/form/Form';
import { useNavigate } from '../../routes/Router';
import WithTranslateFormErrors from '../../services/validationScemaOnLangChange';
import './applyFreelancer.css';

const Languages = (props: any) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    let pushMethod: any = () => { }

    return (
        <Box>
            <Box className="freelancer-main-title">{t('freelancer.title')}</Box>
            <Card className={`rounx-freelancer-card`}>
                <Box className={`rounx-freelancer-heading heading-flex`}>
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
                <Box className={`rounx-freelancer-body`}>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            languages: [
                                {
                                    language_code: '',
                                    language_skill: ''
                                }
                            ]
                        }}
                        validationSchema={yup.object({
                            languages: yup.array().of(
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
                                <FieldArray name="languages">
                                    {({ unshift, remove }) => (
                                        formik.values.languages.map((lang, index) => {
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
                                                                    <MenuItem value={`/settings/personal`}>{t('user-settings-personal')}</MenuItem>
                                                                    <MenuItem value={`/settings/security`}>{t('user-settings-security')}</MenuItem>
                                                                    <MenuItem value={`/settings/currency`}>{t('user-settings-currency')}</MenuItem>
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
                                                                    <MenuItem value={`/settings/personal`}>{t('user-settings-personal')}</MenuItem>
                                                                    <MenuItem value={`/settings/security`}>{t('user-settings-security')}</MenuItem>
                                                                    <MenuItem value={`/settings/currency`}>{t('user-settings-currency')}</MenuItem>
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
                            </WithTranslateFormErrors>
                        }
                    </Formik>
                </Box>
                <Box className={`rounx-freelancer-footer`}>
                    <Button
                        // disabled={loading}
                        // type="submit"
                        onClick={() => {
                            navigate('/apply-freelancer/about-me')
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
                            navigate('/apply-freelancer/education')
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

export default Languages;
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import * as yup from "yup";
import { Formik } from 'formik';
import { Divider, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Button from '../../components/button/Button';
import Card from '../../components/card/Card';
import Form from '../../components/form/Form';
import { useNavigate } from '../../routes/Router';
import WithTranslateFormErrors from '../../services/validationScemaOnLangChange';
import './applyFreelancer.css';
import { ReactNode } from 'react';

const AboutMe = (props: any) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Box>
            <Box className="freelancer-main-title">{t('freelancer.title')}</Box>
            <Card className={`rounx-freelancer-card`}>
                <Box className={`rounx-freelancer-heading`}>
                    <Box className='heading-title'>{t('freelancer.about.title')}</Box>
                    <Box className='heading-steps'>{t('freelancer.about.subtitle')}</Box>
                </Box>
                <Divider />
                <Box className={`rounx-freelancer-body`}>
                    <Formik
                        initialValues={{
                            about: '',
                            country_id: '',
                            province_id: '',
                            city_id: ''
                        }}
                        validationSchema={yup.object({
                            about: yup
                                .string()
                                .required(t('validation.firstname-required')),
                            country_id: yup
                                .string()
                                .required(t('validation.lastname-required')),
                            province_id: yup
                                .string()
                                .required(t('validation.lastname-required')),
                            city_id: yup
                                .string()
                                .required(t('validation.lastname-required'))
                        })}
                        onSubmit={(values) => { }}
                    >
                        {formik =>
                            <WithTranslateFormErrors {...formik}>
                                <Box className="freelancer-card-spacing">
                                    <TextField
                                        multiline={true}
                                        rows={8}
                                        maxRows={8}
                                        fullWidth
                                        id='about'
                                        name='about'
                                        type="text"
                                        label={t('freelancer.about.about')}
                                        value={formik.values.about}
                                        onChange={formik.handleChange}
                                        error={formik.touched.about && Boolean(formik.errors.about)}
                                        helperText={formik.touched.about && formik.errors.about && (formik.errors.about as ReactNode)}
                                    />
                                </Box>
                                <Box className="freelancer-card-spacing-divider">
                                    <Divider />
                                </Box>
                                <Box className="freelancer-card-spacing">
                                    <Form>
                                        <FormControl fullWidth>
                                            <InputLabel id="freelancer-occupation-select-label">{t('freelancer.about.country')}</InputLabel>
                                            <Select
                                                label={t('freelancer.about.country')}
                                                labelId="freelancer-occupation-select-label"
                                                id="country_id"
                                                name="country_id"
                                                value={formik.values.country_id}
                                                onChange={formik.handleChange}
                                            >
                                                <MenuItem value={`/settings/personal`}>{t('user-settings-personal')}</MenuItem>
                                                <MenuItem value={`/settings/security`}>{t('user-settings-security')}</MenuItem>
                                                <MenuItem value={`/settings/currency`}>{t('user-settings-currency')}</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <InputLabel id="freelancer-skills-select-label">{t('freelancer.about.province')}</InputLabel>
                                            <Select
                                                label={t('freelancer.about.province')}
                                                labelId="freelancer-skills-select-label"
                                                id="province_id"
                                                name="province_id"
                                                value={formik.values.province_id}
                                                onChange={formik.handleChange}
                                            >
                                                <MenuItem value={`/settings/personal`}>{t('user-settings-personal')}</MenuItem>
                                                <MenuItem value={`/settings/security`}>{t('user-settings-security')}</MenuItem>
                                                <MenuItem value={`/settings/currency`}>{t('user-settings-currency')}</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <InputLabel id="freelancer-skills-select-label">{t('freelancer.about.city')}</InputLabel>
                                            <Select
                                                label={t('freelancer.about.city')}
                                                labelId="freelancer-skills-select-label"
                                                id="city_id"
                                                name="city_id"
                                                value={formik.values.city_id}
                                                onChange={formik.handleChange}
                                            >
                                                <MenuItem value={`/settings/personal`}>{t('user-settings-personal')}</MenuItem>
                                                <MenuItem value={`/settings/security`}>{t('user-settings-security')}</MenuItem>
                                                <MenuItem value={`/settings/currency`}>{t('user-settings-currency')}</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Form>
                                </Box>
                            </WithTranslateFormErrors>
                        }
                    </Formik>
                </Box>
                <Box className={`rounx-freelancer-footer`}>
                    <Button
                        onClick={() => {
                        }}
                        style={{ float: "right" }}
                    >
                        {t('submit')}
                    </Button>
                    <Button
                        variant="text"
                        onClick={() => {
                            navigate('/apply-freelancer/languages')
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

export default AboutMe;
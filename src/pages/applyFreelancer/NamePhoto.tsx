import { Box } from '@mui/system';
import * as yup from "yup";
import { useTranslation } from 'react-i18next';
import Button from '../../components/button/Button';
import Card from '../../components/card/Card';
import { Divider, TextField } from '@mui/material';
import Form from '../../components/form/Form';
import { useNavigate } from '../../routes/Router';
import './applyFreelancer.css';
import WithTranslateFormErrors from '../../services/validationScemaOnLangChange';
import { Formik } from 'formik';

const NamePhoto = (props: any) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Box>
            <Box className="freelancer-main-title">
                {t('freelancer.title')}
            </Box>
            <Box className="info-banner">
                {t('freelancer.info.banner')}
            </Box>
            <Card className={`rounx-freelancer-card`}>
                <Box className={`rounx-freelancer-heading`}>
                    <Box className='heading-title'>{t('freelancer.info.title')}</Box>
                    <Box className='heading-steps'>{t('freelancer.info.subtitle')}</Box>
                </Box>
                <Divider />
                <Box className={`rounx-freelancer-body`}>
                    <Formik
                        initialValues={{
                            first_name: '',
                            last_name: ''
                        }}
                        validationSchema={yup.object({
                            first_name: yup
                                .string()
                                .required(t('validation.firstname-required')),
                            last_name: yup
                                .string()
                                .required(t('validation.lastname-required'))
                        })}
                        onSubmit={(values) => { }}
                    >
                        {formik =>
                            <WithTranslateFormErrors {...formik}>
                                <Box className="profile-photo-container">
                                    <Box className="profile-bg"></Box>
                                    <Box className="round-profile-photo"></Box>
                                </Box>
                                <Form className="freelancer-card-spacing">
                                    <TextField
                                        fullWidth
                                        id="first_name"
                                        name="first_name"
                                        type="text"
                                        label={t('freelancer.info.first-name')}
                                        value={formik.values.first_name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                        helperText={formik.touched.first_name && formik.errors.first_name}
                                    />
                                    <TextField
                                        fullWidth
                                        id="last_name"
                                        name="last_name"
                                        type="text"
                                        label={t('freelancer.info.last-name')}
                                        value={formik.values.last_name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                                        helperText={formik.touched.last_name && formik.errors.last_name}
                                    />
                                </Form>
                            </WithTranslateFormErrors>
                        }
                    </Formik>
                </Box>
                <Box className={`rounx-freelancer-footer`}>
                    <Button
                        // disabled={loading}
                        // type="submit"
                        onClick={() => {
                            navigate('/apply-freelancer/experience')
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
                            navigate('/apply-freelancer')
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

export default NamePhoto;
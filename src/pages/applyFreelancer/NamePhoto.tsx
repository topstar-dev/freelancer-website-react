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
import { ReactNode, useEffect, useState } from 'react';

const NamePhoto = (props: any) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const freelancerApplicationInfo = sessionStorage.getItem('freelancer-application-info') ? JSON.parse(`${sessionStorage.getItem('freelancer-application-info')}`) : {};
    const [freelancerSkills] = useState({
        first_name: freelancerApplicationInfo.first_name || "",
        last_name: freelancerApplicationInfo.last_name || ""
    });

    const [profileImage, setProfileImage] = useState<any>();
    const [avatarImage, setAvatarImage] = useState<any>();

    useEffect(() => {
        document.title = t('title.freelancer');
    })

    return (
        <Box>
            <Box className="freelancer-main-title">
                {t('freelancer.title')}
            </Box>
            <Box className="info-banner">
                {t('freelancer.info.banner')}
            </Box>
            <Card className={`freelancer-card`}>
                <Box className={`freelancer-heading`}>
                    <Box className='heading-title'>{t('freelancer.info.title')}</Box>
                    <Box className='heading-steps'>{t('freelancer.info.subtitle')}</Box>
                </Box>
                <Divider />
                <Formik
                    enableReinitialize
                    initialValues={freelancerSkills}
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
                            <Box className={`freelancer-body`}>
                                <Box className="profile-photo-container">
                                    <Box className="profile-image-box">
                                        {profileImage && <img className='profile-image' alt="profile_image" src={profileImage} />}
                                        <label className='image-handle' htmlFor="profile_image">
                                            <input
                                                id="profile_image"
                                                type="file"
                                                onChange={(e: any) => {
                                                    setProfileImage(URL.createObjectURL(e.target.files[0]));
                                                }}
                                            />
                                        </label>
                                    </Box>
                                    <Box className="avatar-image-box">
                                        {avatarImage && <img className='avatar-image' alt="avatar_image" src={avatarImage} />}
                                        <label className='image-handle center' htmlFor="avatar_image">
                                            <input
                                                id="avatar_image"
                                                type="file"
                                                onChange={(e: any) => {
                                                    setAvatarImage(URL.createObjectURL(e.target.files[0]));
                                                }}
                                            />
                                        </label>
                                    </Box>
                                </Box>
                                <Form className="freelancer-card-spacing">
                                    <TextField
                                        fullWidth
                                        id="first_name"
                                        name="first_name"
                                        type="text"
                                        label={t('freelancer.info.first-name')}
                                        value={formik.values.first_name ? formik.values.first_name : ''}
                                        onChange={formik.handleChange}
                                        error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                        helperText={formik.touched.first_name && formik.errors.first_name && formik.errors.first_name as ReactNode}
                                    />
                                    <TextField
                                        fullWidth
                                        id="last_name"
                                        name="last_name"
                                        type="text"
                                        label={t('freelancer.info.last-name')}
                                        value={formik.values.last_name ? formik.values.last_name : ''}
                                        onChange={formik.handleChange}
                                        error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                                        helperText={formik.touched.last_name && formik.errors.last_name && formik.errors.last_name as ReactNode}
                                    />
                                </Form>
                            </Box>
                            <Box className={`freelancer-footer`}>
                                <Button
                                    onClick={() => {
                                        formik.validateForm().then((res: any) => {
                                            const { first_name, last_name } = res;
                                            if (first_name) {
                                                formik.setFieldTouched('first_name', true, true);
                                                formik.setFieldError('first_name', first_name);
                                            }
                                            if (last_name) {
                                                formik.setFieldTouched('last_name', true, true);
                                                formik.setFieldError('last_name', last_name);
                                            }

                                            sessionStorage.setItem('freelancer-application-info', JSON.stringify({ ...freelancerApplicationInfo, ...formik.values }))
                                            if (!(first_name || last_name)) {
                                                navigate('/apply-freelancer/experiences')
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
        </Box>
    )
}

export default NamePhoto;
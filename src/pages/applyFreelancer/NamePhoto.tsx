import { ReactNode, useEffect, useState } from 'react';
import { Formik } from 'formik';
import { Box } from '@mui/system';
import * as yup from "yup";
import { useTranslation } from 'react-i18next';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Avatar from '@mui/material/Avatar';
import Button from '../../components/button/Button';
import Card from '../../components/card/Card';
import { Backdrop, CircularProgress, Divider, TextField } from '@mui/material';
import Form from '../../components/form/Form';
import { useNavigate } from '../../routes/Router';
import WithTranslateFormErrors from '../../services/validationScemaOnLangChange';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { imageDownload, imageUpload } from '../../redux/other/otherActions';
import { useSnackbar } from 'notistack';
import { setAvatar, setProfile } from '../../redux/other/otherSlice';
import './applyFreelancer.css';

const NamePhoto = (props: any) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { userAvatar, userProfile, loading, loadingProfile } = useAppSelector(state => state.other)

    const freelancerApplicationInfo = sessionStorage.getItem('freelancer-application-info') ? JSON.parse(`${sessionStorage.getItem('freelancer-application-info')}`) : {};
    const [freelancerSkills] = useState({
        first_name: freelancerApplicationInfo.first_name || "",
        last_name: freelancerApplicationInfo.last_name || ""
    });
    const [backdrop, setBackdrop] = useState(false)

    useEffect(() => {
        document.title = t('title.freelancer');
    })

    useEffect(() => {
        if (freelancerApplicationInfo.avatar_url && !userAvatar && !loading) {
            dispatch(imageDownload({ functionType: 'USER_AVATAR', fileName: freelancerApplicationInfo.avatar_url }))
        }
    }, [dispatch, loading, freelancerApplicationInfo.avatar_url, userAvatar])

    useEffect(() => {
        if (freelancerApplicationInfo.profile_url && !userProfile && !loadingProfile) {
            dispatch(imageDownload({ functionType: 'USER_PROFILE', fileName: freelancerApplicationInfo.profile_url }))
        }
    }, [dispatch, loadingProfile, freelancerApplicationInfo.profile_url, userProfile])

    const uploadImage = (imageData: any) => {
        let fileName = `${imageData.filename}`;
        let file = new File([imageData.blob], fileName, { type: imageData.extension });
        setBackdrop(true);
        dispatch(imageUpload({ functionType: imageData.functionType, image: { file, fileName } })).then((res) => {
            if (res.payload.success) {
                sessionStorage.setItem('freelancer-application-info', JSON.stringify({
                    ...freelancerApplicationInfo,
                    [imageData.functionType === 'USER_PROFILE' ? 'profile_url' : 'avatar_url']: res.payload.data.file_name
                }))
                if (imageData.functionType === 'USER_PROFILE') {
                    dispatch(setProfile(imageData.file));
                } else if (imageData.functionType === 'USER_AVATAR') {
                    dispatch(setAvatar(imageData.file));
                }
                enqueueSnackbar(res.payload.message)
            }
        }).catch((err) => {
            enqueueSnackbar(err.message)
        }).finally(() => {
            setBackdrop(false)
        })
    }

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
                                        {userProfile ?
                                            <img className='profile-image' alt="profile_image" src={userProfile} />
                                            :
                                            <img className='profile-image' alt="profile_image" src="/images/profile-placeholder.png" />
                                        }
                                        <label className='image-handle' htmlFor="profile_image">
                                            <input
                                                id="profile_image"
                                                type="file"
                                                onChange={(e: any) => {
                                                    const obj = {
                                                        file: URL.createObjectURL(e.target.files[0]),
                                                        blob: e.target.files[0],
                                                        filename: e.target.files[0].name,
                                                        extension: e.target.files[0].type,
                                                        functionType: 'USER_PROFILE'
                                                    }
                                                    uploadImage(obj);
                                                }}
                                            />
                                            <CameraAltIcon className='camera-icon' />
                                        </label>
                                    </Box>
                                    <Box className="avatar-image-box">
                                        {userAvatar ?
                                            <Avatar className='avatar-image' alt="avatar_image" src={userAvatar} />
                                            :
                                            <Avatar className='avatar-image' alt="profile_image" src="/images/avatar-placeholder.png" />
                                        }
                                        <label className='image-handle center' htmlFor="avatar_image">
                                            <input
                                                id="avatar_image"
                                                type="file"
                                                onChange={(e: any) => {
                                                    const obj = {
                                                        file: URL.createObjectURL(e.target.files[0]),
                                                        blob: e.target.files[0],
                                                        filename: e.target.files[0].name,
                                                        extension: e.target.files[0].type,
                                                        functionType: 'USER_AVATAR'
                                                    }
                                                    uploadImage(obj);
                                                }}
                                            />
                                            <CameraAltIcon className='camera-icon' />
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

                                            let avatarImageCheck = false;
                                            if (!userAvatar) {
                                                avatarImageCheck = true;
                                                enqueueSnackbar(t('validation.avatar-image'))
                                            }

                                            let profileImageCheck = false;
                                            if (!userProfile) {
                                                profileImageCheck = true;
                                                enqueueSnackbar(t('validation.profile-image'))
                                            }

                                            sessionStorage.setItem('freelancer-application-info', JSON.stringify({ ...freelancerApplicationInfo, ...formik.values }))
                                            if (!(first_name || last_name || avatarImageCheck || profileImageCheck)) {
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
            <Backdrop
                sx={{ color: '#fff', zIndex: 999 }}
                open={backdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    )
}

export default NamePhoto;
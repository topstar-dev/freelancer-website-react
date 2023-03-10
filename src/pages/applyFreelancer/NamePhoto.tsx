import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Formik } from 'formik';
import { Box } from '@mui/system';
import * as yup from "yup";
import { useTranslation } from 'react-i18next';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    TextField
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Avatar from '@mui/material/Avatar';
import { useSnackbar } from 'notistack';
import Compressor from 'compressorjs';
import Cropper from "react-cropper";
import Button from '../../components/button/Button';
import Card from '../../components/card/Card';
import Form from '../../components/form/Form';
import { useNavigate } from '../../routes/Router';
import WithTranslateFormErrors from '../../services/validationScemaOnLangChange';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { imageDownload, imageUpload } from '../../redux/other/otherActions';
import { setAvatar, setProfile } from '../../redux/other/otherSlice';
import { FUNCTION_TYPES } from '../../redux/constants';
import { useEditFreelancer } from './useEditFreelancer';
import CustomBackdrop from '../../components/customBackdrop/CustomBackdrop';
import './applyFreelancer.css';
import "cropperjs/dist/cropper.css";

const NamePhoto = (props: any) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const editFreelancer = useEditFreelancer();
    const { enqueueSnackbar } = useSnackbar();
    const { userAvatar, userProfile, loading, loadingProfile } = useAppSelector(state => state.other)

    const freelancerApplicationInfo = useMemo(() => sessionStorage.getItem('freelancer-application-info') ? JSON.parse(`${sessionStorage.getItem('freelancer-application-info')}`) : {}, []);
    const [freelancerSkills] = useState({
        first_name: freelancerApplicationInfo.first_name || "",
        last_name: freelancerApplicationInfo.last_name || ""
    });
    const [backdrop, setBackdrop] = useState(false);
    const [show, setShow] = useState<boolean>(false);
    const [cropper, setCropper] = useState<any>();
    const [cropData, setCropData] = useState("#");
    const [tempImageData, setTempImageData] = useState<any>();

    useEffect(() => {
        if (cropData && cropData !== '#') {
            fetch(cropData)
                .then(res => res.blob())
                .then((x) => {
                    const cropped = new File([x], tempImageData.file.name, { type: tempImageData.file.type })

                    new Compressor(cropped, {
                        quality: 0.6,
                        success(result) {
                            dispatch(imageUpload({ functionType: tempImageData.functionType, image: { file: result, fileName: tempImageData.file.name } })).then((res) => {
                                if (res.payload.success) {
                                    const imageUrlUpdate: any = {};
                                    if (tempImageData.functionType === FUNCTION_TYPES.USER_PROFILE) {
                                        dispatch(setProfile(URL.createObjectURL(result)));
                                        imageUrlUpdate['profile_file_name'] = res.payload.data.file_name;
                                    } else if (tempImageData.functionType === FUNCTION_TYPES.USER_AVATAR) {
                                        dispatch(setAvatar(URL.createObjectURL(result)));
                                        imageUrlUpdate['avatar_file_name'] = res.payload.data.file_name;
                                    }
                                    sessionStorage.setItem('freelancer-application-info', JSON.stringify({
                                        ...freelancerApplicationInfo,
                                        ...imageUrlUpdate
                                    }))
                                    enqueueSnackbar(res.payload.message)
                                }
                            }).catch((err) => {
                                enqueueSnackbar(err.message)
                            }).finally(() => {
                                setBackdrop(false);
                                setShow(false);
                                setCropData("#");
                                setTempImageData(null)
                            })
                        },
                        error(err) {
                            console.log(err.message);
                            setBackdrop(false);
                            setCropData("#");
                        },
                    });
                })
        }
    }, [dispatch, enqueueSnackbar, freelancerApplicationInfo, cropData, tempImageData])

    useEffect(() => {
        document.title = t('title.freelancer');
    })

    useEffect(() => {
        if (freelancerApplicationInfo.avatar_file_name && !userAvatar && !loading) {
            dispatch(imageDownload({ functionType: FUNCTION_TYPES.USER_AVATAR, fileName: freelancerApplicationInfo.avatar_file_name }))
        }
    }, [dispatch, loading, freelancerApplicationInfo.avatar_file_name, userAvatar])

    useEffect(() => {
        if (freelancerApplicationInfo.profile_file_name && !userProfile && !loadingProfile) {
            dispatch(imageDownload({ functionType: FUNCTION_TYPES.USER_PROFILE, fileName: freelancerApplicationInfo.profile_file_name }))
        }
    }, [dispatch, loadingProfile, freelancerApplicationInfo.profile_file_name, userProfile])

    return (
        <Box className="container">
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
                                    <Box style={{ height: 'auto' }} className="profile-image-box">
                                        {userProfile ?
                                            <img className='profile-image' alt="profile_image" src={userProfile} />
                                            :
                                            <img className='profile-image' alt="profile_image" src="/images/profile-placeholder.png" />
                                        }
                                        <label className='image-handle' htmlFor="profile_image">
                                            {tempImageData?.file ? '' : <input
                                                id="profile_image"
                                                type="file"
                                                accept="image/png, image/jpeg"
                                                onChange={(e: any) => {
                                                    const obj = {
                                                        image: URL.createObjectURL(e.target.files[0]),
                                                        file: e.target.files[0],
                                                        functionType: FUNCTION_TYPES.USER_PROFILE
                                                    }
                                                    setTempImageData(obj)
                                                    setShow(true);
                                                }}
                                            />}
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
                                            {tempImageData?.file ? '' : <input
                                                id="avatar_image"
                                                type="file"
                                                accept="image/png, image/jpeg"
                                                onChange={(e: any) => {
                                                    const obj = {
                                                        image: URL.createObjectURL(e.target.files[0]),
                                                        file: e.target.files[0],
                                                        functionType: FUNCTION_TYPES.USER_AVATAR
                                                    }
                                                    setTempImageData(obj)
                                                    setShow(true);
                                                }}
                                            />}
                                            <CameraAltIcon className='camera-icon' />
                                        </label>
                                    </Box>
                                    <Dialog
                                        open={show}
                                        onClose={() => {
                                            setTempImageData(null);
                                            setShow(false)
                                        }}
                                        maxWidth="lg"
                                        className="deleteEmailModal"
                                    >
                                        <DialogTitle>{t('adjust-image')}</DialogTitle>
                                        <DialogContent>
                                            <Cropper
                                                style={{
                                                    maxHeight: 400,
                                                    maxWidth: 600,
                                                    marginBottom: 26
                                                }}
                                                zoomTo={0}
                                                viewMode={1}
                                                initialAspectRatio={tempImageData?.functionType === FUNCTION_TYPES.USER_AVATAR ? 1 / 1 : 6 / 2}
                                                aspectRatio={tempImageData?.functionType === FUNCTION_TYPES.USER_AVATAR ? 1 / 1 : 6 / 2}
                                                preview=".img-preview"
                                                src={tempImageData?.image || "/images/profile-placeholder.png"}
                                                minCropBoxHeight={10}
                                                minCropBoxWidth={10}
                                                background={false}
                                                responsive={true}
                                                autoCropArea={1}
                                                checkOrientation={false}
                                                onInitialized={(instance) => {
                                                    setCropper(instance);
                                                }}
                                                guides={true}
                                            />
                                            <DialogActions style={{ padding: 0, marginBottom: -6 }}>
                                                <Button
                                                    variant="text"
                                                    onClick={() => {
                                                        setTempImageData(null)
                                                        setShow(false)
                                                    }}>
                                                    {t('cancel')}
                                                </Button>
                                                <Button
                                                    variant="text"
                                                    style={{ marginLeft: 0 }}
                                                    onClick={() => {
                                                        setCropData(cropper.getCroppedCanvas().toDataURL())
                                                        setBackdrop(true);
                                                    }}>{t('confirm')}</Button>
                                            </DialogActions>
                                        </DialogContent>
                                    </Dialog>
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
                                            let profileImageCheck = false;
                                            if (!userAvatar && !loading) {
                                                avatarImageCheck = true;
                                                enqueueSnackbar(t('validation.avatar-image'))
                                            } else if (!userProfile && !loadingProfile) {
                                                profileImageCheck = true;
                                                enqueueSnackbar(t('validation.profile-image'))
                                            }

                                            if (!(first_name || last_name || avatarImageCheck || profileImageCheck)) {
                                                setBackdrop(true);
                                                editFreelancer(formik.values).then(() => {
                                                    navigate('/apply-freelancer/experiences')
                                                }).catch(() => { })
                                                    .finally(() => { setBackdrop(false) })
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
            <CustomBackdrop loading={backdrop} />
        </Box>
    )
}

export default NamePhoto;
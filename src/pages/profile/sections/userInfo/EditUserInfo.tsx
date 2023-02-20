import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import * as yup from "yup";
import { Avatar, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import { Box } from '@mui/system';
import Compressor from 'compressorjs';
import Cropper from "react-cropper";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import Button from '../../../../components/button/Button';
import { FUNCTION_TYPES } from '../../../../redux/constants';
import { Formik } from 'formik';
import useBreakpoint from '../../../../components/breakpoints/BreakpointProvider';
import { ReactNode, useEffect, useState } from 'react';
import CustomBackdrop from '../../../../components/customBackdrop/CustomBackdrop';
import WithTranslateFormErrors from '../../../../services/validationScemaOnLangChange';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { imageUpload } from '../../../../redux/other/otherActions';
import { useEditFreelancer } from '../../../applyFreelancer/useEditFreelancer';
import Form from '../../../../components/form/Form';
import { useProfileContext } from '../../Profile';
import { setTokens } from '../../../../redux/account/accountApi';
import { updateUserInfo } from '../../../../redux/auth/authSlice';
import { setAvatar, setProfile } from '../../../../redux/other/otherSlice';
import "cropperjs/dist/cropper.css";
import '../../../applyFreelancer/applyFreelancer.css';

const EditUserInfo = ({
    first_name,
    last_name,
    userAvatar,
    userProfile,
    setUserAvatar,
    setUserProfile,
    loadingAvatar,
    loadingProfile
}: any) => {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const { isMobile } = useBreakpoint();
    const { updateProfileData } = useProfileContext();
    const dispatch = useAppDispatch();
    const editFreelancer = useEditFreelancer();
    const { userInfo } = useAppSelector(state => state.auth)

    const [editMode, setEditMode] = useState(false);
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
                                        setUserProfile(URL.createObjectURL(result));
                                        dispatch(setProfile(URL.createObjectURL(result)))
                                        imageUrlUpdate['profile_file_name'] = res.payload.data.file_name;
                                    } else if (tempImageData.functionType === FUNCTION_TYPES.USER_AVATAR) {
                                        setUserAvatar(URL.createObjectURL(result));
                                        dispatch(setAvatar(URL.createObjectURL(result)))
                                        imageUrlUpdate['avatar_file_name'] = res.payload.data.file_name;
                                        setTokens({ ...userInfo, avatar_file_name: res.payload.data.file_name });
                                        dispatch(updateUserInfo({ ...userInfo, avatar_file_name: res.payload.data.file_name }))
                                    }
                                    updateProfileData(imageUrlUpdate);
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
    }, [dispatch, enqueueSnackbar, cropData, tempImageData, setUserAvatar, setUserProfile, updateProfileData, userInfo])

    return (<Box className="user-info-edit">
        <IconButton style={{ marginLeft: 'auto' }} onClick={() => setEditMode(true)}>
            <EditIcon className="user-info-edit-icon" />
        </IconButton>
        <IconButton onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            enqueueSnackbar(t('profile.share-link-copied-to-clipboard'))
        }}>
            <ShareIcon className="user-info-edit-icon" />
        </IconButton>

        <Dialog
            fullScreen={isMobile}
            open={editMode}
            maxWidth="lg"
            className='userinfo-profile-edit'
        >
            <Formik
                enableReinitialize
                initialValues={{
                    first_name: first_name,
                    last_name: last_name,
                }}
                validationSchema={yup.object({
                    first_name: yup
                        .string()
                        .required(t('validation.firstname-required')),
                    last_name: yup
                        .string()
                        .required(t('validation.lastname-required'))
                })}
                onSubmit={values => {
                    console.log("onSubmit", JSON.stringify(values, null, 2));
                }}
            >
                {formik =>
                    <WithTranslateFormErrors {...formik}>
                        <DialogContent>
                            <DialogTitle style={{ padding: '0 24px 24px 24px' }}>
                                <Box className={`heading-flex`}>
                                    <Box>
                                        <Box className='profile-edit-heading-title'>{t('freelancer.info.title')}</Box>
                                    </Box>
                                </Box>
                            </DialogTitle>
                            <Box style={{ paddingTop: '10px' }} className={isMobile ? "profile-edit-dialog-body profile-edit-dialog-body-mobile" : "profile-edit-dialog-body"}>
                                <Box className="profile-photo-container">
                                    <Box className="profile-image-box">
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
                            <DialogActions style={{ paddingTop: '24px', paddingRight: '24px', paddingBottom: 0 }}>
                                <Button
                                    variant="text"
                                    onClick={() => {
                                        setEditMode(false)
                                    }}>
                                    {t('cancel')}
                                </Button>
                                <Button
                                    style={{ marginLeft: 10 }}
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
                                            if (!userAvatar && !loadingAvatar) {
                                                avatarImageCheck = true;
                                                enqueueSnackbar(t('validation.avatar-image'))
                                            } else if (!userProfile && !loadingProfile) {
                                                profileImageCheck = true;
                                                enqueueSnackbar(t('validation.profile-image'))
                                            }

                                            if (!(first_name || last_name || avatarImageCheck || profileImageCheck)) {
                                                setBackdrop(true);
                                                editFreelancer(formik.values).then(() => {
                                                    setEditMode(false);
                                                    const fullName = [formik.values.first_name, formik.values.last_name].join(' ');
                                                    setTokens({ ...userInfo, name: fullName });
                                                    dispatch(updateUserInfo({ ...userInfo, name: fullName }))
                                                    updateProfileData({
                                                        first_name: formik.values.first_name,
                                                        last_name: formik.values.last_name,
                                                        full_name: fullName
                                                    })
                                                }).catch(() => { })
                                                    .finally(() => { setBackdrop(false) })
                                            }
                                        })
                                    }}>{t('user-personal-account-save')}</Button>
                            </DialogActions>
                        </DialogContent>
                    </WithTranslateFormErrors>
                }
            </Formik>
        </Dialog>

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

        <CustomBackdrop loading={backdrop} />
    </Box>)
}

export default EditUserInfo;
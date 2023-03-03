import React from "react";
import * as yup from "yup";
import { Box, TextField, Typography } from "@mui/material";
import { Formik } from 'formik';
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";

import WithTranslateFormErrors from "../../../services/validationScemaOnLangChange";
import { scheduleAppointment } from '../../../redux/home/homeActions';
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import Button from "../../../components/button/Button";
import EmblaCarousel from "../../../components/carousal/Carousal";
import CustomBackdrop from "../../../components/customBackdrop/CustomBackdrop";

const WorkPlateformSection = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const { language } = useAppSelector(state => state.resources);
    const [backdrop, setBackdrop] = React.useState(false);

    return (
        <Box className="home-work-plateform-section" style={{ marginBottom: '95px' }}>
            <Box className="home-work-plateform-left">
                {false ?
                    <Box>
                        <Box>
                            <Typography className="home-work-plateform-heading">
                                {t('home-page-default-third')}
                            </Typography>
                        </Box>
                        <Box className="home-work-plateform-spacing">
                            <Typography className="home-work-plateform-sub-heading">
                                {t('home-page-default-work-plateform-info')}
                            </Typography>
                        </Box>
                        <Box className="home-work-plateform-spacing">
                            <img style={{ cursor: "pointer" }} height="50" src="/images/google-play.png" alt="google-play" />
                        </Box>
                    </Box>
                    :
                    <Box>
                        <Box>
                            <Typography className="home-work-plateform-heading">
                                {t('home-page-comming-soon')}
                            </Typography>
                        </Box>
                        <Box className="home-work-plateform-spacing">
                            <Typography className="home-work-plateform-sub-heading">
                                {t('home-page-comming-soon-info')}
                            </Typography>
                        </Box>
                        {language === 'en' ?
                            <Formik
                                validationSchema={yup.object({
                                    email: yup
                                        .string()
                                        .required(t('validation.email-required'))
                                })}
                                initialValues={{ email: '' }}
                                onSubmit={(values, actions) => {
                                    setBackdrop(true);
                                    dispatch(scheduleAppointment(values.email))
                                        .then((res) => {
                                            enqueueSnackbar(res.payload.message)
                                            actions.resetForm();
                                            setBackdrop(false);
                                        }).catch((error) => {
                                            enqueueSnackbar(error.message);
                                            actions.resetForm();
                                            setBackdrop(false);
                                        })
                                }}
                            >
                                {props => (
                                    <WithTranslateFormErrors {...props}>
                                        <form
                                            onSubmit={props.handleSubmit}
                                            className="home-work-plateform-form"
                                        >
                                            <TextField
                                                value={props.values.email}
                                                id="email"
                                                name="email"
                                                placeholder={t('email')}
                                                onChange={props.handleChange}
                                                error={props.touched.email && Boolean(props.errors.email)}
                                                helperText={props.touched.email && props.errors.email}
                                                InputProps={{ sx: { height: 40, borderRadius: '24px' } }}
                                                style={{ marginRight: '20px', height: '40px' }}
                                                fullWidth
                                            />
                                            <Button type="submit">{t('submit')}</Button>
                                        </form>
                                    </WithTranslateFormErrors>
                                )}
                            </Formik>
                            :
                            <img className="qr-code-image" alt="rounx-qrcode" src="/images/rounx-qrcode.jpg" />
                        }
                        <CustomBackdrop loading={backdrop} />
                    </Box>
                }
            </Box>
            <Box className="home-work-plateform-right">
                <EmblaCarousel mediaByIndex={[
                    "/images/screenshot-1.png",
                    "/images/screenshot-2.png"
                ]} />
            </Box>
        </Box>
    )
}

export default WorkPlateformSection;
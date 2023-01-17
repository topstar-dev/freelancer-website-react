import { Backdrop, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../components/button/Button';
import Card from '../../components/card/Card';
import { getFreelancerApplicationAction } from '../../redux/freelancer/freelancerActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getFreelancerProfileAction } from '../../redux/profile/profileActions';
import { useNavigate } from '../../routes/Router';
import './applyFreelancer.css';

const ApplicationStatus = (props: any) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [backdrop, setBackdrop] = React.useState(false);

    const statusData = sessionStorage.getItem('freelancer-application-status') ? JSON.parse(`${sessionStorage.getItem('freelancer-application-status')}`) : '';
    const [status, setStatus] = React.useState(statusData ? statusData.status : '')

    useEffect(() => {
        if (!statusData) {
            setBackdrop(true)
            dispatch(getFreelancerApplicationAction()).then((res) => {
                if (res.payload && res.payload.success) {
                    const status = res.payload.data.status;
                    sessionStorage.setItem('freelancer-application-status', JSON.stringify(res.payload.data))
                    setStatus(status);
                }
            }).catch(() => {
            }).finally(() => {
                setBackdrop(false)
            })
        }
    }, [statusData, dispatch])

    const getStatus = () => {
        if (status === 'FAILED') {
            return <FailedApplication />
        } else if (status === 'APPLYING') {
            return <ApplyingApplication />
        } else if (status === 'PASSED') {
            return <PassedApplication />
        } else if (status === 'NO_APPLICATION') {
            navigate('/apply-freelancer/skills');
        }
    }

    useEffect(() => {
        document.title = t('title.freelancer');
    })

    return (
        <Box>
            <Box className="freelancer-main-title">
                {t('freelancer.title')}
            </Box>
            {getStatus()}
            <Backdrop
                className='only-backdrop'
                sx={{ color: '#fff', zIndex: 999 }}
                open={backdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    )
}

const FailedApplication = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [backdrop, setBackdrop] = React.useState(false);
    const { userInfo } = useAppSelector(state => state.auth);
    const status = JSON.parse(sessionStorage.getItem('freelancer-application-status') || '{}');

    return (
        <Card className={`freelancer-card text-centered freelancer-card-spacing`}>
            <Box className={`freelancer-heading`}>
                <Box className='heading-title' style={{ marginBottom: 24 }}>{t('freelancer.status.failed-title')}</Box>
                <Box className='heading-steps' style={{ marginBottom: 24 }}>{t('freelancer.status.failed-message', { message: status.unapproved_reason })}</Box>
            </Box>
            <Button onClick={() => {
                setBackdrop(true)
                dispatch(getFreelancerProfileAction({ username: `${userInfo?.username}` })).then((res) => {
                    if (res.payload && res.payload.success) {
                        sessionStorage.setItem('freelancer-application-info', JSON.stringify(res.payload.data))
                        navigate(`/apply-freelancer/skills`);
                    }
                }).catch((err) => {
                }).finally(() => {
                    setBackdrop(false)
                })
            }}>{t('freelancer.status.failed-button')}</Button>
            <Backdrop
                className='only-backdrop'
                sx={{ color: '#fff', zIndex: 999 }}
                open={backdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Card >
    )
}

const ApplyingApplication = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <Card className={`freelancer-card text-centered freelancer-card-spacing`}>
            <Box className={`freelancer-heading`}>
                <Box className='heading-title' style={{ marginBottom: 24 }}>{t('freelancer.status.applying-title')}</Box>
                <Box className='heading-steps' style={{ marginBottom: 24 }}>{t('freelancer.status.applying-message')}</Box>
            </Box>
            <Button onClick={() => { navigate('/') }}>{t('freelancer.status.applying-button')}</Button>
        </Card >
    )
}

const PassedApplication = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <Card className={`freelancer-card text-centered freelancer-card-spacing`}>
            <Box className={`freelancer-heading`}>
                <Box className='heading-title' style={{ marginBottom: 24 }}>{t('freelancer.status.passed-title')}</Box>
                <Box className='heading-steps' style={{ marginBottom: 24 }}>{t('freelancer.status.passed-message')}</Box>
            </Box>
            <Button onClick={() => { navigate('/') }}> {t('freelancer.status.passed-button')}</Button>
        </Card >
    )
}

export default ApplicationStatus;
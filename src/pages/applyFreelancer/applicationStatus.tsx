import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../components/button/Button';
import Card from '../../components/card/Card';
import CustomBackdrop from '../../components/customBackdrop/CustomBackdrop';
import { getFreelancerApplicationAction } from '../../redux/freelancer/freelancerActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getProfileAction } from '../../redux/profile/profileActions';
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
        <Box className="container">
            <Box className="freelancer-main-title">
                {t('freelancer.title')}
            </Box>
            {getStatus()}
            <CustomBackdrop loading={backdrop} />
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
                dispatch(getProfileAction({ username: `${userInfo?.username}` })).then((res: any) => {
                    if (res.payload && res.payload.success) {
                        sessionStorage.setItem('freelancer-application-info', JSON.stringify(res.payload.data))
                        navigate(`/apply-freelancer/skills`);
                    }
                }).catch((err: any) => {
                }).finally(() => {
                    setBackdrop(false)
                })
            }}>{t('freelancer.status.failed-button')}</Button>
            <CustomBackdrop loading={backdrop} />
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
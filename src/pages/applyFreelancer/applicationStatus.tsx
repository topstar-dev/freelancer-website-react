import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../components/button/Button';
import Card from '../../components/card/Card';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getFreelancerProfileAction } from '../../redux/profile/profileActions';
import { useNavigate } from '../../routes/Router';
import './applyFreelancer.css';

const ApplicationStatus = (props: any) => {
    const { t } = useTranslation();

    const getStatus = () => {
        const statusData = JSON.parse(sessionStorage.getItem('freelancer-application-status') || '{}');
        const status = statusData.status;
        if (status === 'FAILED') {
            return <FailedApplication />
        } else if (status === 'APPLYING') {
            return <ApplyingApplication />
        } else if (status === 'PASSED') {
            return <PassedApplication />
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
        </Box>
    )
}

const FailedApplication = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { userInfo } = useAppSelector(state => state.auth);
    const status = JSON.parse(sessionStorage.getItem('freelancer-application-status') || '{}');

    return (
        <Card className={`freelancer-card text-centered freelancer-card-spacing`}>
            <Box className={`freelancer-heading`}>
                <Box className='heading-title' style={{ marginBottom: 24 }}>{t('freelancer.status.failed-title')}</Box>
                <Box className='heading-steps' style={{ marginBottom: 24 }}>{t('freelancer.status.failed-message', { message: status.unapproved_reason })}</Box>
            </Box>
            <Button onClick={() => {
                dispatch(getFreelancerProfileAction({ username: `${userInfo?.username}` })).then((res) => {
                    if (res.payload && res.payload.success) {
                        sessionStorage.setItem('freelancer-application-info', JSON.stringify(res.payload.data))
                        navigate(`/apply-freelancer`);
                    }
                }).catch((err) => {

                })
            }}>{t('freelancer.status.failed-button')}</Button>
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
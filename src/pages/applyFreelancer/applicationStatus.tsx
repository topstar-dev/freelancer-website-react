import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import Button from '../../components/button/Button';
import Card from '../../components/card/Card';
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
    return (
        <Card className={`rounx-freelancer-card text-centered freelancer-card-spacing`}>
            <Box className={`rounx-freelancer-heading`}>
                <Box className='heading-title' style={{ marginBottom: 24 }}>{t('freelancer.status.failed-title')}</Box>
                <Box className='heading-steps' style={{ marginBottom: 24 }}>{t('freelancer.status.failed-message', { message: '' })}</Box>
            </Box>
            <Button onClick={() => {

            }}>{t('freelancer.status.failed-button')}</Button>
        </Card >
    )
}

const ApplyingApplication = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <Card className={`rounx-freelancer-card text-centered freelancer-card-spacing`}>
            <Box className={`rounx-freelancer-heading`}>
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
        <Card className={`rounx-freelancer-card text-centered freelancer-card-spacing`}>
            <Box className={`rounx-freelancer-heading`}>
                <Box className='heading-title' style={{ marginBottom: 24 }}>{t('freelancer.status.passed-title')}</Box>
                <Box className='heading-steps' style={{ marginBottom: 24 }}>{t('freelancer.status.passed-message')}</Box>
            </Box>
            <Button onClick={() => { navigate('/') }}> {t('freelancer.status.passed-button')}</Button>
        </Card >
    )
}

export default ApplicationStatus;
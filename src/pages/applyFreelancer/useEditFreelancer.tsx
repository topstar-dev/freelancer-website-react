import { useSnackbar } from 'notistack';
import { USER_TYPES } from '../../redux/constants';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { editClientProfileAction, editFreelancerProfileAction } from '../../redux/profile/profileActions';

export function useEditFreelancer() {
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { userInfo } = useAppSelector(state => state.auth)

    return (data: any, freelancerPage: boolean = true) => {
        return new Promise((resolve, reject) => {
            dispatch(userInfo?.user_type !== USER_TYPES.FREELANCER ? editClientProfileAction(data) : editFreelancerProfileAction(data)).then((res) => {
                if (res.payload && res.payload.success) {
                    if (freelancerPage) {
                        const freelancerApplicationInfo = sessionStorage.getItem('freelancer-application-info') ? JSON.parse(`${sessionStorage.getItem('freelancer-application-info')}`) : {};
                        sessionStorage.setItem('freelancer-application-info', JSON.stringify({ ...freelancerApplicationInfo, ...data }))
                    }
                    resolve(true);
                } else {
                    if (res.payload.error && res.payload.error === 'NAME_UNABLE_MODIFY') {
                        resolve(true);
                    } else {
                        reject(res);
                    }
                    enqueueSnackbar(res.payload.message);
                }
            }).catch((err) => {
                enqueueSnackbar(err.message);
                reject(err);
            })
        })
    }
}
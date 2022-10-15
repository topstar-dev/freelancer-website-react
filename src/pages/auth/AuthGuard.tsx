import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

export default function AuthGuard(props: any) {
    const navigate = useNavigate();
    const { userInfo } = useAppSelector((state) => state.auth);

    React.useEffect(() => {
        if (!userInfo) {
            navigate('/');
        }
    }, [userInfo, navigate])

    return props.children
}
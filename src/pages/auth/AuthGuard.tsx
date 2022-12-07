import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { getBaseUrl } from '../../routes/Router';

export default function AuthGuard(props: any) {
    const navigate = useNavigate();
    const { userInfo } = useAppSelector((state) => state.auth);

    React.useEffect(() => {
        if (!userInfo) {
            navigate(`${getBaseUrl()}/`);
        }
    }, [userInfo, navigate])

    return props.children
}
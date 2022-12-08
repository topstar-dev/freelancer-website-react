import * as React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { useNavigate } from '../../routes/Router';

export default function AuthGuard(props: any) {
    const navigate = useNavigate();
    const { userInfo } = useAppSelector((state) => state.auth);

    React.useEffect(() => {
        if (!userInfo) {
            navigate(`/`);
        }
    }, [userInfo, navigate])

    return props.children
}
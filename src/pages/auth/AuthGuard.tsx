import * as React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { useRounxNavigate } from '../../routes/Router';

export default function AuthGuard(props: any) {
    const navigate = useRounxNavigate();
    const { userInfo } = useAppSelector((state) => state.auth);

    React.useEffect(() => {
        if (!userInfo) {
            navigate(`/`);
        }
    }, [userInfo, navigate])

    return props.children
}
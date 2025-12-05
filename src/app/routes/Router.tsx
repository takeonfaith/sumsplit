import { useUnit } from 'effector-react';
import { $user } from '../../entities/user/model/init';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';

export const Router = () => {
    const user = useUnit($user);

    if (user) {
        return <PrivateRoutes />;
    }

    return <PublicRoutes />;
};

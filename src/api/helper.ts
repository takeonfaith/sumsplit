import axios from 'axios';
import { DEV_API_URL, PROD_API_URL } from './constants';
import type { UserId } from '../entities/user/model/types';

export const $api = axios.create({
    baseURL:
        import.meta.env.MODE === 'development' ? DEV_API_URL : PROD_API_URL,
});

export const END_POINTS = {
    user: {
        getById: (id: UserId) => `/user/${id}`,
    },
    auth: {
        login: '/auth/login',
        signUp: '/auth/signup',
        logout: '/auth/logout',
        currentUser: '/current-user',
    },
    events: {
        create: '/events/create',
        getUserEvents: '/events/user',
        update: '/events/update',
        getById: '/events/getById',
    },
};

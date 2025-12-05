import { createEffect, createStore, sample } from 'effector';
import { api } from '../../../api';
import { type TUser } from './types';

export const getUserFx = createEffect<void, TUser>();

export const $user = createStore<TUser | null>(null);

sample({
    clock: getUserFx.doneData,
    target: $user,
});

getUserFx.use(async () => {
    const response = await api.user.getUserData();
    return response.data;
});

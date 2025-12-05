import { sample } from 'effector';
import { api } from '../../../api';
import { createEffectWithToast } from '../../../shared/effector/createEffectWithToast';
import { getUserFx } from './init';
import type { LoginRequest, TUser } from './types';

export const loginFx = createEffectWithToast<LoginRequest, TUser>();

sample({
    clock: loginFx.doneData,
    target: getUserFx,
});

loginFx.use(async (request) => {
    console.log(request);

    const response = await api.user.login(request.email, request.password);
    console.log(response);

    return response.data;
});

import { createEffect, createEvent, sample } from 'effector';
import { api } from '../../../api';
import { getUserFx } from './init';
import type { SignUpRequest, SignUpResponse } from './types';

export const signUpFx = createEffect<SignUpRequest, SignUpResponse>();

export const signUp = createEvent<SignUpRequest>();

sample({
    clock: signUpFx.doneData,
    target: getUserFx,
});

signUpFx.use(async (request) => {
    return await api.user.signUp(request.name, request.email, request.password);
});

import { createEvent, sample } from 'effector';
import { api } from '../../../api';
import { createEffectWithToast } from '../../../shared/effector/createEffectWithToast';
import { $user } from './init';

const logoutFx = createEffectWithToast();

export const logout = createEvent();

sample({
	clock: logout,
	target: logoutFx,
})

sample({
	clock: logoutFx.doneData,
	fn: () => null,
	target: $user,
})

logoutFx.use(async () => {
    await api.user.logout();
});

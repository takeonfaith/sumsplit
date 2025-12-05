import { createEffect } from 'effector';
import { toastAlert, toastSuccess } from '../components/toast/toast';

export const createEffectWithToast = <T, R>(
    successMessage?: string,
    errorMessage = 'Ошибка'
) => {
    const effect = createEffect<T, R>();

    effect.fail.watch(({ error }) => {
        if (errorMessage) {
            toastAlert(error.message);
        }
    });

    effect.done.watch(() => {
        if (successMessage) {
            toastSuccess(successMessage);
        }
    });

    return effect;
};

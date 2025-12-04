import type { TForm, TFormShape } from '../types';

export const getFormFromShape = <T extends TFormShape>(shape: T) => {
    return Object.keys(shape).reduce((acc, key) => {
        const value = shape[key as keyof typeof shape];
        if (
            value &&
            typeof value === 'object' &&
            'init' in value &&
            value.init !== undefined &&
            value.init !== null
        ) {
            const initValue = value.init;

            (acc as Record<string, unknown>)[key] = initValue;
        }
        return acc;
    }, {} as TForm<T>);
};

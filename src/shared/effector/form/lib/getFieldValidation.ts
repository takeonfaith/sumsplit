import type {
    TFieldType,
    TFieldValueType,
    TFormShape,
    TFormShapeObject,
} from '../types';

export const getFieldValidation = async <T extends TFormShape>(
    id: keyof T,
    value: TFieldValueType[T[keyof T]['type']] | undefined,
    shape: T
) => {
    const field = shape[id] as TFormShapeObject<TFieldType>;
    const { required, validation, asyncValidation } = field;

    if (required) {
        if (!value) return 'Обязательное поле';
    }

    if (validation) {
        return validation(value);
    }

    if (asyncValidation) {
        return await asyncValidation(value);
    }

    return undefined;
};

export interface TFieldValueType {
    string: string;
    number: number;
    date: Date;
    boolean: boolean;
    array: unknown[];
    email: string;
    password: string;
    files: File[] | null;
    file: File | null;
    stringArray: string[];
}

export type TFieldType = keyof TFieldValueType;

export type TFormShapeObject<T extends TFieldType> = {
    type: T;
    required: boolean;
    init: TFieldValueType[T] | null;
    label?: string;
    maxLength?: number;
    validation?: (value: TFieldValueType[T] | undefined) => string | undefined;
    asyncValidation?: (
        value: TFieldValueType[T] | undefined
    ) => Promise<string | undefined>;
};

export type TFormShape = ValidateFormShape<
    Record<string, TFormShapeObject<TFieldType>>
>;

export type TForm<T extends TFormShape> = {
    [K in keyof T]?: T[K] extends { type: infer FieldType }
        ? FieldType extends TFieldType
            ? TFieldValueType[FieldType]
            : never
        : never;
};

// Тип для полных значений формы
// Если поле required: true, то оно обязательное (не | undefined)
// Если поле required: false, то оно опциональное (| undefined)
export type TFormValues<T extends TFormShape> = {
    [K in keyof T]: T[K] extends { type: infer FieldType; required: infer R }
        ? FieldType extends TFieldType
            ? R extends true
                ? TFieldValueType[FieldType] // required: true - обязательное поле
                : TFieldValueType[FieldType] | undefined // required: false - опциональное поле
            : never
        : never;
};

export type TFormErrors<T extends TFormShape> = Partial<
    Record<keyof T, string | undefined>
>;

// Вспомогательный тип для проверки соответствия типов в форме
// Проверяет, что для каждого поля init соответствует типу поля
export type ValidateFormShape<
    T extends Record<
        string,
        { type: TFieldType; required: boolean; init: unknown }
    >
> = {
    [K in keyof T]: T[K] extends {
        type: infer FieldType;
        init: infer I;
    }
        ? FieldType extends TFieldType
            ? I extends TFieldValueType[FieldType] | null
                ? TFormShapeObject<FieldType>
                : never
            : never
        : never;
};

export type UseFormProps<T extends TFormShape> = {
    submitForm?: (
        values: TFormValues<T>,
        reset: () => void
    ) => Promise<void> | void;
    validate?: (keyof T)[];
    showErrorToast?: boolean;
    successToastMessage?: string;
    initialValues?: Partial<TForm<T>>;
    resetOnUnmount?: boolean;
};

// Базовые типы для формы
export type TFormSubmitHandler<T extends TFormShape> = (
    values: TFormValues<T>,
    reset: () => void
) => Promise<void> | void;

export type TFormToastOptions = {
    showToast: boolean;
    successToastMessage?: string;
};

// Типы для эффектов
export type TValidateFieldsFxParams<T extends TFormShape> = {
    ids: (keyof T)[];
    values: TForm<T>;
    onSubmit: TFormSubmitHandler<T>;
} & TFormToastOptions;

export type TOnSubmitFxParams<T extends TFormShape> = {
    values: TFormValues<T>;
    onSubmit: TFormSubmitHandler<T>;
} & TFormToastOptions;

// Типы для событий
export type TUpdateFieldEvent<T extends TFormShape> = {
    [K in keyof T]: {
        id: K;
        value: TForm<T>[K] | null;
        isInitial?: boolean;
    };
}[keyof T];

export type TValidateFieldsEvent<T extends TFormShape> = {
    validate: (keyof T)[];
    onSubmit: TFormSubmitHandler<T>;
} & TFormToastOptions;

export type TOnSubmitEvent<T extends TFormShape> = {
    values: TFormValues<T>;
    validate: (keyof T)[];
    onSubmit: TFormSubmitHandler<T>;
} & TFormToastOptions;

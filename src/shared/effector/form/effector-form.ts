import {
    createEffect,
    createEvent,
    createStore,
    sample,
    type StoreWritable,
    combine,
} from 'effector';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';

import { getFieldValidation } from './lib/getFieldValidation';
import { getFormFromShape } from './lib/getFormFromShape';
import type {
    TForm,
    TFormErrors,
    TFormShape,
    TFormValues,
    TOnSubmitEvent,
    TOnSubmitFxParams,
    TUpdateFieldEvent,
    TValidateFieldsEvent,
    TValidateFieldsFxParams,
    UseFormProps,
} from './types';
import { isValueEqual } from './lib/isValueEqual';
import { createPendingEffectsStore } from '../createPendingEffects';

export const createEffectorForm = <T extends TFormShape>(shape: T) => {
    const validateFieldsFx = createEffect<
        TValidateFieldsFxParams<T>,
        TFormErrors<T>
    >();

    const onSubmitFx = createEffect<TOnSubmitFxParams<T>, void>();

    const updateField = createEvent<TUpdateFieldEvent<T>>();
    const validateFields = createEvent<TValidateFieldsEvent<T>>();
    const resetForm = createEvent();

    const onSubmit = createEvent<TOnSubmitEvent<T>>();

    const $values = createStore<TForm<T>>(getFormFromShape(shape)).reset([
        resetForm,
    ]);
    const $initialValues = createStore<TForm<T>>(getFormFromShape(shape));

    // Update initial values to submitted values after successful submit
    // so form is considered "unchanged" after submit
    sample({
        clock: onSubmitFx.done,
        fn: ({ params }) => params.values,
        target: $initialValues,
    });
    const $fieldsChanged = createStore<Set<keyof T>>(new Set()).reset([
        onSubmitFx.done,
        resetForm,
    ]);
    const $errors = createStore<TFormErrors<T>>({}).reset([
        onSubmitFx.done,
        resetForm,
    ]);
    const $validatingFields = createPendingEffectsStore({
        effects: [validateFieldsFx],
        getId: ({ ids }) => ids as string[],
    }) as StoreWritable<Set<keyof T>>;

    // Track field changes by comparing with initial values
    sample({
        clock: updateField,
        source: {
            initialValues: $initialValues,
            fieldsChanged: $fieldsChanged,
        },
        filter: (_, { isInitial }) => !isInitial,
        fn: ({ initialValues, fieldsChanged }, { id, value }) => {
            const newFieldsChanged = new Set(fieldsChanged);
            const initialValue = initialValues[id];

            // Handle case when value is falsy (deleted field)
            // Compare undefined with initial value
            const valueToCompare = value ?? undefined;
            const initialValueToCompare = initialValue ?? undefined;

            // Compare new value with initial value
            const isEqual = isValueEqual(valueToCompare, initialValueToCompare);

            if (isEqual) {
                // Value returned to initial, remove from changed fields
                newFieldsChanged.delete(id);
            } else {
                // Value differs from initial, add to changed fields
                newFieldsChanged.add(id);
            }

            return newFieldsChanged;
        },
        target: $fieldsChanged,
    });

    // Update initial values when isInitial is true
    sample({
        clock: updateField,
        source: $initialValues,
        filter: (_, { isInitial }) => isInitial === true,
        fn: (initialValues, { id, value }) => {
            return {
                ...initialValues,
                [id]: value,
            };
        },
        target: $initialValues,
    });

    // Update the values of the form
    sample({
        clock: updateField,
        source: $values,
        fn: (values, { id, value }) => {
            if (!value) {
                const newValues = { ...values };
                delete newValues[id];
                return newValues;
            }

            return {
                ...values,
                [id]: value,
            };
        },
        target: $values,
    });

    // Reset error of the field
    // when the field is updated
    sample({
        clock: updateField,
        source: $errors,
        fn: (errors, { id }) => {
            const newErrors = { ...errors };
            delete newErrors[id];
            return newErrors;
        },
        target: $errors,
    });

    // Validate the fields
    sample({
        clock: validateFields,
        source: { values: $values },
        fn: (
            { values },
            { validate, showToast, onSubmit, successToastMessage }
        ) => ({
            ids: validate,
            values,
            showToast,
            onSubmit,
            successToastMessage,
        }),
        target: validateFieldsFx,
    });

    // Set the errors of the fields after validation
    sample({
        clock: validateFieldsFx.done,
        source: $errors,
        fn: (errors, { result }) => {
            return Object.keys(result).reduce((acc, key) => {
                if (result[key]) {
                    return {
                        ...acc,
                        [key]: result[key],
                    };
                }

                return acc;
            }, errors);
        },
        target: $errors,
    });

    // Validate the fields before submitting
    sample({
        clock: onSubmit,
        source: $values,
        fn: (
            _values,
            { onSubmit, showToast, successToastMessage, validate }
        ) => ({
            validate,
            showToast,
            onSubmit,
            successToastMessage,
        }),
        target: validateFields,
    });

    // Submit the form if the fields are valid
    sample({
        clock: validateFieldsFx.done,
        source: $values,
        filter: (_values, { result }) => {
            return Object.values(result).every((error) => error === undefined);
        },
        fn: (
            values,
            { params: { onSubmit, showToast, successToastMessage } }
        ) => ({
            values: values as TFormValues<T>,
            onSubmit,
            showToast,
            successToastMessage,
        }),
        target: onSubmitFx,
    });

    validateFieldsFx.use(async ({ ids, values }) => {
        const errorsAfterValidation = await Promise.all(
            ids.map((id) => getFieldValidation(id, values[id], shape))
        );

        return errorsAfterValidation.reduce(
            (acc, error, index) => ({
                ...acc,
                [ids[index]]: error,
            }),
            {}
        );
    });

    /**
     * Submit the form
     */
    onSubmitFx.use(async ({ values, onSubmit }) => {
        await onSubmit(values, () => resetForm());
    });

    // Computed store to check if there are any changes
    const $hasChanges = combine(
        $fieldsChanged,
        (fieldsChanged) => fieldsChanged.size > 0
    );

    return {
        useForm: ({
            submitForm,
            validate,
            showErrorToast = false,
            successToastMessage,
            initialValues,
            resetOnUnmount,
        }: UseFormProps<T>) => {
            const [
                values,
                errors,
                validatingFields,
                fieldsChanged,
                hasChanges,
                savedInitialValues,
                isSubmitting,
            ] = useUnit([
                $values,
                $errors,
                $validatingFields,
                $fieldsChanged,
                $hasChanges,
                $initialValues,
                onSubmitFx.pending,
            ]);

            const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                e.stopPropagation();

                if (!submitForm) return;

                onSubmit({
                    values: values as TFormValues<T>,
                    onSubmit: submitForm,
                    showToast: showErrorToast,
                    successToastMessage,
                    validate: validate ?? Object.keys(shape),
                });
            };

            const setInitialValues = (
                values: Partial<TForm<T>> | undefined
            ) => {
                if (values) {
                    Object.keys(values).forEach((key) => {
                        updateField({
                            id: key as keyof T,
                            value: values[key as keyof T]!,
                            isInitial: true,
                        });
                    });
                }
            };

            useEffect(() => {
                setInitialValues(initialValues);
                // eslint-disable-next-line react-hooks/exhaustive-deps
            }, []);

            const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                const { id, value } = e.currentTarget;

                updateField({
                    id: id as keyof T,
                    value: value as TForm<T>[keyof T],
                });
            };

            const handleResetForm = () => {
                resetForm();
                setInitialValues(savedInitialValues);
            };

            const handleEnterKeyDown = (
                e: React.KeyboardEvent<HTMLInputElement>
            ) => {
                if (e.key === 'Enter') {
                    handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
                }
            };

            useEffect(() => {
                return () => {
                    if (resetOnUnmount) {
                        resetForm();
                    }
                };
            }, [resetOnUnmount]);

            return {
                values: values,
                errors: errors,
                updateField,
                handleSubmit,
                validatingFields,
                isSubmitting,
                fieldsChanged,
                hasChanges,
                onChange,
                resetForm: handleResetForm,
                handleEnterKeyDown,
            };
        },
    };
};

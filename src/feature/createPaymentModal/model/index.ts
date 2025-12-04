import { createEffectorForm } from '../../../shared/effector/form/effector-form';

// Функция для получения локального времени в формате HH:mm
const getLocalTime = (): string => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};

// Функция для получения локальной даты в формате YYYY-MM-DD
const getLocalDate = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const { useForm } = createEffectorForm({
    name: {
        type: 'string',
        required: true,
        init: '',
        label: 'Название',
        validation: (value) => {
            if (!value) return 'Название обязательно';
            return undefined;
        },
    },
    description: {
        type: 'string',
        required: true,
        init: '',
        label: 'Описание',
        validation: (value) => {
            if (!value) return 'Описание обязательно';
            return undefined;
        },
    },
    sum: {
        type: 'number',
        required: true,
        init: 0,
        label: 'Сумма',
        validation: (value) => {
            if (!value) return 'Сумма обязательна';
            return undefined;
        },
    },
    event: {
        type: 'string',
        required: true,
        init: '',
        label: 'Событие',
        validation: (value) => {
            if (!value) return 'Событие обязательно';
            return undefined;
        },
    },

    currency: {
        type: 'string',
        required: true,
        init: '',
        label: 'Валюта',
        validation: (value) => {
            if (!value) return 'Валюта обязательна';
            return undefined;
        },
    },
    date: {
        type: 'string',
        required: true,
        init: getLocalDate(),
        label: 'Дата',
    },
    time: {
        type: 'string',
        required: true,
        init: getLocalTime(),
        label: 'Время',
    },
});

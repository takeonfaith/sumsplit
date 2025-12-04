import { createEvent, createStore } from 'effector';
import type { TPayment } from './types';
import { CURRENCY } from '../../../shared/constants';

export const addPayment = createEvent<TPayment>();

export const $currentEventPayments = createStore<TPayment[]>([
    {
        id: '1',
        name: 'Starbucks',
        description: 'Описание платежа 1',
        createdAt: new Date().toISOString(),
        sum: 100,
        currency: CURRENCY.RUB,
        whoPaid: '1',
        whoShouldPay: [{ id: '2', percentage: 50 }],
        eventId: '1',
    },
]);

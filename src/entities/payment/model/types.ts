import type { TCurrency } from '../../../shared/constants';

export type TPayment = {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    sum: number;
    currency: TCurrency;
    whoPaid: string;
    whoShouldPay: { id: string; percentage: number }[];
    eventId: string;
};

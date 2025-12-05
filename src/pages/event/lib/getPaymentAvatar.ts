import { LOGOS } from '../../../shared/icons/logos';

export const getPaymentAvatar = ({ name }: { name: string }) => {
    return LOGOS[name as keyof typeof LOGOS];
};

import { PAYMENT_PLACES } from '../../../shared/constants';
import starbucksLogo from '/assets/starbucks-logo.png';

export const PAYMENT_AVATARS = {
    [PAYMENT_PLACES.Starbucks]: starbucksLogo,
};

export const getPaymentAvatar = ({ name }: { name: string }) => {
    return PAYMENT_AVATARS[name as keyof typeof PAYMENT_AVATARS];
};

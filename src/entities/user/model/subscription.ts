import { $user } from './init';
import { ESubscriptionType } from './types';

export const $isPlus = $user.map(
    (user) => user?.subscription.type === ESubscriptionType.PLUS
);

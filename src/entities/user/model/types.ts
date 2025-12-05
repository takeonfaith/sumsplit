export type UserId = Branded<string, 'UserId'>;

export type TUser = {
    id: UserId;
    name: string;
    avatar?: string;
    subscription: Subscription;
    updated_at_utc: string;
    created_at_utc: string;
    email: string;
};

export type SignUpRequest = Pick<TUser, 'name' | 'email'> & {
    password: string;
};
export type SignUpResponse = TUser;

export type LoginRequest = {
    email: string;
    password: string;
};

export type UpdateUserRequest = Omit<TUser, 'name' | 'avatar'>;
export type UpdateUserResponse = TUser;

export const ESubscriptionType = {
    FREE: 'free',
    PLUS: 'plus',
    EXPIRED: 'expired',
    TRIAL: 'trial',
} as const;

export type ESubscriptionType =
    (typeof ESubscriptionType)[keyof typeof ESubscriptionType];

export type Subscription = {
    type: ESubscriptionType;
    expired_date_utc?: string;
};

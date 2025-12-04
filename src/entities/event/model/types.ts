import type { TCurrency } from "../../../shared/constants";

export type TEvent = {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    participants: string[];
    currency: TCurrency;
};

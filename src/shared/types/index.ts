export interface User {
  id: string;
  email: string;
  name: string;
  nickname: string;
  createdAt: Date;
}

export interface Event {
  id: string;
  name: string;
  description?: string;
  currency: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ParticipantType = 'user' | 'local';

export interface EventParticipant {
  id: string;
  eventId: string;
  type: ParticipantType;
  userId?: string; // для type='user'
  localId?: string; // для type='local'
  name: string;
  nickname: string;
}

export interface LocalParticipant {
  id: string;
  name: string;
  nickname: string;
}

export interface Expense {
  id: string;
  eventId: string;
  paidBy: string; // participantId
  currency: string;
  items: ExpenseItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ExpenseItem {
  id: string;
  name: string;
  amount: number;
  currency: string;
  distribution: ExpenseDistribution[];
}

export interface ExpenseDistribution {
  participantId: string;
  percentage: number; // 0-100
}

export interface Invitation {
  id: string;
  eventId: string;
  token: string;
  email: string;
  createdAt: Date;
  expiresAt: Date;
}

export interface Debt {
  from: string; // participantId
  to: string; // participantId
  amount: number;
  currency: string;
}

export interface CurrencyRate {
  from: string;
  to: string;
  rate: number;
  timestamp: number;
}


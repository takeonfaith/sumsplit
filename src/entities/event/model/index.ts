import { createEvent, createStore, sample } from 'effector';
import type { TEvent } from './types';
import { CURRENCY } from '../../../shared/constants';

const STORAGE_KEY = 'sumsplit_events';

// Утилиты для работы с localStorage
const loadEventsFromStorage = (): TEvent[] => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error('Ошибка загрузки событий из localStorage:', error);
    }
    return [];
};

const saveEventsToStorage = (events: TEvent[]): void => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch (error) {
        console.error('Ошибка сохранения событий в localStorage:', error);
    }
};

export const addEvent = createEvent<TEvent>();

// Инициализируем store с данными из localStorage
export const $events = createStore<TEvent[]>([
    {
        id: '1',
        name: 'Event 1',
        description: 'Description 1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        currency: CURRENCY.RUB.id,
        participants: [],
    },
]);

// Сохраняем события в localStorage при изменении
$events.watch((events) => {
    saveEventsToStorage(events);
});

sample({
    clock: addEvent,
    source: $events,
    fn: (events, event) => [event, ...events],
    target: $events,
});

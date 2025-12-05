import { createEffect, createEvent, createStore } from 'effector';
import type { TEvent } from './types';
import { api } from '../../../api';

export const getUserEventsFx = createEffect();

export const addEvent = createEvent<TEvent>();

export const $events = createStore<TEvent[]>([]);

getUserEventsFx.use(async () => {
    const response = await api.events.getUserEvents();
    return response.data;
});

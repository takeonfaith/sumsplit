import { createEvent, createStore, sample } from 'effector';
import type { TFriend } from './types';

const addFriend = createEvent<TFriend>();

export const $friends = createStore<Record<string, TFriend>>({
    '1': {
        id: '1',
        name: 'John Doe',
    },
    '2': {
        id: '2',
        name: 'Jane Doe',
    },
    '3': {
        id: '3',
        name: 'Jim Doe',
    },
    '4': {
        id: '4',
        name: 'Jill Doe',
    },
});

sample({
    clock: addFriend,
    source: $friends,
    fn: (friends, friend) => ({ ...friends, [friend.id]: friend }),
    target: $friends,
});

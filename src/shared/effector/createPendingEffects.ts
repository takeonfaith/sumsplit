/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore, type Effect, sample } from 'effector';

type EffectWithAnyParams = Effect<any, any, any>;

type ParamsOfEffect<Fx extends EffectWithAnyParams> = Fx extends Effect<
    infer P,
    any,
    any
>
    ? P
    : never;

type UnionOfParams<TEffects extends EffectWithAnyParams[]> = ParamsOfEffect<
    TEffects[number]
>;

type Props<TEffects extends EffectWithAnyParams[], Id extends string> = {
    effects: TEffects;
    getId: (params: UnionOfParams<TEffects>) => Id[];
};

export function createPendingEffectsStore<
    TEffects extends EffectWithAnyParams[],
    Id extends string
>({ effects, getId }: Props<TEffects, Id>) {
    const $pendings = createStore<Set<Id>>(new Set());

    effects.forEach((effect) => {
        sample({
            clock: effect,
            source: $pendings,
            fn: (pending, params) => {
                const ids = getId(params);
                const newPending = new Set(pending);
                ids?.forEach(newPending.add, newPending);
                return newPending;
            },
            target: $pendings,
        });

        sample({
            clock: effect.finally,
            source: $pendings,
            fn: (pending, { params }) => {
                const ids = getId(params);
                const newPending = new Set(pending);
                ids?.forEach(newPending.delete, newPending);
                return newPending;
            },
            target: $pendings,
        });
    });

    return $pendings;
}

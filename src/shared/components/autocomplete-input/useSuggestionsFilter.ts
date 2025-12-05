import { useMemo } from 'react';
import { normalizeString } from '../../lib/normalizeString';

export type Suggestion = {
    displayValue: string; // Значение, которое отображается пользователю
    alternativeValues?: string[]; // Альтернативные значения для поиска
    icon?: React.ReactNode | string;
};

/**
 * Универсальный хук для фильтрации предложений по введенному тексту
 * Поиск происходит по displayValue и всем alternativeValues
 */
export const useSuggestionsFilter = (
    suggestions: Suggestion[],
    searchValue: string
): Suggestion[] => {
    return useMemo(() => {
        if (!searchValue.trim()) return [];

        return suggestions.filter((item) => {
            // Поиск по displayValue
            if (
                normalizeString(item.displayValue).includes(
                    normalizeString(searchValue)
                )
            ) {
                return true;
            }
            // Поиск по alternativeValues
            if (
                item.alternativeValues?.map((alt) => normalizeString(alt)).some((alt) =>
                    alt.toLowerCase().includes(normalizeString(searchValue))
                )
            ) {
                return true;
            }
            return false;
        });
    }, [suggestions, searchValue]);
};

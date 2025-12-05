import React, {
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import type { Suggestion } from './useSuggestionsFilter';
import { useSuggestionsFilter } from './useSuggestionsFilter';

type UseAutocompleteOptions = {
    suggestions: Suggestion[];
    getValue?: (item: Suggestion) => string;
};

export const useAutocomplete = (
    value: string,
    onChange: (value: string) => void,
    onSelect?: (value: string) => void,
    options?: UseAutocompleteOptions
) => {
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [isManuallyClosed, setIsManuallyClosed] = useState(false);
    const [position, setPosition] = useState<{
        top: number;
        left: number;
        width: number;
        isAbove: boolean;
    }>({
        top: 0,
        left: 0,
        width: 0,
        isAbove: false,
    });
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsListRef = useRef<HTMLUListElement>(null);
    const positionUpdateRef = useRef<number | undefined>(undefined);

    // Если options не переданы, возвращаем пустой массив
    const suggestions = options?.suggestions || [];
    const getValue = options?.getValue || ((item: Suggestion) => item.displayValue);
    
    // Фильтруем предложения по введенному тексту
    const filteredSuggestions = useSuggestionsFilter(suggestions, value);

    const shouldShowSuggestions = useMemo(() => {
        return Boolean(
            value.trim() && filteredSuggestions.length > 0 && !isManuallyClosed
        );
    }, [value, filteredSuggestions.length, isManuallyClosed]);

    const showSuggestions = shouldShowSuggestions;

    const calculatePosition = (suggestionsList: Suggestion[]) => {
        if (!inputRef.current) return;

        const inputRect = inputRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        const margin = 4;
        const maxListHeight = 200;
        const estimatedItemHeight = 44; // примерная высота одного элемента
        const estimatedListHeight = Math.min(
            suggestionsList.length * estimatedItemHeight,
            maxListHeight
        );

        // Вычисляем, помещается ли список снизу
        const spaceBelow = viewportHeight - inputRect.bottom - margin;
        const spaceAbove = inputRect.top - margin;
        const shouldShowAbove =
            spaceBelow < estimatedListHeight && spaceAbove > spaceBelow;

        let top: number;
        if (shouldShowAbove) {
            // Показываем сверху
            top = inputRect.top - estimatedListHeight - margin;
            // Если не помещается сверху, показываем снизу с ограничением высоты
            if (top < margin) {
                top = inputRect.bottom + margin;
            }
        } else {
            // Показываем снизу
            top = inputRect.bottom + margin;
        }

        // Ограничиваем позицию, чтобы список не выходил за границы экрана
        const maxTop = viewportHeight - maxListHeight - margin;
        const minTop = margin;
        top = Math.max(minTop, Math.min(maxTop, top));

        // Вычисляем left и width с учетом границ экрана
        let left = inputRect.left;
        let width = inputRect.width;

        // Если список выходит за правую границу, сдвигаем влево
        if (left + width > viewportWidth - margin) {
            width = viewportWidth - left - margin;
        }

        // Если список выходит за левую границу, сдвигаем вправо
        if (left < margin) {
            width = width - (margin - left);
            left = margin;
        }

        setPosition({
            top,
            left,
            width: Math.max(200, width), // Минимальная ширина 200px
            isAbove: shouldShowAbove && top < inputRect.top,
        });
    };

    useLayoutEffect(() => {
        if (showSuggestions && filteredSuggestions.length > 0) {
            if (positionUpdateRef.current) {
                cancelAnimationFrame(positionUpdateRef.current);
            }
            positionUpdateRef.current = requestAnimationFrame(() => {
                calculatePosition(filteredSuggestions);
            });
        }
        return () => {
            if (positionUpdateRef.current) {
                cancelAnimationFrame(positionUpdateRef.current);
            }
        };
    }, [showSuggestions, filteredSuggestions]);

    useEffect(() => {
        if (!showSuggestions) return;

        const handleResize = () => {
            calculatePosition(filteredSuggestions);
        };

        const handleScroll = () => {
            calculatePosition(filteredSuggestions);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll, true);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll, true);
        };
    }, [showSuggestions, filteredSuggestions]);

    const handleSelect = (suggestion: string) => {
        if (onSelect) {
            onSelect(suggestion);
        } else {
            onChange(suggestion);
        }
        setIsManuallyClosed(true);
        inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!showSuggestions || filteredSuggestions.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex((prev) =>
                    prev < filteredSuggestions.length - 1 ? prev + 1 : -1
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
                break;
            case 'Enter':
                e.preventDefault();
                if (filteredSuggestions.length > 0) {
                    // Если есть выбранный элемент, выбираем его, иначе выбираем первый
                    const indexToSelect =
                        selectedIndex >= 0 ? selectedIndex : 0;
                    if (indexToSelect < filteredSuggestions.length) {
                        handleSelect(getValue(filteredSuggestions[indexToSelect]));
                    }
                }
                break;
            case 'Escape':
                setIsManuallyClosed(true);
                setSelectedIndex(-1);
                break;
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(target) &&
                suggestionsListRef.current &&
                !suggestionsListRef.current.contains(target)
            ) {
                setIsManuallyClosed(true);
                setSelectedIndex(-1);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
        // Сбрасываем флаг закрытия и selectedIndex при вводе нового текста
        setSelectedIndex(-1);
        if (!e.target.value.trim()) {
            setIsManuallyClosed(false);
        }
    };

        return {
        selectedIndex,
        isManuallyClosed,
        position,
        wrapperRef,
        inputRef,
        suggestionsListRef,
        positionUpdateRef,
        filteredSuggestions,
        shouldShowSuggestions,
        showSuggestions,
        handleInputChange,
        handleKeyDown,
        handleSelect,
        setSelectedIndex,
        getValue,
    };
};

import { useCallback, useRef } from 'react';
import styled from 'styled-components';
import { Input } from '../../shared/components/input';
import { useForm } from './model';

const PaymentSumStyled = styled.div`
    height: 70px;
    padding: 16px;

    input {
        font-size: 1.2rem;

        &::placeholder {
            font-size: 1.2rem;
        }

        &:focus {
            outline: none;
        }
    }
`;

// Функция для форматирования числа с разделителями тысяч
const formatNumberWithSpaces = (num: number | undefined): string => {
    if (num === undefined || num === 0) return '';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

// Функция для парсинга строки с пробелами в число
const parseFormattedNumber = (value: string): number => {
    // Убираем все пробелы и нецифровые символы, кроме точки и запятой
    const cleaned = value.replace(/\s/g, '').replace(/[^\d.,]/g, '');
    // Заменяем запятую на точку для десятичных чисел
    const normalized = cleaned.replace(',', '.');
    const parsed = parseFloat(normalized);
    return isNaN(parsed) ? 0 : parsed;
};

export const PaymentSum = () => {
    const { values, updateField } = useForm({});
    const inputRef = useRef<HTMLInputElement>(null);

    // Вычисляем отформатированное значение для отображения
    const displayValue = formatNumberWithSpaces(values.sum);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = e.currentTarget.value;

            // Если поле пустое, устанавливаем 0
            if (inputValue === '') {
                updateField({ id: 'sum', value: 0 });
                return;
            }

            // Парсим значение и сохраняем как число
            const numValue = parseFormattedNumber(inputValue);
            updateField({ id: 'sum', value: numValue });

            // Устанавливаем курсор в конец после форматирования
            setTimeout(() => {
                if (inputRef.current) {
                    const formatted = formatNumberWithSpaces(numValue);
                    const length = formatted.length;
                    inputRef.current.setSelectionRange(length, length);
                }
            }, 0);
        },
        [updateField]
    );

    return (
        <PaymentSumStyled>
            <Input
                ref={inputRef}
                id="sum"
                value={displayValue}
                onChange={handleChange}
                type="text"
                inputMode="numeric"
                autoFocus
                className="clear"
                placeholder="Введите сумму"
            />
        </PaymentSumStyled>
    );
};

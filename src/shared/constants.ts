export const THEME = {
    scheme: {
        red: {
            main: '#FF0000',
            transparent: 'rgba(255, 0, 0, 0.1)',
        },
    },
    theme: {},
};

import type { Suggestion } from './components/autocomplete-input/useSuggestionsFilter';
import { LOGOS } from './icons/logos';
import { convertToEnglishLayout } from './lib/keyboardLayout';

export type PaymentPlace = {
    displayValue: string; // Оригинальное название
    transliteration?: string; // Транслитерация (если есть)
    qwerty?: string; // Версия с английской раскладкой (если есть)
};

export const PAYMENT_PLACES: Suggestion[] = [
    {
        displayValue: 'Starbucks',
        icon: LOGOS.Starbucks,
        alternativeValues: ['Starbucks', 'Starbucks Coffee', 'Coffee'],
    },
    { displayValue: "McDonald's", icon: LOGOS["McDonald's"] },
    { displayValue: 'KFC' },
    { displayValue: 'Burger King' },
    { displayValue: 'Subway' },
    { displayValue: 'Pizza Hut' },
    { displayValue: "Domino's Pizza" },
    { displayValue: 'Taco Bell' },
    { displayValue: 'Chipotle' },
    { displayValue: "Dunkin'" },
    { displayValue: 'Costa Coffee' },
    {
        displayValue: 'Теремок',
        alternativeValues: ['Teremok', convertToEnglishLayout('Теремок')],
    },
    {
        displayValue: 'Крошка Картошка',
        alternativeValues: [
            'Kroshka Kartoshka',
            convertToEnglishLayout('Крошка Картошка'),
        ],
    },
    {
        displayValue: 'Ёлки-Палки',
        alternativeValues: [
            'Yolki-Palki',
            convertToEnglishLayout('Ёлки-Палки'),
        ],
    },
    {
        displayValue: 'Шоколадница',
        alternativeValues: [
            'Shokoladnitsa',
            convertToEnglishLayout('Шоколадница'),
        ],
    },
    { displayValue: 'Coffee House', alternativeValues: ['Coffee House'] },
    {
        displayValue: 'Coffeeshop Company',
        alternativeValues: ['Coffeeshop Company'],
    },
    { displayValue: 'Baskin-Robbins', alternativeValues: ['Baskin-Robbins'] },
    { displayValue: 'Baskin Robbins', alternativeValues: ['Baskin Robbins'] },
];

export const CURRENCY = {
    RUB: { id: 'RUB', name: 'Рубль' },
    USD: { id: 'USD', name: 'Доллар' },
    EUR: { id: 'EUR', name: 'Евро' },
    KZT: { id: 'KZT', name: 'Тенге' },
    UAH: { id: 'UAH', name: 'Гривна' },
    CNY: { id: 'CNY', name: 'Юань' },
    GBP: { id: 'GBP', name: 'Фунт стерлингов' },
    CHF: { id: 'CHF', name: 'Швейцарский франк' },
    JPY: { id: 'JPY', name: 'Японский йен' },
    CAD: { id: 'CAD', name: 'Канадский доллар' },
    AUD: { id: 'AUD', name: 'Австралийский доллар' },
    NZD: { id: 'NZD', name: 'Новозеландский доллар' },
    SEK: { id: 'SEK', name: 'Шведская крона' },
    NOK: { id: 'NOK', name: 'Норвежская крона' },
    PLN: { id: 'PLN', name: 'Польский злотый' },
    MXN: { id: 'MXN', name: 'Мексиканский песо' },
    INR: { id: 'INR', name: 'Индийская рупия' },
    BRL: { id: 'BRL', name: 'Бразильский реал' },
    TRY: { id: 'TRY', name: 'Турецкая лира' },
    RON: { id: 'RON', name: 'Румынский лей' },
    CZK: { id: 'CZK', name: 'Чешская крона' },
    HRK: { id: 'HRK', name: 'Хорватская куна' },
    BGN: { id: 'BGN', name: 'Болгарский лев' },
    ISK: { id: 'ISK', name: 'Исландская крона' },
    CLP: { id: 'CLP', name: 'Чилийское песо' },
    PHP: { id: 'PHP', name: 'Филиппинское песо' },
    AED: { id: 'AED', name: 'ОАЭ дирхам' },
    SAR: { id: 'SAR', name: 'Саудовская риал' },
    KRW: { id: 'KRW', name: 'Южнокорейская вона' },
    HKD: { id: 'HKD', name: 'Гонконгский доллар' },
    SGD: { id: 'SGD', name: 'Сингапурский доллар' },
    MYR: { id: 'MYR', name: 'Малайзийский ринггит' },
    IDR: { id: 'IDR', name: 'Индонезийская рупия' },
    THB: { id: 'THB', name: 'Тайский бат' },
} as const;

export type TCurrency = keyof typeof CURRENCY;

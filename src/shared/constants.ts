export const THEME = {
    scheme: {
        red: {
            main: '#FF0000',
            transparent: 'rgba(255, 0, 0, 0.1)',
        },
    },
    theme: {},
};

export const PAYMENT_PLACES = {
    Starbucks: 'Starbucks',
};

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

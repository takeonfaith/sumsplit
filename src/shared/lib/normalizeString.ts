export const normalizeString = (str: string, removeComma?: boolean) => {
    if (!str.length) return '';

    const shouldRemoveComma = removeComma ?? true;

    let result = str
        .replace(/\s/g, '')
        .replace(/\$/g, 's')
        .replace(/-/g, '')
        .replace('ć', 'c')
        .replace('ó', 'o')
        .replace('ё', 'е')
        .toLowerCase();

    // Удаляем все символы, кроме букв и цифр, если removeComma не false
    if (shouldRemoveComma) {
        result = result.replace(/[,'._/!?@#$%^&*()[\]{}|\\:;"<>]/g, '');
    } else {
        // Если removeComma false, удаляем все кроме букв, цифр и запятых
        result = result.replace(/[._/!?@#$%^&*()[\]{}|\\:;"<>]/g, '');
    }

    return result;
};

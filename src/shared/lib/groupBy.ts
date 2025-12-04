export const groupBy = <T extends object>(array: T[], key: keyof T) => {
    return array.reduce((acc, item) => {
        const value = item[key];
        acc[value as string] = [...(acc[value as string] || []), item];
        return acc;
    }, {} as Record<string, T[]>);
};

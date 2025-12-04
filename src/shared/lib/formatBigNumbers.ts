export const formatBigNumber = (num: number | undefined) => {
    if (num === undefined) return null;

    if (num >= 1_000 && num < 1_000_000) return (num / 1_000).toFixed(1) + 'K';

    if (num >= 1_000_000 && num < 1_000_000_000)
        return (num / 1_000_000).toFixed(1) + 'M';

    if (num >= 1_000_000_000 && num < 1_000_000_000_000)
        return (num / 1_000_000_000).toFixed(1) + 'B';

    return num.toString();
};

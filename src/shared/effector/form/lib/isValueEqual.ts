/**
 * Deep comparison function for form values
 * Handles primitives, arrays, objects, Date objects, etc.
 */
export const isValueEqual = (a: unknown, b: unknown): boolean => {
    // Handle null/undefined
    if (a === null || a === undefined) {
        return b === null || b === undefined;
    }
    if (b === null || b === undefined) {
        return false;
    }

    // Handle Date objects
    if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
    }

    // Handle arrays
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) {
            return false;
        }
        return a.every((item, index) => isValueEqual(item, b[index]));
    }

    // Handle objects
    if (
        typeof a === 'object' &&
        typeof b === 'object' &&
        !Array.isArray(a) &&
        !Array.isArray(b)
    ) {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);

        if (keysA.length !== keysB.length) {
            return false;
        }

        return keysA.every((key) => {
            return isValueEqual(
                (a as Record<string, unknown>)[key],
                (b as Record<string, unknown>)[key]
            );
        });
    }

    // Handle primitives
    return a === b;
};

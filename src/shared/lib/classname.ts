export const cn = (
    base: string = '',
    object: Record<string, boolean | undefined>,
    params?: Record<string, string | undefined>
) => {
    let resultClassName = `${base} `;

    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            const hasProp = object[key];

            if (hasProp) resultClassName += `${key} `;
        }
    }

    for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
            const hasProp = params[key];

            if (hasProp) resultClassName += `${params[key]} `;
        }
    }

    return resultClassName;
};

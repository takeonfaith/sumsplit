import { type RefObject, useCallback, useEffect } from 'react';

export const useClickOutside = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref: RefObject<any>,
    callback: () => void
) => {
    const handleClick = useCallback(
        (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target)) {
                callback();
            }
        },
        [callback, ref]
    );

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [handleClick]);
};

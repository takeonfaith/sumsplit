import type { PopupPosition } from '../types';

export const calculatePosition = (
    x: number,
    y: number,
    width: number,
    height: number,
    menuWidth: number,
    menuHeight: number,
    position: PopupPosition = 'bottom',
    hasShift?: boolean
) => {
    const shift = hasShift ? 4 : 0;

    const isOverTopScreenY = y - menuHeight < 10;
    const isOverLeftScreenX = x - menuWidth < 10;
    const isOverBottomScreenY =
        y + menuHeight + height > window.innerHeight - 10 &&
        Math.ceil(menuHeight) !== Math.ceil(window.innerHeight * 0.99);
    const isOverRightScreenX = x + menuWidth > window.innerWidth - 10;
    const bottomY = y - menuHeight - shift;
    const topY = y + height + shift;
    const leftX = x - menuWidth - shift;
    const rightX = x + width + shift;
    const horizontalY = y - menuHeight + height;
    const verticalX = x - menuWidth + width;

    const positions: Record<
        PopupPosition,
        { x: number; y: number; origin?: string }
    > = {
        left: {
            x: isOverLeftScreenX ? rightX : leftX,
            y: isOverBottomScreenY
                ? window.innerHeight - menuHeight - 10
                : y - Math.max(y + menuHeight - window.innerHeight + 10, 0),
            origin: `${isOverLeftScreenX ? 'left' : 'right'} ${
                isOverBottomScreenY ? '' : 'top'
            }`,
        },
        right: {
            x: isOverRightScreenX ? leftX : rightX,
            y: isOverBottomScreenY ? horizontalY : y,
            origin: `${isOverRightScreenX ? 'right' : 'left'} ${
                isOverBottomScreenY ? 'bottom' : 'top'
            }`,
        },
        top: {
            x: isOverLeftScreenX ? x : verticalX,
            y: isOverTopScreenY ? topY : bottomY,
            origin: `${isOverTopScreenY ? 'top' : 'bottom'} ${
                isOverLeftScreenX ? 'left' : 'right'
            }`,
        },
        bottom: {
            x: isOverLeftScreenX ? x : verticalX,
            y: isOverBottomScreenY ? bottomY : topY,
            origin: `${isOverBottomScreenY ? 'bottom' : 'top'} ${
                isOverLeftScreenX ? 'left' : 'right'
            }`,
        },
    };

    const { x: posX, y: posY, origin } = positions[position];
    return { posX, posY, origin: origin ?? '' };
};

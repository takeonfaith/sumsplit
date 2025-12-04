import { useUnit } from 'effector-react';
import React, {
    useCallback,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { $isMobile } from '../../../../app/screen';
import { ANIMATION_DURATION, DELAY, INITIAL_SCALE } from '../constants';
import { calculatePosition } from '../lib/calculatePosition';
import type { PopupPosition, TTrigger } from '../types';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useSwipeToClose } from '../../../hooks/useSwipeToClose';

type Props = {
    triggers: TTrigger[];
    position: PopupPosition | undefined;
    closeOnClick?: boolean;
    children: React.ReactNode;
    content: React.ReactNode;
    isVisible?: boolean;
    onChangeVisible?: (value: boolean) => void;
};

export let popups = 0;

export const usePopup = ({
    triggers,
    position,
    closeOnClick,
    content,
    onChangeVisible,
    isVisible,
    children,
}: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisibleLocal, setIsVisibleLocal] = useState(false);
    const [coords, setCoords] = useState({
        top: 0,
        left: 0,
        transformOrigin: '',
    });
    const popupRef = useRef<HTMLDivElement | null>(null);
    const anchorRef = useRef<HTMLDivElement | null>(null);
    const timeout = useRef<NodeJS.Timeout | null>(null);
    const delayTimeout = useRef<NodeJS.Timeout | null>(null);
    const isMobile = useUnit($isMobile);
    const closeDelay = triggers.includes('hover') ? DELAY : 0;
    const isDisabled = useMemo(
        () =>
            React.Children.toArray(children).some((child: React.ReactNode) =>
                typeof child === 'object' && child !== null && 'props' in child
                    ? (child as React.ReactElement<{ disabled?: boolean }>).props.disabled
                    : false
            ),
        [children]
    );

    const handleClose = useCallback(() => {
        if (!isDisabled) {
            if (closeDelay) {
                delayTimeout.current = setTimeout(() => {
                    setIsVisibleLocal(false);
                }, closeDelay);
            } else {
                setIsVisibleLocal(false);
            }

            timeout.current = setTimeout(() => {
                setIsOpen(false);
                onChangeVisible?.(false);
                popups--;
            }, ANIMATION_DURATION + closeDelay);
        }
    }, [closeDelay, isDisabled, onChangeVisible]);

    const { handleAnimatedClose, overlayStyle, ...swipeProps } =
        useSwipeToClose({
            onSwipeClose: handleClose,
            isOpen: isVisible ?? isOpen,
            scrollableEl: popupRef.current,
            el: popupRef.current,
        });

    const handleOpen = () => {
        if (!isDisabled) {
            setIsOpen(true);
            onChangeVisible?.(true);
            setIsVisibleLocal(true);
            popups++;
            if (delayTimeout.current) {
                clearTimeout(delayTimeout.current);
            }

            if (timeout.current) {
                clearTimeout(timeout.current);
            }
        }
    };

    // Вычисляем координаты попапа
    useLayoutEffect(() => {
        if (isOpen && anchorRef.current && content && !isDisabled) {
            const { width, height, x, y } =
                anchorRef.current.getBoundingClientRect();
            const popUpValues = popupRef.current?.getBoundingClientRect() ?? {
                width: 0,
                height: 0,
                x: 0,
                y: 0,
            };

            const { posX, posY, origin } = calculatePosition(
                x,
                y,
                width,
                height,
                popUpValues.width / INITIAL_SCALE,
                popUpValues.height / INITIAL_SCALE,
                position,
                !triggers.includes('hover')
            );

            setCoords({
                top: posY,
                left: posX,
                transformOrigin: origin,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, anchorRef, position, popupRef, isDisabled]);

    const onAnchorClick = (e: Evt<'div' | 'btn'>) => {
        if (triggers.includes('click')) {
            e.stopPropagation();
            if (isOpen) {
                handleClose();
            } else {
                handleOpen();
            }
        }
    };

    const onMouseLeave = () => {
        if (triggers.includes('hover')) handleClose();
    };
    const onMouseEnter = () => {
        if (triggers.includes('hover')) handleOpen();
    };

    const onContextMenu = (e: Evt<'div' | 'btn'>) => {
        if (triggers.includes('context')) {
            e.preventDefault();
            handleOpen();
        }
    };

    const onPopupClick = (e: Evt<'div' | 'btn'>) => {
        e.stopPropagation();
        if (closeOnClick) {
            if (isMobile) {
                handleAnimatedClose?.();
            } else {
                handleClose();
            }
        }
    };

    useClickOutside(popupRef, () => {
        if (!isMobile) {
            handleClose();
        }
    });

    return {
        isVisibleLocal,
        onMouseLeave,
        isOpen: isVisible ?? isOpen,
        onAnchorClick,
        anchorRef,
        popupRef,
        onContextMenu,
        onMouseEnter,
        onPopupClick,
        coords,
        closeDelay,
        handleClose,
        isMobile,
        handleAnimatedClose,
        overlayStyle,
        swipeProps,
    };
};

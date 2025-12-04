import { useUnit } from 'effector-react';
import {
    type Dispatch,
    type SetStateAction,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { $isMobile } from '../../app/screen';

type UseSwipeToCloseOptions = {
    onSwipeClose: (setTranslateY: Dispatch<SetStateAction<number>>) => void;
    threshold?: number;
    el: React.RefObject<HTMLDivElement | null>;
    scrollableEl?: HTMLDivElement | null;
    isOpen: boolean;
    animationDuration?: number;
    onSwipeStart?: () => void;
    onSwipeEnd?: () => void;
    ignoreSwipeWhenOnElements?: string[];
};

export const useSwipeToClose = ({
    onSwipeClose,
    el,
    scrollableEl,
    onSwipeStart,
    onSwipeEnd,
    isOpen,
    ignoreSwipeWhenOnElements,
    threshold = 80,
    animationDuration = 350,
}: UseSwipeToCloseOptions) => {
    const startY = useRef<number | null>(null);
    const startX = useRef<number | null>(null);
    const [translateY, setTranslateY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const isMobile = useUnit($isMobile);
    const elementHeight = el?.current?.clientHeight ?? window.innerHeight;

    const allowSwipeOnNextTouch = useRef(false);
    const activeScrollableRef = useRef<HTMLElement | null>(null);

    useLayoutEffect(() => {
        if (isOpen) {
            setTranslateY(0);
        } else {
            setTranslateY(elementHeight);
        }
    }, [elementHeight, isOpen]);

    // useEffect(() => {
    //     document.body.style.overscrollBehavior = 'none';
    //     document.body.style.touchAction = 'none';
    // }, [isDragging]);

    const isScrollable = (element?: HTMLElement | null) => {
        if (!element) return false;
        const style = window.getComputedStyle(element);
        const overflowY = style.overflowY;

        return (
            ['auto', 'scroll', 'overlay'].includes(overflowY) &&
            element.scrollHeight > element.clientHeight
        );
    };

    const isHorizontallyScrollable = (element?: HTMLElement | null) => {
        if (!element) return false;
        const style = window.getComputedStyle(element);
        const overflowX = style.overflowX;

        return (
            ['auto', 'scroll', 'overlay'].includes(overflowX) &&
            element.scrollWidth > element.clientWidth
        );
    };

    const getScrollableParent = (
        target: EventTarget | null,
        container?: HTMLElement | null
    ) => {
        if (!(target instanceof HTMLElement)) return null;

        let node: HTMLElement | null = target;

        while (node) {
            if (container && !container.contains(node)) break;

            if (isScrollable(node)) {
                return node;
            }

            node = node.parentElement;
        }

        if (container && isScrollable(container)) {
            return container;
        }

        return null;
    };

    useEffect(() => {
        const eventsTarget = el?.current ?? scrollableEl;
        const scrollTarget = scrollableEl ?? el?.current;

        if (!isMobile || !eventsTarget) return;

        const handleTouchStart = (e: TouchEvent) => {
            const scrollableCandidate = getScrollableParent(
                e.target,
                eventsTarget
            );

            const fallbackTarget = scrollTarget ?? eventsTarget;

            activeScrollableRef.current =
                scrollableCandidate ?? fallbackTarget ?? null;

            const scrollElement = activeScrollableRef.current;
            const canScroll = isScrollable(scrollElement);
            const scrollTop = scrollElement?.scrollTop ?? 0;

            allowSwipeOnNextTouch.current =
                !canScroll || scrollTop <= 0 || !scrollElement;

            startY.current = e.touches[0].clientY;
            startX.current = e.touches[0].clientX;
            setIsDragging(true);
        };

        const handleTouchMove = (e: TouchEvent) => {
            const { clientY, clientX } = e.touches[0];

            if (startY.current === null) {
                startY.current = clientY;
            }
            if (startX.current === null) {
                startX.current = clientX;
            }

            const shouldIgnore = ignoreSwipeWhenOnElements
                ? ignoreSwipeWhenOnElements?.some(
                      (className) =>
                          e?.target &&
                          'className' in e.target &&
                          (e.target.className as string).includes(className)
                  )
                : false;

            const deltaY = clientY - startY.current;
            const deltaX = clientX - startX.current;

            const scrollElement =
                activeScrollableRef.current ?? scrollTarget ?? null;

            // Проверяем, есть ли горизонтальный скролл у элемента, на котором происходит событие, или его родителей
            const getHorizontallyScrollableParent = (
                target: EventTarget | null,
                container?: HTMLElement | null
            ) => {
                if (!(target instanceof HTMLElement)) return null;

                let node: HTMLElement | null = target;

                while (node) {
                    if (container && !container.contains(node)) break;

                    if (isHorizontallyScrollable(node)) {
                        return node;
                    }

                    node = node.parentElement;
                }

                if (container && isHorizontallyScrollable(container)) {
                    return container;
                }

                return null;
            };

            const horizontalScrollElement = getHorizontallyScrollableParent(
                e.target,
                eventsTarget
            );

            // Если пользователь скроллит горизонтально (deltaX больше deltaY по модулю)
            // или элемент имеет горизонтальный скролл и пользователь двигает пальцем горизонтально,
            // блокируем вертикальный свайп
            const isHorizontalSwipe =
                horizontalScrollElement !== null &&
                (Math.abs(deltaX) > Math.abs(deltaY) || Math.abs(deltaX) > 10);

            if (scrollElement) {
                if (scrollElement.scrollTop > 0 && deltaY >= 0) {
                    allowSwipeOnNextTouch.current = false;
                } else if (
                    scrollElement.scrollTop <= 0 &&
                    deltaY > 0 &&
                    !allowSwipeOnNextTouch.current &&
                    !isHorizontalSwipe
                ) {
                    allowSwipeOnNextTouch.current = true;
                    startY.current = clientY;
                }
            }

            if (
                !allowSwipeOnNextTouch.current ||
                startY.current === null ||
                shouldIgnore ||
                isHorizontalSwipe
            )
                return;

            if (deltaY > 0) {
                e.preventDefault();
                setTranslateY(deltaY);
                onSwipeStart?.();
            }
        };

        const handleTouchEnd = () => {
            setIsDragging(false);

            if (translateY > threshold) {
                handleAnimatedClose();
            } else {
                setTranslateY(0);
                onSwipeEnd?.();
            }

            startY.current = null;
            startX.current = null;
            allowSwipeOnNextTouch.current = false;
            activeScrollableRef.current = null;
        };

        eventsTarget.addEventListener('touchstart', handleTouchStart, {
            passive: false,
        });
        eventsTarget.addEventListener('touchmove', handleTouchMove, {
            passive: false,
        });
        eventsTarget.addEventListener('touchend', handleTouchEnd, {
            passive: false,
        });
        eventsTarget.addEventListener('touchcancel', handleTouchEnd, {
            passive: false,
        });

        return () => {
            eventsTarget.removeEventListener('touchstart', handleTouchStart);
            eventsTarget.removeEventListener('touchmove', handleTouchMove);
            eventsTarget.removeEventListener('touchend', handleTouchEnd);
            eventsTarget.removeEventListener('touchcancel', handleTouchEnd);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        scrollableEl?.className,
        el?.current?.className,
        translateY,
        threshold,
        isMobile,
        animationDuration,
    ]);

    const handleAnimatedClose = () => {
        setTranslateY(elementHeight);
        setTimeout(() => {
            onSwipeClose(setTranslateY);
        }, animationDuration);
    };

    const style = useMemo(
        () => ({
            transform: `translateY(${translateY}px)`,
            transition: isDragging
                ? 'none'
                : `transform ${animationDuration}ms, 0.4s height`,
        }),
        [translateY, isDragging, animationDuration]
    );

    const overlayOpacity = useMemo(() => {
        const percent = Math.min(translateY / elementHeight, 1);
        return 1 - percent;
    }, [translateY, elementHeight]);

    const overlayStyle = useMemo(
        () => ({
            opacity: overlayOpacity,
            transition: isDragging ? 'none' : 'opacity 0.2s ease',
        }),
        [overlayOpacity, isDragging]
    );

    if (!isMobile) return {};

    return {
        style,
        overlayStyle,
        handleAnimatedClose,
        setTranslateY,
    };
};

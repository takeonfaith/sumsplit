import React, { memo } from 'react';
import ReactDOM from 'react-dom';
import { ModalBackgroundStyled } from '../modal/styles';
import { popups, usePopup } from './hooks/usePopup';
import { PopupContainer } from './styles';
import type { PopupPosition, TTrigger } from './types';
import { cn } from '../../lib/classname';

type Props = {
    position?: PopupPosition;
    children: React.ReactNode;
    content: React.ReactNode;
    id?: string;
    triggers?: TTrigger[];
    closeOnClick?: boolean;
    className?: string;
    wrapperStyle?: React.CSSProperties;
    isVisible?: boolean;
    onChangeVisible?: (value: boolean) => void;
};

export const Popup = memo(
    ({
        position,
        id,
        children,
        content,
        className,
        isVisible,
        onChangeVisible,
        wrapperStyle,
        closeOnClick = true,
        triggers = ['click'],
    }: Props) => {
        const {
            isVisibleLocal,
            anchorRef,
            popupRef,
            isOpen,
            onAnchorClick,
            onContextMenu,
            onMouseLeave,
            onMouseEnter,
            coords,
            onPopupClick,
            closeDelay,
            isMobile,
            overlayStyle,
            handleAnimatedClose,
            swipeProps,
        } = usePopup({
            triggers,
            position,
            closeOnClick,
            children,
            content,
            isVisible,
            onChangeVisible,
        });

        if (!content) return children;

        const popup = (
            <PopupContainer
                onClick={onPopupClick}
                $closeDelay={closeDelay}
                className={cn('', { hidden: !isVisibleLocal })}
                ref={popupRef}
                $coords={coords}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                style={{ ...swipeProps.style, zIndex: 1200 + popups }}
            >
                {content}
            </PopupContainer>
        );

        return (
            <>
                <div
                    ref={anchorRef}
                    onClick={onAnchorClick}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onContextMenu={onContextMenu}
                    id={id}
                    className={className}
                    style={wrapperStyle}
                >
                    {children}
                </div>
                {isOpen &&
                    content &&
                    ReactDOM.createPortal(
                        isMobile ? (
                            <>
                                <ModalBackgroundStyled
                                    style={{
                                        ...overlayStyle,
                                        zIndex: `${1199 + popups}`,
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAnimatedClose?.();
                                    }}
                                />
                                {popup}
                            </>
                        ) : (
                            popup
                        ),
                        document.body
                    )}
            </>
        );
    }
);

Popup.displayName = 'Popup';

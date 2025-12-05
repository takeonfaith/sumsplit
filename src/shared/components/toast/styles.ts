import styled, { keyframes } from 'styled-components';
import { MEDIA_QUERIES } from '../../../app/screen/constants';
import { TOAST_ANIMATION_DURATION, TOAST_GAP } from './constants';
import type { ToastType } from './types';

const slideIn = keyframes`
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
`;

const slideOut = keyframes`
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
`;

const getToastColor = (type: ToastType) => {
    switch (type) {
        case 'success':
            return '#10b981'; // green
        case 'warning':
            return '#f59e0b'; // amber
        case 'alert':
            return '#ef4444'; // red
        case 'info':
        default:
            return '#3b82f6'; // blue
    }
};

export const ToastContainerStyled = styled.div`
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    gap: ${TOAST_GAP}px;
    pointer-events: none;
    transition: all 0.3s ease-out;

    ${MEDIA_QUERIES.isMobile} {
        top: 16px;
        right: 16px;
        left: 16px;
        gap: ${TOAST_GAP}px;
    }
`;

export const ToastItemStyled = styled.div<{
    $type: ToastType;
    $isRemoving: boolean;
}>`
    position: relative;
    min-width: 300px;
    max-width: 400px;
    padding: 12px;
    background: color-mix(
        in srgb,
        ${({ $type }) => getToastColor($type)} 10%,
        white
    );
    border-radius: 8px;
    border: 1px solid
        color-mix(in srgb, ${({ $type }) => getToastColor($type)} 40%, #fff);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    pointer-events: auto;
    animation: ${({ $isRemoving }) => ($isRemoving ? slideOut : slideIn)}
        ${TOAST_ANIMATION_DURATION}ms forwards;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    transition: transform 0.2s, opacity 0.2s;

    ${MEDIA_QUERIES.isMobile} {
        min-width: unset;
        max-width: unset;
        width: 100%;
        padding: 14px 16px;
    }
`;

export const ToastIconStyled = styled.div<{ $type: ToastType }>`
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: color-mix(in srgb, ${({ $type }) => getToastColor($type)} 70%, #000);
    margin-top: 2px;
`;

export const ToastContentStyled = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const ToastMessageStyled = styled.p<{ $type: ToastType }>`
    margin: 0;
    font-size: 1rem;
    color: color-mix(in srgb, ${({ $type }) => getToastColor($type)} 70%, #000);
    word-wrap: break-word;
`;

export const ToastCloseButtonStyled = styled.button`
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    color: #6b7280;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease;
    margin-top: 2px;

    &:hover {
        color: #1f2937;
    }

    &:active {
        transform: scale(0.95);
    }
`;

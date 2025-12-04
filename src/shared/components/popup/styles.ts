import { styled } from 'styled-components';
import { ANIMATION_DURATION, INITIAL_SCALE } from './constants';
import { MEDIA_QUERIES } from '../../../app/screen/constants';

export const PopupContainer = styled.div<{
    $coords: {
        top: number;
        left: number;
        transformOrigin: string;
    };
    $closeDelay: number;
}>`
    position: fixed;
    min-width: 150px;
    max-height: 55vh;
    top: ${({ $coords }) => $coords.top}px;
    left: ${({ $coords }) => $coords.left}px;
    border-radius: 8px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    background: #fff;
    z-index: 1200;
    transform-origin: ${({ $coords }) => $coords.transformOrigin};
    overflow: hidden;
    animation: popupAppear ${ANIMATION_DURATION}ms forwards;
    overflow-y: auto;

    &.hidden {
        animation: popupDissapear ${ANIMATION_DURATION}ms forwards;

        @keyframes popupDissapear {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            100% {
                transform: scale(${INITIAL_SCALE});
                opacity: 0;
            }
        }
    }

    @keyframes popupAppear {
        0% {
            transform: scale(${INITIAL_SCALE});
            opacity: 0;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }

    ${MEDIA_QUERIES.isMobile} {
        width: 100%;
        border-radius: 10px 10px 0 0;
        left: 0px;
        bottom: 0px;
        top: unset;
        transform-origin: bottom center;
        max-height: calc(var(--app-height) - 10%);
        animation: none;
        will-change: transform;
        box-shadow: none;

        &.hidden {
            animation: none;
        }
    }
`;

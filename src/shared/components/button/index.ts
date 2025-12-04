import styled from 'styled-components';

export const Button = styled.button`
    width: fit-content;
    height: 40px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 0 15px;
    color: #000;
    text-decoration: none;
    transition: 0.2s transform;
    font-size: 0.9rem;
    user-select: none;

    svg {
        opacity: 0.5;
        width: 20px;
        height: 20px;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        pointer-events: none;
    }

    &.rounded {
        border-radius: 30px;
    }

    &.outline {
        border: 1px solid #e0e0e0;
    }

    &.plane {
        background: transparent;
    }

    &.square {
        width: 40px;
        height: 40px;
        padding: 0;
    }

    &.size-s {
        height: 35px;
        padding: 0 10px;
        font-size: 0.85rem;
        gap: 6px;

        svg {
            width: 20px;
            height: 20px;
        }

        &.square {
            width: 35px;
            height: 35px;
            padding: 0;
        }
    }

    &.start {
        justify-content: flex-start;
    }

    &.full {
        width: 100%;
    }

    &.primary {
        background-color: #000;
        color: #fff;

        svg {
            opacity: 1;
        }
    }

    &.no-padding {
        padding: 0;
    }

    @media (hover: hover) {
        &:hover {
            opacity: 0.8;
            background: #e0e0e0;

            &.primary {
                background: #000;
            }
        }
    }

    @media (max-width: 768px) {
        &.vertical-on-mobile {
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 5px;
            padding: 0;
            border-radius: 10px;
            color: #000;
            font-size: 0.8rem;

            svg {
                min-width: 25px;
                min-height: 25px;
            }
        }
    }

    &:active {
        opacity: 0.8;
        transform: scale(0.95);
    }
`;

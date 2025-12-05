import styled from 'styled-components';

export const Button = styled.button`
    width: fit-content;
    height: 40px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 0 15px;
    color: #000;
    text-decoration: none;
    transition: 0.2s transform, 0.2s background;
    font-size: 0.9rem;
    user-select: none;
    position: relative;

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

    &.clear {
        background: transparent;
    }

    &.square {
        width: 40px;
        height: 40px;
        padding: 0;
    }

    &.plus {
        &::before {
            content: 'Plus';
            background: linear-gradient(to right, #f632cf, #ff2491);
            outline: 2px solid #fff;
            position: absolute;
            top: -10px;
            right: -10px;
            display: block;
            border-radius: 20px;
            padding: 4px 10px;
            font-size: 0.65rem;
            font-weight: 500;
            color: #fff;
        }
    }

    &.size-xs {
        height: 30px;
        padding: 0 8px;
        font-size: 0.8rem;
        gap: 4px;
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

    &.size-l {
        height: 50px;
        padding: 0 20px;
        font-size: 1rem;
        gap: 10px;
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
            background: #f0f0f0;

            &.primary {
                background: #000;
            }
        }
    }

    @media (max-width: 768px) {
        height: 45px;

        &.vertical-on-mobile {
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 5px;
            padding: 0;
            border-radius: 10px;
            color: #000;
            font-size: 0.8rem;

            .icon {
                width: 25px;
                height: 25px;
            }

            svg {
                min-width: 25px;
                min-height: 25px;
            }
        }
    }

    &:active {
        opacity: 0.8;
        transform: scale(0.99);
        background: #e0e0e0;
    }
`;

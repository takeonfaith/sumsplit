import styled from 'styled-components';

export const AvatarStyled = styled.div`
    --size: 40px;
    width: var(--size);
    height: var(--size);
    min-width: var(--size);
    min-height: var(--size);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    aspect-ratio: 1 / 1;
    position: relative;
    z-index: 1;

    .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #e3e3e3 0%, #adadad 100%);
        border-radius: 100%;
    }

    &.plus {
        .background {
            outline: 2px solid #fff;
        }

        &::before {
            content: '';
            background: linear-gradient(to right, #f632cf, #ff2491);
            position: absolute;
            top: -4px;
            left: -4px;
            width: calc(100% + 8px);
            height: calc(100% + 8px);
            border-radius: 100%;
            z-index: 0;
        }
    }

    img {
        width: 100%;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        z-index: 1;
    }

    .icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 0;
        width: 50%;
        height: auto;
        aspect-ratio: 1 / 1;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
            width: 100%;
            height: 100%;
            opacity: 0.4;
        }
    }

    span {
        opacity: 0.4;
        user-select: none;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 0;
        font-weight: 500;
    }

    &.s {
        --size: 40px;
        font-size: 1rem;
    }

    &.m {
        --size: 70px;
        font-size: 1.6rem;
    }

    &.l {
        --size: 100px;
        font-size: 2rem;
    }
`;

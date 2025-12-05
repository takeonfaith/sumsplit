import styled, { keyframes } from 'styled-components';

export const MenuStyled = styled.menu`
    min-width: 280px;
    width: 280px;
    height: var(--app-height);
    background-color: #f7f7f7;
    border-right: 1px solid #e0e0e0;
    padding-inline: 10px;
    padding-block: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
    overflow-y: auto;

    & a {
        font-size: 1rem;
        font-weight: 300;

        & .icon {
            width: 20px;
            height: 20px;
        }
    }

    & .create-event-btn {
        margin-inline: 15px;
        width: calc(100% - 30px);
        min-height: 40px;
    }

    & a.active {
        color: #0c6cc3;

        svg {
            opacity: 1;
        }
    }

    @media (max-width: 768px) {
        width: 100%;
        min-height: var(--menu-height);
        height: var(--menu-height);
        border-right: none;
        border-top: 1px solid #e0e0e0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 8px;
        flex-direction: row;

        & .logo {
            display: none;
        }

        a {
            padding-block: 10px;
            height: 100%;
        }

        & .create-event-btn {
            position: fixed;
            bottom: 95px;
            right: 5px;

            width: 50px;
            height: 50px;
            z-index: 100;
        }
    }
`;

export const MenuList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    @media (max-width: 768px) {
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        box-sizing: border-box;
    }
`;

export const MenuBottom = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    margin-top: auto;
    position: sticky;
    bottom: 0px;
    left: 0;
    z-index: 1;
    background-color: #f7f7f7;
    padding: 10px 0;

    &::before {
        content: '';
        position: absolute;
        top: -40px;
        left: 0;
        width: 100%;
        pointer-events: none;
        height: 40px;
        background: linear-gradient(0deg, #f7f7f7 30%, transparent);
    }
`;

const starAppear = keyframes`
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: var(--star-opacity);
        transform: translateY(0);
    }
`;

export const StarIcon = styled.div<{
    $top: number;
    $left: number;
    $size: number;
    $opacity: number;
    $delay: number;
}>`
    position: absolute;
    top: ${(props) => props.$top}px;
    left: ${(props) => props.$left}%;
    width: ${(props) => props.$size}px;
    height: ${(props) => props.$size}px;
    color: #fd2699;
    --star-opacity: ${(props) => props.$opacity};
    opacity: 0;
    animation: ${starAppear} 0.5s ease-out forwards;
    animation-delay: ${(props) => props.$delay}s;

    & svg {
        width: 100%;
        height: 100%;
    }
`;

export const SubscriptionPromoStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    background: linear-gradient(180deg, #fd26992e, #ffffff);
    outline: 1px solid #e0e0e0;
    padding: 16px;
    border-radius: 10px;
    margin-inline: 10px;
    width: calc(100% - 20px);
    position: relative;
    overflow: hidden;

    & .icons {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 60px;
        pointer-events: none;
    }

    & .plus-badge {
        transform: scale(1.3);
        position: relative;
        z-index: 1;
    }

    & p {
        position: relative;
        z-index: 1;
        text-align: center;
    }

    & button {
        position: relative;
        z-index: 1;
    }
`;

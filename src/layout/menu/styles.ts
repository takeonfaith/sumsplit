import styled from 'styled-components';

export const MenuStyled = styled.menu`
    min-width: 280px;
    width: 280px;
    height: var(--app-height);
    background-color: #f7f7f7;
    border-right: 1px solid #e0e0e0;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 30px;

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
            right: 25px;

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

import styled from 'styled-components';

export const LayoutStyled = styled.div`
    width: 100%;
    height: 100%;
    display: flex;

    @media (max-width: 768px) {
        flex-direction: column-reverse;
    }
`;

export const Content = styled.div`
    width: 100%;
    height: var(--app-height);

    @media (max-width: 768px) {
        height: calc(var(--app-height) - var(--menu-height));
    }
`;

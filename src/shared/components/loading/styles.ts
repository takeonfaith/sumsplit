import styled from "styled-components";

export const LoadingStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    @keyframes loadinganim {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    svg {
        stroke-width: 3;

        path {
            animation: loadinganim 0.5s infinite linear;
            transform-origin: 50% 50%;
        }
    }
`;

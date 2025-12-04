import styled from 'styled-components';

export const StubStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;

    .description {
        opacity: 0.7;
        margin-top: 6px;
        font-weight: 300;
    }

    .icon {
        width: 100px;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;

        svg {
            width: 90%;
            height: 90%;
            opacity: 0.3;
        }
    }
`;

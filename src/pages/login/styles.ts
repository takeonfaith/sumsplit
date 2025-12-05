import styled from 'styled-components';
import { MEDIA_QUERIES } from '../../app/screen/constants';

export const LoginPageStyled = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

export const LoginBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100dvh;
    outline: 1px solid #e0e0e0;
    padding: 20px;
    width: 50vw;
    max-width: 50vw;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

    ${MEDIA_QUERIES.isTablet} {
        width: 100%;
        max-width: 100%;
    }
`;

export const LoginFormStyled = styled.form`
    display: grid;
    grid-template-rows: 1fr 40px;
    gap: 10px;
    height: 100%;
    max-height: 400px;
    width: 100%;
    max-width: 500px;
`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
`;

export const LoginPic = styled.div`
    width: 50vw;
    max-width: 50vw;
    height: 100%;
    background: #e0e0e0;
    overflow: hidden;

    span {
        font-size: 18rem;
        margin: auto 0;
        word-break: break-all;
        font-weight: 1000;
        opacity: 0.1;
        height: fit-content;
        display: block;
        line-height: 16rem;
    }

    ${MEDIA_QUERIES.isTablet} {
        display: none;
    }
`;

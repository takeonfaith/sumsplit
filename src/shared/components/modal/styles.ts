import styled from 'styled-components';
import { MEDIA_QUERIES } from '../../../app/screen/constants';

export const ModalContentStyled = styled.div`
    width: 100%;
    max-width: 600px;
    max-height: 600px;
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    overflow-y: auto;

    ${MEDIA_QUERIES.isMobile} {
        border-radius: 10px 10px 0 0;
        max-height: 100%;
        padding: 16px;
    }
`;

export const ModalBackgroundStyled = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;

    ${MEDIA_QUERIES.isMobile} {
        align-items: flex-end;
    }
`;

export const ModalHeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    user-select: none;
`;

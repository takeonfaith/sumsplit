import styled from 'styled-components';

export const PageStyled = styled.section`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: var(--page-padding);
`;

export const PageContent = styled.div`
    width: 100%;
    height: calc(100% - 120px);
    overflow-y: auto;
`;

export const HeaderStyled = styled.header`
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    h1 {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

export const HeaderButtonsStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    width: 100%;
`;

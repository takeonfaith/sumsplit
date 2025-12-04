import styled from 'styled-components';

export const Input = styled.input`
    width: 100%;
    height: 40px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 0 10px;
    background: #f7f7f7;

    &.clear {
        border: none;
        background: transparent;
        padding: 0;
        border-radius: 0;

        &:focus {
            outline: none;
        }
    }

    &::placeholder {
        color: #999;
        font-weight: 300;
        font-size: 0.94rem;
    }
`;

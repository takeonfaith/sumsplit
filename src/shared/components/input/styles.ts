import styled from 'styled-components';

export const InputWrapper = styled.label`
    width: 100%;

    .label {
        font-size: 0.9rem;
        font-weight: 300;
        color: #717171;
        margin-bottom: 4px;
        display: inline-block;
    }

    &.error {
        .label {
            color: #b22c2c;
        }
    }

    .icon-left {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;

        svg {
            width: 100%;
            height: 100%;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .icon-right {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    &.clear {
        .icon-left {
            left: 0;
        }

        .icon-right {
            right: 0;
        }
    }
`;

export const InputStyled = styled.input`
    width: 100%;
    height: 40px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 0 10px;
    background: #f7f7f7;
    font-weight: 300;

    &.error {
        border: 1px solid #b22c2c;
    }

    &.clear {
        border: none;
        background: transparent;
        padding: 0;
        border-radius: 0;

        &:focus {
            outline: none;
        }
    }

    &.with-icon-left {
        padding-left: 30px;
    }

    &.with-icon-right {
        padding-right: 30px;
    }

    &::placeholder {
        color: #999;
        font-size: 0.94rem;
        font-weight: 300;
    }
`;

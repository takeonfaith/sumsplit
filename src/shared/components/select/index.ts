import styled from 'styled-components';

export const Select = styled.select`
    width: fit-content;
    height: 40px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 0 10px;
    background-color: #f7f7f7;
    font-size: 0.94rem;
    appearance: none; /* Disable the default arrow */
    -webkit-appearance: none; /* For WebKit-based browsers */
    -moz-appearance: none;
    cursor: pointer;
    background-image: url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L12 15L18 9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/></svg>');
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 20px;
    padding-right: 40px;

    &.clear {
        border: none;
        background-color: transparent;
        padding: 0;
        border-radius: 0;
        padding-right: 40px;

        &:focus {
            outline: none;
        }
    }

    &.full {
        width: 100%;
    }
`;

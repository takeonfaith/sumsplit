import { css } from 'styled-components';

export const active = (color: string) => css`
    &:active {
        background: ${color};
        transform: scale(0.99);
    }
`;

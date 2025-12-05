import { css } from 'styled-components';

export const hover = (color: string) => css`
    @media (hover: hover) {
        &:hover {
            background: ${color};
        }
    }
`;

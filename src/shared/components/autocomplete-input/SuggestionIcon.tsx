import React from 'react';
import styled from 'styled-components';

type Props = {
    icon: React.ReactNode | string;
};

const SuggestionIconStyled = styled.div`
    width: 20px;
    height: 20px;
    background: #f0f0f0;
    border-radius: 50%;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    svg {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export const SuggestionIcon = ({ icon }: Props) => {
    return (
        <SuggestionIconStyled>
            {typeof icon === 'string' ? <img src={icon} alt="icon" /> : icon}
        </SuggestionIconStyled>
    );
};

import React from 'react';
import { StubStyled } from './styles';

type Props = {
    children?: React.ReactNode;
    icon: React.ReactNode;
    title: string;
    description?: string;
};

export const Stub = ({ children, icon, title, description }: Props) => {
    return (
        <StubStyled>
            <div className="icon">{icon}</div>
            <h3 className="title">{title}</h3>
            <div className="description">{description}</div>
            {children}
        </StubStyled>
    );
};

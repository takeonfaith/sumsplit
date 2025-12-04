import React from 'react';
import {
    HeaderButtonsStyled,
    HeaderStyled,
    PageContent,
    PageStyled,
} from './styles';

type Props = {
    children: React.ReactNode;
    title: string;
    buttons?: React.ReactNode;
};

export const Page = ({ title, children, buttons }: Props) => {
    return (
        <PageStyled>
            <HeaderStyled>
                {!!buttons && (
                    <HeaderButtonsStyled>{buttons}</HeaderButtonsStyled>
                )}
                <h1>{title}</h1>
            </HeaderStyled>
            <PageContent>{children}</PageContent>
        </PageStyled>
    );
};

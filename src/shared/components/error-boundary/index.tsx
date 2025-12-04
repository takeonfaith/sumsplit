import React from 'react';
import { IconBug } from '@tabler/icons-react';
import {
    ErrorBoundaryStyled,
    ErrorIcon,
    ErrorTitle,
    PageMessage,
} from './styles';

type Props = { children: React.ReactNode };
type State = {
    error: Error | null;
};

export class ErrorBoundary extends React.Component<Props> {
    public state: State = {
        error: null,
    };

    constructor(props: Props) {
        super(props);
        this.state = { error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { error };
    }

    render() {
        if (this.state.error) {
            return (
                <ErrorBoundaryStyled>
                    <ErrorIcon>
                        <IconBug />
                    </ErrorIcon>
                    <ErrorTitle>Ошибка</ErrorTitle>
                    <PageMessage>{this.state.error.message}</PageMessage>
                </ErrorBoundaryStyled>
            );
        }

        return this.props.children;
    }
}

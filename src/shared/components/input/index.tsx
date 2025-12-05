import React, { forwardRef } from 'react';
import { InputStyled, InputWrapper } from './styles';
import { cn } from '../../lib/classname';
import type { InputView } from './types';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    iconLeft?: React.ReactNode | string;
    iconRight?: React.ReactNode | string;
    view?: InputView;
    error?: string;
};

export const Input = forwardRef<HTMLInputElement, Props>(
    (
        { label, iconLeft, iconRight, error, view = 'default', ...props },
        ref
    ) => {
        return (
            <InputWrapper
                className={cn('input', { error: !!error }, { [view]: view })}
            >
                {(label || error) && (
                    <span className="label">{error || label}</span>
                )}

                {iconLeft && (
                    <div className="icon-left">
                        {typeof iconLeft === 'string' ? (
                            <img src={iconLeft} alt="icon" />
                        ) : (
                            iconLeft
                        )}
                    </div>
                )}
                <InputStyled
                    {...props}
                    ref={ref}
                    className={cn(props.className, {
                        'with-icon-left': !!iconLeft,
                        'with-icon-right': !!iconRight,
                        clear: view === 'clear',
                        error: !!error,
                    })}
                />
                {iconRight && (
                    <div className="icon-right">
                        {typeof iconRight === 'string' ? (
                            <img src={iconRight} alt="icon" />
                        ) : (
                            iconRight
                        )}
                    </div>
                )}
            </InputWrapper>
        );
    }
);

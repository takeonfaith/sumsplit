import { IconX } from '@tabler/icons-react';
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { Button } from '../button';
import {
    ModalBackgroundStyled,
    ModalContentStyled,
    ModalHeaderStyled,
} from './styles';
import { useSwipeToClose } from '../../hooks/useSwipeToClose';

type Props = {
    children: React.ReactNode;
    visible: boolean;
    title: string;
    onClose: () => void;
};

export const Modal = ({ title, children, visible, onClose }: Props) => {
    const ref = useRef<HTMLDivElement>(null);
    const { style, handleAnimatedClose, overlayStyle } = useSwipeToClose({
        isOpen: visible,
        onSwipeClose: onClose,
        el: ref,
        threshold: 0.5,
    });

    if (!visible) return null;

    return ReactDOM.createPortal(
        <ModalBackgroundStyled
            style={overlayStyle}
            onClick={handleAnimatedClose ?? onClose}
        >
            <ModalContentStyled
                style={style}
                onClick={(e) => e.stopPropagation()}
                ref={ref}
            >
                <ModalHeaderStyled>
                    <h3>{title}</h3>
                    <Button onClick={onClose} className="size-s rounded square">
                        <IconX />
                    </Button>
                </ModalHeaderStyled>
                {children}
            </ModalContentStyled>
        </ModalBackgroundStyled>,
        document.body
    );
};

import { IconX } from '@tabler/icons-react';
import React, { useRef, useState } from 'react';
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
    content: React.ReactNode;
    title: string;
};

export const Modal = ({ title, children, content }: Props) => {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    const onOpen = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const { style, handleAnimatedClose, overlayStyle } = useSwipeToClose({
        isOpen: visible,
        onSwipeClose: onClose,
        el: ref,
        threshold: 0.5,
    });

    const handleChildrenClick = (e: React.MouseEvent) => {
        onOpen();
        if (React.isValidElement(children)) {
            const originalOnClick = (children.props as { onClick?: (e: React.MouseEvent) => void })?.onClick;
            if (originalOnClick) {
                originalOnClick(e);
            }
        }
    };

    console.log(visible);
    

    return (
        <>
            {React.isValidElement(children)
                ? React.cloneElement(children as React.ReactElement<{ onClick?: (e: React.MouseEvent) => void; style?: React.CSSProperties }>, {
                      onClick: handleChildrenClick,
                      style: {
                          ...((children.props as { style?: React.CSSProperties })?.style || {}),
                          cursor: 'pointer',
                      },
                  })
                : children}
            {visible &&
                ReactDOM.createPortal(
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
                                <Button
                                    onClick={onClose}
                                    className="size-s rounded square"
                                >
                                    <IconX />
                                </Button>
                            </ModalHeaderStyled>
                            {content}
                        </ModalContentStyled>
                    </ModalBackgroundStyled>,
                    document.body
                )}
        </>
    );
};

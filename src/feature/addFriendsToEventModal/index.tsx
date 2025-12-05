import { Modal } from '../../shared/components/modal';
import { ModalContent } from './ModalContent';

type Props = {
    children: React.ReactNode;
};

export const AddFriendsToEventModal = ({ children }: Props) => {
    return (
        <Modal content={<ModalContent />} title="Добавить участников в событие">
            {children}
        </Modal>
    );
};

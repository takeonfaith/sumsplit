import {
    IconFolders,
    IconFriends,
    IconHome,
    IconPlus,
} from '@tabler/icons-react';
import { useUnit } from 'effector-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { $isMobile } from '../../app/screen';
import { Button } from '../../shared/components/button';
import { Logo } from '../../shared/components/logo';
import { MenuList, MenuStyled } from './styles';
import { CreatePaymentModal } from '../../feature/createPaymentModal';

export const Menu = () => {
    const isMobile = useUnit($isMobile);
    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <MenuStyled>
            <Logo />
            <MenuList>
                <Button
                    as={NavLink}
                    to="/"
                    className="vertical-on-mobile full start"
                >
                    <IconHome />
                    Главная
                </Button>
                <Button
                    as={NavLink}
                    to="/events"
                    className="vertical-on-mobile full start"
                >
                    <IconFolders />
                    События
                </Button>
                <Button
                    as={NavLink}
                    to="/friends"
                    className="vertical-on-mobile full start"
                >
                    <IconFriends />
                    Друзья
                </Button>
            </MenuList>
            <Button
                onClick={() => setIsModalVisible(true)}
                className="create-event-btn primary rounded full"
            >
                <IconPlus />
                {!isMobile && 'Добавить платеж'}
            </Button>
            <CreatePaymentModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
            />
        </MenuStyled>
    );
};

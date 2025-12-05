import { IconPlus } from '@tabler/icons-react';
import { useUnit } from 'effector-react';
import { NavLink } from 'react-router-dom';
import { routes } from '../../app/routes';
import { $isMobile } from '../../app/screen';
import { CreatePaymentModal } from '../../feature/createPaymentModal';
import { Button } from '../../shared/components/button';
import { Logo } from '../../shared/components/logo';
import { EventsList } from './EventsList';
import { ProfileButton } from './ProfileButton';
import { MenuBottom, MenuList, MenuStyled } from './styles';
import { SubscriptionPromo } from './SubscriptionPromo';

const getMenuItems = (paths: string[]) => {
    return routes.filter((route) => paths.includes(route.url));
};

const menuItems = getMenuItems(['', 'events', 'friends', 'statistics']);

console.log(menuItems);

export const Menu = () => {
    const isMobile = useUnit($isMobile);

    if (isMobile) return null;

    return (
        <MenuStyled>
            <Logo />
            <MenuList>
                {menuItems.map((route) => (
                    <Button
                        key={route.url}
                        as={NavLink}
                        to={route.url}
                        className="vertical-on-mobile full start"
                    >
                        <div className="icon">{route.icon}</div>
                        {route.name}
                    </Button>
                ))}
            </MenuList>
            <CreatePaymentModal>
                <Button className="create-event-btn primary rounded full">
                    <IconPlus />
                    {!isMobile && 'Добавить платеж'}
                </Button>
            </CreatePaymentModal>
            <EventsList />
            <MenuBottom>
                <SubscriptionPromo />
                <ProfileButton />
            </MenuBottom>
        </MenuStyled>
    );
};

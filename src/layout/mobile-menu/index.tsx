import { useUnit } from 'effector-react';
import { $isMobile } from '../../app/screen';
import { MenuList, MenuStyled } from '../menu/styles';
import { Button } from '../../shared/components/button';
import { NavLink } from 'react-router-dom';
import { routes } from '../../app/routes';

const getMenuItems = (paths: string[]) => {
    return routes.filter((route) => paths.includes(route.url));
};

const menuItems = getMenuItems(['', 'events', 'friends', 'statistics']);

export const MobileMenu = () => {
    const isMobile = useUnit($isMobile);

    if (!isMobile) return null;

    return (
        <MenuStyled>
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
        </MenuStyled>
    );
};

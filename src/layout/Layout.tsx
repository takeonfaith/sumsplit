import { Outlet } from 'react-router-dom';
import { Menu } from './menu';
import { Content, LayoutStyled } from './styles';
import { MobileMenu } from './mobile-menu';

export const Layout = () => {
    return (
        <LayoutStyled>
            <Menu />
            <Content>
                <Outlet />
            </Content>
            <MobileMenu />
        </LayoutStyled>
    );
};

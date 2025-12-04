import { Outlet } from 'react-router-dom';
import { Menu } from './menu';
import { Content, LayoutStyled } from './styles';

export const Layout = () => {
    return (
        <LayoutStyled>
            <Menu />
            <Content>
                <Outlet />
            </Content>
        </LayoutStyled>
    );
};

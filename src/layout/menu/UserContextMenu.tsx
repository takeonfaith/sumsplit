import { IconLogout, IconSettings } from '@tabler/icons-react';
import styled from 'styled-components';
import { Button } from '../../shared/components/button';
import { Divider } from '../../shared/components/divider';
import { logout } from '../../entities/user/model/logout';

const ContextMenuStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 4px;
    min-width: 240px;

    button {
        border-radius: 6px;
        width: 100%;
        justify-content: start;
        background: transparent;
		  padding: 0 10px;
    }

	 hr {
		margin: 2px 0;
	 }
`;

export const UserContextMenu = () => {
    return (
        <ContextMenuStyled>
            <Button>
                <IconSettings />
                Настройки
            </Button>
            <Divider />
            <Button onClick={() => logout()}>
                <IconLogout />
                Выйти
            </Button>
        </ContextMenuStyled>
    );
};

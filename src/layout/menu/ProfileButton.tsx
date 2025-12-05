import { useUnit } from 'effector-react';
import styled from 'styled-components';
import { $user } from '../../entities/user/model/init';
import { $isPlus } from '../../entities/user/model/subscription';
import { ESubscriptionType } from '../../entities/user/model/types';
import { Avatar } from '../../shared/components/avatar';
import { Button } from '../../shared/components/button';
import { Popup } from '../../shared/components/popup';
import { UserContextMenu } from './UserContextMenu';

export const ProfileButtonStyled = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 4px 10px;
    text-decoration: none;
    color: #000;
    border-radius: 10px;
    cursor: pointer;

    .profile-button-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    @media (hover: hover) {
        &:hover {
            background-color: #f0f0f0;
        }
    }

    .profile-button-name {
        display: flex;
        flex-direction: column;
    }

    .name {
        font-size: 1.1rem;
        font-weight: 300;
    }

    .subscription {
        font-size: 0.8rem;
        font-weight: 300;
        color: #666;
    }
`;

const SUBSCRIPTION_TO_TEXT = {
    [ESubscriptionType.FREE]: 'Бесплатно',
    [ESubscriptionType.PLUS]: 'Плюс',
    [ESubscriptionType.EXPIRED]: '',
};

export const ProfileButton = () => {
    const [user, isPlus] = useUnit([$user, $isPlus]);

    if (!user) return null;

    return (
        <Popup content={<UserContextMenu />}>
            <ProfileButtonStyled>
                <Avatar
                    size="s"
                    name={user.name || ''}
                    src={user.avatar || ''}
                    plus={isPlus}
                />
                <div className="profile-button-content">
                    <div className="profile-button-name">
                        <span className="name">{user.name}</span>
                        <span className="subscription">
                            {SUBSCRIPTION_TO_TEXT[user.subscription.type]}
                        </span>
                    </div>
                    {!isPlus && <Button className="size-xs rounded">Обновить</Button>}
                </div>
            </ProfileButtonStyled>
        </Popup>
    );
};

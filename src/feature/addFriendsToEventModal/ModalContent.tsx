import { IconPlus, IconUserPlus } from '@tabler/icons-react';
import { FriendItem } from '../../pages/friends/FriendItem';
import { Button } from '../../shared/components/button';
import { Stub } from '../../shared/components/stub';
import { useUnit } from 'effector-react';
import { useState } from 'react';
import { $friends } from '../../entities/friends/model';
import type { TFriend } from '../../entities/friends/model/types';
import styled from 'styled-components';

const FriendsGridStyled = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
    margin-bottom: 20px;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

export const ModalContent = () => {
    const friends = useUnit($friends);
    const [selectedFriends, setSelectedFriends] = useState<TFriend[]>([]);

    const handleSelectFriend = (friend: TFriend) => {
        setSelectedFriends((prev) => {
            if (prev.some((f) => f.id === friend.id)) {
                return prev.filter((f) => f.id !== friend.id);
            }

            return [...prev, friend];
        });
    };

    return (
        <>
            {!Object.values(friends).length && (
                <Stub icon={<IconUserPlus />} title="Нет друзей">
                    <Button className="primary rounded">
                        <IconUserPlus />
                        Добавить друга
                    </Button>
                </Stub>
            )}
            {!!Object.values(friends).length && (
                <FriendsGridStyled>
                    {Object.values(friends).map((friend) => {
                        const isSelected = selectedFriends.some(
                            (f) => f.id === friend.id
                        );

                        return (
                            <FriendItem
                                selected={isSelected}
                                key={friend.id}
                                friend={friend}
                                onClick={() => handleSelectFriend(friend)}
                            />
                        );
                    })}
                </FriendsGridStyled>
            )}
            {!!Object.values(friends).length && (
                <Button
                    disabled={!selectedFriends.length}
                    className="primary rounded full"
                >
                    <IconPlus />
                    Добавить участников
                </Button>
            )}
        </>
    );
};

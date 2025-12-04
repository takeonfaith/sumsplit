import { IconUserOff, IconUserPlus } from '@tabler/icons-react';
import { useUnit } from 'effector-react';
import { $friends } from '../../entities/friends/model';
import { Button } from '../../shared/components/button';
import { Page } from '../../shared/components/page';
import { Stub } from '../../shared/components/stub';
import { FriendItem } from './FriendItem';
import { FriendsGrid } from './styles';

export const FriendsPage = () => {
    const friends = useUnit($friends);

    return (
        <Page
            title="Друзья"
            buttons={
                <Button className="primary rounded">
                    <IconUserPlus />
                    Добавить друга
                </Button>
            }
        >
            {!!Object.values(friends).length && (
                <FriendsGrid>
                    {Object.values(friends).map((friend) => (
                        <FriendItem key={friend.id} friend={friend} />
                    ))}
                </FriendsGrid>
            )}
            {!Object.values(friends).length && (
                <Stub
                    icon={<IconUserOff />}
                    title={'Друзей пока нет'}
                    description={
                        'Чтобы добавить друга, нажмите на кнопку "Добавить друга"'
                    }
                />
            )}
        </Page>
    );
};

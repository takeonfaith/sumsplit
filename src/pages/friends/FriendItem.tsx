import { IconCircleCheckFilled } from '@tabler/icons-react';
import type { TFriend } from '../../entities/friends/model/types';
import { cn } from '../../lib/utils';
import { Avatar } from '../../shared/components/avatar';
import { FriendItemStyled } from './styles';

type Props = {
    friend: TFriend;
    size?: TSize;
    selected?: boolean;
    onClick?: () => void;
};

export const FriendItem = ({
    friend,
    size = 'm',
    selected = false,
    onClick,
}: Props) => {
    return (
        <FriendItemStyled
            className={cn('', { selected }, { [size]: size })}
            onClick={onClick}
        >
            <Avatar size={size} src="" name={friend.name}>
                {selected && (
                    <IconCircleCheckFilled className="icon-selected" />
                )}
            </Avatar>
            <h3>{friend.name}</h3>
        </FriendItemStyled>
    );
};

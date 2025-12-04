import { useUnit } from 'effector-react';
import styled from 'styled-components';
import { MEDIA_QUERIES } from '../../app/screen/constants';
import { $friends } from '../../entities/friends/model';
import { FriendItem } from '../../pages/friends/FriendItem';

const ChooseWhoPaidStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 16px;

    ${MEDIA_QUERIES.isMobile} {
        padding: 0;
        padding-top: 20px;
    }
`;

const ChooseWhoPaidGridStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    min-height: 150px;
`;

export const ChooseWhoPaid = () => {
    const friends = useUnit($friends);

    return (
        <ChooseWhoPaidStyled>
            <ChooseWhoPaidGridStyled>
                {Object.keys(friends).map((friend) => {
                    return (
                        <FriendItem
                            size="s"
                            key={friend}
                            friend={friends[friend]}
                        />
                    );
                })}
            </ChooseWhoPaidGridStyled>
        </ChooseWhoPaidStyled>
    );
};

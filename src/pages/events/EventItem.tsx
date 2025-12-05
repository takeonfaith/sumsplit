import { IconStarFilled } from '@tabler/icons-react';
import type { TEvent } from '../../entities/event/model/types';
import { Avatar } from '../../shared/components/avatar';
import { EventItemStyled } from './styles';

type Props = {
    event: TEvent;
};

export const EventItem = ({ event }: Props) => {
    return (
        <EventItemStyled to={`/events/${event.id}`}>
            <Avatar
                src=""
                name={event.name}
                size={'s'}
                icon={<IconStarFilled />}
            />
            <h4>{event.name}</h4>
        </EventItemStyled>
    );
};

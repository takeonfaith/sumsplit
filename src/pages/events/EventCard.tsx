import { IconFolderFilled } from '@tabler/icons-react';
import type { TEvent } from '../../entities/event/model/types';
import { Avatar } from '../../shared/components/avatar';
import { EventCardStyled } from './styles';
import { CURRENCY_ICON } from '../../shared/icons/currency';

type Props = {
    event: TEvent;
};

export const EventCard = ({ event }: Props) => {
    return (
        <EventCardStyled to={`/events/${event.id}`}>
            <Avatar
                size="s"
                src={''}
                name={event.name}
                icon={<IconFolderFilled />}
            />
            <div className="event-currency">
                {CURRENCY_ICON[event.currency]}
            </div>
            <h3>{event.name}</h3>
        </EventCardStyled>
    );
};

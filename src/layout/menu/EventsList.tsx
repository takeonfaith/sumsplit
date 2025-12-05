import { IconPlus } from '@tabler/icons-react';
import { useUnit } from 'effector-react';
import styled from 'styled-components';
import { $events, getUserEventsFx } from '../../entities/event/model';
import { EventItem } from '../../pages/events/EventItem';
import { Button } from '../../shared/components/button';
import { Loading } from '../../shared/components/loading';
import { CreateEventModal } from '../../feature/createEventModal';

export const EventsListStyled = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2px;

    .events-list-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        padding-inline: 12px;
        margin-top: 4px;
    }
`;

export const EventsList = () => {
    const [events, isLoading] = useUnit([$events, getUserEventsFx.pending]);

    return (
        <EventsListStyled>
            <div className="events-list-header">
                <h3>Мои события</h3>
                <CreateEventModal>
                    <Button className="rounded size-xs square ">
                        <IconPlus />
                    </Button>
                </CreateEventModal>
            </div>
            {isLoading && <Loading />}
            {events.map((event) => (
                <EventItem key={event.id} event={event} />
            ))}
        </EventsListStyled>
    );
};

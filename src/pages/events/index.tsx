import { IconFolderOff, IconFolderPlus, IconSearch } from '@tabler/icons-react';
import { useUnit } from 'effector-react';
import { $events } from '../../entities/event/model';
import { CreateEventModal } from '../../feature/createEventModal';
import { Button } from '../../shared/components/button';
import { Page } from '../../shared/components/page';
import { Stub } from '../../shared/components/stub';
import { EventCard } from './EventCard';
import { EventsGrid } from './styles';

export const EventsPage = () => {
    const events = useUnit($events);

    return (
        <Page
            title="События"
            buttons={
                <>
                    <Button className="rounded">
                        <IconSearch />
                        Поиск
                    </Button>
                    <CreateEventModal>
                        <Button className="primary rounded">
                            <IconFolderPlus />
                            Создать событие
                        </Button>
                    </CreateEventModal>
                </>
            }
        >
            {events.length > 0 && (
                <EventsGrid>
                    {events.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </EventsGrid>
            )}
            {!events.length && (
                <Stub
                    icon={<IconFolderOff />}
                    title={'Пока событий нет'}
                    description={
                        "Нажмите на кнопку 'Создать событие' чтобы начать"
                    }
                />
            )}
        </Page>
    );
};

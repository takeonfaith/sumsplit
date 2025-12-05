import {
    IconCashBanknoteFilled,
    IconPlus,
    IconScan,
    IconStarOff,
    IconUserCircle,
    IconUserPlus,
} from '@tabler/icons-react';
import { useStoreMap, useUnit } from 'effector-react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { $events } from '../../entities/event/model';
import type { TFriend } from '../../entities/friends/model/types';
import { $currentEventPayments } from '../../entities/payment/model';
import { $isPlus } from '../../entities/user/model/subscription';
import { AddFriendsToEventModal } from '../../feature/addFriendsToEventModal';
import { CreatePaymentModal } from '../../feature/createPaymentModal';
import { Avatar } from '../../shared/components/avatar';
import { Button } from '../../shared/components/button';
import { Divider } from '../../shared/components/divider';
import { Page } from '../../shared/components/page';
import { Stub } from '../../shared/components/stub';
import { CURRENCY } from '../../shared/constants';
import { CURRENCY_ICON } from '../../shared/icons/currency';
import { cn } from '../../shared/lib/classname';
import { groupBy } from '../../shared/lib/groupBy';
import { PaymentItem } from './PaymentItem';
import {
    EventStatItem,
    EventStats,
    EventTitle,
    PaymentListStyled,
} from './styles';

export const AvatarListStyled = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

const AvatarList = ({ friends }: { friends: TFriend[] }) => {
    return (
        <AvatarListStyled>
            {friends.map((friend) => (
                <Avatar
                    key={friend.id}
                    src={''}
                    name={friend.name}
                    size={'s'}
                    icon={!friend.name ? <IconUserCircle /> : undefined}
                />
            ))}
        </AvatarListStyled>
    );
};

export const SpecificEventPage = () => {
    const { id } = useParams();

    const event = useStoreMap({
        store: $events,
        keys: [id],
        fn: (events, [id]) => events.find((event) => event.id === id),
    });
    const [payments, isPlus] = useUnit([$currentEventPayments, $isPlus]);

    const groupedByDate = groupBy(payments, 'createdAt');
    const totalSpent = payments.reduce((acc, payment) => acc + payment.sum, 0);

    if (!event)
        return (
            <Stub
                icon={<IconStarOff />}
                title="Событие не найдено"
                description="Такого события не существует"
            />
        );

    return (
        <Page
            title={event.name}
            buttons={
                <>
                    <Button
                        className={cn('rounded', { plus: !isPlus })}
                        disabled={!isPlus}
                    >
                        <IconScan />
                        Сканировать чек
                    </Button>
                    <CreatePaymentModal>
                        <Button className="primary rounded">
                            <IconPlus />
                            Добавить платеж
                        </Button>
                    </CreatePaymentModal>
                </>
            }
        >
            <EventTitle>Участники</EventTitle>
            {!event.participants.length && (
                <AddFriendsToEventModal>
                    <Button className="rounded">
                        <IconUserPlus />
                        Добавить участника
                    </Button>
                </AddFriendsToEventModal>
            )}

            <AvatarList friends={[]} />
            <Divider />

            <EventTitle>Результат</EventTitle>
            <EventStats>
                <EventStatItem>
                    Макс должен Косте:
                    <span className="money">
                        {totalSpent}
                        {CURRENCY_ICON[CURRENCY.RUB.id]}
                    </span>
                </EventStatItem>
                <EventStatItem>
                    Макс должен Кириллу:
                    <span className="money">
                        {totalSpent}
                        {CURRENCY_ICON[CURRENCY.RUB.id]}
                    </span>
                </EventStatItem>
            </EventStats>
            <Divider />
            <EventTitle>Платежи</EventTitle>
            <PaymentListStyled>
                {Object.entries(groupedByDate).map(([date, payments]) => (
                    <div key={date}>
                        <h4>
                            {new Date(date).toLocaleDateString('ru-RU', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </h4>
                        {payments.map((payment) => (
                            <PaymentItem key={payment.id} payment={payment} />
                        ))}
                    </div>
                ))}
                {!payments.length && (
                    <Stub
                        icon={<IconCashBanknoteFilled />}
                        title="Нет платежей"
                        description="Добавьте первый платеж"
                    />
                )}
            </PaymentListStyled>
        </Page>
    );
};

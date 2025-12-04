import {
    IconCashBanknoteFilled,
    IconPlus,
    IconUserCircle,
    IconUserPlus,
} from '@tabler/icons-react';
import { useStoreMap, useUnit } from 'effector-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import type { TFriend } from '../../entities/friends/model/types';
import { $currentEventPayments } from '../../entities/payment/model';
import { $events } from '../../entities/event/model';
import { AddFriendsToEventModal } from '../../feature/addFriendsToEventModal';
import { CreatePaymentModal } from '../../feature/createPaymentModal';
import { Avatar } from '../../shared/components/avatar';
import { Button } from '../../shared/components/button';
import { Divider } from '../../shared/components/divider';
import { Page } from '../../shared/components/page';
import { Stub } from '../../shared/components/stub';
import { CURRENCY } from '../../shared/constants';
import { CURRENCY_ICON } from '../../shared/icons/currency';
import { groupBy } from '../../shared/lib/groupBy';
import { PaymentItem } from './PaymentItem';
import {
    PaymentListStyled,
    EventStatItem,
    EventStats,
    EventTitle,
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
    const payments = useUnit($currentEventPayments);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAddFriendsModalVisible, setIsAddFriendsModalVisible] =
        useState(false);

    const handleAddPayment = () => {
        setIsModalVisible(true);
    };

    const groupedByDate = groupBy(payments, 'createdAt');
    const totalSpent = payments.reduce((acc, payment) => acc + payment.sum, 0);

    if (!event) return <div>Событие не найдено</div>;

    return (
        <Page
            title={event.name}
            buttons={
                <>
                    <Button
                        className="primary rounded"
                        onClick={handleAddPayment}
                    >
                        <IconPlus />
                        Добавить платеж
                    </Button>
                </>
            }
        >
            <EventTitle>Участники</EventTitle>
            {!event.participants.length && (
                <Button
                    className="rounded"
                    onClick={() => setIsAddFriendsModalVisible(true)}
                >
                    <IconUserPlus />
                    Добавить участника
                </Button>
            )}
            <AddFriendsToEventModal
                visible={isAddFriendsModalVisible}
                onClose={() => setIsAddFriendsModalVisible(false)}
            />
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

            <CreatePaymentModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
            />
        </Page>
    );
};

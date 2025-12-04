import { IconCashBanknoteFilled } from '@tabler/icons-react';
import { useStoreMap } from 'effector-react';
import { useState } from 'react';
import { $friends } from '../../entities/friends/model';
import type { TPayment } from '../../entities/payment/model/types';
import { Avatar } from '../../shared/components/avatar';
import { Modal } from '../../shared/components/modal';
import { CURRENCY_ICON } from '../../shared/icons/currency';
import { getPaymentAvatar } from './lib/getPaymentAvatar';
import { PaymentAvatars, PaymentItemStyled } from './styles';

type Props = {
    payment: TPayment;
};

export const PaymentItem = ({ payment }: Props) => {
    const avatar = getPaymentAvatar({ name: payment.name });
    const icon = <IconCashBanknoteFilled />;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const whoPaidUser = useStoreMap({
        store: $friends,
        keys: [payment.whoPaid],
        fn: (friends, [whoPaid]) => friends[whoPaid],
    });

    return (
        <>
            <Modal
                title={payment.name}
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
            >
                d
            </Modal>
            <PaymentItemStyled onClick={() => setIsModalVisible(true)}>
                <PaymentAvatars>
                    <Avatar size="s" src={''} name={whoPaidUser?.name} />
                    <Avatar
                        size="s"
                        src={avatar}
                        name={payment.name}
                        icon={icon}
                    />
                </PaymentAvatars>
                <div className="payment-item-content">
                    <div className="payment-item-content-header">
                        <h3>{payment.name}</h3>
                        <span>
                            {payment.sum} {CURRENCY_ICON[payment.currency]}
                        </span>
                    </div>
                    <p className="money">{payment.description ?? 'Оплата'}</p>
                </div>
            </PaymentItemStyled>
        </>
    );
};

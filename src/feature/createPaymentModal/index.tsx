import {
    IconArrowUp,
    IconCash,
    IconClock,
    IconUser,
} from '@tabler/icons-react';
import { useUnit } from 'effector-react';
import styled from 'styled-components';
import { $events } from '../../entities/event/model';
import { Button } from '../../shared/components/button';
import { Form } from '../../shared/components/form';
import { Input } from '../../shared/components/input';
import { Modal } from '../../shared/components/modal';
import { Popup } from '../../shared/components/popup';
import { Select } from '../../shared/components/select';
import { CURRENCY_ICON } from '../../shared/icons/currency';
import { formatBigNumber } from '../../shared/lib/formatBigNumbers';
import { ChooseWhoPaid } from './ChooseWhoPaid';
import { CurrencySelect } from './CurrencySelect';
import { useForm } from './model';
import { PaymentSum } from './PaymentSum';
import { WhenPaid } from './WhenPaid';

const CreatePaymentForm = styled(Form)`
    input {
        height: fit-content;
    }

    .name-input {
        font-size: 1.4rem;

        &::placeholder {
            font-size: 1.4rem;
        }
    }

    .description-input {
        font-size: 1rem;

        &::placeholder {
            font-size: 1rem;
        }
    }
`;

export const SmallButtonsList = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 6px;
    overflow-x: auto;

    &::-webkit-scrollbar {
        display: none;
    }

    button {
        white-space: nowrap;
        border-radius: 10px;

        & .icon {
            font-size: 1.1rem;
            opacity: 0.5;
        }
    }
`;

export const CreatePaymentBottom = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    border-top: 1px solid #e0e0e0;
    padding-top: 10px;
    margin-top: 10px;

    select {
        width: fit-content;
    }
`;

type Props = {
    visible: boolean;
    onClose: () => void;
};

export const CreatePaymentModal = ({ visible, onClose }: Props) => {
    const events = useUnit($events);
    const { values, handleSubmit, onChange } = useForm({
        submitForm: () => {},
    });

    return (
        <Modal title="Добавить платеж" visible={visible} onClose={onClose}>
            <CreatePaymentForm
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <Input
                    value={values.name}
                    type="text"
                    id="name"
                    placeholder="Название"
                    onChange={onChange}
                    autoFocus
                    className="name-input clear"
                />

                <Input
                    value={values.description}
                    type="text"
                    id="description"
                    onChange={onChange}
                    placeholder="Описание"
                    className="description-input clear"
                />
                <SmallButtonsList>
                    <Popup content={<PaymentSum />} closeOnClick={false}>
                        <Button className="outline size-s plane">
                            <IconCash />
                            {values.sum ? formatBigNumber(values.sum) : 'Сумма'}
                        </Button>
                    </Popup>
                    <Popup content={<CurrencySelect />}>
                        <Button className="outline size-s plane">
                            <span className="icon">{CURRENCY_ICON.RUB}</span>
                            Валюта
                        </Button>
                    </Popup>
                    <Popup content={<ChooseWhoPaid />}>
                        <Button className="outline size-s plane">
                            <IconUser />
                            Кто платил
                        </Button>
                    </Popup>
                    <Popup content={<WhenPaid />} closeOnClick={false}>
                        <Button className="outline size-s plane">
                            <IconClock />
                            Время платежа
                        </Button>
                    </Popup>
                </SmallButtonsList>
                <CreatePaymentBottom>
                    <label>
                        <Select className="clear">
                            <option value="" disabled selected>
                                Выберите событие
                            </option>
                            {events.map((event) => (
                                <option value={event.id}>
                                    {event.name}
                                </option>
                            ))}
                        </Select>
                    </label>
                    <Button type="submit" className="primary rounded square">
                        <IconArrowUp />
                    </Button>
                </CreatePaymentBottom>
            </CreatePaymentForm>
        </Modal>
    );
};

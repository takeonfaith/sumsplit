import { IconPlus } from '@tabler/icons-react';
import styled from 'styled-components';
import { Button } from '../../shared/components/button';
import { Form } from '../../shared/components/form';
import { Input } from '../../shared/components/input';
import { Modal } from '../../shared/components/modal';
import { useForm } from './model';

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

    padding-top: 10px;
    margin-top: 10px;

    select {
        width: fit-content;
    }
`;

export const CreateEventModal = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { values, handleSubmit, onChange } = useForm({
        submitForm: () => {},
    });

    return (
        <Modal
            title="Добавить событие"
            content={
                <CreatePaymentForm onSubmit={handleSubmit}>
                    <Input
                        value={values.name}
                        type="text"
                        id="name"
                        placeholder="Название события"
                        onChange={onChange}
                        autoFocus
                        autoComplete="off"
                        className="name-input clear"
                    />
                    <CreatePaymentBottom>
                        <Button type="submit" className="primary rounded full">
                            <IconPlus />
                            Добавить
                        </Button>
                    </CreatePaymentBottom>
                </CreatePaymentForm>
            }
        >
            {children}
        </Modal>
    );
};

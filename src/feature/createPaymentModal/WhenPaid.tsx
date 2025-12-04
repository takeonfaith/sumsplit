import styled from 'styled-components';
import { Input } from '../../shared/components/input';
import { useForm } from './model';

const WhenPaidStyled = styled.div`
    min-width: 300px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    label {
        display: flex;
        gap: 4px;
        justify-content: space-between;
        align-items: center;

        span {
            font-size: 0.95rem;
            font-weight: 300;
            opacity: 0.8;
        }

        input {
            width: fit-content;
        }
    }
`;

export const WhenPaid = () => {
    const { values, onChange } = useForm({});

    return (
        <WhenPaidStyled>
            <label>
                <span>Дата платежа</span>
                <Input
                    id="date"
                    value={values.date}
                    type="date"
                    onChange={onChange}
                />
            </label>
            <label>
                <span>Время платежа</span>
                <Input
                    id="time"
                    value={values.time}
                    type="time"
                    onChange={onChange}
                />
            </label>
        </WhenPaidStyled>
    );
};

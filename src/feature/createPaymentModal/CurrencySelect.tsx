import styled from 'styled-components';
import { CURRENCY } from '../../shared/constants';
import { CURRENCY_ICON } from '../../shared/icons/currency';
import { Button } from '../../shared/components/button';
import { MEDIA_QUERIES } from '../../app/screen/constants';

const CurrencySelectStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 4px;

    .currency-item {
        padding: 0 8px;

        & .icon {
            font-size: 1.2rem;
				opacity: 0.5;
        }
    }

    ${MEDIA_QUERIES.isMobile} {
        padding: 8px;
        .currency-item {
            padding: 0 4px;
        }
    }
`;

export const CurrencySelect = () => {
    return (
        <CurrencySelectStyled>
            {Object.values(CURRENCY).map((currency) => (
                <Button
                    key={currency.id}
                    className="currency-item clear full start"
                >
                    <span className="icon">{CURRENCY_ICON[currency.id]}</span>
                    {currency.name}
                </Button>
            ))}
        </CurrencySelectStyled>
    );
};

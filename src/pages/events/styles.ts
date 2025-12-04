import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const EventsGrid = styled.div`
    --columns: 5;

    width: 100%;
    display: grid;
    grid-template-columns: repeat(var(--columns), 1fr);
    grid-auto-rows: 100px;
    gap: 10px;

    @media (max-width: 1200px) {
        --columns: 3;
    }

    @media (max-width: 1050px) {
        --columns: 2;
    }

    @media (max-width: 768px) {
        --columns: 1;
    }
`;

export const EventCardStyled = styled(Link)`
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: #f3f3f3;
    border: 1px solid #e0e0e0;
    padding: 16px;
    border-radius: 10px;
    text-decoration: none;
    color: #000;
    justify-content: flex-end;
    position: relative;
    overflow: hidden;

    .event-currency {
        font-size: 6rem;
        font-weight: 600;
        color: #000;
        position: absolute;
        opacity: 0.1;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
        height: fit-content;
    }

    @media (hover: hover) {
        &:hover {
            background: #e0e0e0;
        }
    }
`;

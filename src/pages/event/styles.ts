import styled from 'styled-components';
import { MEDIA_QUERIES } from '../../app/screen/constants';
import { hover } from '../../shared/styles/hover';
import { active } from '../../shared/styles/active';

export const PaymentListStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    .money {
        color: #0c801a;
    }

    h4 {
        opacity: 0.7;
        margin-bottom: 4px;
    }
`;

export const EventTitle = styled.h3`
    font-size: 1.2rem;
    font-weight: 400;
    margin-bottom: 10px;
`;

export const EventStats = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    opacity: 0.7;

    .money {
        color: #0c801a;
    }
`;

export const PaymentItemStyled = styled.button`
    width: 100%;
    height: fit-content;
    padding: 8px;
    display: flex;
    align-items: center;
    gap: 12px;
    border-radius: 10px;
    cursor: pointer;
    border: none;
    background: transparent;
    appearance: none; /* Disable the default arrow */
    -webkit-appearance: none; /* For WebKit-based browsers */
    -moz-appearance: none;
    text-align: left;
    transition: 0.2s background, 0.2s transform;

    ${hover('#f0f0f0')}
    ${active('#e0e0e0')}

    .money {
        color: #0c6cc3;
    }

    @media (hover: hover) {
        &:hover {
            background: #f0f0f0;
        }
    }

    .payment-item-content {
        display: flex;
        flex-direction: column;
        width: 100%;

        .payment-item-content-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            width: 100%;
        }

        h3 {
            font-weight: 400;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }

        p {
            font-size: 0.9rem;
            color: #666;
        }
    }

    ${MEDIA_QUERIES.isMobile} {
        padding: 8px 0;
    }
`;

export const PaymentForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;

export const EventStatItem = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

export const PaymentAvatars = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    width: 70px;

    & .avatar {
        outline: 2px solid #fff;
    }

    & .avatar:nth-child(2) {
        transform: translateX(-16px);
        z-index: 0;
    }
`;

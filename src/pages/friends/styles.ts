import styled from 'styled-components';

export const FriendsGrid = styled.div`
    --columns: 9;
    display: grid;
    grid-template-columns: repeat(var(--columns), 1fr);
    gap: 20px;
    width: 100%;

    @media (max-width: 1400px) {
        --columns: 7;
    }

    @media (max-width: 1200px) {
        --columns: 6;
    }

    @media (max-width: 1050px) {
        --columns: 5;
    }

    @media (max-width: 900px) {
        --columns: 4;
    }

    @media (max-width: 768px) {
        --columns: 3;
    }
`;

export const FriendItemStyled = styled.div`
    width: 100%;
    min-width: 0;
    height: 150px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    align-items: center;
    padding: 8px;
    padding-top: 12px;
    box-sizing: border-box;
    transition: 0.2s transform;
    border-radius: 10px;
    cursor: pointer;
    position: relative;

    &.s {
        height: 100px;
    }

    &.selected {
        background: #537cff17;
    }

    .icon-selected {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 20px;
        height: 20px;
        color: #1d76e7;
        background: #fff;
        outline: 1px solid #fff;
        border-radius: 20px;
    }

    @media (hover: hover) {
        &:hover {
            transform: scale(0.98);
            background: #f0f0f0;

            .icon-selected {
                outline: 1px solid #f0f0f0;
            }
        }
    }

    &:active {
        transform: scale(0.95);
    }

    h3 {
        font-weight: 300;
        font-size: 1.1rem;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        overflow: hidden;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        text-align: center;
        width: 100%;
        min-width: 0;
        word-break: break-word;
        height: 46px;
        user-select: none;
    }
`;

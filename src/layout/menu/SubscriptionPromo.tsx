import { IconStarFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { Button } from '../../shared/components/button';
import { PlusBadge } from '../../shared/components/plus';
import { SubscriptionPromoStyled, StarIcon } from './styles';
import { $user } from '../../entities/user/model/init';
import { useUnit } from 'effector-react';
import { ESubscriptionType } from '../../entities/user/model/types';

interface StarPosition {
    top: number;
    left: number;
    size: number;
    opacity: number;
    delay: number;
}

// Предопределенные позиции звезд, которые выглядят случайно
const STARS: StarPosition[] = [
    { top: 8, left: 15, size: 12, opacity: 0.6, delay: 0 },
    { top: 5, left: 35, size: 18, opacity: 0.4, delay: 0.1 },
    { top: 12, left: 55, size: 10, opacity: 0.5, delay: 0.2 },
    { top: 3, left: 72, size: 15, opacity: 0.3, delay: 0.15 },
    { top: 18, left: 25, size: 14, opacity: 0.45, delay: 0.25 },
    { top: 22, left: 48, size: 11, opacity: 0.55, delay: 0.3 },
    { top: 6, left: 85, size: 16, opacity: 0.35, delay: 0.2 },
    { top: 15, left: 68, size: 9, opacity: 0.5, delay: 0.35 },
    { top: 12, left: 6, size: 9, opacity: 0.2, delay: 0.1 },
];

// Массив промо надписей
const PROMO_TEXTS = [
    'Разблокируйте сканирование чеков',
    'Неограничееное количество платежей с подпиской',
    'Статистика трат с подпиской',
];

const getRandomPromoText = (): string => {
    return PROMO_TEXTS[Math.floor(Math.random() * PROMO_TEXTS.length)];
};

export const SubscriptionPromo = () => {
    const [promoText] = useState(() => getRandomPromoText());
    const user = useUnit($user);

    if (user?.subscription.type !== ESubscriptionType.FREE) return null;

    return (
        <SubscriptionPromoStyled>
            <PlusBadge />
            <div className="icons">
                {STARS.map((star, index) => (
                    <StarIcon
                        key={index}
                        $top={star.top}
                        $left={star.left}
                        $size={star.size}
                        $opacity={star.opacity}
                        $delay={star.delay}
                    >
                        <IconStarFilled />
                    </StarIcon>
                ))}
            </div>
            <p>{promoText}</p>
            <Button className="rounded primary full">Обновить</Button>
        </SubscriptionPromoStyled>
    );
};

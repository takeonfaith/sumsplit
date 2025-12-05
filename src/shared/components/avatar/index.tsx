import { cn } from '../../lib/classname';
import { PlusBadge } from '../plus';
import { AvatarStyled } from './styles';

type Props = {
    src: string;
    name: string;
    size: TSize;
    icon?: React.ReactNode;
    plus?: boolean;
    children?: React.ReactNode;
};

const getAbbr = (name: string) => {
    return name
        .split(' ')
        .slice(0, 2)
        .map((word) => word[0])
        .join('');
};

export const Avatar = ({ src, name, size, icon, children, plus }: Props) => {
    const abbr = getAbbr(name);
    return (
        <AvatarStyled className={cn('avatar', { plus }, { [size]: size })}>
            <div className="background"></div>
            {!!src && <img src={src} alt={name} />}
            {!icon && <span>{abbr}</span>}
            {icon && <div className="icon">{icon}</div>}
            {children && <div className="children">{children}</div>}
        </AvatarStyled>
    );
};

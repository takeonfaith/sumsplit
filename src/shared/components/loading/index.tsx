import { IconLoader2 } from '@tabler/icons-react';
import { LoadingStyled } from './styles';

export const Loading = () => {
    return (
        <LoadingStyled className="loading">
            <IconLoader2 />
        </LoadingStyled>
    );
};

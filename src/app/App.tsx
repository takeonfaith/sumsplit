import { ToastProvider } from '../shared/components/toast';
import { Router } from './routes/Router';

export const App = () => {
    return (
        <ToastProvider>
            <Router />
        </ToastProvider>
    );
};

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { FriendsPage } from './pages/friends';
import { HomePage } from './pages/home';
import { SpecificEventPage } from './pages/event';
import { EventsPage } from './pages/events';

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="" element={<HomePage />} />
                    <Route path="events" element={<EventsPage />} />
                    <Route
                        path="events/:id"
                        element={<SpecificEventPage />}
                    />
                    <Route path="friends" element={<FriendsPage />} />
                    <Route path="*" element={<>404</>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

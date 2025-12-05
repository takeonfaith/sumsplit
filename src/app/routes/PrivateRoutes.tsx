import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { routes } from '.';
import { Layout } from '../../layout/Layout';
import { renderRoutes } from './lib/renderRoutes';

export const PrivateRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {renderRoutes(routes)}
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
};

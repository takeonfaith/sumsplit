import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { publicRoutes } from '.';
import { renderRoutes } from './lib/renderRoutes';

export const PublicRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {renderRoutes(publicRoutes)}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

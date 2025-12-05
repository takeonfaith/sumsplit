import React, { Suspense } from 'react';
import { Route } from 'react-router-dom';
import type { TRoute } from '../types';

export const renderRoutes = (routes: TRoute[]): React.ReactNode => {
    return routes.map((route) => (
        <Route
            key={route.url}
            path={route.url}
            element={
                <Suspense
                    fallback={route.loadingComponent ?? <div>Loading...</div>}
                >
                    {route.component}
                </Suspense>
            }
        >
            {route.children.length > 0 && renderRoutes(route.children)}
        </Route>
    ));
};

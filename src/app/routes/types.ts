import React from 'react';

export type TRoute = {
    url: string;
    name: string;
    component: React.ReactNode;
    loadingComponent?: React.ReactNode;
    icon: React.ReactNode;
    children: TRoute[];
};


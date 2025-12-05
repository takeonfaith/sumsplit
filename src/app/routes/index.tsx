import {
    IconChartPie,
    IconFolders,
    IconFriends,
    IconHome,
    IconLogin,
    IconStar,
    IconUserCircle,
} from '@tabler/icons-react';
import { SpecificEventPage } from '../../pages/event';
import { EventsPage } from '../../pages/events';
import { FriendsPage } from '../../pages/friends';
import { HomePage } from '../../pages/home';
import { ProfilePage } from '../../pages/profile';
import { StatisticsPage } from '../../pages/statistics';
import type { TRoute } from './types';
import { LoginPage } from '../../pages/login';

export const publicRoutes: TRoute[] = [
    {
        url: '/login',
        name: 'Логин',
        component: <LoginPage />,
        icon: <IconLogin />,
        children: [],
    },
];

export const routes: TRoute[] = [
    {
        url: '',
        name: 'Главная',
        component: <HomePage />,
        icon: <IconHome />,
        children: [],
    },
    {
        url: 'events',
        name: 'События',
        component: <EventsPage />,
        icon: <IconStar />,
        children: [],
    },
    {
        url: 'events/:id',
        name: 'Событие',
        component: <SpecificEventPage />,
        icon: <IconFolders />,
        children: [],
    },
    {
        url: 'friends',
        name: 'Друзья',
        component: <FriendsPage />,
        icon: <IconFriends />,
        children: [],
    },
    {
        url: 'profile',
        name: 'Профиль',
        component: <ProfilePage />,
        icon: <IconUserCircle />,
        children: [],
    },
    {
        url: 'statistics',
        name: 'Статистика',
        component: <StatisticsPage />,
        icon: <IconChartPie />,
        children: [],
    },
];

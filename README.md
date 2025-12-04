# SumSplit

Приложение для учета общих трат между друзьями. Идеально подходит для путешествий и совместных поездок.

## Технологии

- React + TypeScript
- Styled-Components
- React Router
- Shadcn UI (кастомные компоненты)
- Firebase (Authentication + Firestore)
- ExchangeRate-API для курсов валют

## Функционал

- ✅ Регистрация и вход (по nickname и паролю)
- ✅ Создание событий (путешествий)
- ✅ Управление участниками (локальные и приглашенные)
- ✅ Добавление трат с множественными позициями
- ✅ Распределение трат между участниками (равномерно или по процентам)
- ✅ Автоматический расчет долгов
- ✅ Поддержка множественных валют с автоматической конвертацией
- ✅ Адаптивный дизайн

## Установка

1. Клонируйте репозиторий
2. Установите зависимости:
```bash
npm install
```

3. Создайте файл `.env` на основе `.env.example` и заполните данные Firebase:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Запустите dev сервер:
```bash
npm run dev
```

## Настройка Firebase

1. Создайте проект в Firebase Console
2. Включите Authentication (Email/Password)
3. Создайте Firestore базу данных
4. Настройте правила безопасности Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /events/{eventId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        (request.resource.data.ownerId == request.auth.uid || 
         resource.data.ownerId == request.auth.uid);
    }
    match /eventParticipants/{participantId} {
      allow read, write: if request.auth != null;
    }
    match /expenses/{expenseId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Деплой на GitHub Pages

1. Настройте GitHub Actions secrets с переменными Firebase
2. Push в ветку `main` автоматически запустит деплой
3. Или используйте `npm run deploy` для ручного деплоя

## Структура проекта

```
src/
├── components/
│   ├── ui/          # UI компоненты (Button, Input, Card, etc.)
│   ├── auth/        # Компоненты аутентификации
│   ├── events/      # Компоненты событий
│   ├── expenses/    # Компоненты трат
│   ├── participants/# Компоненты участников
│   └── layout/      # Layout компоненты
├── pages/           # Страницы приложения
├── services/        # Сервисы для работы с Firebase и API
├── hooks/           # React хуки
├── utils/           # Утилиты (расчет долгов, конвертация валют)
└── types/           # TypeScript типы
```

## Лицензия

MIT

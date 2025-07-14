# Неиспользуемые компоненты

Следующие компоненты не используются в App.tsx и могут быть удалены или переименованы:

## Компоненты, которые НЕ используются:

1. **Bot.tsx** - компонент бота, не импортируется нигде
2. **Bots.tsx** - компонент списка ботов, не импортируется нигде  
3. **chart-area-interactive.tsx** - интерактивная диаграмма, не импортируется нигде
4. **data-table.tsx** - таблица данных, не импортируется нигде
5. **nav-documents.tsx** - навигация документов, не импортируется нигде
6. **section-cards.tsx** - секция карточек, не импортируется нигде

## Компоненты, которые используются:

1. **app-sidebar.tsx** - используется в страницах
2. **site-header.tsx** - используется в страницах
3. **nav-main.tsx** - используется в app-sidebar.tsx
4. **nav-secondary.tsx** - используется в app-sidebar.tsx
5. **nav-user.tsx** - используется в app-sidebar.tsx
6. **nav-guest.tsx** - используется в app-sidebar.tsx
7. **RegLog.tsx** - используется в страницах
8. **DashBoard.tsx** - используется в MainPage.tsx
9. **CategoryFilter.tsx** - используется в DashBoard.tsx
10. **Chat.tsx** - используется в ChatPage.tsx
11. **BotInfo.tsx** - используется в ChatPage.tsx
12. **ChatsList.tsx** - используется в ChatPage.tsx
13. **СhatsSet.tsx** - используется в ChatPage.tsx
14. **CreateBotI.tsx** - используется в CreateBotPage.tsx
15. **CreatePersonaI.tsx** - используется в CreatePersonaPage.tsx
16. **Help.tsx** - используется в HelpPage.tsx
17. **UserInfo.tsx** - используется в UserPage.tsx
18. **UserPersonasInfo.tsx** - используется в UserPersonasPage.tsx
19. **UserViewInfo.tsx** - используется в UserViewPage.tsx
20. **UserBotsList.tsx** - используется в UserBotsPage.tsx

## Рекомендации:

1. Переименовать неиспользуемые компоненты с префиксом "UNUSED_"
2. Рассмотреть возможность удаления неиспользуемых компонентов
3. Проверить, нужны ли неиспользуемые компоненты для будущего функционала 
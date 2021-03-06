# GameManager (Web Edition)
GMS (Game Management System, Game Manager) – информационная система, предлагающая пользователю взаимодействие с игрой `X`* через интернет приложение. Программа как повторяет некоторые функции из самой игры, так и добавляет несколько новых.

![Demo Image](https://i.imgur.com/cZ5unu7.png)

*Воображаемая многопользовательская ролевая компьютерная игра (MMORPG).

## Содержание
- [Пользовательские роли](#person_red_hair-пользовательские-роли).
- [Регистрация в системе](#desktop_computer-регистрация-в-системе).
- [Авторизация в системе](#white_check_mark-авторизация-в-системе).
- [Создание нового персонажа](#space_invader-создание-нового-персонажа).
- [Вывод информации о персонажах](#information_source-вывод-информации-о-персонажах).
- [Удаление персонажа](#firecracker-удаление-персонажа).
- [Просмотр информации об игре](#monocle_face-просмотр-информации-об-игре).
- [Покупка предметов в магазине](#shopping_cart-покупка-предметов-в-магазине).
- [Блокировка и снятие блокировки с персонажей игроков](#no_entry-блокировка-и-снятие-блокировки-с-персонажей-игроков).
- [Формирование отчетов и выгрузка в Excel](#page_facing_up-формирование-отчетов-и-выгрузка-в-excel).
- [Изменение личных данных аккаунта](#pencil2-изменение-личных-данных-аккаунта).
- [Выход из системы](#door-выход-из-системы).

## :person_red_hair: Пользовательские роли
Пользователи системы делятся на две категории: `игроки` и `администраторы`. В зависимости от роли категории пользователя открываются окна с разными функциональными возможностями. Полный перечень возможностей:

### Игрок:
- добавлять, удалять игровых персонажей и выводить их статистику;
- просматривать информацию о внутриигровом мире (напр. локации, существа, предметы);
- покупать предметы в магазине и просматривать инвентарь своих персонажей.

### Администратор:
- просматривать полный список игроков и их персонажей;
- блокировать и снимать блокировку с игровых персонажей (блокируются именно __персонажи__, а не игроки);
- формировать статистические отчеты по игрокам и их персонажам;
- выгружать сформированные отчеты в Microsoft Excel.

Также все пользователи имеют возможность поменять свои личные данные в _Настройках аккаунта_.

## :desktop_computer: Регистрация в системе
#### Категории пользователей: `игрок`
Если у вас нет игрового аккаунта, вы можете создать его через систему __GMS__. Для этого выполните следующие действия:
1. Откройте Game Manager.
2. На стартовой странице нажмите кнопку _Регистрация_ в правом нижнем углу. Подождите открытия окна создания нового аккаунта.
3. В соответствующих полях введите свои личные данные, используя допустимые значения. В случае неправильного ввода данных вы увидите сообщение об ошибке.
4. После ввода данных повторно нажмите на кнопку _Регистрация_.
5. Ваш аккаунт создан.

![reg](https://user-images.githubusercontent.com/59533126/130831679-e76476ae-6a85-4040-914b-d5d68a55f9ba.gif)

Теперь вы можете перейти к следующему шагу - __[авторизации в системе](#white_check_mark-авторизация-в-системе)__.

## :white_check_mark: Авторизация в системе
#### Категории пользователей: `игрок`, `администратор`
Если у вас нет игрового аккаунта, вы можете создать его через систему __GMS__. Для этого выполните следующие действия:
1. Откройте Game Manager.
2. На стартовой странице приложения введите ваш __логин__ и __пароль__ в соответствующие поля.
4. Нажмите кнопку _Войти_. Если вы ввели верные данные, авторизация будет выполнена успешно.
> Чтобы не вводить пароль при каждом входе в приложение, установите флажок в поле _Запомнить пароль_.

![login](https://user-images.githubusercontent.com/59533126/130832088-986f82c3-b0a9-442e-a0f9-b0e18d1b20d2.gif)

## :space_invader: Создание нового персонажа
#### Категории пользователей: `игрок`
Если у вас еще нет игровых персонажей или вы хотите создать нового, то выполните следующие действия:
1. Перейдите в раздел _Мои персонажи_ и нажмите на кнопку _Создать персонажа_.
2. В появившемся списке выберите понравившегося героя и нажмите на него.
3. Откроется окно с описанием выбранного героя. Внизу экрана введите желаемое имя нового персонажа и подтвердите свой выбор, нажав на соответствующую кнопку.
4. Новый персонаж появится в списке слева.

![char_creation](https://user-images.githubusercontent.com/59533126/130832341-f98ecb9f-50f6-47ea-814f-7eb9864cbf65.gif)

## :information_source: Вывод информации о персонажах
#### Категории пользователей: `игрок`
Если вы хотите посмотреть подробную статистику о своем игровом персонаже, выполните следующие действия:
1. Перейдите в раздел _Мои персонажи_.
2. В списке слева нажмите на карточку нужного персонажа. В основном части экрана отобразится следующая информация:
   - статус
   - герой
   - локация
   - уровень
   - класс
   - количество часов в игре
   - очки рейтинга
   - баланс (валюта - __золото__)
3. Чтобы просмотреть инвентарь персонажа, нажмите на значок мешочка в правом нижнем углу.

![char_info](https://user-images.githubusercontent.com/59533126/130838413-e2aa637d-42e9-45cb-a7ed-f1f689cbfc5f.gif)

## :firecracker: Удаление персонажа
#### Категории пользователей: `игрок`
Чтобы полностью удалить выбранного персонажа, выполните следующие действия:
1. Перейдите в раздел _Мои персонажи_.
2. В списке слева нажмите на карточку нужного персонажа.
3. В правом нижнем углу основной части страницы нажмите _Удалить персонажа_.
4. Подтвердите удаление.
5. Персонаж полностью удален из игры.

![char_removal](https://user-images.githubusercontent.com/59533126/130838556-0c364666-1b17-4776-ad6f-9dca97384775.gif)

## :monocle_face: Просмотр информации об игре
#### Категории пользователей: `игрок`
Вы можете прочитать описание следующих внутриигровых разделов:
- существа
- локации
- предметы
- герои.

Для этого:
1. Перейдите на вкладку _Игра_ и в списке выберите нужный элемент.
2. В основной части страницы появится информация об игровом элементе.

![game_info](https://user-images.githubusercontent.com/59533126/130838703-8bdb01dd-6aea-4ac5-841b-5ab63af92e25.gif)

## :shopping_cart: Покупка предметов в магазине
#### Категории пользователей: `игрок`
Чтобы купить предмет в магазине, выполните следующие действия:
1. Перейдите в раздел _Мои персонажи_.
2. В списке слева выберите персонажа, которым хотите совершить покупку.
3. Перейдите на вкладку _Магазин_ и выберите интересующую вас категорию предметов:
   - оружие
   - броня
   - артефакты
   - магия
   - расходумое
   - поддержка.
4. Нажмите на выбранный товар.
5. Укажите приобретаемое количество и подтвердите покупку с помощью кнопки _Купить_.
6. В случае достаточного баланса, покупка будет совершена. Предмет появится в инвентаре персонажа.

![shopping](https://user-images.githubusercontent.com/59533126/130838899-344f8837-a306-49b3-934c-c4a947887326.gif)

## :no_entry: Блокировка и снятие блокировки с персонажей игроков
#### Категории пользователей: `администратор`
Вы можете следить за порядком в игре, блокируя и снимая блокировку с игровых персонажей игроков. 

Для блокировки выполните следующие действия:
1. Перейдите в раздел _Игроки_.
2. Выберите интересующего вас игрока и нажмите правой кнопкой мыши на нужного персонажа.
3. Во всплывающем окне выберите _Заблокировать_.
4. Укажите причину блокировки и подтвердите действие.
5. Персонаж заблокирован. Игрок, владеющий этим персонажем больше __не сможет__ играть за него.

![char_ban](https://user-images.githubusercontent.com/59533126/130839133-b9ab90ee-217e-49a4-a196-13e692c1ecd1.gif)

Для снятия блокировки выполните следующие действия:
1. Перейдите в раздел _Игроки_.
2. Выберите интересующего вас игрока и нажмите правой кнопкой мыши на нужного персонажа.
3. Во всплывающем окне выберите _Разблокировать_.
4. Подтвердите действие
5. Персонаж успешно разблокирован.

![char_unban](https://user-images.githubusercontent.com/59533126/130839281-c5b64f93-8cfa-4bcb-a4db-b90f2d916693.gif)

## :page_facing_up: Формирование отчетов и выгрузка в Excel
#### Категории пользователей: `администратор`
Чтобы собирать статистику по игрокам и их персонажам, выполните следующие действия:
1. Перейдите в раздел _Отчеты_.
2. Выберите интересующий вас запрос из списка слева.
3. Если вам необходимо экспортировать данные в виде таблицы Excel, то нажмите на соответствующую кнопку в нижней части экрана.
4. Дождитесь окончания загрузки.
5. Чтобы ознакомиться с данными статистики, откройте сохраненный файл.

![reports_excel](https://user-images.githubusercontent.com/59533126/130839675-f4d425aa-9ce3-480a-b7cc-17e72de16e3f.gif)

## :pencil2: Изменение личных данных аккаунта
#### Категории пользователей: `игрок`, `администратор`
Чтобы изменить личные данные аккаунта, указанные при регистрации, выполните следующие действия:
1. Нажмите на значок аккаунта в правом верхнем углу и перейдите на вкладку _Изменить личные данные_.
2. Отредактируйте поля, используя доступные значения и нажмите на кнопку _Сохранить изменения_.
3. Для подтверждения изменений введите __текущий пароль__ и нажмите на соответствующую кнопку.
4. В случае ввода правильного пароля ваши данные будут изменены.
> Вы не можете изменить свой логин.

![account_info](https://user-images.githubusercontent.com/59533126/130840016-13118255-1849-41bf-a13d-8646acaeb9e9.gif)

## :door: Выход из системы
#### Категории пользователей: `игрок`, `администратор`
Чтобы выйти из панели управления на окно авторизации, выполните следующие действия:
1. Нажмите на значок аккаунта в правом верхнем углу и нажмите на кнопку _Выйти из аккаунта_.
2. Подтвердите выход нажатием на кнопку _Да_.

![logout](https://user-images.githubusercontent.com/59533126/130840287-01d216f6-1046-4768-8637-38ba04d395b3.gif)

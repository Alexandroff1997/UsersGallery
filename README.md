# Welcome to UsersGallery!
Это приложение является тестовым заданием. Написано на NestJS, PostgreSQL с использованием Docker.
Данные для конфигурации лежат в файле `.env`

### Запуск приложения осуществляется командой 
	`docker-compose up --build`

## Пример использования приложения
#### Необходимо создать роли USER и ADMIN
- POST запрос на `http://localhost:4000/roles/create`
в body
`{
    "value": "ADMIN",
    "description": "ADMIN"
}`
`{
	  "value": "USER",
    "description": "USER"
}`

#### Получение роли из базы
- GET запрос на `http://localhost:4000/roles/:value`
Example: `http://localhost:4000/roles/ADMIN`

#### Регистрация пользователей 
- POST запрос на `http://localhost:4000/auth/register` и указать в body следующие поля на основе примеров
`{
	"email": "admin@admin.com",
	"password": "password",
	"role": "ADMIN"
}`
`{
	"email": "user@user.com",
	"password": "password",
	"role": "USER"
}`

#### Авторизация пользователей
- POST запрос `http://localhost:4000/auth/login`
в body указать данные юзера на основе примера
`{
	"email": "user@user.com",
	"password": "password"
}`
в ответе мы получим токен для подтверждения авторизации, с помощью которого мы можем доказать, что мы администратор, если зашли в соответствующий аккаунт.

У пользователя с ролью ADMIN будет доступ
- добавление роли для юзера 
- получение полного списка юзеров 
- получение конкретного юзера
- удаление всех картинок из базы и из локального хранилища

Чтобы подтвердить свой статус админа, при запросах в графе Authorization выбрать Bearer Token и указать туда токен, который получили при авторизации в аккаунте администратора
#### Список команд администратора
- Получение списка всех юзеров. GET запрос `http://localhost:4000/users`
- Получение конкретного юзера. GET запрос `http://localhost:4000/users/:id`
- Добавление роли для юзера.  POST запрос `http://localhost:4000/users/role` в body `{ "value": "ADMIN", "userId": "${id юзера}"`
- Удаление всех картинок. DELETE запрос на `http://localhost:4000/gallery/delete-all-images'`

### Работа с галлереей CRUD
- Загрузка картинки в галерею `POST`
POST запрос на `http://localhost:4000/gallery`
в body указать userId и загрузить саму картинку. Для удобства можно воспользоваться разделом form-data в postman. Так же картинки для работы есть в папке images в корне проекта
`{
	userId: 10,
	image: image.jpg
}`
- Получение всего списка картинок `GET`
GET запрос на `http://localhost:4000/gallery`
В ответе будет указана вся дата о картинке, включая то, кому она принадлежит
Так же у самого юзера при запросе указан список картинок в массиве gallery.
Все загруженные картинки сохраняются в static в папке dist.
Мы можем проверить наши картинки с помощью браузера, нужно зайти на `http://localhost:4000/${image-name.jpg}`
Example - `http://localhost:4000/65686513-60da-4c80-bf47-711321db1715.jpg`
- Удаление картинки у пользователя `DELETE`
DELETE запрос на `http://localhost:4000/gallery`
в body указать
`{
	"imageName": "c790e14a-ca83-4b69-b594-9c6c9b17b692.jpg",
    "userId": 13
}`
Будет выполнено удаление из локальной папки static и из базы данных
- Изменение картинки у конкретного пользователя `PUT`
PUT запрос на  `http://localhost:4000/gallery`
в body указать 
`{ "image": "image.jpg", imageId: 13 }`
в imageId указать id картинки в базе данных. Заменится картинка в базе данных и в папке static.
-   Удаление всех картинок. DELETE запрос на  `http://localhost:4000/gallery/delete-all-images'`. Только для администратора.

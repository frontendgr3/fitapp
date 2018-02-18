# fitapp
Kalendarz fitness - wspólne projekty grupa 3
Live: https://fitcalendar.herokuapp.com/

## Dokumentacja API

**POST  /api/auth/register**  - rejestruje nowego użytkownika i dodaje go do bazy 

#### Request
```
{
    "username": "nazwa_uzytkownika",
    "password": "haslo",
    "provider": "local"
}
```

**POST /api/auth/login** - loguje użytkownika, w odpowiedzi zwracany jest token. JSON przesyłany do api powinien wyglądać tak jak poniżej:

#### Request
```
{
    "username": "user",
    "password": "123456"
}
```

**GET /api/activities** - zwraca wszystkie aktywności użytkownika. Wymagany header Authorization: token

**POST /api/activity** - dodaje nową aktywność. Wymagany header Authorization: token
#### Request
```
{
    "name": "Interwały",
    "type": "Bieganie",
    "time": 30,
    "date": 1514383106000
}
```

**GET /api/activity** - zwraca szczególy danej aktywności. Wymagany header Authorization: token
#### Request
```
{
    "id": "id_aktywności"
}
```

**DELETE /api/activity** - usuwa daną aktywność. Wymagany header Authorization: token
#### Request
```
{
    "id": "id_aktywności"
}
```
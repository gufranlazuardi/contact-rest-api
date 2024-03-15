# Contact API

## Create Contact

Endpoint : POST /api/contacts

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "first_name": "Gufran",
  "last_name": "Lazuardi",
  "email": "gufranlazuardi@gmail.com",
  "phone": "12345678990"
}
```

Response Body (sucdess) :

```json
{
  "data": {
    "id": 1,
    "first_name": "Gufran",
    "last_name": "Lazuardi",
    "email": "gufranlazuardi@gmail.com",
    "phone": "123456789"
  }
}
```

Response Body (failed) :

```json
{
  "errors": "first_name must not blank"
}
```

## Get Contact

Endpoint : PUT /api/contacts/:id

Request Header :

- X-API-TOKEN : token

Response Body (sucdess) :

```json
{
  "data": {
    "id": 1,
    "first_name": "Gufran",
    "last_name": "Lazuardi",
    "email": "gufranlazuardi@gmail.com",
    "phone": "123456789"
  }
}
```

Response Body (failed) :

```json
{
  "errors": "Contact is not found"
}
```

## Update Contact

Endpoint : POST /api/contacts

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "first_name": "Gufran",
  "last_name": "Lazuardi",
  "email": "gufranlazuardi@gmail.com",
  "phone": "12345678990"
}
```

Response Body (sucdess) :

```json
{
  "data": {
    "id": 1,
    "first_name": "Gufran",
    "last_name": "Lazuardi",
    "email": "gufranlazuardi@gmail.com",
    "phone": "123456789"
  }
}
```

Response Body (failed) :

```json
{
  "errors": "first_name must not blank"
}
```

## Remove Contact

Endpoint : DELETE /api/contacts/:id

Request Header :

- X-API-TOKEN : token

Response Body (success) :

```json
{
  "data": "Contact deleted"
}
```

Response Body (failed) :

```json
{
  "errors": "Contact is not found"
}
```

## Search Contact

Endpoint : GET /api/contacts

Query Parameter :

- name : string, contact first name or contact last name, optional
- phone : string, contact phone, optional
- email : string, contact email, optional
- page : number, default 1
- size : number, default 10

Response Body (success) :

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "Gufran",
      "last_name": "Lazuardi",
      "email": "gufranlazuardi@gmail.com",
      "phone": "123456789"
    },
    {
      "id": 2,
      "first_name": "Gufran",
      "last_name": "Lazuardi",
      "email": "gufranlazuardi@gmail.com",
      "phone": "123456789"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```

Response Body (failed) :

```json
{
  "errors": "Unauthorized"
}
```

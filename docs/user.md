# User API Spec

## Register User

Endpoint : POST api/users

Request Body :

```json
{
  "username": "gufranlazuardi",
  "password": "test123",
  "name": "Gufran Lazuardi"
}
```

Response Body (success):

```json
{
  "username": "gufranlazuardi",
  "name": "Gufran Lazuardi"
}
```

Response Body (failed) :

```json
{
  "errors": "username must not blank"
}
```

## Login User

Endpoint : POST api/users/login

Request Body :

```json
{
  "username": "gufranlazuardi",
  "password": "test123"
}
```

Response Body (success):

```json
{
  "username": "gufranlazuardi",
  "name": "Gufran Lazuardi",
  "token": "uuid"
}
```

Response Body (failed) :

```json
{
  "errors": "username or password wrong"
}
```

## Get User

Endpoint : GET api/users/current

Request Header :

- X-API-TOKEN : token

Response Body (success):

```json
{
  "username": "gufranlazuardi",
  "name": "Gufran Lazuardi",
  "token": "uuid"
}
```

Response Body (failed) :

```json
{
  "errors": "Unauthorized"
}
```

## Update User

Endpoint : PATCH api/users/current

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "username": "gufranlazuardi", // tidak wajib
  "password": "test123" // tidak wajib
}
```

Response Body (success):

```json
{
  "username": "gufranlazuardi",
  "name": "Gufran Lazuardi",
  "token": "uuid"
}
```

Response Body (failed) :

```json
{
  "errors": "Unauthorized"
}
```

## Logout User

Endpoint : DELETE api/users/current

Request Header :

- X-API-TOKEN : token

Response Body (success):

```json
{
  "data": "OK"
}
```

Response Body (failed) :

```json
{
  "errors": "Unauthorized"
}
```

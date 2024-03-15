# Address API Spec

## Create Address

Endpoint : POST /api/contacts/:idContact/addresses

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "street": "Jalan",
  "city": "Kota",
  "province": "Provinsi",
  "Country": "Negara",
  "postal_code": "12313"
}
```

Response Body (success) :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan",
    "city": "Kota",
    "province": "Provinsi",
    "Country": "Negara",
    "postal_code": "12313"
  }
}
```

Response Body (failed) :

```json
{
  "errors": "postal_code is required"
}
```

## Get Address

Endpoint : GET /api/contacts/:idContact/addresses/:idAddresses

Request Header :

- X-API-TOKEN : token

Response Body (success) :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan",
    "city": "Kota",
    "province": "Provinsi",
    "Country": "Negara",
    "postal_code": "12313"
  }
}
```

Response Body (failed) :

```json
{
  "errors": "Address is not found"
}
```

## Update Address

Endpoint : PUT /api/contacts/:idContact/addresses/:idAddresses

Request Header :

- X-API-TOKEN : token

Response Body (success) :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan",
    "city": "Kota",
    "province": "Provinsi",
    "Country": "Negara",
    "postal_code": "12313"
  }
}
```

Response Body (failed) :

```json
{
  "errors": "postal_code is required"
}
```

## Remove Address

Endpoint : DELETE /api/contacts/:idContact/addresses/:idAddresses

Request Header :

- X-API-TOKEN : token

Response Body (success) :

```json
{
  "data": "Success remove address"
}
```

Response Body (failed) :

```json
{
  "errors": "address is not found"
}
```

## List Address

Endpoint : GET /api/contacts/:idContact/addresses

Request Header :

- X-API-TOKEN : token

Response Body (success) :

```json
{
  "data": [
    {
      "id": 1,
      "street": "Jalan",
      "city": "Kota",
      "province": "Provinsi",
      "Country": "Negara",
      "postal_code": "12313"
    },
    {
      "id": 2,
      "street": "Jalan",
      "city": "Kota",
      "province": "Provinsi",
      "Country": "Negara",
      "postal_code": "12313"
    }
  ]
}
```

Response Body (failed) :

```json
{
  "errors": "Contact is not found"
}
```

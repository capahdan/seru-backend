
# SERU Testing Backend Developer

Challenge ini bertujuan untuk membuat Restful API menggunakan Java, .NET, atau NodeJS ,Untuk Itu saya membuat Vechicle API ini menggunakan NodeJS.

API ini adalah implementasi dari basic Vehicle API.

- Implementasi autentikasi, untuk mengakses API diperlukan token dari hasil login. 
- Autentikasi menggunakan JWT(JSON web Tokens) Tokens.
- User non admin hanya bisa melihat data (read only).
- User Admin isa melakukan operasi Create, Read,Update dan Delete secara penuh 
- Untuk GET data mengimplementasi pagination (total,limit,skip)
- Implementasi filter untuk Tiap Entity sesuai kolom yang tersedia, menggunakan query params
- API ini menggunakan PostgreSQL sebagai database.
- Servis - aplikasi dan database (PostgreSQL) di kontanerisasi menggunakan Docker.



## ERD:
 ![seru_backend_test_erd](https://user-images.githubusercontent.com/90734992/243256683-cd7b7c31-42b7-4ab0-ac1e-220139c4e893.jpeg)


 ## Directory Structure

saya menggunakan Konsep MVC yang tidak ada bagian Viewnya
```
/db                                            * ERD image and Postman Collection 
    |- ERD.jpeg
    |- SERU-Backend-Test.postman_collection.json  
/src
    /config                                    * contains db configuration & secret key for JWT 
        |- auth.config.js
        |- db.config.js
    /controller                                *contains all handler to handle request
        |- auth.controller.js
        |- price_list.controller.js
        |- user.controller.js
        |- vehicle_brands.controller.js
        |- vehicle_model.controller.js
        |- vehicle_types.controller.js
        |- vehicle_years.controller.js

    /helpers                                  *contains setup for connection to postgres
        |- db.js
    /middleware                               *contains middleware to check the request contains right token and validate he is admin
        |- authJwt.js
        |- index.js
        |- verifySignUp.js
    /models                                   *contains model of every entity to intteract with db
        |-index.js
        |-price_list.model.js
        |-user.model.js
        |-vehicle_brands.model.js
        |-vehicle_model.model.js
        |-vehicle_types.model.js
        |-vehicle_years.model.js
    /routes                                  *contains routes in API
        |-auth.routes.js
        |-price_list.routes.js
        |-user.routes.js
        |-vehicle_brands.routes.js
        |-vehicle_model.routes.js
        |-vehicle_years.routes.js
server.js                                *Entry point of the API
  
```


## API Reference


Basic implementasi

#### Register

```http
  POST /api/auth/signup

```

| Parameter | Type     | Header Type                |
| :-------- | :------- | :------------------------- |
| `username` | `string` |  **JSON** |
| `password` | `string` |  **JSON** |
| `email` | `string` |  **JSON** |
| `phone_number` | `integer` |  **JSON** |
| `is_admin` | `bool` |**JSON**|


```
Response Success:
{
    "message": "User was registered successfully!",
    "data": {
        "user": {
            "id": 1,
            "username": "daniel",
            "email": "daniel@gmail.com",
            "phone_number": 12323242,
            "password": "$2a$08$/NdJJy.CcOOzFPF1gYR2IeMMJZVbhIzMmeOIur3pRcoF1cPFebHq2",
            "is_admin": true,
            "updatedAt": "2023-06-05T05:46:55.020Z",
            "createdAt": "2023-06-05T05:46:55.020Z"
        }
    }
}
```

```
if dupplicate user:
{
    "message": "Failed! Username is already in use!"
}
```

#### Login


```http
  POST /api/auth/signin
```

| Parameter | Type     | Header Type                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **JSON** |
| `password` | `string` | **JSON** |


```
successfully;
{
    "message": "User Login successfully!",
    "data": {
        "id": 1,
        "username": "daniel",
        "email": "daniel@gmail.com",
        "phone_number": 12323242,
        "is_admin": true,
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg1OTQ0NDc3LCJleHAiOjE2ODYwMzA4Nzd9.eF6OYnn74-Vd0keROh7HSqQz-HHkRGt1m5IWufkcmeM"
    }
}
```

```
wrong password

{
    "message": "Invalid Password!",
    "accessToken": null
}

```

#### Vechicle Brand


```http
  POST /api/vehicle_brands
```
```
Without Tokens
{
    "message": "No token provided!"
}
```
```
User Non Admin

{
    "message": "Require Admin Role!"
}


| Parameter | Type     | Header Type                |
| :-------- | :------- | :--------|
| `name`    | `string` | **JSON** |
| `country` | `string` | **JSON** |


{
    "message": "VehicleBrand was Created successfully!",
    "data": {
        "vehicle_brands": {
            "id": 3,
            "name": "toyota",
            "country": "Japan",
            "updatedAt": "2023-06-05T06:07:53.350Z",
            "createdAt": "2023-06-05T06:07:53.350Z"
        }
    }
}


```
```
  GET /api/vehicle_brands
```
```
{
    "total": 3,
    "data": {
        "vehicle_brands": [
            {
                "id": 3,
                "name": "toyota",
                "country": "Japan",
                "createdAt": "2023-06-05T06:07:53.350Z",
                "updatedAt": "2023-06-05T06:07:53.350Z"
            },
            {
                "id": 1,
                "name": "ford",
                "country": "USA",
                "createdAt": "2023-06-05T06:05:49.270Z",
                "updatedAt": "2023-06-05T06:05:49.270Z"
            },
            {
                "id": 2,
                "name": "BMW",
                "country": "Japan",
                "createdAt": "2023-06-05T06:07:17.388Z",
                "updatedAt": "2023-06-05T06:07:17.388Z"
            }
        ]
    },
    "limit": 10,
    "skip": 0
}

```
```
With Query params
    GET /api/vehicle_brands?name=ford&country=usa
```

```
{
    "total": 1,
    "data": {
        "vehicle_brands": [
            {
                "id": 1,
                "name": "ford",
                "country": "USA",
                "createdAt": "2023-06-05T06:05:49.270Z",
                "updatedAt": "2023-06-05T06:05:49.270Z"
            }
        ]
    },
    "limit": 10,
    "skip": 0
}
```
```
GET /api/vehicle_brands/1
```
```
{
    "id": 2,
    "name": "BMW",
    "country": "Japan",
    "createdAt": "2023-06-05T06:07:17.388Z",
    "updatedAt": "2023-06-05T06:07:17.388Z"
}
```

```
PATCH /api/vehicle_brands/2
```
| Parameter | Type     | Header Type                |
| :-------- | :------- | :--------|
| `name`    | `string` | **JSON** |
| `country` | `string` | **JSON** |

```
{
    "message": "VehicleBrands was updated successfully."
}
```
```
DELETE /api/vehicle_brands/2
```
```
{
    "message": "VehicleBrands was deleted successfully!"
}
```



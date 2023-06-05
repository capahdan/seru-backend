
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



## Run Locally

if we have docker installed in our machine, we can run this API using docker-compose

```bash
  docker-compose up
```

or 
run locally setup the database in postgresql and configure the database name etc in **config/db.config.js and run the server

```bash
  npm install
  node server.js
```


## API Reference


Basic implementasi

#### Register

```http
  POST /api/auth/signup

```

| Payload | Type     | Header Type                |
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

| Payload | Type     | Header Type                |
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


| Payload | Type     | Header Type                |
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
```http
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

All the Get Request we can add query to filter to make pagination with 

| Parameter | Type     | Header Type                |
| :-------- | :------- | :--------|
| `page`    | `integer` | **JSON** |
| `size` | `integer` | **JSON** |

e.g 
```
GET /api/vehicle_brands?page=1&size=5
```

```
{
    "total": 2,
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
                "id": 2,
                "name": "B-M-W",
                "country": "Japan",
                "createdAt": "2023-06-05T06:07:17.388Z",
                "updatedAt": "2023-06-05T06:16:18.932Z"
            }
        ]
    },
    "limit": 5,
    "skip": 0
}
```


With Query params
```http
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
```http
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

```http
PATCH /api/vehicle_brands/2
```
| Payload | Type     | Header Type                |
| :-------- | :------- | :--------|
| `name`    | `string` | **JSON** |
| `country` | `string` | **JSON** |

```
{
    "message": "VehicleBrands was updated successfully."
}
```
``` http
DELETE /api/vehicle_brands/2
```
```
{
    "message": "VehicleBrands was deleted successfully!"
}
```

#### Vehicle Type

```http
  POST /api/vehicle_types
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

| Payload | Type     | Header Type                |
| :-------- | :------- | :--------|
| `name`    | `string` | **JSON** |
| `brand_id` | `integer` | **JSON** |

```
{
    "message": "VehicleType was Created successfully!",
    "data": {
        "vehicle_types": {
            "id": 2,
            "name": "suv",
            "brand_id": 2,
            "updatedAt": "2023-06-05T06:35:25.400Z",
            "createdAt": "2023-06-05T06:35:25.400Z"
        }
    }
}
```

```http
  GET /api/vehicle_types
```

```
{
    "total": 2,
    "data": {
        "vehicle_types": [
            {
                "id": 2,
                "name": "suv",
                "createdAt": "2023-06-05T06:35:25.400Z",
                "updatedAt": "2023-06-05T06:35:25.400Z",
                "brand_id": 2
            },
            {
                "id": 3,
                "name": "offroad",
                "createdAt": "2023-06-05T06:45:05.178Z",
                "updatedAt": "2023-06-05T06:45:05.178Z",
                "brand_id": 2
            }
        ]
    },
    "limit": 10,
    "skip": 0
}
```

```
Query params
http
  GET /api/vehicle_types?brand_id=2&name=suv
```

```
{
    "total": 1,
    "data": {
        "vehicle_types": [
            {
                "id": 2,
                "name": "suv",
                "createdAt": "2023-06-05T06:35:25.400Z",
                "updatedAt": "2023-06-05T06:35:25.400Z",
                "brand_id": 2
            }
        ]
    },
    "limit": 10,
    "skip": 0
}
```

```http
PATCH /api/vehicle_types/2
```
| Payload | Type     | Header Type                |
| :-------- | :------- | :--------|
| `name`    | `string` | **JSON** |
| `brand_id` | `integer` | **JSON** |

```
{
    "message": "VehicleTypes was updated successfully."
}
```
``` http
DELETE /api/vehicle_typess/2
```
```
{
    "message": "VehicleTypes was deleted successfully!"
}
```




#### Vehicle Model

```http
  POST /api/vehicle_models
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

| Payload | Type     | Header Type                |
| :-------- | :------- | :--------|
| `name`    | `string` | **JSON** |
| `type_id` | `integer` | **JSON** |

```
{
    "message": "VehicleModel was Created successfully!",
    "data": {
        "vehicle_models": {
            "id": 1,
            "name": "ojek",
            "type_id": 2,
            "updatedAt": "2023-06-05T06:51:22.608Z",
            "createdAt": "2023-06-05T06:51:22.608Z"
        }
    }
}
```

```http
  GET /api/vehicle_models
```

```
{
    "total": 2,
    "data": {
        "vehicle_models": [
            {
                "id": 1,
                "name": "ojek",
                "createdAt": "2023-06-05T06:51:22.608Z",
                "updatedAt": "2023-06-05T06:51:22.608Z",
                "type_id": 2
            },
            {
                "id": 2,
                "name": "Terbaru",
                "createdAt": "2023-06-05T06:51:43.580Z",
                "updatedAt": "2023-06-05T06:51:43.580Z",
                "type_id": 2
            }
        ]
    },
    "limit": 10,
    "skip": 0
}
```

```
Query params
http
  GET /api/vehicle_types?model=terbaru&type_id=2
```

```
{
    "total": 1,
    "data": {
        "vehicle_models": [
            {
                "id": 2,
                "name": "Terbaru",
                "createdAt": "2023-06-05T06:51:43.580Z",
                "updatedAt": "2023-06-05T06:51:43.580Z",
                "type_id": 2
            }
        ]
    },
    "limit": 10,
    "skip": 0
}
```

```http
PATCH /api/vehicle_models/2
```
| Payload | Type     | Header Type                |
| :-------- | :------- | :--------|
| `name`    | `string` | **JSON** |
| `type_id` | `integer` | **JSON** |

```
{
    "message": "VehicleModels was updated successfully."
}
```
``` http
DELETE /api/vehicle_models/2
```
```
{
    "message": "VehicleModels was deleted successfully!"
}
```




#### Vehicle Years

```http
  POST /api/vehicle_years
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

| Payload | Type     | Header Type                |
| :-------- | :------- | :--------|
| `year`    | `string` | **JSON** |

```
{
    "message": "VehicleYears was Created successfully!",
    "data": {
        "vehicle_year": {
            "id": 7,
            "year": "2010",
            "updatedAt": "2023-06-05T06:56:03.180Z",
            "createdAt": "2023-06-05T06:56:03.180Z"
        }
    }
}
```

```http
  GET /api/vehicle_years
```

```
{
    "total": 7,
    "data": {
        "vehicle_years": [
            {
                "id": 1,
                "year": "2020",
                "createdAt": "2023-06-05T06:54:34.715Z",
                "updatedAt": "2023-06-05T06:54:34.715Z"
            },
            {
                "id": 2,
                "year": "2021",
                "createdAt": "2023-06-05T06:54:39.032Z",
                "updatedAt": "2023-06-05T06:54:39.032Z"
            },
            {
                "id": 3,
                "year": "2022",
                "createdAt": "2023-06-05T06:54:43.344Z",
                "updatedAt": "2023-06-05T06:54:43.344Z"
            },
            {
                "id": 4,
                "year": "2023",
                "createdAt": "2023-06-05T06:54:47.046Z",
                "updatedAt": "2023-06-05T06:54:47.046Z"
            },
            {
                "id": 5,
                "year": "2019",
                "createdAt": "2023-06-05T06:54:53.762Z",
                "updatedAt": "2023-06-05T06:54:53.762Z"
            },
            {
                "id": 6,
                "year": "2018",
                "createdAt": "2023-06-05T06:54:58.800Z",
                "updatedAt": "2023-06-05T06:54:58.800Z"
            },
            {
                "id": 7,
                "year": "2010",
                "createdAt": "2023-06-05T06:56:03.180Z",
                "updatedAt": "2023-06-05T06:56:03.180Z"
            }
        ]
    },
    "limit": 10,
    "skip": 0
}
```

```
Query params
http
  GET /api/vehicle_years?year=2020
```

```
{
    "total": 1,
    "data": {
        "vehicle_year": [
            {
                "id": 1,
                "year": "2020",
                "createdAt": "2023-06-05T06:54:34.715Z",
                "updatedAt": "2023-06-05T06:54:34.715Z"
            }
        ]
    },
    "limit": 10,
    "skip": 0
}
```

```http
PATCH /api/vehicle_years/2
```
| Payload | Type     | Header Type                |
| :-------- | :------- | :--------|
| `year`    | `string` | **JSON** |


```
{
    "message": "VehicleYears was updated successfully."
}
```
``` http
DELETE /api/vehicle_years/2
```
```
{
    "message": "VehicleYears was deleted successfully!"
}
```


#### Price_List

```http
  POST /api/price_lists
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

| Payload | Type     | Header Type                |
| :-------- | :------- | :--------|
| `price`    | `integer` | **JSON** |
| `currency`    | `string` | **JSON** |
| `year_id`    | `integer` | **JSON** |
| `model_id`    | `integer` | **JSON** |

```
{
    "message": "PriceList was Created successfully!",
    "data": {
        "price_list": {
            "id": 1,
            "price": 100000,
            "currency": "USD",
            "year_id": 2,
            "model_id": 2,
            "updatedAt": "2023-06-05T07:04:46.709Z",
            "createdAt": "2023-06-05T07:04:46.709Z"
        }
    }
}
```

```http
  GET /api/price_list
```

```
{
    "total": 5,
    "data": {
        "price_list": [
            {
                "id": 1,
                "price": 100000,
                "currency": "USD",
                "createdAt": "2023-06-05T07:04:46.709Z",
                "updatedAt": "2023-06-05T07:04:46.709Z",
                "model_id": 2,
                "year_id": 2
            },
            {
                "id": 3,
                "price": 100000,
                "currency": "IDR",
                "createdAt": "2023-06-05T07:05:44.628Z",
                "updatedAt": "2023-06-05T07:05:44.628Z",
                "model_id": 1,
                "year_id": 3
            },
            {
                "id": 4,
                "price": 100000,
                "currency": "IDR",
                "createdAt": "2023-06-05T07:05:50.191Z",
                "updatedAt": "2023-06-05T07:05:50.191Z",
                "model_id": 1,
                "year_id": 4
            },
            {
                "id": 5,
                "price": 20000,
                "currency": "IDR",
                "createdAt": "2023-06-05T07:06:14.142Z",
                "updatedAt": "2023-06-05T07:06:14.142Z",
                "model_id": 1,
                "year_id": 4
            },
            {
                "id": 6,
                "price": 50000,
                "currency": "IDR",
                "createdAt": "2023-06-05T07:06:18.862Z",
                "updatedAt": "2023-06-05T07:06:18.862Z",
                "model_id": 1,
                "year_id": 4
            }
        ]
    },
    "limit": 10,
    "skip": 0
}
```

```
Query params
http
  GET /api/price_list?pmax=50000&pmin=20000
```

```
{
    "total": 2,
    "data": {
        "price_list": [
            {
                "id": 5,
                "price": 20000,
                "currency": "IDR",
                "createdAt": "2023-06-05T07:06:14.142Z",
                "updatedAt": "2023-06-05T07:06:14.142Z",
                "model_id": 1,
                "year_id": 4
            },
            {
                "id": 6,
                "price": 50000,
                "currency": "IDR",
                "createdAt": "2023-06-05T07:06:18.862Z",
                "updatedAt": "2023-06-05T07:06:18.862Z",
                "model_id": 1,
                "year_id": 4
            }
        ]
    },
    "limit": 10,
    "skip": 0
}
```

```
Query params
http
  GET /api/price_list??currency=idr&model_id=1&year_id=4
```

```
{
    "total": 3,
    "data": {
        "price_list": [
            {
                "id": 4,
                "price": 100000,
                "currency": "IDR",
                "createdAt": "2023-06-05T07:05:50.191Z",
                "updatedAt": "2023-06-05T07:05:50.191Z",
                "model_id": 1,
                "year_id": 4
            },
            {
                "id": 5,
                "price": 20000,
                "currency": "IDR",
                "createdAt": "2023-06-05T07:06:14.142Z",
                "updatedAt": "2023-06-05T07:06:14.142Z",
                "model_id": 1,
                "year_id": 4
            },
            {
                "id": 6,
                "price": 50000,
                "currency": "IDR",
                "createdAt": "2023-06-05T07:06:18.862Z",
                "updatedAt": "2023-06-05T07:06:18.862Z",
                "model_id": 1,
                "year_id": 4
            }
        ]
    },
    "limit": 10,
    "skip": 0
}
```


```http
PATCH /api/price_list/2
```
| Payload | Type     | Header Type                |
| :-------- | :------- | :--------|
| `price`    | `integer` | **JSON** |
| `currency`    | `string` | **JSON** |
| `year_id`    | `integer` | **JSON** |
| `model_id`    | `integer` | **JSON** |

```
{
    "message": "PriceList was updated successfully."
}
```
``` http
DELETE /api/price_list/2
```
```
{
    "message": "PriceList was deleted successfully!"
}
```
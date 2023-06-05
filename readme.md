
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

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
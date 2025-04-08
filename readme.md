# Express with JWT for Authentication and Authorization

## Table of Content

- [Express with JWT for Authentication and Authorization](#express-with-jwt-for-authentication-and-authorization)
  - [Table of Content](#table-of-content)
  - [Prerequisites](#prerequisites)
  - [Review JWT](#review-jwt)
  - [Toughening the Security](#toughening-the-security)
    - [Authentication](#authentication)
    - [Authorization](#authorization)
  - [Express Middleware](#express-middleware)
    - [Application / Router level Middleware](#application--router-level-middleware)
    - [Endpoint level Middleware](#endpoint-level-middleware)
  - [Environment Variables](#environment-variables)
  - [Let's Demo](#lets-demo)
  - [Referensi](#referensi)

## Prerequisites

- Sudah memasang nodejs
- Mengerti penggunaan Express
- Mengerti penggunaan Sequelize dan Sequelize CLI
- Mengerti penggunaan JWT dan implementasinya

## Review JWT

JWT atau JSON Web Token adalah standar industri dalam transfer data antar entitas dalam bentuk JSON Object yang sangat ramping atau kecil.

JWT ini dapat digunakan untuk proses Authentikasi, Authorisasi, dan Pertukaran Data.  

Dalam pembelajaran ini kita akan menggunakan JWT dalam Proses Authentikasi dan Authorisasi.

## Toughening the Security

Tidak dapat dipungkiri bahwa keamanan adalah satu aspek yang penting dalam membuat aplikasi.

Sesederhana atau sekompleks apapun aplikasi yang dibuat, apabila tidak menerapkan sistem keamanan yang baik, maka tidak akan ada orang yang menggunakan aplikasi yang dibuat.

Salah dua cara dalam menerapkan keamanan dalam aplikasi adalah dengan mengimplementasikan authentikasi dan authorisasi di dalam aplikasi yang dibuat.

Pertanyaannya sekarang adalah apakah Authentikasi dan Authorisasi ini?

### Authentication

Authentikasi adalah suatu istilah yang mengacu pada suatu proses untuk membuktikan apakah suatu dokumen atau informasi yang diberikan itu adalah benar, bukan **hoax**.

Dalam aplikasi, authentikasi ini sering dikaitkan dengan pembuktian identitas dari seorang pengguna dalam aplikasi kita, umumnya dengan memberikan **credential**, yang merupakan informasi umum yang ditukarkan antara pengguna dengan sistem aplikasi.

**Credential** ini umumnya berupa *username* dan *password*

Dalam penerapan authentikasi yang dikombinasikan dengan JWT, setelah seorang user memberikan **credential** yang benar, maka sistem akan memberikan balasan berupa JWT yang valid untuk kemudian disimpan oleh user dan digunakan kembali untuk pertukaran data selanjutnya.

Step by Step Authentikasi dengan JWT:  
[Login]

1. User memberikan credential terhadap aplikasi (server)
1. Server memvalidasi credential yan diberikan tersebut.
1. Apabila tidak valid, server merespon data tidak valid. Apabila valid, server merespon dengan memberikan kembalian berupa token (JWT) tersebut.
1. User menyimpan token tersebut untuk kemudian dapat digunakan kembali dalam pertukaran data selanjutnya.

[Authentikasi]

1. User akan meminta request ke endpoint tertentu dengan memberikan token
1. Server akan mengecek apakah token tersebut valid
1. Apabila tidak valid, server akan mengembalikan respon token tidak valid, apabila valid, server akan mengekstrak data
1. Setelah dapat data user, server akan mengecek kevalidan data user yang diberikan
1. Apabila data user yang diberikan tidak valid, server akan mengembalikan respon user tidak valid. Apabila valid server akan menambahkan penanda tambahan berupa data user dalam header yang ada. (Dalam express kita bisa memberikan penanda berupa data tambahan pada `request`)

### Authorization

Authorisasi adalah suatu proses untuk memberikan seseorang kemampuan untuk mengakses sumber daya atau data yang ada di dalam aplikasi.

Analogi sederhananya adalah tentang rumah yang ditempati. Apabila kita adalah pemilik dari rumah tersebut, maka kita bisa mengakses seluruh kamar yang ada, misalnya dapur, ruang tamu, kamar pribadi yang dimiliki. Tapi apabila kita adalah tamu, maka kita hanya bisa mengakses ruang tamu saja.

Dalam penerapan authorisasi yang dikombinasikan dengan JWT, setelah seseorang meminta akses dengan mengirimkan token untuk mengakses yang benar, maka sistem akan memberikan balasan berupa data yang diminta oleh user tersebut.

Step by Step Authorisasi dengan JWT:

1. User menginginkan untuk mengakses sesuatu kepada server, sambil memberikan token yang sudah dibuat pada proses authentikasi sebelumnya.
1. Sistem akan mengecek apakah token yang diberikan valid.
1. Apabila token tidak valid, server merespon token tidak valid. Apabila valid, server akan mengecek apakah user yang ingin mengakses punya hak yang cukup.
1. Apabila hak dari user tidak cukup, server merespon user tidak punya hak. Apabila valid, server akan meneruskan untuk memberikan data yang dibutuhkan.

Sebelum masuk ke dalam demo authorisasi dan authentikasi dalam nodejs dengan `Express`, ada baiknya kita belajar mengenai Middleware dalam Express terlebih dahulu.

Mengapa demikian?

Karena pada implementasinya dalam Express, proses authentikasi dan authorisasi ini akan dibuat dalam bentuk express middleware.

## Express Middleware

Middle = Tengah, Ware = Sesuatu. TL;DR Sesuatu yang diselipkan di tengah-tengah.

Middleware pada Express adalah sebuah **Fungsi** yang dapat diselipkan untuk dapat mengakses dan memanipulasi objek `request (req)` dan `response (res)`.

Dalam express ini sendiri ada beberapa macam cara untuk menyelipkan middleware, namun yang akan difokuskan dalam pembelajaran ini adalah yang berupa:

- Application / Router level Middleware
- Endpoint level Middleware

### Application / Router level Middleware

sesuai namanya, middleware ini ditaruh di `application (app)` ataupun di `Router (router)` agar dapat diakses oleh seluruh routing / endpoint yang ada di app / router tersebut.

Contoh Application / Router level Middleware:

```javascript
// File: app.js
const express = require("express");
const app = express();

// middleware pada app level yang langsung digunakan
app.use(express.urlencoded({ extended: false }));

// middleware pada app level yang dibuat sendiri
app.use((req, res, next) => {
  console.log("Hello World");
  // jangan lupa untuk menggunakan next supaya aplikasi tetap bisa berjalan
  // lanjut ke semua endpoint yang ada di bawah app use ini
  next();
});

// akan lanjut ke rouring yang ada di bawah sini
...
```

### Endpoint level Middleware

(SELF TERM) sesuai juga dengan namanya, middleware ini ditaruh di routing / endpoint agar dapat diakses oleh routing / endpoint yang diselipkan saja. (spesifik)

Bisa diterapkan di App / Router.

Contoh Endpoint level Middleware:

```javascript
// File: app.js
const express = require("express");
const app = express();

// ini adalah data untuk JWT Secret
const JWT_SECRET = "inisangatamansekali";

// middleware pada app level
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get(
  "/",
  // ini adalah middlewarenya
  (req, res, next) => {
    console.log("Ini adalah endpoint level middleware");
    // jangan lupa next supaya bisa ke handler
    next();
  },
  // ini adalah handler endpointnya
  (req, res) => {
    res.status(200).json({ msg: "Hello World" });
  }
);

...
```

Perhatikan pada contoh di atas, kita menyimpan JWT_SECRET yang merupakan kode rahasia yang digunakan oleh JWT secara *hard code*.

Hal ini tentunya sangat berbahaya bukan?

Bagaimana cara kita membuat ini menjadi lebih aman dalam pengembangan aplikasi?

Untuk menjawab ini, kita harus mengetahui apa itu *Environment Variables* terlebih dahulu

## Environment Variables

Environment Variable, selanjutnya disebut dengan *env*, adalah variabel yang nilainya di-set di luar dari aplikasi, umumnya di-set melalui fungsionalitas dari sistem operasi.

(Jadi set valuenya di level OS, bukan di level aplikasi)

Sifatnya berupa `key-value pair` dan bisa sebanyak apapun.

Nah, supaya bisa menyimpan suatu nilai yang aman dan tersembunyi ini, dibutuhkan suatu file yang bisa menyimpannya, umumnya diberi nama `.env (dotenv)`.

Pada file inilah kita akan menyembunyikan nilai nilai yang dibutuhkan dan dapat diakses oleh aplikasi tanpa butuh disebarluaskan.

Contoh-nya adalah secret yang ada di JWT ini.

dan pada nodejs ini sendiri, supaya bisa membaca file dotenv ini, dibutuhkan suatu package tambahan bernama `dotenv`

misal:

```sh
# file .env
JWT_SECRET=iniadalahkunciyangamansekali
```

```javascript
// file app.js
require('dotenv').config();

// akan membaca JWT_SECRET pada .env dan dimasukkan ke dalam variabel secret
const secret = process.env.JWT_SECRET;

...
```

Umumnya file `.env` ini TIDAK boleh diekspose ke dalam source code (tidak boleh dipush ke dalam github), ataupun bila diekspose ke dalam source code, umumnya TIDAK memiliki value sama sekali, hanya memiliki nama variabelnya saja.

Tapi sebaiknya, kita menggunakan satu file tambahan lagi (mis: `.env.example`), yang isinya SAMA dengan `.env`, tapi tidak memiliki value sama sekali, dan kita dapat meng-*ignore* file `.env` untuk tidak di-push ke repository kita via `.gitignore`.

TL;DR:

- Buat file `.env` dan `.env.example`
- `.gitignore`-kan file `.env`
- `.env` digunakan pada development kita, berisi nama variabel dan value
- `.env.example` dicommit ke dalam repo, berisi nama variabel saja tanpa value

## Let's Demo

Disclaimer:

- Demo pembelajaran ini akan menggunakan template code yang dapat dilihat pada folder `src/a-start`

Dalam demo aplikasi ini kita akan membuat sebuah aplikasi listing smartphone yang dapat menambahkan data smartphone dan melihat data smartphone yang sudah ada, dengan aturan sebagai berikut:

- Hanya orang yang sudah ter-otentikasi yang bisa melihat listing data pada endpoint `GET /smartphones`
- Hanya orang yang sudah ter-otentikasi yang bisa menambahkan data smartphone pada endpoint `POST /smartphones`
- Hanya orang yang UserId pada data smartphonenya sama dengan yang login yang bisa melihat detil data smartphone pada endpoint `GET /smartphones/:smartphoneId`

## Referensi

- <https://jwt.io/>

- <https://auth0.com/intro-to-iam/what-is-authentication/>
- <https://auth0.com/intro-to-iam/what-is-authorization/>
- <https://expressjs.com/en/guide/using-middleware.html>
- <https://medium.com/chingu/an-introduction-to-environment-variables-and-how-to-use-them-f602f66d15fa>
- <https://www.npmjs.com/package/dotenv>

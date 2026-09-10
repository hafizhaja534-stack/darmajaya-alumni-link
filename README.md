# Darmajaya Connect

Buatkan sebuah website portal alumni resmi untuk IIB Darmajaya dengan nama Darmajaya Alumni Connect.

Website ini adalah platform terpusat untuk menghubungkan alumni IIB Darmajaya dengan kampus dan sesama alumni. Website harus memiliki tampilan modern, profesional, bersih, responsif, mudah digunakan, dan cocok untuk institusi pendidikan tinggi.

1. Konsep Website

Website berfungsi sebagai portal alumni yang menyediakan:

Direktori alumni

Profil alumni

Registrasi dan login

Verifikasi data alumni

Tracer Study

Lowongan pekerjaan

Perusahaan/mitra

Event alumni

Berita alumni

Kartu alumni digital

Notifikasi

Dashboard alumni

Dashboard admin

Manajemen data alumni

Gunakan identitas visual yang mencerminkan IIB Darmajaya, dengan desain profesional dan nuansa teknologi/pendidikan.

Jangan membuat desain terlalu kompleks. Prioritaskan UI yang sederhana, modern, rapi, dan mudah dipahami.

2. Halaman Utama / Landing Page

Buat halaman homepage dengan struktur:

Navbar

Logo IIB Darmajaya

Nama "Darmajaya Alumni Connect"

Beranda

Alumni

Event

Lowongan

Berita

Tentang

Tombol Login

Tombol Daftar

Navbar sticky saat halaman di-scroll.

Hero Section

Headline:

"Terhubung, Berkembang, dan Berkontribusi Bersama Alumni Darmajaya"

Subheadline:

"Platform resmi alumni IIB Darmajaya untuk membangun koneksi, berbagi peluang, mengembangkan karier, dan tetap terhubung dengan almamater."

CTA:

"Cari Alumni"

"Gabung Sekarang"

Gunakan visual hero yang profesional dan berkaitan dengan jaringan alumni, pendidikan, teknologi, atau networking.

Statistik

Tampilkan statistik seperti:

Total Alumni

Alumni Terverifikasi

Program Studi

Event

Lowongan Kerja

Angka harus dapat diambil secara dinamis dari database.

Fitur Utama

Buat card fitur:

Direktori Alumni

Tracer Study

Lowongan Kerja

Event Alumni

Kartu Alumni Digital

Berita Alumni

Alumni Terbaru

Tampilkan beberapa alumni terbaru dalam bentuk card yang berisi:

Foto

Nama

Program Studi

Tahun Lulus

Jabatan

Perusahaan

Kota

Event Terdekat

Tampilkan event yang akan datang.

Setiap card berisi:

Foto event

Judul

Jenis event

Tanggal

Lokasi / Online

Tombol "Lihat Detail"

Lowongan Terbaru

Tampilkan beberapa lowongan terbaru:

Posisi

Nama perusahaan

Lokasi

Tipe pekerjaan

Workplace

Deadline

Tombol "Lihat Lowongan"

Berita Terbaru

Tampilkan berita alumni dalam bentuk card:

Gambar

Kategori

Judul

Ringkasan

Tanggal

Tombol "Baca Selengkapnya"

Footer

Footer berisi:

Logo IIB Darmajaya

Deskripsi singkat

Navigasi

Kontak

Social media

Copyright

3. Authentication

Buat sistem authentication dengan:

Register

Login

Logout

Forgot Password

Reset Password

Email Verification

Role pengguna:

Admin

Alumni

Company

Status pengguna:

Pending

Active

Suspended

Rejected

User dengan status pending belum dapat menggunakan fitur yang membutuhkan verifikasi.

4. Dashboard Alumni

Setelah login, alumni diarahkan ke dashboard.

Dashboard berisi:

Welcome Card

"Selamat datang, [Nama Alumni]"

Tampilkan foto profil dan status verifikasi.

Profile Completion

Buat progress bar:

"Profil Anda 80% lengkap"

Tampilkan tombol:

"Lengkapi Profil"

Menu Dashboard

Dashboard

Profil Saya

Direktori Alumni

Tracer Study

Lowongan Kerja

Lamaran Saya

Event

Kartu Alumni

Notifikasi

Pengaturan

Ringkasan

Card:

Status Verifikasi

Lamaran Aktif

Event Diikuti

Status Kartu Alumni

5. Profil Alumni

Alumni dapat mengelola:

Nama

NIM

Nomor ijazah

Program studi

Tahun masuk

Tahun lulus

Jenis kelamin

Tanggal lahir

Nomor telepon

Alamat

Provinsi

Kota

Kode pos

Jabatan

Nama perusahaan

Industri

LinkedIn

Bio

Foto profil

Terdapat opsi:

"Tampilkan profil saya di Direktori Alumni"

Jika disabled, profil tidak muncul di direktori publik.

6. Direktori Alumni

Buat halaman pencarian alumni.

Tampilkan alumni dalam bentuk card/grid.

Setiap card:

Foto

Nama

Program Studi

Tahun Lulus

Jabatan

Perusahaan

Kota

Tambahkan filter:

Nama

Program Studi

Tahun Lulus

Provinsi

Kota

Industri

Perusahaan

Tambahkan pagination.

Gunakan search secara real-time atau dengan tombol Search.

7. Verifikasi Alumni

Buat halaman verifikasi data alumni.

Alumni dapat melakukan verifikasi menggunakan:

NIM

Nomor ijazah

Upload dokumen

Status:

Pending

Approved

Rejected

Needs Revision

Admin dapat memeriksa pengajuan verifikasi.

Admin dapat:

Menyetujui

Menolak

Meminta revisi

Memberikan catatan

Tampilkan badge status dengan jelas.

8. Tracer Study

Buat sistem Tracer Study yang fleksibel.

Admin dapat membuat form tracer study.

Setiap form memiliki:

Judul

Tahun

Deskripsi

Status

Waktu mulai

Waktu selesai

Jenis pertanyaan:

Text

Textarea

Number

Date

Single Choice

Multiple Choice

Rating

Boolean

Alumni dapat mengisi tracer study yang sedang aktif.

Dashboard admin menampilkan:

Jumlah responden

Persentase pengisian

Hasil jawaban

Statistik berdasarkan pertanyaan

9. Lowongan Kerja

Buat halaman Job Board.

Alumni dapat melihat:

Posisi

Perusahaan

Industri

Lokasi

Gaji

Employment Type

Workplace

Deadline

Employment Type:

Full Time

Part Time

Contract

Internship

Freelance

Workplace:

Onsite

Hybrid

Remote

Alumni dapat melamar pekerjaan.

Lamaran memiliki status:

Submitted

Reviewing

Shortlisted

Rejected

Accepted

Alumni dapat melihat riwayat lamaran pada halaman:

"Lamaran Saya"

10. Company / Perusahaan

Buat dashboard khusus untuk perusahaan.

Perusahaan dapat:

Membuat profil perusahaan

Upload logo

Menambahkan website

Menambahkan email

Menambahkan nomor telepon

Menambahkan alamat

Memilih industri

Memposting lowongan

Melihat pelamar

Mengubah status lamaran

Status perusahaan:

Pending

Verified

Rejected

Admin dapat melakukan verifikasi perusahaan.

11. Event Alumni

Buat halaman event.

Jenis event:

Reunion

Seminar

Workshop

Webinar

Career

Other

Mode:

Online

Offline

Hybrid

Informasi event:

Judul

Deskripsi

Gambar

Tanggal

Jam

Lokasi

Meeting URL

Kuota

Deadline pendaftaran

Status

Alumni dapat melakukan:

"Daftar Event"

Setelah mendaftar, sistem memberikan:

Ticket Code

Status pendaftaran

Status kehadiran:

Registered

Attended

Cancelled

No Show

12. Kartu Alumni Digital

Setiap alumni yang memenuhi syarat dapat memiliki kartu alumni digital.

Kartu berisi:

Logo IIB Darmajaya

Nama alumni

NIM

Program Studi

Tahun lulus

Nomor kartu

Foto

QR Code

Status kartu:

Active

Expired

Blocked

QR Code digunakan untuk validasi kartu.

Buat desain kartu yang profesional dan menyerupai ID card digital modern.

13. Berita

Buat halaman berita alumni.

Berita memiliki:

Judul

Slug

Kategori

Excerpt

Content

Gambar

Author

Tanggal publikasi

Status

Status:

Draft

Published

Archived

Halaman berita memiliki:

Search

Filter kategori

Daftar berita

Detail berita

14. Notifikasi

Buat sistem notifikasi.

Notifikasi dapat digunakan untuk:

Status verifikasi

Status lamaran pekerjaan

Event

Tracer Study

Kartu alumni

Pengumuman admin

Tampilkan notification bell pada navbar.

Notifikasi memiliki status:

Unread

Read

15. Admin Dashboard

Buat dashboard khusus Admin.

Dashboard menampilkan statistik:

Total User

Total Alumni

Alumni Terverifikasi

Alumni Pending

Total Perusahaan

Total Lowongan

Total Lamaran

Total Event

Total Berita

Total Tracer Study

Menu Admin:

Dashboard

Alumni

Verifikasi Alumni

Verifikasi Dokumen

Program Studi

Fakultas

Provinsi

Kota

Perusahaan

Lowongan

Lamaran

Event

Berita

Tracer Study

Notifikasi

Audit Log

Pengaturan

Admin harus dapat melakukan CRUD pada data yang relevan.

16. Audit Log

Sediakan halaman Audit Log untuk admin.

Catat aktivitas penting:

Login

Logout

Create

Update

Delete

Verification

Approval

Rejection

Perubahan status

Informasi log:

User

Action

Entity

Entity ID

Old Value

New Value

IP Address

User Agent

Timestamp

17. Database

Struktur database harus mengikuti database yang telah disiapkan untuk sistem Alumni IIB Darmajaya.

Gunakan MySQL 8.0+.

Database utama:

alumni_darmajaya

Tabel utama:

faculties

programs

provinces

cities

users

alumni_profiles

alumni_verifications

document_verifications

tracer_forms

tracer_questions

tracer_answers

companies

jobs

job_applications

alumni_cards

news

events

event_registrations

notifications

audit_logs

Pertahankan relasi antar tabel dan foreign key yang sudah ditentukan pada database.

Jangan membuat struktur database yang bertentangan dengan schema tersebut.

18. UI / UX

Gunakan desain:

Modern

Clean

Professional

Academic

Technology-oriented

Responsive

Target perangkat:

Desktop

Tablet

Mobile

Gunakan:

Card

Badge

Modal

Dropdown

Search

Filter

Pagination

Toast notification

Sidebar dashboard

Responsive navbar

Gunakan whitespace yang cukup dan jangan membuat halaman terlalu penuh.

Gunakan animasi ringan seperti:

Hover

Fade

Smooth transition

Jangan menggunakan animasi berlebihan.

19. Warna dan Identitas

Gunakan warna yang terinspirasi dari identitas IIB Darmajaya, tetapi tetap modern.

Dominan:

Biru

Putih

Sedikit warna aksen untuk tombol/status

Gunakan desain yang terlihat seperti portal alumni universitas modern.

Logo dan identitas IIB Darmajaya harus mudah terlihat tetapi jangan membuat desain terlihat kuno.

20. Struktur Navigasi

Public:

Beranda
Alumni
Event
Lowongan
Berita
Tentang
Login
Daftar

Alumni:

Dashboard
Profil
Direktori Alumni
Tracer Study
Lowongan
Lamaran Saya
Event
Kartu Alumni
Notifikasi
Pengaturan

Company:

Dashboard
Profil Perusahaan
Lowongan
Pelamar
Notifikasi
Pengaturan

Admin:

Dashboard
Alumni
Verifikasi
Program Studi
Perusahaan
Lowongan
Lamaran
Event
Berita
Tracer Study
Notifikasi
Audit Log
Pengaturan

21. Hal yang Penting

Buat website benar-benar terasa seperti portal alumni kampus, bukan sekadar landing page.

Semua data harus dirancang agar dapat terhubung ke database MySQL.

Gunakan data dummy/seeder untuk demonstrasi:

Beberapa alumni

Beberapa program studi

Beberapa perusahaan

Beberapa lowongan

Beberapa event

Beberapa berita

Gunakan data yang realistis tetapi jangan menggunakan data pribadi orang sungguhan.

Buat role-based access control sehingga:

Admin memiliki akses penuh.

Alumni hanya dapat mengakses fitur alumni.

Company hanya dapat mengakses fitur perusahaan.

Pastikan setiap halaman memiliki empty state, loading state, error state, dan success notification.

Prioritaskan keamanan, validasi form, authorization, dan proteksi data.

Hasil akhirnya harus berupa website Darmajaya Alumni Connect yang modern, responsif, profesional, sederhana digunakan, dan siap dikembangkan menjadi portal alumni IIB Darmajaya.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/59008e0f-941a-4fc4-b3e1-33786bac70c6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

# Laporan Temuan (Bug Report)

---

## [BUG-001] Editor TinyMCE di halaman iFrame tidak bisa digunakan (read-only)

> Ditemukan saat menjalankan test otomatis — 11 Oktober 2026.

| | |
|---|---|
| **ID** | BUG-001 |
| **Modul** | iFrame (`/iframe`) |
| **Severity** | Major |
| **Priority** | High |
| **Status** | Open |

### Deskripsi
Editor TinyMCE di dalam halaman `/iframe` tidak bisa diklik maupun diketik. Setiap percobaan dikunci oleh dialog "TinyMCE is in read-only mode because you have no more editor loads available this month." Penyebabnya kuota editor gratis dari penyedia TinyMCE habis untuk bulan berjalan.

### Langkah reproduksi
1. Buka `https://the-internet.herokuapp.com/iframe`
2. Coba klik di dalam area editor

### Hasil yang diharapkan
Editor bisa diklik dan ditekan, pengguna bisa mengetik isi konten.

### Hasil aktual
Dialog read-only muncul dan memblokir semua interaksi. Editor hanya menampilkan teks default "Your content goes here."

### Dampak
Pengguna tidak bisa mencoba fitur utama halaman ini sama sekali. Test otomatis yang menguji "mengetik di editor" tidak bisa dilakukan sampai masalah ini diperbaiki.

---

## [BUG-002] Checkbox pertama di halaman Checkboxes tidak memiliki keterangan teks

| | |
|---|---|
| **ID** | BUG-002 |
| **Modul** | Checkboxes (`/checkboxes`) |
| **Severity** | Low (cosmetic / usability) |
| **Priority** | Low |
| **Status** | Open |

### Deskripsi
Di halaman `/checkboxes` ada dua checkbox. Checkbox kedua memiliki teks keterangan, tetapi checkbox pertama tidak memiliki teks apa pun sehingga pengguna tidak tahu opsi apa yang dipilih.

### Langkah reproduksi
1. Buka `https://the-internet.herokuapp.com/checkboxes`
2. Amati kedua checkbox

### Hasil yang diharapkan
Kedua checkbox memiliki teks keterangan yang menjelaskan isi opsi.

### Hasil aktual
Checkbox pertama kosong tanpa keterangan; checkbox kedua bertuliskan "check me out".

### Catatan
Dampaknya pada usability — pengguna tidak yakin apa yang dicentang. Untuk automation testing ini tidak menghalangi test, hanya dicatat sebagai temuan.

---

## Cara membaca laporan ini

| Istilah | Arti |
|---|---|
| **Severity** | Seberapa parah dampaknya bagi pengguna (Critical / Major / Minor / Low) |
| **Priority** | Seberapa cepat sebaiknya diperbaiki (High / Medium / Low) |
| **Steps** | Urutan langkah supaya orang lain bisa mengulang temuan yang sama |

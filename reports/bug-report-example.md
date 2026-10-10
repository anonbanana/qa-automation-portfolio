# Contoh Laporan Temuan (Bug Report)

Format sederhana yang biasa dipakai di tim QA.

---

## [BUG-001] Checkbox pertama di halaman Checkboxes tidak memiliki keterangan teks

| | |
|---|---|
| **ID** | BUG-001 |
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
Kedua checkbox memiliki teks keterangan yang menjelas isi opsi.

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

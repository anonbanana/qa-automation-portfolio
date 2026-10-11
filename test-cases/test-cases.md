# Test Case — the-internet.herokuapp.com

Kode test: `TC-<MODUL>-<URUT>`.

---

## Modul: Form Authentication (`/login`)

### TC-LOGIN-001 — Login dengan kredensial valid

| | |
|---|---|
| **Prioritas** | High |
| **Prasyarat** | Berada di halaman `/login` |
| **Teknik** | Equivalence partitioning — partition "valid" |

**Given** saya berada di halaman login
**When** saya isi username `tomsmith`, password `SuperSecretPassword!`, lalu klik Login
**Then** muncul pesan sukses "You logged into a secure area!" dan halaman pindah ke `/secure`

---

### TC-LOGIN-002 — Login dengan password salah

| | |
|---|---|
| **Prioritas** | High |
| **Prasyarat** | Berada di halaman `/login` |
| **Teknik** | Equivalence partitioning — partition "password salah" |

**Given** saya berada di halaman login
**When** saya isi username benar, password salah, lalu klik Login
**Then** muncul pesan error "Your password is invalid!" dan tetap di halaman login

---

### TC-LOGIN-003 — Login dengan username salah

| | |
|---|---|
| **Prioritas** | High |
| **Prasyarat** | Berada di halaman `/login` |
| **Teknik** | Equivalence partitioning — partition "username salah" |

**Given** saya berada di halaman login
**When** saya isi username salah, password benar, lalu klik Login
**Then** muncul pesan error "Your username is invalid!" dan tetap di halaman login

---

## Modul: Inputs (`/inputs`)

### TC-IN-001 — Masukkan angka valid

| | |
|---|---|
| **Prioritas** | Medium |
| **Teknik** | Equivalence partitioning — partition "angka valid" |

**Given** saya berada di halaman inputs
**When** saya masukkan angka `42`
**Then** nilai pada field menjadi `42`

---

### TC-IN-002 — Input huruf ditolak browser

| | |
|---|---|
| **Prioritas** | Medium |
| **Teknik** | Equivalence partitioning — partition "bukan angka" |

**Given** saya berada di halaman inputs
**When** saya ketik huruf `abc` pada field
**Then** field tetap kosong (browser menolak input non-angka)

---

### TC-IN-003 — Batas atas angka besar

| | |
|---|---|
| **Prioritas** | Low |
| **Teknik** | Boundary value analysis — mendekati batas atas |

**Given** saya berada di halaman inputs
**When** saya masukkan angka `9999`
**Then** nilai pada field menjadi `9999`

---

## Modul: JavaScript Alerts (`/javascript_alerts`)

### TC-AL-001 — Alert diterima (accept)

**Given** saya berada di halaman JavaScript Alerts
**When** saya klik tombol "Click for JS Alert" dan menerima alert
**Then** muncul pesan "You successfully clicked an alert"

---

## Modul: Broken Images (`/broken_images`)

### TC-BI-001 — Jumlah gambar sesuai harapan

| | |
|---|---|
| **Prioritas** | Medium |
| **Teknik** | Equivalence partitioning — jumlah elemen pada halaman |

**Given** saya berada di halaman Broken Images
**When** halaman selesai dimuat
**Then** halaman menampilkan 4 gambar

---

### TC-BI-002 — Gambar rusak terdeteksi

| | |
|---|---|
| **Prioritas** | Medium |
| **Teknik** | Negative testing — memastikan kerusakan terdeteksi |

**Given** saya berada di halaman Broken Images
**When** saya periksa setiap gambar yang selesai dimuat
**Then** ada tepat 2 gambar dengan lebar 0 piksel (gambar rusak sesuai data halaman ini)

---

## Modul: Download (`/download`)

### TC-DL-001 — Unduh file dengan nama benar

| | |
|---|---|
| **Prioritas** | High |
| **Teknik** | Equivalence partitioning — link unduhan valid |

**Given** saya berada di halaman Download
**When** saya klik link file pertama di daftar
**Then** browser mulai mengunduh file dengan nama sesuai link, tanpa error

---

### TC-DL-002 — Halaman menyediakan banyak file

| | |
|---|---|
| **Prioritas** | Low |
| **Teknik** | Boundary value — batas bawah jumlah link |

**Given** saya berada di halaman Download
**When** halaman selesai dimuat
**Then** ada minimal 10 link file yang bisa diunduh

---

## Modul: iFrame (`/iframe`)

### TC-IFR-001 — Heading halaman benar

**Given** saya berada di halaman iFrame
**When** halaman selesai dimuat
**Then** judul halaman bertuliskan "An iFrame containing the TinyMCE WYSIWYG Editor"

---

### TC-IFR-002 — Konten default editor tampil

**Given** saya berada di halaman iFrame
**When** saya membuka isi iframe
**Then** editor menampilkan teks default "Your content goes here."

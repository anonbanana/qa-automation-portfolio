# Test Case — the-internet.herokuapp.com

Dokumen ini memetakan seluruh test otomatis ke skenario uji manual.

- **Sumber kebenaran (test basis):** perilaku halaman latihan the-internet yang didokumentasikan di situs dan diverifikasi pada 20 Oktober 2026.
- **Kode otomasi:** `tests/`.
- **Status:** seluruh kasus di bawah sudah diotomasi dan lulus pada 20 Oktober 2026.
- **Traceability:** lihat tabel di bagian akhir.

## Ringkasan

| Modul | Jumlah kasus |
|---|---:|
| Login | 8 |
| Checkboxes | 3 |
| Dropdown | 4 |
| Inputs | 6 |
| Add/Remove Elements | 4 |
| JavaScript Alerts | 5 |
| Broken Images | 2 |
| Download | 2 |
| iFrame | 2 |
| **Total** | **36** |

## Teknik desain yang dipakai

- **Equivalence partitioning** — membagi data menjadi kelompok valid dan tidak valid. Contoh: login valid, password salah, username salah; input angka vs input teks.
- **Boundary value analysis** — dipakai pada jumlah elemen dinamis di halaman Add/Remove: kondisi 0, 1, lalu kembali ke 0. Halaman `/inputs` **tidak** punya `min` atau `max`, jadi angka `9999` adalah uji nilai besar, bukan uji batas.
- **Negative testing** — login dengan field kosong, spasi, username salah, dan password salah; input teks pada field angka.
- **State transition** — checkbox berubah centang/uncentang, dropdown berubah pilihan, dan dialog alert/confirm/prompt berubah hasil.

---

## Modul: Form Authentication (`/login`)

### TC-LOGIN-001 — Login dengan kredensial valid

| Field | Isi |
|---|---|
| Prioritas | High |
| Teknik | Equivalence partitioning — partisi valid |
| Prasyarat | Halaman `/login` terbuka |
| Data uji | username `tomsmith`; password `SuperSecretPassword!` |
| Otomasi | `tests/login.spec.js` |

**Langkah**

1. Isi username.
2. Isi password.
3. Klik tombol Login.

**Hasil yang diharapkan**

- Flash sukses: "You logged into a secure area!".
- URL berpindah ke `/secure`.

---

### TC-LOGIN-002 — Login dengan password salah

| Field | Isi |
|---|---|
| Prioritas | High |
| Teknik | Equivalence partitioning — partisi password salah |
| Prasyarat | Halaman `/login` terbuka |
| Data uji | username `tomsmith`; password `password-salah` |
| Otomasi | `tests/login.spec.js` |

**Langkah**

1. Isi username valid.
2. Isi password salah.
3. Klik tombol Login.

**Hasil yang diharapkan**

- Flash error: "Your password is invalid!".
- Tetap di halaman `/login`.

---

### TC-LOGIN-003 — Login dengan username salah

| Field | Isi |
|---|---|
| Prioritas | High |
| Teknik | Equivalence partitioning — partisi username salah |
| Prasyarat | Halaman `/login` terbuka |
| Data uji | username `username-salah`; password `SuperSecretPassword!` |
| Otomasi | `tests/login.spec.js` |

**Langkah**

1. Isi username salah.
2. Isi password valid.
3. Klik tombol Login.

**Hasil yang diharapkan**

- Flash error: "Your username is invalid!".
- Tetap di halaman `/login`.

---

### TC-LOGIN-004 — Form login menampilkan label dan atribut yang benar

| Field | Isi |
|---|---|
| Prioritas | Medium |
| Teknik | Equivalence partitioning — validasi elemen form |
| Prasyarat | Halaman `/login` terbuka |
| Data uji | — |
| Otomasi | `tests/login.spec.js` |

**Langkah**

1. Buka halaman `/login`.
2. Periksa label dan atribut kedua input.

**Hasil yang diharapkan**

- Label username bertuliskan "Username".
- Label password bertuliskan "Password".
- Input username punya atribut `name="username"`.
- Input password punya atribut `type="password"`.

---

### TC-LOGIN-005 — Username dan password kosong ditolak

| Field | Isi |
|---|---|
| Prioritas | High |
| Teknik | Negative testing — field kosong |
| Prasyarat | Halaman `/login` terbuka |
| Data uji | username kosong; password kosong |
| Otomasi | `tests/login.spec.js` |

**Langkah**

1. Biarkan username kosong.
2. Biarkan password kosong.
3. Klik tombol Login.

**Hasil yang diharapkan**

- Flash error: "Your username is invalid!".
- Tetap di halaman `/login`.

---

### TC-LOGIN-006 — Password kosong dengan username valid ditolak

| Field | Isi |
|---|---|
| Prioritas | High |
| Teknik | Negative testing — field kosong |
| Prasyarat | Halaman `/login` terbuka |
| Data uji | username `tomsmith`; password kosong |
| Otomasi | `tests/login.spec.js` |

**Langkah**

1. Isi username valid.
2. Biarkan password kosong.
3. Klik tombol Login.

**Hasil yang diharapkan**

- Flash error: "Your password is invalid!".
- Tetap di halaman `/login`.

---

### TC-LOGIN-007 — Username dan password berisi spasi ditolak

| Field | Isi |
|---|---|
| Prioritas | Medium |
| Teknik | Negative testing — input spasi |
| Prasyarat | Halaman `/login` terbuka |
| Data uji | username `"   "`; password `"   "` |
| Otomasi | `tests/login.spec.js` |

**Langkah**

1. Isi username dengan tiga spasi.
2. Isi password dengan tiga spasi.
3. Klik tombol Login.

**Hasil yang diharapkan**

- Flash error: "Your username is invalid!".
- Tetap di halaman `/login`.

---

### TC-LOGIN-008 — Username bersifat case-sensitive

| Field | Isi |
|---|---|
| Prioritas | Medium |
| Teknik | Negative testing — perbedaan huruf besar/kecil |
| Prasyarat | Halaman `/login` terbuka |
| Data uji | username `TomSmith`; password `SuperSecretPassword!` |
| Otomasi | `tests/login.spec.js` |

**Langkah**

1. Isi username `TomSmith` (huruf T besar).
2. Isi password valid.
3. Klik tombol Login.

**Hasil yang diharapkan**

- Flash error: "Your username is invalid!".
- Tetap di halaman `/login`.

---

## Modul: Checkboxes (`/checkboxes`)

### TC-CB-001 — Checkbox kedua kondisi awal tercentang

| Field | Isi |
|---|---|
| Prioritas | Medium |
| Teknik | State transition — kondisi awal |
| Prasyarat | Halaman `/checkboxes` terbuka |
| Data uji | — |
| Otomasi | `tests/checkboxes.spec.js` |

**Langkah**

1. Buka halaman `/checkboxes`.
2. Periksa checkbox kedua.

**Hasil yang diharapkan**

- Checkbox kedua dalam keadaan tercentang.

---

### TC-CB-002 — Uncentang checkbox yang tercentang

| Field | Isi |
|---|---|
| Prioritas | Medium |
| Teknik | State transition — checked ke unchecked |
| Prasyarat | Halaman `/checkboxes` terbuka |
| Data uji | — |
| Otomasi | `tests/checkboxes.spec.js` |

**Langkah**

1. Buka halaman `/checkboxes`.
2. Klik checkbox kedua yang awalnya tercentang.

**Hasil yang diharapkan**

- Checkbox kedua berubah menjadi tidak tercentang.

---

### TC-CB-003 — Centang checkbox yang belum tercentang

| Field | Isi |
|---|---|
| Prioritas | Medium |
| Teknik | State transition — unchecked ke checked |
| Prasyarat | Halaman `/checkboxes` terbuka |
| Data uji | — |
| Otomasi | `tests/checkboxes.spec.js` |

**Langkah**

1. Buka halaman `/checkboxes`.
2. Klik checkbox pertama yang awalnya tidak tercentang.

**Hasil yang diharapkan**

- Checkbox pertama berubah menjadi tercentang.

---

## Modul: Dropdown (`/dropdown`)

### TC-DD-001 — Dropdown kondisi awal kosong

| Field | Isi |
|---|---|
| Prioritas | Medium |
| Teknik | State transition — kondisi awal |
| Prasyarat | Halaman `/dropdown` terbuka |
| Data uji | — |
| Otomasi | `tests/dropdown.spec.js` |

**Langkah**

1. Buka halaman `/dropdown`.
2. Periksa nilai dropdown.

**Hasil yang diharapkan**

- Nilai dropdown kosong (`""`).

---

### TC-DD-002 — Pilih Option 1

| Field | Isi |
|---|---|
| Prioritas | Medium |
| Teknik | Equivalence partitioning — pilihan valid |
| Prasyarat | Halaman `/dropdown` terbuka |
| Data uji | value `1` |
| Otomasi | `tests/dropdown.spec.js` |

**Langkah**

1. Buka halaman `/dropdown`.
2. Pilih "Option 1".

**Hasil yang diharapkan**

- Nilai dropdown menjadi `1`.

---

### TC-DD-003 — Pilih Option 2

| Field | Isi |
|---|---|
| Prioritas | Medium |
| Teknik | Equivalence partitioning — pilihan valid |
| Prasyarat | Halaman `/dropdown` terbuka |
| Data uji | value `2` |
| Otomasi | `tests/dropdown.spec.js` |

**Langkah**

1. Buka halaman `/dropdown`.
2. Pilih "Option 2".

**Hasil yang diharapkan**

- Nilai dropdown menjadi `2`.

---

### TC-DD-004 — Dropdown berisi tiga opsi yang benar

| Field | Isi |
|---|---|
| Prioritas | Low |
| Teknik | Equivalence partitioning — validasi daftar opsi |
| Prasyarat | Halaman `/dropdown` terbuka |
| Data uji | "Please select an option" (`""`), "Option 1" (`1`), "Option 2" (`2`) |
| Otomasi | `tests/dropdown.spec.js` |

**Langkah**

1. Buka halaman `/dropdown`.
2. Baca semua opsi beserta value-nya.

**Hasil yang diharapkan**

- Tepat 3 opsi.
- Label dan value sesuai data uji di atas.

---

## Modul: Inputs (`/inputs`)

### TC-IN-001 — Masukkan angka valid

| Field | Isi |
|---|---|
| Prioritas | Medium |
| Teknik | Equivalence partitioning — partisi angka valid |
| Prasyarat | Halaman `/inputs` terbuka |
| Data uji | `42` |
| Otomasi | `tests/inputs.spec.js` |

**Langkah**

1. Buka halaman `/inputs`.
2. Isi field dengan `42`.

**Hasil yang diharapkan**

- Nilai field menjadi `42`.

---

### TC-IN-002 — Input huruf ditolak browser

| Field | Isi |
|---|---|
| Prioritas | Medium |
| Teknik | Equivalence partitioning — partisi bukan angka |
| Prasyarat | Halaman `/inputs` terbuka |
| Data uji | `abc` |
| Otomasi | `tests/inputs.spec.js` |

**Langkah**

1. Buka halaman `/inputs`.
2. Klik field, lalu ketik `abc`.

**Hasil yang diharapkan**

- Field tetap kosong karena browser menolak input non-angka.

---

### TC-IN-003 — Angka besar 9999 tetap diterima

| Field | Isi |
|---|---|
| Prioritas | Low |
| Teknik | Uji nilai besar (bukan boundary value analysis) |
| Prasyarat | Halaman `/inputs` terbuka |
| Data uji | `9999` |
| Otomasi | `tests/inputs.spec.js` |

**Langkah**

1. Buka halaman `/inputs`.
2. Isi field dengan `9999`.

**Hasil yang diharapkan**

- Nilai field menjadi `9999`.

**Catatan:** halaman ini tidak punya `min`/`max`, jadi `9999` bukan batas. Ini uji ketahanan terhadap nilai besar.

---

### TC-IN-004 — Angka nol diterima

| Field | Isi |
|---|---|
| Prioritas | Medium |
| Teknik | Equivalence partitioning — nilai nol |
| Prasyarat | Halaman `/inputs` terbuka |
| Data uji | `0` |
| Otomasi | `tests/inputs.spec.js` |

**Langkah**

1. Buka halaman `/inputs`.
2. Isi field dengan `0`.

**Hasil yang diharapkan**

- Nilai field menjadi `0`.

---

### TC-IN-005 — Angka negatif diterima

| Field | Isi |
|---|---|
| Prioritas | Medium |
| Teknik | Equivalence partitioning — nilai negatif |
| Prasyarat | Halaman `/inputs` terbuka |
| Data uji | `-1` |
| Otomasi | `tests/inputs.spec.js` |

**Langkah**

1. Buka halaman `/inputs`.
2. Isi field dengan `-1`.

**Hasil yang diharapkan**

- Nilai field menjadi `-1`.

---

### TC-IN-006 — Angka desimal diterima

| Field | Isi |
|---|---|
| Prioritas | Medium |
| Teknik | Equivalence partitioning — nilai desimal |
| Prasyarat | Halaman `/inputs` terbuka |
| Data uji | `1.5` |
| Otomasi | `tests/inputs.spec.js` |

**Langkah**

1. Buka halaman `/inputs`.
2. Isi field dengan `1.5`.

**Hasil yang diharapkan**

- Nilai field menjadi `1.5`.

---

## Modul: Add/Remove Elements (`/add_remove_elements/`)

### TC-AR-001 — Klik Add Element menambah 1 tombol Delete

| Field | Isi |
|---|---|
| Prioritas | High |
| Teknik | Boundary value analysis — perpindahan 0 ke 1 |
| Prasyarat | Halaman `/add_remove_elements/` terbuka |
| Data uji | 1 klik |
| Otomasi | `tests/add-remove-elements.spec.js` |

**Langkah**

1. Buka halaman Add/Remove Elements.
2. Pastikan belum ada tombol Delete.
3. Klik "Add Element" satu kali.

**Hasil yang diharapkan**

- Jumlah tombol Delete berubah dari 0 menjadi 1.

---

### TC-AR-002 — Klik Add Element 3 kali menambah 3 tombol Delete

| Field | Isi |
|---|---|
| Prioritas | Medium |
| Teknik | Equivalence partitioning — beberapa elemen |
| Prasyarat | Halaman `/add_remove_elements/` terbuka |
| Data uji | 3 klik |
| Otomasi | `tests/add-remove-elements.spec.js` |

**Langkah**

1. Buka halaman Add/Remove Elements.
2. Klik "Add Element" tiga kali.

**Hasil yang diharapkan**

- Tampil 3 tombol Delete.

---

### TC-AR-003 — Klik Delete mengurangi 1 elemen

| Field | Isi |
|---|---|
| Prioritas | Medium |
| Teknik | State transition — 2 elemen menjadi 1 |
| Prasyarat | Halaman `/add_remove_elements/` terbuka |
| Data uji | 2 elemen, hapus 1 |
| Otomasi | `tests/add-remove-elements.spec.js` |

**Langkah**

1. Buka halaman Add/Remove Elements.
2. Klik "Add Element" dua kali.
3. Klik tombol Delete pertama.

**Hasil yang diharapkan**

- Jumlah tombol Delete berkurang dari 2 menjadi 1.

---

### TC-AR-004 — Hapus satu-satunya elemen mengembalikan kondisi ke nol

| Field | Isi |
|---|---|
| Prioritas | High |
| Teknik | Boundary value analysis — perpindahan 1 ke 0 |
| Prasyarat | Halaman `/add_remove_elements/` terbuka |
| Data uji | 1 elemen, hapus 1 |
| Otomasi | `tests/add-remove-elements.spec.js` |

**Langkah**

1. Buka halaman Add/Remove Elements.
2. Klik "Add Element" satu kali.
3. Klik tombol Delete.

**Hasil yang diharapkan**

- Jumlah tombol Delete kembali menjadi 0.

---

## Modul: JavaScript Alerts (`/javascript_alerts`)

### TC-AL-001 — Alert diterima (accept)

| Field | Isi |
|---|---|
| Prioritas | High |
| Teknik | State transition — dialog alert |
| Prasyarat | Halaman `/javascript_alerts` terbuka |
| Data uji | Klik "Click for JS Alert", lalu accept |
| Otomasi | `tests/javascript-alerts.spec.js` |

**Langkah**

1. Buka halaman JavaScript Alerts.
2. Klik tombol "Click for JS Alert".
3. Terima dialog.

**Hasil yang diharapkan**

- Muncul pesan "You successfully clicked an alert".

---

### TC-AL-002 — Confirm diterima (accept)

| Field | Isi |
|---|---|
| Prioritas | High |
| Teknik | State transition — dialog confirm |
| Prasyarat | Halaman `/javascript_alerts` terbuka |
| Data uji | Klik "Click for JS Confirm", lalu accept |
| Otomasi | `tests/javascript-alerts.spec.js` |

**Langkah**

1. Buka halaman JavaScript Alerts.
2. Klik tombol "Click for JS Confirm".
3. Terima dialog.

**Hasil yang diharapkan**

- Muncul pesan "You clicked: Ok".

---

### TC-AL-003 — Confirm dibatalkan (dismiss)

| Field | Isi |
|---|---|
| Prioritas | Medium |
| Teknik | State transition — dialog confirm |
| Prasyarat | Halaman `/javascript_alerts` terbuka |
| Data uji | Klik "Click for JS Confirm", lalu dismiss |
| Otomasi | `tests/javascript-alerts.spec.js` |

**Langkah**

1. Buka halaman JavaScript Alerts.
2. Klik tombol "Click for JS Confirm".
3. Batalkan dialog.

**Hasil yang diharapkan**

- Muncul pesan "You clicked: Cancel".

---

### TC-AL-004 — Prompt diterima dengan teks

| Field | Isi |
|---|---|
| Prioritas | Medium |
| Teknik | State transition — dialog prompt |
| Prasyarat | Halaman `/javascript_alerts` terbuka |
| Data uji | Klik "Click for JS Prompt"; isi `hello QA`; accept |
| Otomasi | `tests/javascript-alerts.spec.js` |

**Langkah**

1. Buka halaman JavaScript Alerts.
2. Klik tombol "Click for JS Prompt".
3. Isi dialog dengan `hello QA`.
4. Terima dialog.

**Hasil yang diharapkan**

- Muncul pesan "You entered: hello QA".

---

### TC-AL-005 — Prompt dibatalkan (dismiss)

| Field | Isi |
|---|---|
| Prioritas | Medium |
| Teknik | State transition — dialog prompt |
| Prasyarat | Halaman `/javascript_alerts` terbuka |
| Data uji | Klik "Click for JS Prompt", lalu dismiss |
| Otomasi | `tests/javascript-alerts.spec.js` |

**Langkah**

1. Buka halaman JavaScript Alerts.
2. Klik tombol "Click for JS Prompt".
3. Batalkan dialog.

**Hasil yang diharapkan**

- Muncul pesan "You entered: null".

---

## Modul: Broken Images (`/broken_images`)

### TC-BI-001 — Jumlah gambar sesuai harapan

| Field | Isi |
|---|---|
| Prioritas | Medium |
| Teknik | Equivalence partitioning — jumlah elemen |
| Prasyarat | Halaman `/broken_images` terbuka |
| Data uji | — |
| Otomasi | `tests/broken-images.spec.js` |

**Langkah**

1. Buka halaman Broken Images.
2. Hitung semua elemen gambar.

**Hasil yang diharapkan**

- Halaman menampilkan 4 gambar.

---

### TC-BI-002 — Gambar rusak terdeteksi

| Field | Isi |
|---|---|
| Prioritas | Medium |
| Teknik | Negative testing — memastikan kerusakan terdeteksi |
| Prasyarat | Halaman `/broken_images` terbuka |
| Data uji | — |
| Otomasi | `tests/broken-images.spec.js` |

**Langkah**

1. Buka halaman Broken Images.
2. Periksa setiap gambar yang selesai dimuat.
3. Hitung gambar dengan `naturalWidth === 0`.

**Hasil yang diharapkan**

- Tepat 2 gambar rusak, sesuai data halaman latihan.

---

## Modul: Download (`/download`)

### TC-DL-001 — Unduh file dengan nama dan isi benar

| Field | Isi |
|---|---|
| Prioritas | High |
| Teknik | Equivalence partitioning — link unduhan valid |
| Prasyarat | Halaman `/download` terbuka |
| Data uji | Link file pertama (dinamis) |
| Otomasi | `tests/file-download.spec.js` |

**Langkah**

1. Buka halaman Download.
2. Ambil href link file pertama.
3. Klik link tersebut.
4. Periksa nama file, status unduhan, dan ukuran file.

**Hasil yang diharapkan**

- Nama file sama dengan nama di href.
- Tidak ada error unduhan.
- Ukuran file lebih besar dari 0 byte.

---

### TC-DL-002 — Halaman menyediakan banyak file

| Field | Isi |
|---|---|
| Prioritas | Low |
| Teknik | Lower-bound check — minimal 10 link (ekspektasi portofolio) |
| Prasyarat | Halaman `/download` terbuka |
| Data uji | — |
| Otomasi | `tests/file-download.spec.js` |

**Langkah**

1. Buka halaman Download.
2. Hitung link dengan href berawalan `download/`.

**Hasil yang diharapkan**

- Ada minimal 10 link file yang bisa diunduh.

---

## Modul: iFrame (`/iframe`)

### TC-IFR-001 — Heading halaman benar

| Field | Isi |
|---|---|
| Prioritas | Low |
| Teknik | Equivalence partitioning — validasi teks |
| Prasyarat | Halaman `/iframe` terbuka |
| Data uji | — |
| Otomasi | `tests/frames.spec.js` |

**Langkah**

1. Buka halaman iFrame.
2. Periksa heading halaman.

**Hasil yang diharapkan**

- Heading bertuliskan "An iFrame containing the TinyMCE WYSIWYG Editor".

---

### TC-IFR-002 — Konten default editor tampil

| Field | Isi |
|---|---|
| Prioritas | Medium |
| Teknik | Equivalence partitioning — konten iframe |
| Prasyarat | Halaman `/iframe` terbuka |
| Data uji | — |
| Otomasi | `tests/frames.spec.js` |

**Langkah**

1. Buka halaman iFrame.
2. Masuk ke body iframe.
3. Periksa teks yang tampil.

**Hasil yang diharapkan**

- Editor menampilkan teks default "Your content goes here.".

**Catatan:** mengedit isi editor tidak diuji otomatis karena kuota TinyMCE pihak ketiga sedang habis (lihat `ENV-001`).

---

## Traceability matrix

| TC ID | File otomasi | Status |
|---|---|---|
| TC-LOGIN-001 | `tests/login.spec.js` | Automated |
| TC-LOGIN-002 | `tests/login.spec.js` | Automated |
| TC-LOGIN-003 | `tests/login.spec.js` | Automated |
| TC-LOGIN-004 | `tests/login.spec.js` | Automated |
| TC-LOGIN-005 | `tests/login.spec.js` | Automated |
| TC-LOGIN-006 | `tests/login.spec.js` | Automated |
| TC-LOGIN-007 | `tests/login.spec.js` | Automated |
| TC-LOGIN-008 | `tests/login.spec.js` | Automated |
| TC-CB-001 | `tests/checkboxes.spec.js` | Automated |
| TC-CB-002 | `tests/checkboxes.spec.js` | Automated |
| TC-CB-003 | `tests/checkboxes.spec.js` | Automated |
| TC-DD-001 | `tests/dropdown.spec.js` | Automated |
| TC-DD-002 | `tests/dropdown.spec.js` | Automated |
| TC-DD-003 | `tests/dropdown.spec.js` | Automated |
| TC-DD-004 | `tests/dropdown.spec.js` | Automated |
| TC-IN-001 | `tests/inputs.spec.js` | Automated |
| TC-IN-002 | `tests/inputs.spec.js` | Automated |
| TC-IN-003 | `tests/inputs.spec.js` | Automated |
| TC-IN-004 | `tests/inputs.spec.js` | Automated |
| TC-IN-005 | `tests/inputs.spec.js` | Automated |
| TC-IN-006 | `tests/inputs.spec.js` | Automated |
| TC-AR-001 | `tests/add-remove-elements.spec.js` | Automated |
| TC-AR-002 | `tests/add-remove-elements.spec.js` | Automated |
| TC-AR-003 | `tests/add-remove-elements.spec.js` | Automated |
| TC-AR-004 | `tests/add-remove-elements.spec.js` | Automated |
| TC-AL-001 | `tests/javascript-alerts.spec.js` | Automated |
| TC-AL-002 | `tests/javascript-alerts.spec.js` | Automated |
| TC-AL-003 | `tests/javascript-alerts.spec.js` | Automated |
| TC-AL-004 | `tests/javascript-alerts.spec.js` | Automated |
| TC-AL-005 | `tests/javascript-alerts.spec.js` | Automated |
| TC-BI-001 | `tests/broken-images.spec.js` | Automated |
| TC-BI-002 | `tests/broken-images.spec.js` | Automated |
| TC-DL-001 | `tests/file-download.spec.js` | Automated |
| TC-DL-002 | `tests/file-download.spec.js` | Automated |
| TC-IFR-001 | `tests/frames.spec.js` | Automated |
| TC-IFR-002 | `tests/frames.spec.js` | Automated |

# Laporan Temuan (Defect & Environment Report)

Dokumen ini mencatat dua temuan dari pengujian portofolio. Satu temuan adalah masalah lingkungan pihak ketiga; satu lagi adalah temuan aksesibilitas pada situs latihan.

> **Konteks:** target pengujian adalah situs latihan publik `the-internet.herokuapp.com`. Temuan di bawah dicatat sebagai latihan, bukan sebagai blocker produk nyata.

## Cara membaca laporan ini

| Istilah | Arti |
|---|---|
| **Severity** | Seberapa parah dampaknya bagi pengguna (Critical / Major / Minor / Low) |
| **Priority** | Seberapa cepat sebaiknya diperbaiki (High / Medium / Low) |
| **Status** | Kondisi temuan saat laporan dibuat |
| **Steps** | Urutan langkah supaya orang lain bisa mengulang temuan yang sama |

| Severity | Arti sederhana |
|---|---|
| Critical | Aplikasi tidak bisa dipakai; data rusak |
| Major | Fitur utama terganggu, tetapi masih ada jalan lain |
| Minor | Gangguan kecil; ada workaround |
| Low | Kosmetik, kenyamanan, atau aksesibilitas ringan |

---

## [ENV-001] Editor TinyMCE di halaman iFrame read-only karena kuota pihak ketiga

| | |
|---|---|
| **ID** | ENV-001 |
| **Tipe** | Environment / third-party service |
| **Modul** | iFrame (`/iframe`) |
| **Severity** | Minor |
| **Priority** | Medium |
| **Status** | Open — blocked |

### Deskripsi

Editor TinyMCE di dalam halaman `/iframe` tidak bisa diklik atau diketik. Setiap percobaan memunculkan dialog:

> "TinyMCE is in read-only mode because you have no more editor loads available this month."

Penyebabnya adalah kuota editor gratis dari penyedia TinyMCE habis untuk bulan berjalan. Ini **bukan cacat kode aplikasi** yang diuji; ini masalah layanan pihak ketiga.

### Langkah reproduksi

1. Buka `https://the-internet.herokuapp.com/iframe`.
2. Klik di dalam area editor.
3. Amati dialog yang muncul.

### Hasil yang diharapkan

- Editor bisa diklik dan digunakan untuk mengetik.
- Tidak ada dialog read-only.

### Hasil aktual

- Dialog read-only muncul dan memblokir interaksi.
- Editor hanya menampilkan teks default "Your content goes here.".

### Dampak

- Pengguna tidak bisa mencoba fitur utama halaman ini.
- Test otomasi untuk **mengedit** isi editor tidak bisa dijalankan sampai kuota pulih.

### Cakupan otomasi saat ini

Test `TC-IFR-002` hanya memverifikasi konten default editor. Tidak ada test otomasi yang mengetik di editor, karena fitur tersebut sedang diblokir.

### Workaround

- Jalankan test konten default saja.
- Tunggu kuota TinyMCE pulih, atau gunakan instance TinyMCE lokal/self-hosted bila ingin menguji fitur edit.
- Catat sebagai **blocked**, bukan sebagai bug produk.

---

## [BUG-002] Checkbox di halaman Checkboxes tidak punya label programatik

| | |
|---|---|
| **ID** | BUG-002 |
| **Tipe** | Accessibility / usability |
| **Modul** | Checkboxes (`/checkboxes`) |
| **Severity** | Low |
| **Priority** | Low |
| **Status** | Open |

### Deskripsi

Halaman `/checkboxes` menampilkan dua checkbox dengan teks di sampingnya ("checkbox 1" dan "checkbox 2"). Namun, teks tersebut **tidak terhubung secara programatik** ke checkbox:

- tidak ada elemen `<label for="...">`,
- tidak ada `aria-label`,
- tidak ada `title`,
- tidak ada `name`.

Akibatnya, pembaca layar (screen reader) hanya mengumumkan "checkbox" tanpa menjelaskan pilihan apa yang sedang dipilih. Ini masalah aksesibilitas, bukan teks yang benar-benar hilang.

### Bukti DOM

```html
<form id='checkboxes'>
  <input type="checkbox"> checkbox 1</br>
  <input type="checkbox" checked> checkbox 2
</form>
```

### Bukti dari browser

Pemeriksaan dengan Playwright pada 20 Oktober 2026:

```js
await page.getByRole("checkbox", { name: "checkbox 1" }).count(); // 0
await page.getByRole("checkbox", { name: "checkbox 2" }).count(); // 0

const info = await page.locator("#checkboxes input").first().evaluate((el) => ({
  labels: el.labels.length,       // 0
  ariaLabel: el.getAttribute("aria-label"), // null
  title: el.getAttribute("title"),          // null
  name: el.getAttribute("name"),            // null
}));
```

### Langkah reproduksi

1. Buka `https://the-internet.herokuapp.com/checkboxes`.
2. Periksa DOM kedua checkbox.
3. Atau jalankan `getByRole("checkbox", { name: "checkbox 1" })` di Playwright.

### Hasil yang diharapkan

- Setiap checkbox punya label yang terhubung, misalnya:

```html
<input id="checkbox-1" type="checkbox">
<label for="checkbox-1">checkbox 1</label>
```

- Nama aksesibel checkbox 1 adalah "checkbox 1".
- Nama aksesibel checkbox 2 adalah "checkbox 2".

### Hasil aktual

- `el.labels.length` bernilai `0`.
- Tidak ada `aria-label`, `title`, atau `name`.
- Query berbasis nama aksesibel mengembalikan 0 elemen.

### Dampak

- Pengguna pembaca layar tidak tahu checkbox mana yang sedang dipilih.
- Test otomasi yang ingin memakai nama aksesibel tidak bisa memakainya; saat ini test memakai indeks elemen.

### Catatan

- Ini temuan aksesibilitas pada situs latihan, bukan blocker fungsi.
- Perbaikan yang disarankan: tambahkan `<label for>` atau `aria-label` pada setiap checkbox.

# Portofolio QA Automation

[English](README.md) | **Bahasa Indonesia**

[![Tests](https://github.com/anonbanana/qa-automation-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/anonbanana/qa-automation-portfolio/actions/workflows/ci.yml)

Portofolio automation testing yang menerapkan prinsip dasar desain test ISTQB Foundation Level terhadap [the-internet.herokuapp.com](https://the-internet.herokuapp.com) — situs latihan publik gratis.

## Tentang proyek ini

Saya menyusun 36 test case dan mengotomasikannya memakai Playwright. Fokusnya tetap di level dasar, tetapi artefaknya lengkap: test case tertulis, traceability matrix, test plan, defect report, dan test summary report.

- **36 test otomatis** di 9 modul.
- **Desain test:** equivalence partitioning, boundary check pada jumlah elemen dinamis, negative testing, dan state transition.
- **Otomasi yang mudah dirawat:** Page Object Model plus fixture Playwright.
- **Hasil yang bisa dilihat:** HTML report, screenshot dan trace saat gagal.
- **CI:** GitHub Actions menjalankan suite pada push ke `main` dan pull request yang menuju `main`.

## Hasil terbaru

| Tanggal | Test | Hasil | Catatan |
|---|---:|---|---|
| 20 Okt 2026 | 36 | **36 lulus, 0 gagal, 0 flaky** | 2 kali berturut-turut, retry lokal 0 |

Catatan eksekusi lengkap ada di [`reports/test-summary-report.md`](reports/test-summary-report.md).

## Tech stack

| Komponen | Pilihan |
|---|---|
| Framework otomasi | Playwright Test (JavaScript) |
| Browser | Chromium |
| CI | GitHub Actions |
| Sistem under test | the-internet.herokuapp.com |
| Pola | Page Object Model + fixture |

## Struktur repo

```
├── pages/                         # Page Object Model
├── fixtures/pages.js              # Fixture Playwright untuk page object
├── support/test-data.js           # Data uji dan teks yang diharapkan
├── tests/                         # 36 test otomatis (9 modul)
│   ├── login.spec.js              # form authentication + kasus negatif
│   ├── checkboxes.spec.js         # centang / uncentang
│   ├── dropdown.spec.js           # pilihan dropdown + daftar opsi
│   ├── inputs.spec.js             # input angka (valid, invalid, nilai khusus)
│   ├── add-remove-elements.spec.js # elemen dinamis + batas jumlah
│   ├── javascript-alerts.spec.js  # alert, confirm, prompt
│   ├── broken-images.spec.js      # deteksi gambar rusak
│   ├── file-download.spec.js      # unduh file + cek ukuran isi
│   └── frames.spec.js             # konten di dalam iframe
├── test-cases/
│   └── test-cases.md              # 36 test case + traceability matrix
├── docs/
│   └── test-plan.md               # scope, risiko, entry/exit criteria
├── reports/
│   ├── bug-report-example.md      # defect & environment report
│   └── test-summary-report.md     # hasil eksekusi dan kesimpulan
├── docs/screenshots/              # screenshot halaman untuk README
└── .github/workflows/ci.yml       # test jalan otomatis tiap push
```

## Desain test

| Teknik | Dipakai di |
|---|---|
| Equivalence partitioning | Login (valid, password salah, username salah); inputs (angka vs teks) |
| Boundary value analysis | Jumlah elemen Add/Remove: 0 → 1 → 2 → 1 → 0 |
| Negative testing | Field kosong, isi spasi, username case-sensitive, input non-angka |
| State transition | Status checkbox, nilai dropdown, hasil alert/confirm/prompt |

> Halaman `/inputs` tidak punya `min` atau `max`. Untuk halaman itu, `9999` adalah **uji ketahanan nilai besar**, bukan uji batas. Saya tulis bedanya secara eksplisit supaya label teknik sesuai dengan test yang benar-benar ada.

## Coverage pengujian

| Modul | Skenario | Jumlah test |
|---|---|---:|
| Login | login valid, password salah, username salah, label, field kosong, spasi, case-sensitive | 8 |
| Checkboxes | kondisi awal, uncentang, centang | 3 |
| Dropdown | kondisi awal, pilih Option 1, pilih Option 2, daftar opsi | 4 |
| Inputs | angka valid, teks ditolak, nilai besar, nol, negatif, desimal | 6 |
| Add/Remove Elements | tambah 1, tambah 3, hapus 1, hapus sampai nol | 4 |
| JavaScript Alerts | alert accept, confirm accept, confirm dismiss, prompt accept, prompt dismiss | 5 |
| Broken Images | jumlah gambar, deteksi gambar rusak | 2 |
| Download | unduh satu file dengan cek isi, daftar file | 2 |
| iFrame | heading halaman, konten default editor | 2 |

**Total: 36 test case**

## Screenshot

| Checkboxes | JavaScript Alerts | Download |
|---|---|---|
| ![Checkboxes](docs/screenshots/checkboxes.png) | ![JavaScript Alerts](docs/screenshots/javascript-alerts.png) | ![Download](docs/screenshots/download.png) |

## Cara menjalankan

```bash
# 1. install dependency
npm ci

# 2. install browser (sekali saja)
npx playwright install chromium

# 3. jalankan semua test (retry lokal = 0)
npm test

# 4. lihat laporan HTML
npm run report
```

Ingin melihat browser bergerak?

```bash
npm run test:headed
```

## Laporan dan dokumentasi

- [Test plan](docs/test-plan.md) — scope, risiko, entry/exit criteria.
- [Test case + traceability](test-cases/test-cases.md) — 36 kasus yang dipetakan ke file spec.
- [Defect report](reports/bug-report-example.md) — `ENV-001` dan `BUG-002`.
- [Test summary report](reports/test-summary-report.md) — hasil eksekusi dan kesimpulan.

## Catatan dan keterbatasan

- Situs target di-host di Heroku free tier dan bisa tertidur. CI memanaskan kesembilan halaman sebelum menjalankan test.
- Run lokal memakai `retries: 0` supaya flakiness terlihat. CI memakai `retries: 2` hanya untuk gangguan jaringan, dan jumlah flaky dicatat di summary report.
- `ENV-001`: editor TinyMCE read-only karena kuota gratis pihak ketiga habis. Suite hanya memverifikasi konten default.
- `BUG-002`: checkbox punya teks di sampingnya, tetapi tidak punya label programatik, sehingga nama aksesibelnya kosong.
- Di luar cakupan: performance, security penetration, API, cross-browser, mobile, audit aksesibilitas menyeluruh, dan visual regression.

## Lisensi

[MIT](LICENSE)

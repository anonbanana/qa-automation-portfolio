# Portofolio QA Automation

[English](README.md) | **Bahasa Indonesia**

[![Tests](https://github.com/anonbanana/qa-automation-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/anonbanana/qa-automation-portfolio/actions/workflows/ci.yml)

Portofolio automation testing tingkat dasar (ISTQB Foundation Level) memakai Playwright terhadap [the-internet.herokuapp.com](https://the-internet.herokuapp.com) — situs latihan publik gratis.

## Tentang proyek ini

Saya menyusun test case dan mengotomasikannya memakai Playwright. Fokusnya sengaja dipertahankan di level dasar:

- Alur uji yang jelas: login, form, checkbox, dropdown, elemen dinamis, JavaScript alert, unduh file, iframe.
- Teknik desain test sederhana: **equivalence partitioning** dan **boundary value analysis** (diterapkan di form login dan input angka).
- Hasil run yang bisa dilihat: HTML report + screenshot otomatis saat gagal.

![Halaman login](docs/screenshots/login.png)

## Tech stack

| Komponen | Pilihan |
|---|---|
| Automation framework | Playwright Test (JavaScript) |
| Browser | Chromium |
| CI | GitHub Actions |
| Sistem under test | the-internet.herokuapp.com |

## Struktur repo

```
├── tests/                  # 25 test case terotomasi (9 modul)
│   ├── login.spec.js               # form authentication
│   ├── checkboxes.spec.js          # centang / uncentang
│   ├── dropdown.spec.js            # pilihan dropdown
│   ├── inputs.spec.js              # input angka (validasi)
│   ├── add-remove-elements.spec.js # elemen dinamis
│   ├── javascript-alerts.spec.js   # alert, confirm, prompt
│   ├── broken-images.spec.js       # deteksi gambar rusak
│   ├── file-download.spec.js       # unduh file
│   └── frames.spec.js              # konten di dalam iframe
├── test-cases/
│   └── test-cases.md       # test case tertulis (manual)
├── reports/
│   └── bug-report-example.md # laporan temuan
├── docs/screenshots/       # screenshot halaman untuk README
└── .github/workflows/ci.yml # test jalan otomatis tiap push
```

## Cara menjalankan

```bash
# 1. install dependency
npm install

# 2. install browser (sekali saja)
npx playwright install chromium

# 3. jalankan semua test
npm test

# 4. lihat laporan HTML
npm run report
```

## Coverage pengujian

| Modul | Skenario | Jumlah test |
|---|---|---|
| Login | login valid, password salah, username salah, label form | 4 |
| Checkboxes | kondisi awal, uncentang, centang | 3 |
| Dropdown | kondisi awal, pilih Option 1, pilih Option 2 | 3 |
| Inputs | angka valid, teks ditolak browser, batas angka besar | 3 |
| Add/Remove Elements | tambah 1, tambah 3, hapus 1 | 3 |
| JavaScript Alerts | alert accept, confirm accept, confirm dismiss | 3 |
| Broken Images | jumlah gambar, deteksi gambar rusak | 2 |
| Download | unduh satu file, daftar file di halaman | 2 |
| iFrame | heading halaman, konten default editor | 2 |

**Total: 25 test case**

## Screenshot

| Checkboxes | JavaScript Alerts | Download |
|---|---|---|
| ![Checkboxes](docs/screenshots/checkboxes.png) | ![JavaScript Alerts](docs/screenshots/javascript-alerts.png) | ![Download](docs/screenshots/download.png) |

## Catatan

- Situs target di-host di Heroku free tier — dyno bisa tertidur, jadi request pertama agak lambat. Timeout sudah disesuaikan, dan CI memanaskan situs dulu sebelum test.
- Beberapa test bisa berstatus *flaky* (lulus saat dicoba ulang) karena server lambat — test-nya sendiri benar.

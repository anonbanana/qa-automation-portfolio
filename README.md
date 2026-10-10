# QA Automation Portfolio

[![Tests](https://github.com/anonbanana/qa-automation-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/anonbanana/qa-automation-portfolio/actions/workflows/ci.yml)

Portofolio automation testing tingkat **dasar (ISTQB Foundation Level)** terhadap [the-internet.herokuapp.com](https://the-internet.herokuapp.com) — situs dummy yang memang disediakan gratis untuk latihan testing.

## Tentang proyek ini

Saya menyusun test case dan mengotomasikannya memakai Playwright. Fokusnya sengaja dipertahankan di level dasar:

- Alur uji yang jelas: login, form, checkbox, dropdown, elemen dinamis, JavaScript alert.
- Teknik desain test sederhana: **equivalence partitioning** dan **boundary value analysis** (diterapkan di pengujian form login dan input angka).
- Hasil run yang bisa dilihat: HTML report + screenshot otomatis saat gagal.

## Tech stack

| Komponen | Pilihan |
|---|---|
| Automation framework | Playwright Test (JavaScript) |
| Browser | Chromium |
| CI | GitHub Actions |
| Sistem under test | the-internet.herokuapp.com |

## Struktur repo

```
├── tests/                  # 19 test case terotomasi (6 modul)
│   ├── login.spec.js               # form authentication
│   ├── checkboxes.spec.js          # centang / uncentang
│   ├── dropdown.spec.js            # pilihan dropdown
│   ├── inputs.spec.js              # input angka (validasi)
│   ├── add-remove-elements.spec.js # elemen dinamis
│   └── javascript-alerts.spec.js   # alert, confirm, prompt
├── test-cases/
│   └── test-cases.md       # contoh test case tertulis (manual)
├── reports/
│   └── bug-report-example.md # contoh laporan temuan
└── .github/workflows/ci.yml # jalankan test otomatis tiap push
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
| Login | login valid, password salah, username salah, cek label form | 4 |
| Checkboxes | kondisi awal, uncentang, centang | 3 |
| Dropdown | kondisi awal, pilih Option 1, pilih Option 2 | 3 |
| Inputs | angka valid, teks ditolak browser, batas angka besar | 3 |
| Add/Remove Elements | tambah 1, tambah 3, hapus 1 | 3 |
| JavaScript Alerts | alert accept, confirm accept, confirm dismiss | 3 |

**Total: 19 test case**

## Catatan

- Situs target di-host di Heroku free tier — dyno bisa tertidur, jadi request pertama agak lambat. Konfigurasi timeout sudah disesuaikan.
- 3 test berstatus *flaky* (lulus setelah percobaan ulang) karena keterlambatan server, bukan karena test-nya salah.

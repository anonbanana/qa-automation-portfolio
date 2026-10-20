# Test Plan — QA Automation Portfolio

| Item | Detail |
|---|---|
| Versi | 1.0 |
| Tanggal | 20 Oktober 2026 |
| Pemilik | QA Automation Portfolio |
| Target | `https://the-internet.herokuapp.com` |
| Referensi | Konsep dasar ISTQB CTFL v4.0.1 |
| Dokumen terkait | `test-cases/test-cases.md`, `reports/bug-report-example.md`, `reports/test-summary-report.md` |

## 1. Tujuan

Menunjukkan penerapan dasar proses pengujian dan otomasi:

- menganalisis perilaku aplikasi,
- merancang test case dengan teknik yang sesuai,
- mengotomasi test dengan Playwright,
- melaporkan cacat secara terstruktur,
- menyimpulkan kesiapan berdasarkan bukti.

## 2. Ruang lingkup

### In scope

- 9 modul UI: login, checkboxes, dropdown, inputs, add/remove elements, JavaScript alerts, broken images, download, dan iframe.
- Pengujian fungsional, negatif, batas jumlah elemen, dan regresi.
- Otomasi end-to-end di Chromium.
- Dokumentasi test case, traceability, defect report, dan test summary report.

### Out of scope

- Performance/load testing.
- Security penetration testing.
- API testing.
- Cross-browser (Firefox/WebKit).
- Mobile viewport.
- Audit aksesibilitas menyeluruh.
- Visual regression.
- Pengujian fitur edit TinyMCE (diblokir kuota pihak ketiga, lihat `ENV-001`).

## 3. Test basis

- Perilaku halaman latihan `the-internet.herokuapp.com` yang terdokumentasi di situs.
- Hasil observasi langsung pada 20 Oktober 2026.
- Tidak ada requirement formal dari pemilik produk. Karena itu, expected result diturunkan dari perilaku halaman yang disengaja dan diverifikasi ulang sebelum dijadikan assertion.
- Keterbatasan ini dicatat sebagai risiko, bukan disembunyikan.

## 4. Risiko dan mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Situs gratis Heroku tertidur atau lambat | Test timeout, hasil palsu | Warm-up sebelum test di CI; `navigationTimeout` 60 detik; retry hanya di CI |
| Konten halaman berubah | Assertion rapuh | Selector berbasis role/id; assertion fleksibel pada data dinamis; review berkala |
| Kuota TinyMCE habis | Fitur edit tidak bisa diuji | Catat sebagai `ENV-001`; uji konten default saja |
| Jaringan CI tidak stabil | Kegagalan acak | Retry 2 di CI; lokal 0 agar flakiness terlihat |
| Data uji bercampur dengan data lain | Hasil tidak konsisten | Setiap test membuka halaman baru; tidak ada data persisten; kredensial hanya untuk situs latihan |
| Test hanya mengandalkan retry | Flakiness tersembunyi | Retry 0 di lokal; flaky dicatat di test summary report |

## 5. Pendekatan pengujian

- **Level:** system/UI testing.
- **Jenis:** functional, negative, boundary check, regression.
- **Teknik desain:**
  - Equivalence partitioning: login valid/tidak valid, input angka/teks.
  - Boundary value analysis: jumlah elemen dinamis 0 → 1 → 0 pada Add/Remove.
  - Negative testing: field kosong, spasi, username case-sensitive, input non-angka.
  - State transition: checkbox, dropdown, alert/confirm/prompt.
- **Otomasi:** Playwright Test, JavaScript, pola Page Object Model, fixture `pages`.
- **Data uji:** disimpan di `support/test-data.js`; tidak memakai data pribadi.

## 6. Lingkungan

| Komponen | Nilai |
|---|---|
| OS | Linux |
| Node.js | 20.20.2 (lokal), 22 (CI) |
| Playwright | 1.64.0 |
| Browser | Chromium (Desktop Chrome) |
| CI | GitHub Actions |
| Port | Tidak ada server lokal; target publik |

## 7. Entry criteria

- Situs target dapat diakses.
- `npm ci` selesai tanpa error.
- Browser Chromium terpasang.
- Test case dan data uji siap.

## 8. Exit criteria

- 100% test case yang direncanakan dieksekusi.
- Seluruh test lulus **2 kali berturut-turut** dari kondisi bersih.
- Tidak ada cacat **Critical** atau **Major** yang terbuka pada alur utama.
- Test summary report diperbarui.
- CI berstatus hijau pada commit yang diuji.

## 9. Deliverables

- `tests/` — 36 test otomatis.
- `pages/` + `fixtures/` — Page Object Model dan fixture.
- `test-cases/test-cases.md` — 36 test case + traceability matrix.
- `reports/bug-report-example.md` — defect & environment report.
- `reports/test-summary-report.md` — hasil eksekusi dan kesimpulan.
- `playwright-report/` — HTML report (artifact CI).

## 10. Peran dan jadwal

| Peran | Tanggung jawab |
|---|---|
| QA owner | Menulis test case, otomasi, menjalankan test, memperbarui laporan |
| Reviewer | Memeriksa konsistensi dokumen dan kode |

Aktivitas dilakukan secara iteratif: analisis → desain → implementasi → eksekusi → pelaporan. Tidak ada batas waktu formal karena ini proyek portofolio.

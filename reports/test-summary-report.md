# Test Summary Report — QA Automation Portfolio

| Item | Detail |
|---|---|
| Tanggal eksekusi | 20 Oktober 2026 |
| Commit | `e37561d` (branch `portfolio-completion`) |
| Target | `https://the-internet.herokuapp.com` |
| Lingkungan | Linux, Node.js 20.20.2, Playwright 1.64.0, Chromium |
| Perintah | `npx playwright test --reporter=list` |
| Test plan | `docs/test-plan.md` |
| Test case | `test-cases/test-cases.md` |

## 1. Ringkasan hasil

| Metrik | Nilai |
|---|---:|
| Test direncanakan | 36 |
| Test dieksekusi | 36 |
| Lulus | 36 |
| Gagal | 0 |
| Flaky | 0 |
| Retry lokal | 0 |
| Durasi | ± 2,3 menit |
| Eksekusi berturut-turut | 2 kali |

**Hasil:** 36/36 lulus (100%), tanpa kegagalan dan tanpa flaky pada dua eksekusi lokal berturut-turut.

## 2. Hasil per modul

| Modul | Test | Lulus | Gagal |
|---|---:|---:|---:|
| Login | 8 | 8 | 0 |
| Checkboxes | 3 | 3 | 0 |
| Dropdown | 4 | 4 | 0 |
| Inputs | 6 | 6 | 0 |
| Add/Remove Elements | 4 | 4 | 0 |
| JavaScript Alerts | 5 | 5 | 0 |
| Broken Images | 2 | 2 | 0 |
| Download | 2 | 2 | 0 |
| iFrame | 2 | 2 | 0 |
| **Total** | **36** | **36** | **0** |

## 3. Cacat dan temuan

| ID | Tipe | Severity | Priority | Status | Ringkasan |
|---|---|---|---|---|---|
| ENV-001 | Environment / third-party | Minor | Medium | Open — blocked | Editor TinyMCE read-only karena kuota pihak ketiga habis |
| BUG-002 | Accessibility | Low | Low | Open | Checkbox tidak punya label programatik; nama aksesibel kosong |

Tidak ada cacat **Critical** atau **Major** yang terbuka.

## 4. Exit criteria

| Kriteria | Status | Bukti |
|---|---|---|
| 100% test case dieksekusi | Terpenuhi | 36/36 |
| Lulus 2 kali berturut-turut | Terpenuhi | Dua run lokal, 36/36 |
| Tidak ada cacat Critical/Major terbuka | Terpenuhi | Hanya ENV-001 (Minor) dan BUG-002 (Low) |
| Test summary report diperbarui | Terpenuhi | Dokumen ini |
| CI hijau pada commit yang diuji | Menunggu push | Akan diperbarui setelah CI berjalan |

## 5. Kesimpulan

Suite ini **siap dipakai sebagai portofolio junior QA automation** dan siap didemokan. Seluruh test yang direncanakan lulus dua kali berturut-turut, tanpa retry lokal, dan tidak ada cacat kritis/tinggi yang terbuka.

Keterbatasan yang perlu disebut jujur:

- Pengujian hanya di Chromium dan hanya level UI.
- Tidak mencakup performance, security, API, mobile, cross-browser, atau audit aksesibilitas menyeluruh.
- Target adalah situs publik tanpa requirement formal; expected result berasal dari perilaku halaman yang terdokumentasi dan observasi.
- Fitur edit TinyMCE tidak diuji karena diblokir kuota pihak ketiga (`ENV-001`).

## 6. Bukti

- Output run: `36 passed (2.3m)` dari `npx playwright test --reporter=list`.
- HTML report: `playwright-report/` (diabaikan git, diunggah sebagai artifact CI).
- Trace dan screenshot kegagalan: `test-results/` (diabaikan git).
- CI: `.github/workflows/ci.yml`.

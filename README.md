# Gugus 4 Widya Karya - Web App

![Gugus 4 Widya Karya](https://raw.githubusercontent.com/aprelryu21/gugusempat/main/logo.png)

Selamat datang di repositori Aplikasi Web Gugus 4 Widya Karya! Ini adalah aplikasi web multifungsi yang dirancang untuk mengelola berbagai kebutuhan administrasi dan dokumentasi kegiatan Kelompok Kerja Guru (KKG). Aplikasi ini dibangun dengan HTML, CSS, dan JavaScript murni, dengan sentuhan desain **Neobrutalism** yang khas.

Aplikasi ini bukan sekadar halaman statis, melainkan sebuah platform dinamis yang terintegrasi dengan layanan Google untuk otomatisasi dan pengelolaan konten.

## ✨ Fitur Utama

-   **📄 Certificate Generator:**
    -   Membuat sertifikat PDF secara *real-time* di sisi klien (*client-side*).
    -   Mengambil nomor sertifikat unik secara otomatis dari Google Apps Script.
    -   Menuliskan nama peserta dan asal sekolah ke dalam templat PDF yang sudah ada.
    -   Menggunakan *library* `pdf-lib.js` untuk manipulasi PDF dan `fontkit` untuk menyematkan font kustom.
    -   Dilindungi kata sandi untuk akses terbatas.

-   **✅ Presensi Peserta:**
    -   Formulir presensi digital untuk setiap kegiatan.
    -   Data presensi dikirim dan disimpan secara otomatis ke Google Sheet melalui Google Apps Script.

-   **📸 Dokumentasi Foto Dinamis:**
    -   Menampilkan galeri foto kegiatan yang diambil langsung dari folder Google Drive menggunakan **Google Drive API**.
    -   Tampilan foto dibagi menjadi bagian *highlight* (grid) dan foto lainnya (carousel).
    -   Konten galeri akan otomatis ter-update jika ada foto baru yang ditambahkan di folder Google Drive terkait.

-   **📥 Unduh Sertifikat:**
    -   Halaman khusus untuk mengunduh sertifikat yang sudah jadi.
    -   Daftar file diambil secara dinamis dari folder Google Drive.
    -   Dilengkapi fitur pencarian untuk memudahkan peserta menemukan sertifikat mereka.
    -   Memiliki fitur hitung mundur (*countdown*) yang membatasi akses sebelum tanggal yang ditentukan.

-   **🎨 Desain & UX:**
    -   Mengusung gaya desain **Neobrutalism** yang berani dan konsisten.
    -   Antarmuka yang sepenuhnya responsif dan *mobile-first*.
    -   Animasi transisi halaman yang mulus menggunakan `View Transitions API`.
    -   Umpan balik pengguna yang jelas melalui modal interaktif untuk konfirmasi, *loading*, dan notifikasi.

## 🛠️ Teknologi yang Digunakan

-   **Front-End:** HTML5, CSS3, JavaScript (ES6+)
-   **Library JavaScript:**
    -   pdf-lib.js: Untuk membuat dan memodifikasi dokumen PDF.
    -   fontkit: Untuk menyematkan font kustom pada PDF.
-   **API & Layanan Eksternal:**
    -   **Google Drive API:** Untuk mengambil daftar file foto dan sertifikat.
    -   **Google Apps Script:** Sebagai *backend* sederhana untuk:
        -   Menyimpan data presensi ke Google Sheet.
        -   Menyimpan data peserta yang membuat sertifikat.
        -   Menghasilkan nomor urut sertifikat yang unik.

## 🚀 Cara Menjalankan

1.  **Clone Repositori**
    ```bash
    git clone https://github.com/namapengguna/nama-repositori.git
    ```
2.  **Buka `index.html`**
    Cukup buka file `index.html` di browser pilihanmu. Untuk fungsionalitas penuh (terutama yang terkait dengan `fetch API`), disarankan untuk menjalankannya melalui server lokal (misalnya, menggunakan ekstensi "Live Server" di VS Code).

3.  **Konfigurasi (Penting!)**
    Untuk menggunakan fungsionalitas penuh, kamu perlu melakukan beberapa konfigurasi di `script.js`:
    -   **Google API Key:** Ganti nilai `GOOGLE_API_KEY` dengan kunci API Google Cloud Platform milikmu yang sudah mengaktifkan Google Drive API.
    -   **Google Apps Script URL:** Ganti URL `SCRIPT_URL` dengan URL *deployment* Google Apps Script milikmu.
    -   **Folder ID Google Drive:** Sesuaikan ID folder di objek `photoDocumentationData` dan `certificateDownloadData` dengan ID folder Google Drive yang kamu gunakan.

## 🧑‍💻 Dibuat Oleh

**AprelRYU**

-   Instagram
-   TikTok
-   YouTube

Butuh aplikasi seperti ini? Jangan ragu untuk menghubungi saya!

---
❤️ Made With Mumet By AprelRYU ❤️

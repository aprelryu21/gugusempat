// State object to hold current context
const appState = {
    currentCertificate: '',
    currentDate: '',
    currentDocActivity: '',
    currentDocDate: '',
    currentDocLink: '',
    currentMateriLink: '',
};

// Default configuration for the application
const defaultConfig = {
    app_title: "Aplikasi Pembuat Sertifikat",
    organization_name: "Gugus 4 Widya Karya",
    welcome_text: "GUGUS 4 WIDYA KARYA"
};

// Descriptions for each certificate
const certificateDescriptions = {
    'Pembelajaran Mendalam': 'Kegiatan Sosialisasi dan Diseminasi Peningkatan Kompetensi Pedagogik Guru dalam Merancang Pembelajaran Mendalam dilaksanakan untuk meningkatkan kemampuan guru dalam merancang proses belajar yang berpusat pada siswa. Melalui kegiatan ini, guru dibimbing memahami prinsip dan penerapan pembelajaran mendalam yang berkesadaran, bermakna, dan menggembirakan, sehingga mampu menciptakan pengalaman belajar yang lebih reflektif dan relevan bagi peserta didik.',
    'Digitalisasi Pembelajaran': 'Kegiatan Diseminasi Pemanfaatan Teknologi Digital untuk Peningkatan Kualitas Pembelajaran bertujuan meningkatkan kompetensi guru dalam memanfaatkan teknologi sebagai sarana inovasi pembelajaran. Melalui kegiatan ini, guru diperkenalkan dengan berbagai platform dan aplikasi digital yang dapat mendukung proses belajar mengajar agar lebih interaktif, efisien, dan relevan dengan kebutuhan peserta didik di era digital.',
    'Sertifikat 3': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc a tincidunt euismod, justo tortor malesuada risus, sit amet dignissim purus turpis et sapien. Nulla facilisi. Phasellus ut tristique ex, in tincidunt eros',
    'Sertifikat 4': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc a tincidunt euismod, justo tortor malesuada risus, sit amet dignissim purus turpis et sapien. Nulla facilisi. Phasellus ut tristique ex, in tincidunt eros',
    'Sertifikat 5': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc a tincidunt euismod, justo tortor malesuada risus, sit amet dignissim purus turpis et sapien. Nulla facilisi. Phasellus ut tristique ex, in tincidunt eros'
};

// Template URLs for each certificate
const certificateTemplates = {
    'Pembelajaran Mendalam': 'https://raw.githubusercontent.com/aprelryu21/gugusempat/main/sertifikat-pm.pdf',
    'Digitalisasi Pembelajaran': 'https://raw.githubusercontent.com/aprelryu21/gugusempat/main/Sertifikat%20Contoh.pdf', // Ganti dengan URL yang sesuai
    'Sertifikat 3': 'https://raw.githubusercontent.com/aprelryu21/gugusempat/main/Sertifikat%20Contoh.pdf',
    'Sertifikat 4': 'https://raw.githubusercontent.com/aprelryu21/gugusempat/main/Sertifikat%20Contoh.pdf',
    'Sertifikat 5': 'https://raw.githubusercontent.com/aprelryu21/gugusempat/main/Sertifikat%20Contoh.pdf'
};

// --- KONFIGURASI GOOGLE DRIVE API ---
const GOOGLE_API_KEY = 'AIzaSyBzhqp-kABhODRjAIpoH-SSjpBRKVrZEUs'; // Ganti dengan API Key Anda
const HIGHLIGHT_PHOTO_COUNT = 10; // Jumlah foto untuk ditampilkan di grid

// Data untuk halaman dokumentasi foto
const photoDocumentationData = {
    'kkg_gugus_4': {
        title: 'Dokumentasi Foto',
        subtitle: 'KKG Gugus 4 Widya Karya Tanggal 04 November 2025',
        googleDriveFolderId: '1PQZqT3iblM0QiGlLOFjOJjXr95ZhirZc', // Ganti dengan ID folder yang benar, contoh: '1_abcdefg...'
        highlightPhotos: [], // Akan diisi dari Google Drive
        carouselPhotos: []   // Akan diisi dari Google Drive
    },
    'kegiatan_2': {
        title: 'Dokumentasi Kegiatan 2',
        subtitle: 'Tanggal Menyusul',
        googleDriveFolderId: 'Folder',
        highlightPhotos: [],
        carouselPhotos: []
    },
    'kegiatan_3': {
        title: 'Dokumentasi Kegiatan 3',
        subtitle: 'Tanggal Menyusul',
        googleDriveFolderId: 'Folder',
        highlightPhotos: [],
        carouselPhotos: []
    },
    'kegiatan_4': {
        title: 'Dokumentasi Kegiatan 4',
        subtitle: 'Tanggal Menyusul',
        googleDriveFolderId: 'Folder',
        highlightPhotos: [],
        carouselPhotos: []
    },
};

// Initialize SDK
if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig: defaultConfig,
        onConfigChange: async (config) => {
            document.getElementById('logoText').textContent = config.welcome_text || defaultConfig.welcome_text;
            document.querySelector('.header h1').textContent = config.app_title || defaultConfig.app_title;
            document.querySelector('.header h2').textContent = config.organization_name || defaultConfig.organization_name;
        },
        mapToCapabilities: (config) => ({
            recolorables: [],
            borderables: [],
            fontEditable: undefined,
            fontSizeable: undefined
        }),
        mapToEditPanelValues: (config) => new Map([
            ["app_title", config.app_title || defaultConfig.app_title],
            ["organization_name", config.organization_name || defaultConfig.organization_name],
            ["welcome_text", config.welcome_text || defaultConfig.welcome_text]
        ])
    });
}

// --- ANIMATION ---
function startGlitchAnimation() {
    const logoText = document.getElementById('logoText');
    setInterval(() => {
        setTimeout(() => {
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    logoText.classList.add('glitch');
                    setTimeout(() => logoText.classList.remove('glitch'), 300);
                }, i * 400);
            }
        }, 2000);
    }, 4000);
}

// --- PAGE NAVIGATION ---
function showPage(pageId) {
    // Fungsi ini tidak lagi digunakan untuk navigasi utama,
    // tapi bisa dipertahankan jika ada penggunaan lain di masa depan.
    document.querySelectorAll('.page-content').forEach(page => {
        const el = page;
        if (el) {
            el.style.display = (id === pageId) ? 'block' : 'none';
        }
    });
}

function updateActiveNav(activeNav) {
    document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));
    // Navigasi sekarang menggunakan tag <a>, jadi kita cari berdasarkan href
    const navLinks = {
        'home': 'index.html',
        'cert': 'sertifikat.html',
        'docs': 'dokumentasi.html'
    };
    const activeLink = document.querySelector(`.nav-button[href="${navLinks[activeNav]}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

function navigateToCertificateForm(certificateName, date) {
    // Mengenkripsi parameter untuk keamanan URL
    const params = new URLSearchParams();
    params.append('sertifikat', certificateName);
    params.append('tanggal', date);
    window.location.href = `buat-sertifikat.html?${params.toString()}`;
}

function showDocModal(activityName, date, link, materiLink) {
    appState.currentDocActivity = activityName;
    appState.currentDocDate = date;
    appState.currentDocLink = link;
    appState.currentMateriLink = materiLink;

    document.getElementById('docModalTitle').textContent = `Anda Akan Membuka Dokumentasi ${activityName}`;
    document.getElementById('docModalDate').textContent = `Yang Dilaksanakan Pada ${date}`;
    document.getElementById('docModalOverlay').style.display = 'flex';
}

function closeDocModal(event) {
    const overlay = document.getElementById('docModalOverlay');
    if (!event || event.target === overlay) {
        overlay.style.display = 'none';
    }
}

function openDocumentation() {
    // Cek apakah link adalah halaman internal atau eksternal
    if (appState.currentDocLink.startsWith('http')) {
        window.open(appState.currentDocLink, '_blank', 'noopener,noreferrer');
    } else {
        window.location.href = appState.currentDocLink;
    }
    closeDocModal();
}

function openMateri() {
    window.open(appState.currentMateriLink, '_blank', 'noopener,noreferrer');
    closeDocModal();
}

function closeConfirmModal(event) {
    const overlay = document.getElementById('confirmModalOverlay');
    if (!event || event.target === overlay) {
        overlay.style.display = 'none';
    }
}

function showNumberErrorModal() {
    document.getElementById('errorModalOverlay').style.display = 'flex';
}

function closeErrorModal(event) {
    const overlay = document.getElementById('errorModalOverlay');
    if (!event || event.target === overlay) {
        overlay.style.display = 'none';
    }
}

function retryNumberGeneration() {
    closeErrorModal();
    // Panggil resetForm lagi untuk mencoba generate nomor baru
    resetForm();
}

// --- CERTIFICATE FORM ---

async function generateUniqueCertificateNumber() {
    // KODE GOOGLE APP SCRIPT 
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzU2s6bI7gKcwv7G7tHz4VmfEl_AgXRov4Hq1NC1kRBt_3tWwR3X5xRGSWq3ORHeF0/exec";

    try {
        const response = await fetch(SCRIPT_URL);
        if (!response.ok) {
            throw new Error('Respons jaringan tidak baik.');
        }
        const data = await response.json();
        if (data.status === 'success') {
            return data.number;
        } else {
            throw new Error(data.message || 'Gagal mendapatkan nomor dari server.');
        }
    } catch (error) {
        console.error("Error fetching unique number:", error);
        return "Error: Gagal memuat nomor"; // Tampilkan pesan error di form
    }
}

async function resetForm() {
    document.getElementById('participantName').value = '';
    document.getElementById('schoolOrigin').value = '';

    // Pastikan tombol create dinonaktifkan saat form di-reset
    checkFormCompleteness();

    const certNumberInput = document.getElementById('certificateNumber');
    certNumberInput.value = "Tunggu, Nomor Sertifikat Sedang Dibuat...";
    certNumberInput.classList.add('input-loading');

    const newNumber = await generateUniqueCertificateNumber();
    certNumberInput.value = newNumber;
    certNumberInput.classList.remove('input-loading');

    // Periksa apakah nomor berhasil dibuat
    if (newNumber.includes("Error")) {
        showNumberErrorModal();
    }

    // Periksa kembali kelengkapan form setelah nomor didapatkan
    checkFormCompleteness();
}

function checkFormCompleteness() {
    const certNumber = document.getElementById('certificateNumber').value;
    const participantName = document.getElementById('participantName').value;
    const schoolOrigin = document.getElementById('schoolOrigin').value;
    const createButton = document.querySelector('.btn-create');

    // Kondisi untuk mengaktifkan tombol
    const isNumberValid = certNumber && !certNumber.includes("Tunggu") && !certNumber.includes("Error");
    const isFormFilled = participantName.trim() !== '' && schoolOrigin.trim() !== '';

    createButton.disabled = !(isNumberValid && isFormFilled);
}

function createCertificate(event) {
    event.preventDefault();
    const participantName = document.getElementById('participantName').value;
    const schoolOrigin = document.getElementById('schoolOrigin').value;

    if (participantName && schoolOrigin) {
        document.getElementById('confirmTitle').textContent =
            `Sertifikat Atas Nama ${participantName} Yang Berasal Dari ${schoolOrigin} Akan Diproses. Apakah Anda Ingin Melanjutkan?`;
        document.getElementById('confirmModalOverlay').style.display = 'flex';
    }
}

async function saveParticipantData(data) {
    // URL ini sama dengan yang digunakan untuk generate nomor
    // PASTIKAN URL INI SAMA DENGAN URL DI FUNGSI generateUniqueCertificateNumber
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzU2s6bI7gKcwv7G7tHz4VmfEl_AgXRov4Hq1NC1kRBt_3tWwR3X5xRGSWq3ORHeF0/exec";

    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Penting untuk menghindari error CORS pada POST sederhana
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        console.log("Permintaan penyimpanan data telah dikirim.");
        // Dengan mode 'no-cors', kita tidak bisa membaca respons, tapi data tetap terkirim.
    } catch (error) {
        console.error("Gagal mengirim data peserta:", error);
        // Gagal menyimpan data tidak akan menghentikan proses download sertifikat
    }
}

// --- PDF CREATION PROCESS ---
async function processCertificate() {
    const modalContent = document.getElementById('confirmModalContent');
    const loadingTexts = [
        'Mengunduh Template Sertifikat...',
        'Memproses Data Peserta...',
        'Menambahkan Informasi ke Sertifikat...',
        'Menyimpan Sertifikat...'
    ];
    let textIndex = 0;

    modalContent.innerHTML = `
        <div class="loading-container">
            <div class="loading-spinner"></div>
            <div class="loading-text">${loadingTexts[0]}<br>Mohon Tunggu Sebentar</div>
        </div>
    `;

    const interval = setInterval(() => {
        textIndex++;
        const loadingTextElement = document.querySelector('.loading-text');
        if (loadingTextElement && loadingTexts[textIndex]) {
            loadingTextElement.innerHTML = `${loadingTexts[textIndex]}<br>Mohon Tunggu Sebentar`;
        } else {
            clearInterval(interval);
        }
    }, 1000);

    try {
        await createCertificatePDF();
        clearInterval(interval);
    } catch (error) {
        clearInterval(interval);
        console.error('Error creating certificate:', error);
        modalContent.innerHTML = `
            <div class="loading-container">
                <div style="color: #e74c3c; font-size: 8px; line-height: 1.4; text-align: center;">
                    Terjadi kesalahan saat membuat sertifikat.<br>
                    Silakan coba lagi atau periksa koneksi internet Anda.
                </div>
                <button class="neobrutalism-button" onclick="closeConfirmModal()" style="margin-top: 20px; width: 100%;">
                    Tutup
                </button>
            </div>
        `;
    }
}

async function createCertificatePDF() {
    const {
        PDFDocument,
        rgb,
        StandardFonts
    } = PDFLib;

    const participantName = document.getElementById('participantName').value;
    const schoolOrigin = document.getElementById('schoolOrigin').value;
    const certificateNumber = document.getElementById('certificateNumber').value;

    // 1. Fetch PDF template
    const templateUrl = certificateTemplates[appState.currentCertificate] || certificateTemplates['Sertifikat 3'];
    const response = await fetch(templateUrl);
    if (!response.ok) throw new Error('Gagal mengunduh template sertifikat');
    const existingPdfBytes = await response.arrayBuffer();

    // 2. Load PDF and embed fonts
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);

    let nameFont;
    try {
        const fontResponse = await fetch('https://raw.githubusercontent.com/aprelryu21/gugusempat/main/fonts.ttf');
        if (fontResponse.ok) {
            const fontBytes = await fontResponse.arrayBuffer();
            nameFont = await pdfDoc.embedFont(fontBytes);
        } else {
            nameFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        }
    } catch (error) {
        console.warn("Custom font failed to load, falling back to standard font.");
        nameFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    }
    const poppinsFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // 3. Draw text on the first page
    const firstPage = pdfDoc.getPages()[0];

    // Certificate Number
    firstPage.drawText(`Nomor : ${certificateNumber}`, {
        x: 250,
        y: 435,
        size: 16,
        font: poppinsFont,
        color: rgb(0, 0, 0),
    });

    // Participant Name (Shadow)
    firstPage.drawText(participantName, {
        x: 211,
        y: 344,
        size: 45,
        font: nameFont,
        color: rgb(0.353, 0.204, 0.596), // #5a3498
    });

    // Participant Name (Main)
    firstPage.drawText(participantName, {
        x: 210,
        y: 345,
        size: 45,
        font: nameFont,
        color: rgb(0.949, 0.576, 0.129), // #f29321
    });

    // School Origin
    firstPage.drawText(schoolOrigin.toUpperCase(), {
        x: 210,
        y: 310,
        size: 16,
        font: poppinsFont,
        color: rgb(0, 0, 0),
    });

    // 4. Save and download PDF
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], {
        type: 'application/pdf'
    });
    const url = URL.createObjectURL(blob);
    const filename = `Sertifikat_${participantName.replace(/\s+/g, '_')}_${Date.now()}.pdf`;

    // Kirim data peserta ke Google Sheet
    saveParticipantData({
        certificateNumber: certificateNumber,
        participantName: participantName,
        schoolOrigin: schoolOrigin
    });

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // 5. Post-download actions
    setTimeout(() => {
        closeConfirmModal();
        resetOriginalConfirmModal();
        showSuccessMessage(participantName);
        resetForm();
    }, 1000);
}

function resetOriginalConfirmModal() {
    const modalContent = document.getElementById('confirmModalContent');
    modalContent.innerHTML = `
        <button class="modal-close" onclick="closeConfirmModal()">×</button>
        <div id="confirmTitle" class="confirm-title"></div>
        <div class="confirm-buttons">
            <button class="neobrutalism-button" onclick="closeConfirmModal()">Batal</button>
            <button class="neobrutalism-button" onclick="processCertificate()">Proses</button>
        </div>
    `;
}

function showSuccessMessage(participantName) {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
        background: #4CAF50; color: white; padding: 15px 25px;
        border: 3px solid #000; box-shadow: 4px 4px 0px #333;
        font-family: 'Press Start 2P', monospace; font-size: 8px;
        z-index: 2000; max-width: 300px; text-align: center; line-height: 1.4;
    `;
    message.textContent = `Sertifikat untuk ${participantName} berhasil dibuat dan diunduh!`;
    document.body.appendChild(message);

    setTimeout(() => {
        document.body.removeChild(message);
    }, 4000);
}

// --- INITIALIZATION ---
window.addEventListener('load', () => {
    // Inisialisasi untuk halaman utama (index.html)
    if (document.getElementById('splashScreen')) {
        startGlitchAnimation();
    }

    // Inisialisasi untuk halaman form (buat-sertifikat.html)
    if (document.getElementById('certificateForm')) {
        const params = new URLSearchParams(window.location.search);
        appState.currentCertificate = params.get('sertifikat');
        appState.currentDate = params.get('tanggal');

        document.getElementById('formTitle').textContent = appState.currentCertificate;
        document.getElementById('formDate').textContent = `Tanggal Pelaksanaan: ${appState.currentDate}`;
        
        const descriptionText = document.querySelector('.description-text');
        if (descriptionText) {
            descriptionText.textContent = certificateDescriptions[appState.currentCertificate] || 'Deskripsi tidak tersedia.';
        }

        // Tambahkan event listener untuk memeriksa kelengkapan form setiap kali user mengetik
        document.getElementById('participantName').addEventListener('input', checkFormCompleteness);
        document.getElementById('schoolOrigin').addEventListener('input', checkFormCompleteness);

        // Panggil resetForm untuk mengisi nomor sertifikat saat halaman dimuat
        resetForm();
    }

    // Inisialisasi umum untuk menampilkan footer di halaman selain splash screen
    const footer = document.getElementById('fixedFooter');
    if (footer && !document.getElementById('splashScreen')) {
        footer.style.display = 'block';
    }

    // --- FUNGSI-FUNGSI GOOGLE DRIVE ---
    async function fetchPhotosFromGoogleDrive(folderId) {
        if (!GOOGLE_API_KEY || GOOGLE_API_KEY === 'MASUKKAN_API_KEY_ANDA_DI_SINI') {
            console.error("PENTING: Google API Key belum diatur di script.js.");
            return []; // Kembalikan array kosong jika API Key tidak ada
        }

        // Meminta webContentLink yang merupakan link download langsung untuk file yang dapat diakses publik.
        const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+(mimeType='image/jpeg'+or+mimeType='image/png')&key=${GOOGLE_API_KEY}&fields=files(id,name,webContentLink)`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                const errorData = await response.json();
                // Memberikan pesan error yang lebih jelas jika folder tidak ditemukan atau akses ditolak
                throw new Error(`Gagal mengambil data dari Google Drive: ${errorData.error.message}. Pastikan folder ID benar dan folder telah dibagikan untuk 'Siapa saja yang memiliki link'.`);
            }
            const data = await response.json();
            // --- LANGKAH DEBUGGING ---
            console.log("Respons mentah dari Google Drive API:", data);
            // -------------------------
            // Ubah data mentah menjadi format URL yang bisa ditampilkan
            return data.files.map(file => ({
                id: file.id,
                name: file.name,
                // Gunakan webContentLink sebagai URL gambar. Ini adalah link download langsung.
                url: file.webContentLink
            }));
        } catch (error) {
            console.error("Error saat mengambil data dari Google Drive:", error);
            // Tampilkan error di UI agar pengguna tahu ada masalah
            const photoGrid = document.querySelector('.photo-grid');
            if (photoGrid) {
                photoGrid.innerHTML = `<div class="photo-placeholder" style="grid-column: 1 / -1;">Gagal memuat foto dari Google Drive. Periksa konsol (F12) untuk detail.</div>`;
            }
            return [];
        }
    }

    // Fungsi untuk memberikan warna bayangan secara berurutan
    function getShadowColor(index) {
        const colors = [
            '#e67e22', '#27ae60', '#2980b9', '#c0392b', '#8e44ad',
            '#2c3e50', '#ff6b6b', '#4ecdc4', '#f9ca24', '#a55eea'
        ];
        return colors[index % colors.length];
    }

    // Inisialisasi untuk halaman dokumentasi foto (dokumentasi-foto.html)
    if (document.querySelector('.photo-grid')) {
        const params = new URLSearchParams(window.location.search);
        const activityId = params.get('kegiatan');
        const activityData = photoDocumentationData[activityId];

        if (!activityData) {
            // Tangani jika data kegiatan tidak ditemukan
            document.getElementById('photoHeaderTitle').textContent = 'Error';
            document.getElementById('photoHeaderSubtitle').textContent = 'Dokumentasi tidak ditemukan.';
            document.querySelector('.photo-grid').innerHTML = '<div class="photo-placeholder">Gagal memuat data kegiatan.</div>';
            return;
        }

        // Ambil daftar foto dari Google Drive
        fetchPhotosFromGoogleDrive(activityData.googleDriveFolderId)
            .then(photos => {
                // Setelah foto didapatkan, lakukan sesuatu dengan mereka
                activityData.highlightPhotos = photos.slice(0, HIGHLIGHT_PHOTO_COUNT);
                activityData.carouselPhotos = photos.slice(HIGHLIGHT_PHOTO_COUNT);

                // Perbarui judul dan subjudul halaman
                document.getElementById('photoHeaderTitle').textContent = activityData.title;
                document.getElementById('photoHeaderSubtitle').textContent = activityData.subtitle;

                if (photos.length === 0) {
                    // --- LANGKAH DEBUGGING ---
                    console.log("Tidak ada foto yang diproses. Array 'photos' kosong.");
                    // -------------------------
                    document.querySelector('.photo-grid').innerHTML = '<div class="photo-placeholder" style="grid-column: 1 / -1;">Tidak ada foto di dalam folder ini.</div>';
                    document.querySelector('.carousel-slides').innerHTML = '<div class="carousel-placeholder">Tidak ada foto lainnya.</div>';
                    return;
                }

                // Isi grid foto
                const photoGrid = document.querySelector('.photo-grid');
                photoGrid.innerHTML = ''; // Kosongkan placeholder
                activityData.highlightPhotos.forEach((photo, index) => {
                    const item = document.createElement('div');
                    item.className = 'photo-item neobrutalism-box-light';
                    item.style.boxShadow = `4px 4px 0px ${getShadowColor(index)}`;
                    item.style.backgroundImage = `url(${photo.url})`;
                    item.style.backgroundSize = 'cover';
                    item.style.backgroundPosition = 'center';
                    photoGrid.appendChild(item);
                });

                // Isi carousel
                const carouselSlides = document.querySelector('.carousel-slides');
                const carouselNavNext = document.querySelector('.carousel-button.next');
                
                if (activityData.carouselPhotos.length > 0) {
                    carouselSlides.innerHTML = ''; // Kosongkan placeholder
                    activityData.carouselPhotos.forEach(photo => {
                        const slide = document.createElement('div');
                        slide.className = 'carousel-slide';
                        slide.style.backgroundImage = `url(${photo.url})`;
                        carouselSlides.appendChild(slide);
                    });
                    if (activityData.carouselPhotos.length > 1) carouselNavNext.disabled = false;
                } else {
                    carouselSlides.innerHTML = '<div class="carousel-placeholder">Tidak ada foto lainnya.</div>';
                }

            })
            .catch(error => {
                console.error("Terjadi kesalahan:", error);
                // Tangani kesalahan jika pengambilan data gagal
            });
    }
});

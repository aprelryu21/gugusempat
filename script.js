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
    'Pembelajaran Mendalam': {
        id: 'pm',
        url: 'https://raw.githubusercontent.com/aprelryu21/gugusempat/main/sertifikat%20pm.pdf'
    },
    'Digitalisasi Pembelajaran': {
        id: 'digitalisasi',
        url: 'https://raw.githubusercontent.com/aprelryu21/gugusempat/main/sertifikat%20digitalisasi.pdf'
    },
    'Sertifikat 3': {
        id: 'sertifikat3',
        url: 'https://raw.githubusercontent.com/aprelryu21/gugusempat/main/Sertifikat%20Contoh.pdf'
    },
    'Sertifikat 4': {
        id: 'sertifikat4',
        url: 'https://raw.githubusercontent.com/aprelryu21/gugusempat/main/Sertifikat%20Contoh.pdf'
    },
    'Sertifikat 5': {
        id: 'sertifikat5',
        url: 'https://raw.githubusercontent.com/aprelryu21/gugusempat/main/Sertifikat%20Contoh.pdf'
    }
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

// Data untuk halaman unduh sertifikat
const certificateDownloadData = {
    'pm': {
        title: 'Unduhan Sertifikat',
        subtitle: 'Pembelajaran Mendalam',
        googleDriveFolderId: '1999rSXMiDKe9eQ7YMwhB5eIEWIOMvwBc'
    },
    'digitalisasi': {
        title: 'Unduhan Sertifikat',
        subtitle: 'Digitalisasi Pembelajaran',
        googleDriveFolderId: '1PVqL2Ij-Ord0WnWZNJJmCupUYS5yySTf'
    },
    'sertifikat3': { title: 'Unduhan Sertifikat', subtitle: 'Sertifikat 3', googleDriveFolderId: '' },
    'sertifikat4': { title: 'Unduhan Sertifikat', subtitle: 'Sertifikat 4', googleDriveFolderId: '' },
    'sertifikat5': { title: 'Unduhan Sertifikat', subtitle: 'Sertifikat 5', googleDriveFolderId: '' },
};

// Data untuk halaman presensi
const attendanceData = {
    'diseminasi_pm': {
        title: 'Diseminasi Pembelajaran Mendalam',
        date: '28 Oktober 2025'
    },
    'kegiatan2': {
        title: 'Diseminasi Digitalisasi Pembelajaran',
        date: 'Menyusul'
    },
    // Tambahkan kegiatan lain di sini
    'kegiatan4': {
        title: 'Kegiatan 4',
        date: 'Menyusul'
    },
    'kegiatan5': {
        title: 'Kegiatan 5',
        date: 'Menyusul'
    }
};

// Variabel global untuk menyimpan daftar file asli
const ATTENDANCE_CONFIG = {
  'diseminasi_pm': { sheetName: 'Presensi Diseminasi PM', numberSheetName: 'nomor_presensi_pm' },
  'kegiatan2': { sheetName: 'Presensi Diseminasi Digitalisasi', numberSheetName: 'nomor_presensi_dd' },
  'kegiatan4': { sheetName: 'Presensi Kegiatan 4', numberSheetName: 'nomor_presensi_k4' },
  'kegiatan5': { sheetName: 'Presensi Kegiatan 5', numberSheetName: 'nomor_presensi_k5' }
};
let allFiles = [];

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
function promptForCertificateGenerator(event) {
    event.preventDefault(); // Mencegah navigasi default
    document.getElementById('passwordModalOverlay').style.display = 'flex';
    document.getElementById('passwordInput').focus(); // Langsung fokus ke input
}

function closePasswordModal(event) {
    const overlay = document.getElementById('passwordModalOverlay');
    // Cek jika event ada dan target adalah overlay itu sendiri
    if (!event || event.target === overlay) {
        overlay.style.display = 'none';
        document.getElementById('passwordInput').value = ''; // Kosongkan input saat ditutup
    }
}

function checkPassword(event) {
    event.preventDefault(); // Mencegah form dari submit standar
    const passwordInput = document.getElementById('passwordInput');
    const password = passwordInput.value;
    const correctPassword = "gugus4"; // password menu certificate generator

    if (password.toLowerCase() === correctPassword) {
        // Jika benar, tutup modal dan arahkan ke halaman sertifikat
        closePasswordModal();
        window.location.href = 'sertifikat.html';
    } else {
        // Jika salah, beri tahu pengguna
        alert("Password yang Anda masukkan salah. Coba lagi.");
        passwordInput.value = ''; // Kosongkan input
        passwordInput.focus(); // Fokus kembali ke input
    }
}

function closeCountdownModal(event) {
    const overlay = document.getElementById('countdownModalOverlay');
    // Cek jika event ada dan target adalah overlay itu sendiri
    if (!event || event.target === overlay) {
        overlay.style.display = 'none';
    }
}

function checkDownloadAvailability(event) {
    event.preventDefault(); // Mencegah navigasi default

    const targetDate = new Date('2025-11-13T00:00:00');
    const currentDate = new Date();

    if (currentDate < targetDate) {
        // Jika belum tanggalnya, hitung sisa hari
        const timeDifference = targetDate.getTime() - currentDate.getTime();
        const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));

        const modalTitle = document.getElementById('countdownModalTitle');
        modalTitle.innerHTML = `Menu Unduh Sertifikat Akan Terbuka Dalam ${daysRemaining} Hari Lagi.<br><br>Silahkan Lakukan Presensi Terlebih Dahulu<br>`;

        document.getElementById('countdownModalOverlay').style.display = 'flex';
    } else {
        // Jika sudah tanggalnya atau lewat, langsung arahkan
        window.location.href = 'unduh.html';
    }
}

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

function navigateToDownloadList(certificateId) {
    const params = new URLSearchParams();
    params.append('sertifikat', certificateId);
    window.location.href = `unduh-daftar.html?${params.toString()}`;
}

function navigateToAttendanceForm(activityId) {
    const params = new URLSearchParams();
    params.append('kegiatan', activityId);
    window.location.href = `presensi-form.html?${params.toString()}`;
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

function showSuccessModal(message) {
    document.getElementById('successModalTitle').textContent = message;
    document.getElementById('successModalOverlay').style.display = 'flex';
}

function closeSuccessModal(event) {
    const overlay = document.getElementById('successModalOverlay');
    if (!event || event.target === overlay) {
        overlay.style.display = 'none';
    }
}

function closeSuccessModalAndRedirect() {
    closeSuccessModal();
    // Arahkan kembali ke halaman daftar presensi
    window.location.href = 'presensi.html';
}

// --- CERTIFICATE FORM ---

async function generateUniqueCertificateNumber() {
    // PASTIKAN ANDA MENGGANTI URL INI DENGAN URL WEB APP BARU ANDA
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzk7fI1ju3NzL-c73umJt4f9u7_71vNXP27YngoiweZd_UJuMcJy-ahkPbl4RV1hAUc/exec"; // Ganti dengan URL baru Anda

    // Dapatkan ID sertifikat dari state
    const certConfig = certificateTemplates[appState.currentCertificate];
    if (!certConfig) return "Error: Tipe sertifikat tidak dikenal";

    try {
        // Tambahkan parameter 'type' ke URL
        const response = await fetch(`${SCRIPT_URL}?type=${certConfig.id}`);
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
    const isNumberValid = certNumber && !certNumber.includes("Tunggu") && !certNumber.includes("Error") && !certNumber.includes("Klik \"Buat Ulang\"");
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
    // URL ini HARUS SAMA dengan yang digunakan untuk generate nomor
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzk7fI1ju3NzL-c73umJt4f9u7_71vNXP27YngoiweZd_UJuMcJy-ahkPbl4RV1hAUc/exec"; // URL yang sudah diperbaiki

    // Tambahkan tipe sertifikat ke data yang akan dikirim
    const certConfig = certificateTemplates[appState.currentCertificate];
    data.certificateType = certConfig.id;

    try {
        // Menambahkan 'requestType' untuk membedakan permintaan di backend
        data.requestType = 'certificate';
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Penting untuk menghindari error CORS pada POST sederhana
            headers: {
                'Content-Type': 'text/plain;charset=utf-8', // Diubah untuk mode no-cors
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

// --- ATTENDANCE FORM ---
async function submitAttendance(event) {
    event.preventDefault();
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzk7fI1ju3NzL-c73umJt4f9u7_71vNXP27YngoiweZd_UJuMcJy-ahkPbl4RV1hAUc/exec"; // URL yang sama
    const submitBtn = document.getElementById('submitAttendanceBtn');
    const loadingModal = document.getElementById('loadingModalOverlay');

    // Nonaktifkan tombol dan tampilkan modal loading
    submitBtn.disabled = true;
    loadingModal.style.display = 'flex';


    const params = new URLSearchParams(window.location.search);
    const activityId = params.get('kegiatan');

    const attendancePayload = {
        requestType: 'attendance', // Tipe permintaan baru
        activityId: activityId,
        nama: document.getElementById('attendanceName').value,
        nip: document.getElementById('attendanceNip').value,
        pangkat: document.getElementById('attendancePangkat').value,
        sekolah: document.getElementById('attendanceSchool').value,
    };

    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(attendancePayload)
        });
        
        // Sembunyikan modal loading sebelum menampilkan pesan sukses
        loadingModal.style.display = 'none';
        // Tampilkan pesan sukses karena dengan 'no-cors' kita tidak bisa membaca respons
        showSuccessModal(`Terima kasih, ${attendancePayload.nama}! Presensi Anda telah berhasil dikirim.`);

    } catch (error) {
        console.error("Gagal mengirim data presensi:", error);
        // Jika terjadi error, sembunyikan modal dan aktifkan kembali tombol
        loadingModal.style.display = 'none';
        submitBtn.disabled = false;
        alert("Gagal mengirim presensi. Silakan periksa koneksi internet Anda dan coba lagi.");
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
    const templateUrl = certificateTemplates[appState.currentCertificate].url;
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
        schoolOrigin: schoolOrigin,
        // Menambahkan nama sertifikat ke data yang akan dikirim
        certificateName: appState.currentCertificate
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

        // Setelah sertifikat dibuat, kosongkan form dan tampilkan pesan
        document.getElementById('participantName').value = '';
        document.getElementById('schoolOrigin').value = '';
        document.getElementById('certificateNumber').value = 'Klik "Buat Ulang" untuk generate nomor sertifikat baru.';
        document.querySelector('.btn-create').disabled = true; // Pastikan tombol buat sertifikat dinonaktifkan
        // Tidak perlu memanggil resetForm() lagi secara otomatis

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

    // Inisialisasi untuk halaman form presensi (presensi-form.html)
    if (document.getElementById('attendanceFormElement')) {
        const params = new URLSearchParams(window.location.search);
        const activityId = params.get('kegiatan');
        const data = attendanceData[activityId];

        if (data) {
            document.getElementById('attendanceFormTitle').textContent = data.title;
            document.getElementById('attendanceFormDate').textContent = `Tanggal: ${data.date}`;
        } else {
            document.getElementById('attendanceFormTitle').textContent = 'Kegiatan Tidak Ditemukan';
        }
    }

    // Inisialisasi umum untuk menampilkan footer di halaman selain splash screen
    const footer = document.getElementById('fixedFooter');
    if (footer && !document.getElementById('splashScreen')) {
        footer.style.display = 'block';
    }

    // --- FUNGSI-FUNGSI GOOGLE DRIVE ---
    async function fetchFilesFromGoogleDrive(folderId, mimeTypeQuery = "(mimeType='image/jpeg'+or+mimeType='image/png')") {
        if (!GOOGLE_API_KEY || GOOGLE_API_KEY === 'MASUKKAN_API_KEY_ANDA_DI_SINI') {
            console.error("PENTING: Google API Key belum diatur di script.js.");
            return []; // Kembalikan array kosong jika API Key tidak ada
        }

        // Kita hanya butuh ID dan nama file. URL akan kita buat sendiri.
        const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+${mimeTypeQuery}&key=${GOOGLE_API_KEY}&fields=files(id,name,webViewLink)`;

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
                // Gunakan URL gambar jika ada, atau link web view untuk file lain
                imageUrl: mimeTypeQuery.includes('image') ? `https://lh3.googleusercontent.com/d/${file.id}` : null,
                downloadUrl: file.webViewLink // Link untuk membuka file di Google Drive
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
        fetchFilesFromGoogleDrive(activityData.googleDriveFolderId, "(mimeType='image/jpeg'+or+mimeType='image/png')")
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
                    // Buat elemen <a> sebagai pembungkus agar bisa diklik
                    const link = document.createElement('a');
                    link.href = photo.downloadUrl; // URL resolusi penuh untuk tab baru
                    link.target = '_blank'; // Buka di tab baru
                    link.rel = 'noopener noreferrer';

                    // Elemen div untuk menampilkan gambar sebagai background
                    const item = document.createElement('div');
                    item.className = 'photo-item neobrutalism-box-light';
                    item.style.boxShadow = `4px 4px 0px ${getShadowColor(index)}`;
                    item.style.backgroundImage = `url(${photo.imageUrl})`;

                    link.appendChild(item); // Masukkan div ke dalam link
                    photoGrid.appendChild(link); // Masukkan link ke dalam grid
                });

                // Isi carousel
                const carouselSlides = document.querySelector('.carousel-slides');
                const carouselNavPrev = document.querySelector('.carousel-button.prev');
                const carouselNavNext = document.querySelector('.carousel-button.next');
                let currentSlideIndex = 0;

                function updateCarousel() {
                    carouselSlides.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
                    carouselNavPrev.disabled = currentSlideIndex === 0;
                    carouselNavNext.disabled = currentSlideIndex === activityData.carouselPhotos.length - 1;
                }

                if (activityData.carouselPhotos.length > 0) {
                    carouselSlides.innerHTML = ''; // Kosongkan placeholder
                    activityData.carouselPhotos.forEach(photo => {
                        // Buat elemen <a> sebagai pembungkus slide
                        const link = document.createElement('a');
                        link.href = photo.downloadUrl;
                        link.target = '_blank';
                        link.rel = 'noopener noreferrer';

                        // Atur link sebagai slide itu sendiri
                        link.className = 'carousel-slide';
                        link.style.backgroundImage = `url(${photo.imageUrl})`;

                        // Tidak perlu elemen div terpisah, link itu sendiri adalah slidenya
                        carouselSlides.appendChild(link);
                    });

                    if (activityData.carouselPhotos.length > 1) {
                        carouselNavNext.disabled = false;
                    }

                    carouselNavPrev.addEventListener('click', () => {
                        if (currentSlideIndex > 0) {
                            currentSlideIndex--;
                            updateCarousel();
                        }
                    });

                    carouselNavNext.addEventListener('click', () => {
                        if (currentSlideIndex < activityData.carouselPhotos.length - 1) {
                            currentSlideIndex++;
                            updateCarousel();
                        }
                    });

                    // Inisialisasi posisi carousel
                    updateCarousel();

                } else {
                    carouselSlides.innerHTML = '<div class="carousel-placeholder">Tidak ada foto lainnya.</div>';
                }

            })
            .catch(error => {
                console.error("Terjadi kesalahan:", error);
                // Tangani kesalahan jika pengambilan data gagal
            });
    }

    // Inisialisasi untuk halaman daftar unduhan (unduh-daftar.html)
    if (document.getElementById('fileGrid')) {
        const params = new URLSearchParams(window.location.search);
        const certificateId = params.get('sertifikat');
        const downloadData = certificateDownloadData[certificateId];

        if (!downloadData || !downloadData.googleDriveFolderId) {
            document.getElementById('downloadHeaderTitle').textContent = 'Error';
            document.getElementById('downloadHeaderSubtitle').textContent = 'Folder tidak ditemukan.';
            document.getElementById('fileGrid').innerHTML = '<div class="download-placeholder">Folder unduhan untuk sertifikat ini belum diatur.</div>';
            return;
        }

        // Perbarui judul halaman
        document.getElementById('downloadHeaderTitle').textContent = downloadData.title;
        document.getElementById('downloadHeaderSubtitle').textContent = downloadData.subtitle;

        // Ambil semua file (bukan hanya gambar)
        fetchFilesFromGoogleDrive(downloadData.googleDriveFolderId, "trashed=false")
            .then(files => {
                allFiles = files; // Simpan daftar file asli
                renderFileList(files); // Tampilkan semua file saat pertama kali dimuat
            });

        // Tambahkan event listener untuk search bar
        document.getElementById('fileSearchInput').addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredFiles = allFiles.filter(file => 
                file.name.toLowerCase().includes(searchTerm)
            );
            renderFileList(filteredFiles);
        });
    }

    function renderFileList(files) {
        const fileGrid = document.getElementById('fileGrid');
        fileGrid.innerHTML = ''; // Kosongkan grid

        if (files.length === 0) {
            fileGrid.innerHTML = '<div class="download-placeholder">Tidak ada file yang ditemukan.</div>';
            return;
        }

        const colors = ['#e67e22', '#27ae60', '#2980b9', '#c0392b', '#8e44ad', '#2c3e50', '#ff6b6b', '#4ecdc4', '#f9ca24', '#a55eea'];

        files.forEach((file, index) => {
            const link = document.createElement('a');
            link.href = file.downloadUrl;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.className = 'download-item';
            
            const color = colors[index % colors.length];
            link.style.boxShadow = `4px 4px 0px ${color}`;
            
            // Atur shadow saat hover
            link.addEventListener('mouseover', () => { link.style.boxShadow = `2px 2px 0px ${color}`; });
            link.addEventListener('mouseout', () => { link.style.boxShadow = `4px 4px 0px ${color}`; });

            const title = document.createElement('div');
            title.className = 'download-item-title';
            title.textContent = file.name.replace(/\.pdf$/i, ''); // Hapus ekstensi .pdf dari tampilan
            link.appendChild(title);
            fileGrid.appendChild(link);
        });
    }
});



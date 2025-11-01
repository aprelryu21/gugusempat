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
    'Pembelajaran Mendalam': 'https://raw.githubusercontent.com/aprelryu21/gugusempat/main/Sertifikat%20Contoh.pdf',
    'Digitalisasi Pembelajaran': 'https://raw.githubusercontent.com/aprelryu21/gugusempat/main/Sertifikat%20Contoh.pdf', // Ganti dengan URL yang sesuai
    'Sertifikat 3': 'https://raw.githubusercontent.com/aprelryu21/gugusempat/main/Sertifikat%20Contoh.pdf',
    'Sertifikat 4': 'https://raw.githubusercontent.com/aprelryu21/gugusempat/main/Sertifikat%20Contoh.pdf',
    'Sertifikat 5': 'https://raw.githubusercontent.com/aprelryu21/gugusempat/main/Sertifikat%20Contoh.pdf'
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
    // Cek dukungan untuk View Transitions API
    if (!document.startViewTransition) {
        updatePageContent(pageId);
        return;
    }

    // Mulai transisi
    document.startViewTransition(() => {
        updatePageContent(pageId);
    });
}

function updatePageContent(pageId) {
    const pages = ['splashScreen', 'certificateList', 'certificateForm', 'documentationPage'];
    const isMainPage = ['certificateList', 'documentationPage'].includes(pageId);

    pages.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = (id === pageId) ? (id === 'splashScreen' ? 'flex' : 'block') : 'none';
        }
    });

    document.getElementById('fixedFooter').style.display = isMainPage ? 'block' : 'none';

    const navMap = { 'splashScreen': 'home', 'certificateList': 'cert', 'documentationPage': 'docs' };
    updateActiveNav(navMap[pageId]);
}

function updateActiveNav(activeNav) {
    document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));
    const activeButton = document.querySelector(`.nav-${activeNav}`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// --- MODAL HANDLING ---
function showModal(certificateName, date) {
    appState.currentCertificate = certificateName;
    appState.currentDate = date;

    document.getElementById('modalTitle').textContent = `Anda Akan Membuka Aplikasi Pembuat ${certificateName}`;
    document.getElementById('modalDate').textContent = `Yang Dilaksanakan Pada ${date}`;
    document.getElementById('modalOverlay').style.display = 'flex';
}

function closeModal(event) {
    const overlay = document.getElementById('modalOverlay');
    if (!event || event.target === overlay) {
        overlay.style.display = 'none';
    }
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
    window.open(appState.currentDocLink, '_blank', 'noopener,noreferrer');
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

// --- CERTIFICATE FORM ---
function generateCertificateNumber() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 9000) + 1000;
    const uniqueId = (timestamp + random).toString().slice(-4);
    return `KKG_G4_KDN / 4.11.${uniqueId} / XI / 2025`;
}

function openCertificateForm() {
    closeModal();
    showPage('certificateForm');

    document.getElementById('formTitle').textContent = appState.currentCertificate;
    document.getElementById('formDate').textContent = `Tanggal Pelaksanaan: ${appState.currentDate}`;
    document.getElementById('certificateNumber').value = generateCertificateNumber();

    const descriptionText = document.querySelector('.description-text');
    if (descriptionText) {
        descriptionText.textContent = certificateDescriptions[appState.currentCertificate] || 'Deskripsi tidak tersedia.';
    }
}

function resetForm() {
    document.getElementById('participantName').value = '';
    document.getElementById('schoolOrigin').value = '';
    document.getElementById('certificateNumber').value = generateCertificateNumber();
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
    startGlitchAnimation();
    // Set initial page view
    showPage('splashScreen');
});
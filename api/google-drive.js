// File: /api/google-drive.js

export default async function handler(request, response) {
  // Ambil folderId dari query parameter di URL
  const { folderId } = request.query;

  // Ambil API Key dari Environment Variable (lebih aman)
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!folderId || !apiKey) {
    return response.status(400).json({ error: 'Parameter tidak lengkap atau API Key tidak diatur di server.' });
  }

  const apiUrl = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+(mimeType='image/jpeg'+or+mimeType='image/png')&key=${apiKey}&fields=files(id,name)`;

  try {
    const driveResponse = await fetch(apiUrl);

    if (!driveResponse.ok) {
      const errorData = await driveResponse.json();
      // Kirim kembali pesan error dari Google untuk debugging
      return response.status(driveResponse.status).json({ 
        error: `Gagal mengambil data dari Google Drive: ${errorData.error.message}` 
      });
    }

    const data = await driveResponse.json();
    
    // Kirim data yang berhasil didapat kembali ke browser
    return response.status(200).json(data);

  } catch (error) {
    return response.status(500).json({ error: 'Terjadi kesalahan internal pada server.' });
  }
}

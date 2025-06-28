import { bobot } from './data/bobot.js';
import { jurusan } from './data/jurusan.js';
import { sambutan } from './data/sambutan.js';

// Ambil jawaban user dari localStorage
const jawaban = JSON.parse(localStorage.getItem('kuisionerSAW'));
if (!jawaban) {
    alert('Data kuisioner tidak ditemukan.');
    window.location.href = 'kuisioner.html';
}

// Proses perhitungan SMART
const hasil = [];

for (const [namaJurusan, nilaiProfil] of Object.entries(jurusan)) {
    let totalSkor = 0;

    for (const kriteria in bobot) {
        const nilaiUser = jawaban[kriteria]; // preferensi user (1–5)
        const nilaiJurusan = nilaiProfil[kriteria]; // kekuatan jurusan pada kriteria itu (1–5)

        const skor = (nilaiUser / 5) * (nilaiJurusan / 5) * bobot[kriteria];
        totalSkor += skor;
    }

    hasil.push({ nama: namaJurusan, skor: totalSkor });
}

// Urutkan berdasarkan skor tertinggi
hasil.sort((a, b) => b.skor - a.skor);

// Ambil 3 jurusan teratas
const jurusanTerbaik = hasil.slice(0, 3);

// Tampilkan hasil ke halaman
const list = document.getElementById('hasilList');
jurusanTerbaik.forEach((jurusan) => {
    list.innerHTML += `
        <li style="margin-bottom: 24px;">
            <strong>${jurusan.nama}</strong> — Skor: ${jurusan.skor.toFixed(3)}
            <p style="margin-top: 8px; font-size: 0.95em; color: #333;">
                ${sambutan[jurusan.nama] ?? 'Deskripsi belum tersedia.'}
            </p>
        </li>
    `;
});

// Debug opsional: tampilkan skor semua jurusan di konsol
console.log('Ranking Semua Jurusan:');
hasil.forEach((j) => {
    console.log(`${j.nama}: ${j.skor.toFixed(3)}`);
});

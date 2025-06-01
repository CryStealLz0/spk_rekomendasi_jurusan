import { bobot } from './data/bobot.js';
import { jurusan } from './data/jurusan.js';
import { sambutan } from './data/sambutan.js';

const jawaban = JSON.parse(localStorage.getItem('kuisionerSAW'));
if (!jawaban) {
    alert('Data kuisioner tidak ditemukan.');
    window.location.href = 'kuisioner.html';
}

const hasil = [];

// Langkah 1: Cari nilai maksimum tiap kriteria
const nilaiMax = {};
for (const kriteria in bobot) {
    nilaiMax[kriteria] = Math.max(
        ...Object.values(jurusan).map((j) => j[kriteria]),
    );
}

// Langkah 2: Hitung skor SAW murni untuk tiap jurusan
for (const [namaJurusan, nilaiProfil] of Object.entries(jurusan)) {
    let totalSkor = 0;

    for (const kriteria in bobot) {
        const nilai = nilaiProfil[kriteria];
        const normalisasi = nilai / nilaiMax[kriteria];
        const skor = normalisasi * bobot[kriteria];
        totalSkor += skor;
    }

    hasil.push({ nama: namaJurusan, skor: totalSkor });
}

// Langkah 3: Urutkan
hasil.sort((a, b) => b.skor - a.skor);

// Langkah 4: Tampilkan ke UI
const list = document.getElementById('hasilList');
hasil.slice(0, 3).forEach((jurusan) => {
    list.innerHTML += `
        <li style="margin-bottom: 24px;">
            <strong>${jurusan.nama}</strong> — Skor: ${jurusan.skor.toFixed(2)}
            <p style="margin-top: 8px; font-size: 0.95em; color: #333;">
                ${sambutan[jurusan.nama] ?? 'Deskripsi belum tersedia.'}
            </p>
        </li>
    `;
});

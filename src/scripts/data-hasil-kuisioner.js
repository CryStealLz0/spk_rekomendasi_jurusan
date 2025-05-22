import { bobot } from './data/bobot.js';
import { jurusan } from './data/jurusan.js';

const jawaban = JSON.parse(localStorage.getItem('kuisionerSAW'));
const hasil = [];

// 1. Hitung nilai maksimum tiap kriteria
const nilaiMax = {};
for (const kriteria in bobot) {
    nilaiMax[kriteria] = Math.max(
        ...Object.values(jurusan).map((j) => j[kriteria]),
    );
}

// 2. Hitung skor SAW
for (const [namaJurusan, nilaiProfilJurusan] of Object.entries(jurusan)) {
    let totalSkor = 0;

    for (const kriteria in bobot) {
        const nilaiUser = jawaban[kriteria] || 0;
        const nilaiIdeal = nilaiMax[kriteria];

        const nilaiNormalisasi = nilaiUser / nilaiIdeal;
        const skorKriteria = nilaiNormalisasi * bobot[kriteria];

        totalSkor += skorKriteria;
    }

    hasil.push({ nama: namaJurusan, skor: totalSkor });
}

// 3. Urutkan dan tampilkan
hasil.sort((a, b) => b.skor - a.skor);

const list = document.getElementById('hasilList');
hasil.slice(0, 3).forEach((jurusan) => {
    list.innerHTML += `<li><strong>${
        jurusan.nama
    }</strong> — Skor: ${jurusan.skor.toFixed(2)}</li>`;
});

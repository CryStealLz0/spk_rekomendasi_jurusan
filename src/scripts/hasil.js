import { bobot } from './data/bobot.js';
import { jurusan } from './data/jurusan.js';
import { sambutan } from './data/sambutan.js';

const jawaban = JSON.parse(localStorage.getItem('kuisionerSAW'));
if (!jawaban) {
    alert('Data kuisioner tidak ditemukan.');
    window.location.href = 'kuisioner.html';
}

// Fungsi pembulatan 2 digit
const round = (val, digits = 2) =>
    Number(Math.round(val + 'e' + digits) + 'e-' + digits);

// ✅ Fungsi pembulatan khusus berbasis .15 dan .25
const customRound = (val) => {
    const rounded = Math.round(val * 20) / 20; // kelipatan 0.05
    const decimal = Number((rounded % 1).toFixed(2)); // ambil pecahan

    // .15 dan .25 → tampilkan 2 digit
    if (decimal === 0.15 || decimal === 0.25) {
        return Number(rounded.toFixed(2));
    }

    // lainnya → 1 digit saja
    return Number(rounded.toFixed(1));
};

const hasil = [];

// 1. Hitung nilai minimum dan maksimum untuk tiap kriteria
const minPerKriteria = {};
const maxPerKriteria = {};
for (const kriteria in bobot) {
    const values = Object.values(jurusan).map((j) => j[kriteria]);
    minPerKriteria[kriteria] = Math.min(...values);
    maxPerKriteria[kriteria] = Math.max(...values);
}

// 2. Hitung skor berdasarkan rumus SMART
for (const [namaJurusan, nilaiProfil] of Object.entries(jurusan)) {
    let totalSkor = 0;

    for (const kriteria in bobot) {
        const min = minPerKriteria[kriteria];
        const max = maxPerKriteria[kriteria];
        const range = max - min;
        const value = nilaiProfil[kriteria];

        const utility = range === 0 ? 0 : (value - min) / range;
        const result = utility * bobot[kriteria];
        const skor = result * jawaban[kriteria];

        totalSkor += skor;
    }

    hasil.push({ nama: namaJurusan, skor: round(totalSkor) });
}

// Urutkan & tampilkan
hasil.sort((a, b) => b.skor - a.skor);
const jurusanTerbaik = hasil.slice(0, 3);

const list = document.getElementById('hasilList');
jurusanTerbaik.forEach((jurusan) => {
    list.innerHTML += `
    <li style="margin-bottom: 24px;">
      <strong>${jurusan.nama}</strong> — Skor: ${customRound(jurusan.skor)}
      <p style="margin-top: 8px; font-size: 0.95em; color: #333;">
        ${sambutan[jurusan.nama] ?? 'Deskripsi belum tersedia.'}
      </p>
    </li>
  `;
});

console.log(
    '=== HASIL PERHITUNGAN SMART (NORMALISASI & CUSTOM ROUND .15/.25) ===',
);
hasil.forEach((j) => {
    console.log(`${j.nama.padEnd(20)} | Skor Akhir: ${customRound(j.skor)}`);
});

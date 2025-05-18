import { bobot } from './src/scripts/data/bobot.js';
import { jurusan } from './src/scripts/data/jurusan.js';

// Ambil jawaban pengguna dari localStorage
const jawaban = JSON.parse(localStorage.getItem('kuisionerSAW'));

// Array untuk menyimpan hasil akhir (nama jurusan dan skor)
const hasil = [];

// Loop setiap jurusan untuk dihitung skornya
for (const [namaJurusan, nilaiProfilJurusan] of Object.entries(jurusan)) {
    let totalSkor = 0;

    // Loop setiap kriteria (logika, teknologi, dll.)
    for (const kriteria in bobot) {
        const nilaiUser = jawaban[kriteria]; // Jawaban user untuk kriteria ini
        const nilaiIdeal = nilaiProfilJurusan[kriteria]; // Nilai ideal dari jurusan

        // Normalisasi: nilai user dibagi nilai ideal (dibatasi maksimum 1)
        const nilaiNormalisasi = Math.min(1, nilaiUser / nilaiIdeal);

        // Hitung skor kontribusi untuk kriteria ini
        const skorKriteria = nilaiNormalisasi * bobot[kriteria];

        // Tambahkan ke total skor jurusan
        totalSkor += skorKriteria;
    }

    // Simpan hasil akhir ke dalam array hasil
    hasil.push({ nama: namaJurusan, skor: totalSkor });
}

// Urutkan hasil dari skor tertinggi ke terendah
hasil.sort((a, b) => b.skor - a.skor);

// Tampilkan 3 jurusan teratas
const list = document.getElementById('hasilList');
hasil.slice(0, 3).forEach((jurusan) => {
    list.innerHTML += `<li><strong>${
        jurusan.nama
    }</strong> — Skor: ${jurusan.skor.toFixed(2)}</li>`;
});

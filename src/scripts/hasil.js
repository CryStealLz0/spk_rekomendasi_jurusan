import { bobot } from './data/bobot.js';
import { jurusan } from './data/jurusan.js';
import { sambutan } from './data/sambutan.js';

const jawaban = JSON.parse(localStorage.getItem('kuisionerSAW'));
if (!jawaban) {
    alert('Data kuisioner tidak ditemukan.');
    window.location.href = 'kuisioner.html';
}

const hasil = [];

// 1. Hitung nilai maksimum dari jurusan untuk setiap kriteria
const nilaiMax = {};
for (const kriteria in bobot) {
    nilaiMax[kriteria] = Math.max(
        ...Object.values(jurusan).map((j) => j[kriteria]),
    );
}

// 2. Hitung skor untuk tiap jurusan (berdasarkan profil jurusan dan bobot tetap)
for (const [namaJurusan, nilaiProfil] of Object.entries(jurusan)) {
    let totalSkor = 0;

    for (const kriteria in bobot) {
        const nilaiUser = jawaban[kriteria];
        const nilaiJurusan = nilaiProfil[kriteria];

        const selisih = Math.abs(nilaiUser - nilaiJurusan);
        const kecocokan = 1 - selisih / 4; // maksimal selisih 4
        const skor = kecocokan * bobot[kriteria];

        totalSkor += skor;
    }

    hasil.push({ nama: namaJurusan, skor: totalSkor });
}

// 3. Urutkan dan tampilkan
hasil.sort((a, b) => b.skor - a.skor);

const list = document.getElementById('hasilList');
hasil.slice(0, 3).forEach((jurusan) => {
    const kriteriaDominan = Object.entries(jawaban)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(([k]) => k);

    const labelKriteria = {
        logika: 'logika dan pemecahan masalah',
        teknologi: 'komputer dan teknologi',
        manajemen: 'manajemen dan organisasi',
        sosial: 'interaksi sosial',
        mesin: 'alat, teknik, dan mesin',
    };

    const alasan = `Karena kamu menyukai ${
        labelKriteria[kriteriaDominan[0]]
    } dan ${labelKriteria[kriteriaDominan[1]]}.`;

    list.innerHTML += `
    <li style="margin-bottom: 24px;">
      <strong>${jurusan.nama}</strong> — Skor: ${jurusan.skor.toFixed(2)}
      <br />
      <small style="color: #555;">${alasan}</small>
      <p style="margin-top: 8px; font-size: 0.95em; color: #333;">
        ${sambutan[jurusan.nama] ?? 'Belum ada deskripsi untuk jurusan ini.'}
      </p>
    </li>
  `;
});

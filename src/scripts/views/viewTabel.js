import { bobot } from '../data/bobot.js';
import { jurusan } from '../data/jurusan.js';

const answer = JSON.parse(localStorage.getItem('kuisionerSAW'));
const output = document.getElementById('output');

if (!answer) {
    output.innerHTML =
        '<p>Data kuisioner tidak ditemukan. Silakan isi kuisioner terlebih dahulu.</p>';
    throw new Error('Jawaban kuisioner tidak ditemukan');
}

// Fungsi pembulatan 2 digit
const round = (val, digits = 2) =>
    Number(Math.round(val + 'e' + digits) + 'e-' + digits);

// Hitung min dan max
const minPerKriteria = {};
const maxPerKriteria = {};
for (let kriteria in bobot) {
    const values = Object.values(jurusan).map((j) => j[kriteria]);
    minPerKriteria[kriteria] = Math.min(...values);
    maxPerKriteria[kriteria] = Math.max(...values);
}

const hasil = Object.entries(jurusan).map(([nama, nilai]) => {
    let total = 0;
    const detail = [];

    for (let kriteria in bobot) {
        const val = nilai[kriteria];
        const min = minPerKriteria[kriteria];
        const max = maxPerKriteria[kriteria];
        const range = max - min;

        const utility = range === 0 ? 0 : (val - min) / range;
        const weighted = utility * bobot[kriteria];
        const final = weighted * answer[kriteria];
        total += final;

        detail.push({
            kriteria,
            value: val,
            min,
            max,
            utility: round(utility),
            bobot: bobot[kriteria],
            result: round(final, 4), // 4 digit untuk hasil akhir tiap kriteria
        });
    }

    return { jurusan: nama, detail, skorAkhir: round(total, 2) };
});

hasil.forEach(({ jurusan, detail, skorAkhir }) => {
    const section = document.createElement('section');
    section.innerHTML = `<h2>${jurusan}</h2>
    <table>
      <thead>
        <tr>
          <th>Kriteria</th>
          <th>Value</th>
          <th>Min</th>
          <th>Max</th>
          <th>Utility</th>
          <th>Bobot</th>
          <th>Skor Akhir (× Answer)</th>
        </tr>
      </thead>
      <tbody>
        ${detail
            .map(
                (d) => `
          <tr>
            <td>${d.kriteria}</td>
            <td>${d.value}</td>
            <td>${d.min}</td>
            <td>${d.max}</td>
            <td>${d.utility}</td>
            <td>${d.bobot}</td>
            <td>${d.result}</td>
          </tr>`,
            )
            .join('')}
        <tr>
          <td colspan="6"><strong>Total Skor</strong></td>
          <td><strong>${skorAkhir}</strong></td>
        </tr>
      </tbody>
    </table>`;
    output.appendChild(section);
});

const bobot = {
    logika: 0.25,
    teknologi: 0.25,
    manajemen: 0.15,
    sosial: 0.2,
    mesin: 0.15,
};

const answer = { logika: 5, teknologi: 5, manajemen: 5, sosial: 5, mesin: 5 };

const jurusan = {
    'Teknik Informatika': {
        logika: 5,
        teknologi: 5,
        manajemen: 3,
        sosial: 2,
        mesin: 2,
    },
    'Teknik Industri': {
        logika: 4,
        teknologi: 4,
        manajemen: 4,
        sosial: 2,
        mesin: 4,
    },
    'Teknik Elektro': {
        logika: 5,
        teknologi: 5,
        manajemen: 2,
        sosial: 1,
        mesin: 5,
    },
    Manajemen: { logika: 3, teknologi: 2, manajemen: 5, sosial: 4, mesin: 1 },
    Akuntansi: { logika: 5, teknologi: 2, manajemen: 4, sosial: 2, mesin: 1 },
    'Ekonomi Syariah': {
        logika: 4,
        teknologi: 2,
        manajemen: 4,
        sosial: 3,
        mesin: 1,
    },
    'Ilmu Hukum': {
        logika: 3,
        teknologi: 1,
        manajemen: 3,
        sosial: 5,
        mesin: 1,
    },
    'Ilmu Komunikasi': {
        logika: 2,
        teknologi: 3,
        manajemen: 4,
        sosial: 5,
        mesin: 1,
    },
    'Sastra Inggris': {
        logika: 2,
        teknologi: 1,
        manajemen: 3,
        sosial: 4,
        mesin: 1,
    },
    PPKn: { logika: 3, teknologi: 1, manajemen: 3, sosial: 5, mesin: 1 },
};

// Fungsi pembulatan 2 digit
const round = (val, digits = 2) =>
    Number(Math.round(val + 'e' + digits) + 'e-' + digits);

// 1. Hitung min dan max untuk setiap kriteria
const minPerKriteria = {};
const maxPerKriteria = {};

for (let kriteria in bobot) {
    const values = Object.values(jurusan).map((j) => j[kriteria]);
    minPerKriteria[kriteria] = Math.min(...values);
    maxPerKriteria[kriteria] = Math.max(...values);
}

// 2. Hitung skor akhir
const hasil = Object.entries(jurusan).map(([nama, nilai]) => {
    let total = 0;
    const detail = {};

    for (let kriteria in bobot) {
        const val = nilai[kriteria];
        const min = minPerKriteria[kriteria];
        const max = maxPerKriteria[kriteria];
        const range = max - min;

        const utilityRaw = range === 0 ? 0 : (val - min) / range;
        const utility = round(utilityRaw);
        const weighted = round(utility * bobot[kriteria]);
        const final = round(weighted * answer[kriteria]);

        total += final;

        detail[kriteria] = {
            nilai: val,
            min,
            max,
            utility,
            result: weighted,
            finalScore: final,
        };
    }

    return {
        jurusan: nama,
        skorAkhir: round(total),
        detail,
    };
});

// 3. Tampilkan hasil akhir
console.log(
    '=== HASIL PERHITUNGAN SMART (NORMALISASI & PEMBULATAN 2 DIGIT) ===',
);
hasil.forEach(({ jurusan, skorAkhir }) => {
    console.log(`${jurusan.padEnd(20)} | Skor Akhir: ${skorAkhir}`);
});

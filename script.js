document
    .getElementById('formKuisioner')
    .addEventListener('submit', function (e) {
        e.preventDefault();

        const keys = ['logika', 'teknologi', 'manajemen', 'sosial', 'mesin'];
        const nilai = {};
        keys.forEach((key) => {
            const val = document.querySelector(`input[name="${key}"]:checked`);
            nilai[key] = parseInt(val.value);
        });

        const bobot = {
            logika: 0.25,
            teknologi: 0.25,
            manajemen: 0.15,
            sosial: 0.2,
            mesin: 0.15,
        };

        const jurusan = {
            'Sistem Informasi': {
                logika: 4,
                teknologi: 5,
                manajemen: 3,
                sosial: 3,
                mesin: 2,
            },
            'Teknik Informatika': {
                logika: 5,
                teknologi: 5,
                manajemen: 3,
                sosial: 2,
                mesin: 2,
            },
            Manajemen: {
                logika: 3,
                teknologi: 2,
                manajemen: 5,
                sosial: 4,
                mesin: 1,
            },
            Akuntansi: {
                logika: 5,
                teknologi: 2,
                manajemen: 4,
                sosial: 2,
                mesin: 1,
            },
            Hukum: {
                logika: 3,
                teknologi: 2,
                manajemen: 4,
                sosial: 5,
                mesin: 1,
            },
            'Ilmu Komunikasi': {
                logika: 3,
                teknologi: 3,
                manajemen: 4,
                sosial: 5,
                mesin: 2,
            },
            'Teknik Industri': {
                logika: 4,
                teknologi: 3,
                manajemen: 3,
                sosial: 2,
                mesin: 4,
            },
            'Teknik Mesin': {
                logika: 4,
                teknologi: 3,
                manajemen: 2,
                sosial: 2,
                mesin: 5,
            },
            'Sastra Inggris': {
                logika: 2,
                teknologi: 1,
                manajemen: 3,
                sosial: 4,
                mesin: 1,
            },
            PPKn: {
                logika: 3,
                teknologi: 2,
                manajemen: 4,
                sosial: 5,
                mesin: 1,
            },
        };

        const hasilAkhir = [];

        for (const [nama, profil] of Object.entries(jurusan)) {
            let skor = 0;
            for (const k in nilai) {
                let normal = Math.min(1, nilai[k] / profil[k]);
                skor += normal * bobot[k];
            }
            hasilAkhir.push({ nama, skor });
        }

        hasilAkhir.sort((a, b) => b.skor - a.skor);

        let output = `<h2>Rekomendasi Jurusan:</h2><ol>`;
        hasilAkhir.slice(0, 3).forEach((j) => {
            output += `<li><strong>${j.nama}</strong> (Skor: ${j.skor.toFixed(
                2,
            )})</li>`;
        });
        output += `</ol>`;

        document.getElementById('hasil').innerHTML = output;
    });

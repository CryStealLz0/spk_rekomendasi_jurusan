import { kriteria } from './data/kriteria.js';

let current = 0;
const answers = {};

const soalNav = document.getElementById('soalNav');
const soalTeks = document.getElementById('soalTeks');
const soalJudul = document.getElementById('soalJudul');
const formSoal = document.getElementById('formSoal');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

function renderSidebar() {
    soalNav.innerHTML = '';
    kriteria.forEach((_, i) => {
        const btn = document.createElement('button');
        btn.textContent = i + 1;
        if (answers[kriteria[i].key]) btn.classList.add('answered');
        if (i === current) btn.classList.add('active');
        btn.onclick = () => {
            saveAnswer();
            current = i;
            renderQuestion();
        };
        soalNav.appendChild(btn);
    });
}

function renderQuestion() {
    const q = kriteria[current];
    soalJudul.textContent = `Pertanyaan ${current + 1}`;
    soalTeks.textContent = q.text;

    const opsi = [
        'Sangat Tidak Sesuai',
        'Tidak Sesuai',
        'Cukup Sesuai',
        'Sesuai',
        'Sangat Sesuai',
    ];

    formSoal.innerHTML = opsi
        .map((val, idx) => {
            const score = idx + 1;
            return `
        <label>
          <input type="radio" name="jawaban" value="${score}" ${
                answers[q.key] == score ? 'checked' : ''
            }>
          ${val}
        </label><br/>
      `;
        })
        .join('');

    renderSidebar();
    updateButtons();
}

function saveAnswer() {
    const selected = document.querySelector('input[name="jawaban"]:checked');
    if (selected) {
        answers[kriteria[current].key] = parseInt(selected.value);
    }
}

function updateButtons() {
    prevBtn.disabled = current === 0;
    nextBtn.textContent =
        current === kriteria.length - 1 ? 'Lihat Hasil' : 'Lanjut';
}

prevBtn.onclick = () => {
    saveAnswer();
    if (current > 0) current--;
    renderQuestion();
};

nextBtn.onclick = () => {
    saveAnswer();

    if (current === kriteria.length - 1) {
        if (Object.keys(answers).length !== kriteria.length) {
            alert('Harap isi semua pertanyaan terlebih dahulu.');
            return;
        }
        localStorage.setItem('kuisionerSAW', JSON.stringify(answers));
        window.location.href = 'hasil.html';
    } else {
        current++;
        renderQuestion();
    }
};
localStorage.getItem('kuisionerSAW');

renderQuestion();

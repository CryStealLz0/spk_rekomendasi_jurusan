// src/scripts/components/footer.js

const footer = document.createElement('footer');
footer.style.backgroundColor = '#1c1f26';
footer.style.color = '#fff';
footer.style.textAlign = 'center';
footer.style.padding = '20px 10px';
footer.style.marginTop = '40px';
footer.style.fontSize = '0.95rem';
footer.style.lineHeight = '1.6';

footer.innerHTML = `
  <p>&copy; ${new Date().getFullYear()} RekomendasiJurusan — Hak cipta dilindungi undang-undang.</p>
  <p>Dibuat dengan 💙 menggunakan Metode SMART untuk Rekomendasi Jurusan</p>
`;

document.body.appendChild(footer);

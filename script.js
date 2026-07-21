// data penduduk
const DATA_DEMOGRAFI = {
  totalPenduduk: 3250,     // TODO: ganti jumlah penduduk asli
  lakiLaki: 1620,          // TODO: ganti jumlah laki-laki asli
  perempuan: 1630,         // TODO: ganti jumlah perempuan asli
  jumlahUMKM: 12,          // TODO: ganti jumlah UMKM asli
  usia: [                  // TODO: ganti kelompok usia & jumlah asli
    { kelompok: "0–14 th", jumlah: 640 },
    { kelompok: "15–24 th", jumlah: 520 },
    { kelompok: "25–54 th", jumlah: 1380 },
    { kelompok: "55–64 th", jumlah: 430 },
    { kelompok: "65+ th", jumlah: 280 },
  ],
  mataPencaharian: [        // TODO: ganti jumlah per mata pencaharian asli
    { label: "Petani & Buruh Tani", jumlah: 1450 },
    { label: "Peternak", jumlah: 310 },
    { label: "Pedagang", jumlah: 240 },
    { label: "Perbengkelan", jumlah: 90 },
    { label: "Jasa Transportasi", jumlah: 120 },
    { label: "Jasa Medis", jumlah: 40 },
    { label: "TNI / Polri", jumlah: 35 },
    { label: "Karyawan Swasta & PNS", jumlah: 260 },
  ],
};

// data berita
const DATA_BERITA = [
  {
    tag: "Pengumuman",
    title: "Contoh: Jadwal Pelayanan Administrasi Bulan Ini",
    excerpt: "Ini contoh ringkasan berita. Ganti judul, tanggal, dan isi ringkasan ini dengan pengumuman resmi dari kantor desa.",
    date: "1 Januari 2026",
    icon: "📢",
    gambar: "", 
  },
  {
    tag: "Kegiatan",
    title: "Contoh: Kerja Bakti Bersih Desa",
    excerpt: "Ini contoh ringkasan berita kegiatan warga. Ganti dengan laporan kegiatan asli beserta tanggal pelaksanaannya.",
    date: "15 Januari 2026",
    icon: "🧹",
    gambar: "", 
  },
  {
    tag: "Pertanian",
    title: "Contoh: Pembagian Bibit untuk Kelompok Tani",
    excerpt: "Ini contoh ringkasan berita seputar program pertanian atau Gapoktan. Ganti dengan informasi resmi terbaru.",
    date: "3 Februari 2026",
    icon: "🌾",
    gambar: "", 
  },
];

// render kartu statistik angka
function renderStatNumbers() {
  const map = {
    "stat-total": DATA_DEMOGRAFI.totalPenduduk,
    "stat-lk": DATA_DEMOGRAFI.lakiLaki,
    "stat-pr": DATA_DEMOGRAFI.perempuan,
    "stat-umkm": DATA_DEMOGRAFI.jumlahUMKM,
  };
  Object.entries(map).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val.toLocaleString("id-ID");
  });
  const umkmCountEl = document.getElementById("umkm-count-num");
  if (umkmCountEl) umkmCountEl.textContent = DATA_DEMOGRAFI.jumlahUMKM.toLocaleString("id-ID");
}

// render chart pakai Chart.js 
function renderCharts() {
  if (typeof Chart === "undefined") return;

  const navy = "#0A2947";
  const navyMuda = "#E7EEF5";
  const palette = ["#0A2947", "#4C7CA8", "#8FB3D6", "#B9CFE4", "#D8E4F0", "#08213A", "#6E97BC", "#A6C3DE"];

  // gender (pie) — hanya dirender kalau canvas-nya ada di halaman ini
  const canvasGender = document.getElementById("chart-gender");
  if (canvasGender) {
    new Chart(canvasGender, {
      type: "pie",
      data: {
        labels: ["Laki-laki", "Perempuan"],
        datasets: [{ data: [DATA_DEMOGRAFI.lakiLaki, DATA_DEMOGRAFI.perempuan], backgroundColor: [navy, "#8FB3D6"] }],
      },
      options: { plugins: { legend: { position: "bottom" } }, maintainAspectRatio: false },
    });
  }

  // usia (bar)
  const canvasUsia = document.getElementById("chart-usia");
  if (canvasUsia) {
    new Chart(canvasUsia, {
      type: "bar",
      data: {
        labels: DATA_DEMOGRAFI.usia.map(u => u.kelompok),
        datasets: [{ label: "Jumlah", data: DATA_DEMOGRAFI.usia.map(u => u.jumlah), backgroundColor: navy, borderRadius: 6 }],
      },
      options: {
        plugins: { legend: { display: false } },
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } },
      },
    });
  }

  // mata pencaharian (bar horizontal)
  const canvasMp = document.getElementById("chart-mp");
  if (canvasMp) {
    new Chart(canvasMp, {
      type: "bar",
      data: {
        labels: DATA_DEMOGRAFI.mataPencaharian.map(m => m.label),
        datasets: [{ label: "Jumlah", data: DATA_DEMOGRAFI.mataPencaharian.map(m => m.jumlah), backgroundColor: palette, borderRadius: 6 }],
      },
      options: {
        indexAxis: "y",
        plugins: { legend: { display: false } },
        maintainAspectRatio: false,
        scales: { x: { beginAtZero: true } },
      },
    });
  }
}

// render kartu berita
function renderBerita() {
  const grid = document.getElementById("berita-grid");
  if (!grid) return;
  grid.innerHTML = DATA_BERITA.map(b => `
    <div class="berita-card">
      <div class="berita-thumb">${b.gambar ? `<img src="${b.gambar}" alt="${b.title}" loading="lazy">` : b.icon}</div>
      <div class="berita-body">
        <div class="berita-tag">${b.tag}</div>
        <div class="berita-title">${b.title}</div>
        <div class="berita-excerpt">${b.excerpt}</div>
        <div class="berita-date">${b.date}</div>
      </div>
    </div>
  `).join("");
}

renderStatNumbers();
renderCharts();
renderBerita();

// ubah navbar dari transparan jadi solid saat halaman discroll
const navHeader = document.querySelector('header.nav');
const toggleNav = () => navHeader.classList.toggle('scrolled', window.scrollY > 60);
toggleNav();
window.addEventListener('scroll', toggleNav);

// menu mobile (burger)
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
burger.addEventListener('click', () => {
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  navLinks.style.cssText += 'flex-direction:column;position:fixed;top:64px;left:0;right:0;background:var(--putih);padding:20px 28px;box-shadow:0 10px 20px rgba(0,0,0,.08);gap:16px;';
});

// animasi reveal saat elemen masuk ke viewport
const revealEls = document.querySelectorAll('[data-reveal]');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: .15 });
revealEls.forEach(el => io.observe(el));

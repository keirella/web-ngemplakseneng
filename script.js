// =========================================================
// DATA KEPENDUDUKAN — sudah data asli (rekap/agregat)
// Sumber: Daftar Penduduk Desa Ngemplakseneng, per akhir April 2022.
// Catatan penting: data ini SENGAJA hanya berupa ANGKA REKAP (total, per gender,
// per kelompok usia) — bukan daftar nama/NIK/KK/alamat per warga. Data individu
// warga tidak dimasukkan ke kode situs karena ini situs publik; menampilkan
// NIK/nama/alamat satu-satu berisiko disalahgunakan untuk pencurian identitas.
// Kalau ada pembaruan data penduduk nanti, cukup update angka rekapnya di sini.
// =========================================================
const DATA_DEMOGRAFI = {
  totalPenduduk: 3389,     // per akhir April 2022
  lakiLaki: 1663,
  perempuan: 1726,
  jumlahUMKM: 5,          // TODO: ganti jumlah UMKM/unit usaha binaan BUMDes yang sebenarnya
  usia: [                  // per akhir April 2022, dihitung dari umur per warga (bukan daftar individu)
    { kelompok: "0–14 th", jumlah: 764 },
    { kelompok: "15–24 th", jumlah: 485 },
    { kelompok: "25–54 th", jumlah: 1404 },
    { kelompok: "55–64 th", jumlah: 366 },
    { kelompok: "65+ th", jumlah: 370 },
  ],
  mataPencaharian: [        // TODO: masih data CONTOH — file penduduk yang dikirim belum ada kolom pekerjaan
    { label: "Petani & Buruh Tani", jumlah: 1450 },
    { label: "Peternak", jumlah: 310 },
    { label: "Pedagang", jumlah: 240 },
    { label: "Perbengkelan", jumlah: 90 },
    { label: "Jasa Transportasi", jumlah: 120 },
    { label: "Jasa Medis", jumlah: 40 },
    { label: "TNI / Polri", jumlah: 35 },
    { label: "Karyawan Swasta & PNS", jumlah: 260 },
  ],
  agama: [                  // per akhir April 2022
    { label: "Islam", jumlah: 3341 },
    { label: "Kristen", jumlah: 39 },
    { label: "Katholik", jumlah: 9 },
  ],
  alamat: [                  // per akhir April 2022 — jumlah warga per dusun/wilayah
    { label: "Pacitan", jumlah: 484 },
    { label: "Dampit", jumlah: 358 },
    { label: "Jati", jumlah: 248 },
    { label: "Gulangan", jumlah: 246 },
    { label: "Gunting", jumlah: 236 },
    { label: "Dukuhan", jumlah: 226 },
    { label: "Parangharjo", jumlah: 183 },
    { label: "Jaten", jumlah: 176 },
    { label: "Tiyeng", jumlah: 150 },
    { label: "Randusari", jumlah: 149 },
    { label: "Weru", jumlah: 147 },
    { label: "Cangakan", jumlah: 140 },
    { label: "Losari", jumlah: 137 },
    { label: "Seneng", jumlah: 115 },
    { label: "Bogag", jumlah: 112 },
    { label: "Bulurejo", jumlah: 93 },
    { label: "Jetis", jumlah: 68 },
    { label: "Ngemplak", jumlah: 63 },
    { label: "Gambrengan", jumlah: 39 },
    { label: "Salamrejo", jumlah: 19 },
  ],
};

// =========================================================
// CARA MENAMBAH FOTO KEGIATAN:
// 1. Taruh file foto di folder assets/image/ (contoh: assets/image/kerja-bakti-1.jpg)
// 2. Isi properti "gambar" dengan path relatif dari folder pages/, jadi diawali "../assets/image/..."
//    misal: gambar: "../assets/image/kerja-bakti-1.jpg"
// 3. Kalau "gambar" tidak diisi (dihapus/kosong), kartu akan otomatis pakai ikon emoji di "icon"
// Kegiatan boleh sebanyak apapun — tinggal tambah objek baru { ... } di dalam array ini.
// =========================================================
const DATA_BERITA = [
  // TODO: ganti dengan berita asli desa. Tambah objek baru untuk berita baru.
  {
    tag: "Pengumuman",
    title: "Contoh: Jadwal Pelayanan Administrasi Bulan Ini",
    excerpt: "Ini contoh ringkasan berita. Ganti judul, tanggal, dan isi ringkasan ini dengan pengumuman resmi dari kantor desa.",
    date: "1 Januari 2026",
    icon: "📢",
    gambar: "", // contoh: "../assets/image/pengumuman-1.jpg"
  },
  {
    tag: "Kegiatan",
    title: "Contoh: Kerja Bakti Bersih Desa",
    excerpt: "Ini contoh ringkasan berita kegiatan warga. Ganti dengan laporan kegiatan asli beserta tanggal pelaksanaannya.",
    date: "15 Januari 2026",
    icon: "🧹",
    gambar: "", // contoh: "../assets/image/kerja-bakti-1.jpg"
  },
  {
    tag: "Pertanian",
    title: "Contoh: Pembagian Bibit untuk Kelompok Tani",
    excerpt: "Ini contoh ringkasan berita seputar program pertanian atau Gapoktan. Ganti dengan informasi resmi terbaru.",
    date: "3 Februari 2026",
    icon: "🌾",
    gambar: "", // contoh: "../assets/image/bibit-tani-1.jpg"
  },
];

// Render kartu statistik angka
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
}

// Render chart pakai Chart.js (dimuat lewat CDN di index.html)
function renderCharts() {
  if (typeof Chart === "undefined") return;

  const navy = "#0A2947";
  const navyMuda = "#E7EEF5";
  const palette = ["#0A2947", "#4C7CA8", "#8FB3D6", "#B9CFE4", "#D8E4F0", "#08213A", "#6E97BC", "#A6C3DE"];

  // Gender (pie) — hanya dirender kalau canvas-nya ada di halaman ini
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

  // Usia (bar)
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

  // Mata pencaharian (bar horizontal)
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

  // Agama (pie)
  const canvasAgama = document.getElementById("chart-agama");
  if (canvasAgama) {
    new Chart(canvasAgama, {
      type: "pie",
      data: {
        labels: DATA_DEMOGRAFI.agama.map(a => a.label),
        datasets: [{ data: DATA_DEMOGRAFI.agama.map(a => a.jumlah), backgroundColor: [navy, "#8FB3D6", "#D8E4F0"] }],
      },
      options: { plugins: { legend: { position: "bottom" } }, maintainAspectRatio: false },
    });
  }

  // Alamat / dusun (bar horizontal)
  const canvasAlamat = document.getElementById("chart-alamat");
  if (canvasAlamat) {
    new Chart(canvasAlamat, {
      type: "bar",
      data: {
        labels: DATA_DEMOGRAFI.alamat.map(a => a.label),
        datasets: [{ label: "Jumlah", data: DATA_DEMOGRAFI.alamat.map(a => a.jumlah), backgroundColor: navy, borderRadius: 5 }],
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

// Render kartu berita
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

// Ubah navbar dari transparan jadi solid saat halaman discroll
const navHeader = document.querySelector('header.nav');
const toggleNav = () => navHeader.classList.toggle('scrolled', window.scrollY > 60);
toggleNav();
window.addEventListener('scroll', toggleNav);

// Menu mobile (burger)
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
burger.addEventListener('click', () => {
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  navLinks.style.cssText += 'flex-direction:column;position:fixed;top:64px;left:0;right:0;background:var(--putih);padding:20px 28px;box-shadow:0 10px 20px rgba(0,0,0,.08);gap:16px;';
});

// Animasi reveal saat elemen masuk ke viewport
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

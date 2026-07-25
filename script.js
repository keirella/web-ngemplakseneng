// =========================================================
// DATA KEPENDUDUKAN — sudah data asli (rekap/agregat)
// Sumber: Daftar Penduduk Desa Ngemplakseneng, per akhir April 2022.
// Catatan penting: data ini SENGAJA hanya berupa ANGKA REKAP (total, per gender,
// per kelompok usia) — bukan daftar nama/NIK/KK/alamat per warga. Data individu
// warga tidak dimasukkan ke kode situs karena ini situs publik; menampilkan
// NIK/nama/alamat satu-satu berisiko disalahgunakan untuk pencurian identitas.
// Kalau ada pembaruan data penduduk nanti, cukup update angka rekapnya di sini.
// =========================================================
const DEFAULT_DATA_DEMOGRAFI = {
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
// DATA BUMDES — unit usaha BUMDes "Bina Usaha Sejahtera"
// Cara menambah/edit unit: copy salah satu blok { ... }, ganti isinya.
// =========================================================
const DEFAULT_DATA_BUMDES = [
  { icon: "🛒", nama: "UMKM", deskripsi: "Membina & mendampingi usaha mikro milik warga desa." },
  { icon: "💰", nama: "Simpan Pinjam", deskripsi: "Layanan simpan pinjam untuk membantu permodalan usaha warga." },
  { icon: "🍡", nama: "Jajanan Pasar", deskripsi: "Unit usaha kuliner & jajanan pasar tradisional." },
  { icon: "🧾", nama: "Perpajakan", deskripsi: "Layanan pembayaran pajak & retribusi desa." },
  { icon: "🍈", nama: "Tanam Melon", deskripsi: "Unit usaha pertanian melon sebagai sumber pendapatan desa." },
];

// =========================================================
// CARA MENAMBAH FOTO KEGIATAN:
// 1. Taruh file foto di folder assets/image/ (contoh: assets/image/kerja-bakti-1.jpg)
// 2. Isi properti "gambar" dengan path relatif dari folder pages/, jadi diawali "../assets/image/..."
//    misal: gambar: "../assets/image/kerja-bakti-1.jpg"
// 3. Kalau "gambar" tidak diisi (dihapus/kosong), kartu akan otomatis pakai ikon emoji di "icon"
// Kegiatan boleh sebanyak apapun — tinggal tambah objek baru { ... } di dalam array ini.
// =========================================================
const DEFAULT_DATA_BERITA = [
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

// =========================================================
// DATA AKTIF YANG DIPAKAI HALAMAN — diisi dari Firebase kalau sudah
// disetel (lihat firebase-config.js & PANDUAN_ADMIN.md), kalau belum
// otomatis pakai data bawaan (DEFAULT_...) di atas.
// =========================================================
let DATA_DEMOGRAFI = DEFAULT_DATA_DEMOGRAFI;
let DATA_BUMDES = DEFAULT_DATA_BUMDES;
let DATA_BERITA = DEFAULT_DATA_BERITA;

// Ambil data terbaru dari Google Sheets (lewat Apps Script), kalau sudah disetel
async function loadLiveData() {
  if (typeof isDataConfigReady !== "function" || !isDataConfigReady()) return; // belum disetel — pakai data bawaan
  try {
    const res = await fetch(APPS_SCRIPT_URL, { method: "GET" });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    if (data.demografi) DATA_DEMOGRAFI = data.demografi;
    if (data.bumdes) DATA_BUMDES = data.bumdes;
    if (data.berita) DATA_BERITA = data.berita;
  } catch (e) {
    console.warn("Gagal mengambil data terbaru, memakai data bawaan:", e);
  }
}

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

// Render kartu unit BUMDes
function renderBUMDes() {
  const grid = document.getElementById("bumdes-grid");
  if (!grid) return;
  grid.innerHTML = DATA_BUMDES.map(b => `
    <div class="bumdes-card">
      <div class="ico-wrap">${b.icon}</div>
      <b>${b.nama}</b>
      <span>${b.deskripsi}</span>
    </div>
  `).join("");
}

async function initSite() {
  await loadLiveData();
  renderStatNumbers();
  renderCharts();
  renderBerita();
  renderBUMDes();
  window.__siteDataReady = true;
  window.dispatchEvent(new Event("site-data-ready"));
}
window.__siteDataReady = false;
initSite();

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

// ========== Leaflet map initializer (only runs when #map exists) ==========
function initLeafletMapIfPresent() {
  const mapEl = document.getElementById('map');
  if (!mapEl) return; // nothing to do on pages without a map
  if (typeof L === 'undefined') { console.error('Leaflet belum dimuat di halaman ini.'); return; }

  // GeoJSON folder path: depends whether page is inside /pages/
  const basePath = location.pathname.includes('/pages/') ? '../assets/tatagunalahan_geojson/' : 'assets/tatagunalahan_geojson/';

  const filenames = [
    'ADMINISTRASIDESA_AR_Ngemplakseneng.geojson',
    'AGRIKEBUN_AR_Clipped.geojson',
    'AGRILADANG_AR_Clipped.geojson',
    'AGRISAWAH_AR_Clipped.geojson',
    'JALAN_LN_Clipped.geojson',
    'NONAGRISEMAKBELUKAR_AR_Clipped.geojson',
    'PASIR_AR_Clipped.geojson',
    'PEMUKIMAN_AR_Clipped.geojson',
    'SUNGAI_LN_Clipped.geojson'
  ];

  const styles = {
    'AGRISAWAH_AR_Clipped.geojson': { color: '#0a5', fillColor: '#9fe6b8', weight: 1, opacity: 0.8, fillOpacity: 0.6 },
    'AGRILADANG_AR_Clipped.geojson': { color: '#13623a', fillColor: '#3b8b3b', weight: 1, opacity: 0.8, fillOpacity: 0.6 },
    'AGRIKEBUN_AR_Clipped.geojson': { color: '#085a12', fillColor: '#4CAF50', weight: 1, opacity: 0.8, fillOpacity: 0.6 },
    'NONAGRISEMAKBELUKAR_AR_Clipped.geojson': { color: '#044e28', fillColor: '#044e28', weight: 1, opacity: 0.8, fillOpacity: 0.6 },
    'PASIR_AR_Clipped.geojson': { color: '#5e5e5e', fillColor: '#5e5e5e', weight: 1, opacity: 0.8, fillOpacity: 0.6 },
    'PEMUKIMAN_AR_Clipped.geojson': { color: '#861717', fillColor: '#861717', weight: 1, opacity: 0.8, fillOpacity: 0.6 },
    'JALAN_LN_Clipped.geojson': { color: '#111', weight: 3, opacity: 0.8 },
    'SUNGAI_LN_Clipped.geojson': { color: '#21d4ff', weight: 3, opacity: 0.8 },
    'ADMINISTRASIDESA_AR_Ngemplakseneng.geojson': { color: '#000', weight: 2, fill: false }
  };

  // create map
  const map = L.map('map', { zoomControl: true });

  // satellite basemap (ESRI World Imagery)
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri', maxZoom: 19
  }).addTo(map);

  const created = [];
  const layersControl = {};

  // load each file and add to map
  Promise.all(filenames.map(fn => fetch(basePath + fn).then(r => {
    if (!r.ok) throw new Error('Gagal memuat ' + fn);
    return r.json();
  }).then(geo => {
    const style = styles[fn] || { color: '#666', fillColor: '#ccc', weight: 1, fillOpacity: 0.7 };
    const layer = L.geoJSON(geo, {
      style: style,
      pointToLayer: (feature, latlng) => L.circleMarker(latlng, { radius: 4, fillColor: style.fillColor || style.color, color: style.color, weight: 1, fillOpacity: 0.9 }),
      onEachFeature: (feature, layer) => {
        if (feature && feature.properties) {
          const remark = feature.properties.REMARK || feature.properties.remark || feature.properties.keterangan || feature.properties.KETERANGAN || feature.properties.remarks || feature.properties.REMARKS || 'Tidak ada keterangan';
          layer.bindPopup(`<div style="max-width:260px">${remark}</div>`);
        }
      }
    }).addTo(map);

    created.push(layer);
  }).catch(err => {
    console.warn(err);
  }))).then(() => {
    if (created.length) {
      const group = L.featureGroup(created);
      try { map.fitBounds(group.getBounds(), { maxZoom: 18 }); } catch (e) { map.setView([-7.678,110.8], 14); }
      // ensure Leaflet correctly renders when map container size changes
      setTimeout(() => map.invalidateSize(true), 350);
    }
  }).catch(err => {
    console.error(err);
    // show friendly message to the user with instructions to run a local server
    const fallback = document.getElementById('map-fallback');
    if (fallback) {
      fallback.style.display = 'block';
      fallback.innerHTML = `Peta gagal memuat layer GeoJSON saat membuka file langsung (file://). Untuk menampilkan peta, jalankan situs lewat server lokal. Contoh menjalankan server sederhana dengan Python di folder proyek:\n\n<pre style="background:#fff;padding:8px;border-radius:6px;border:1px solid #eee;">python -m http.server 8000</pre>\n\nLalu buka http://localhost:8000/pages/peta.html di browser.`;
    }
  });
  // also try to fix map rendering after window resizes (helpful in some browsers)
  window.addEventListener('resize', () => { setTimeout(() => map.invalidateSize(), 200); });
}

document.addEventListener('DOMContentLoaded', initLeafletMapIfPresent);

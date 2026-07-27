document.addEventListener("DOMContentLoaded", function () {

  let ADMIN_TOKEN = sessionStorage.getItem("admin_token") || "";

  let statusHideTimer = null;
  const STATUS_ICONS = { ok: "✓", err: "✕", loading: "⏳" };

  function showStatus(msg, type) {
    const el = document.getElementById("status-msg");
    el.innerHTML = "";

    const ico = document.createElement("span");
    ico.className = "status-ico";
    ico.textContent = STATUS_ICONS[type] || "";

    const text = document.createElement("span");
    text.className = "status-text";
    text.textContent = msg;

    el.appendChild(ico);
    el.appendChild(text);
    el.className = "status-msg " + type + " show";

    clearTimeout(statusHideTimer);
    if (type !== "loading") {
      const delay = type === "err" ? 4500 : 3000;
      statusHideTimer = setTimeout(() => { el.classList.remove("show"); }, delay);
    }
  }

  async function postToScript(payload) {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
    return res.json();
  }

  /* ---------- Kelompok usia / mata pencaharian / agama / alamat ---------- */
  function renderKVRows(containerId, data, labelKey) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    (data || []).forEach(item => addKVRow(containerId, item[labelKey] || "", item.jumlah ?? ""));
  }
  function addKVRow(containerId, labelVal, jumlahVal) {
    const container = document.getElementById(containerId);
    const row = document.createElement("div");
    row.className = "kv-row";
    row.innerHTML = `
      <input type="text" class="kv-label" placeholder="Nama/label" value="${labelVal}">
      <input type="number" class="kv-jumlah" placeholder="Jumlah" value="${jumlahVal}">
      <button type="button" class="row-remove">&times;</button>
    `;
    row.querySelector(".row-remove").addEventListener("click", () => row.remove());
    container.appendChild(row);
  }
  function collectKVRows(containerId, labelKey) {
    const rows = document.querySelectorAll("#" + containerId + " .kv-row");
    const out = [];
    rows.forEach(r => {
      const label = r.querySelector(".kv-label").value.trim();
      const jumlah = parseInt(r.querySelector(".kv-jumlah").value, 10) || 0;
      if (label) { const o = {}; o[labelKey] = label; o.jumlah = jumlah; out.push(o); }
    });
    return out;
  }

  /* ---------- BUMDes ---------- */
  function renderBumdesRows(data) {
    const container = document.getElementById("rows-bumdes");
    container.innerHTML = "";
    (data || []).forEach(u => addBumdesRow(u.icon || "", u.nama || "", u.deskripsi || ""));
  }
  function addBumdesRow(icon, nama, deskripsi) {
    const container = document.getElementById("rows-bumdes");
    const row = document.createElement("div");
    row.className = "berita-card-edit";
    row.innerHTML = `
      <button type="button" class="row-remove">&times;</button>
      <div class="field-row">
        <div class="field"><label>Ikon (emoji)</label><input type="text" class="bd-icon" value="${icon}"></div>
        <div class="field"><label>Nama Unit</label><input type="text" class="bd-nama" value="${nama}"></div>
      </div>
      <div class="field"><label>Deskripsi Singkat</label><textarea class="bd-desc">${deskripsi}</textarea></div>
    `;
    row.querySelector(".row-remove").addEventListener("click", () => row.remove());
    container.appendChild(row);
  }
  function collectBumdesRows() {
    const rows = document.querySelectorAll("#rows-bumdes .berita-card-edit");
    const out = [];
    rows.forEach(r => {
      const nama = r.querySelector(".bd-nama").value.trim();
      if (!nama) return;
      out.push({
        icon: r.querySelector(".bd-icon").value.trim() || "🏪",
        nama: nama,
        deskripsi: r.querySelector(".bd-desc").value.trim(),
      });
    });
    return out;
  }

  /* ---------- Berita & Kegiatan ---------- */
  function renderBeritaRows(data) {
    const container = document.getElementById("rows-berita");
    container.innerHTML = "";
    (data || []).forEach(b => addBeritaRow(b));
  }
  function addBeritaRow(b) {
    b = b || {};
    const container = document.getElementById("rows-berita");
    const row = document.createElement("div");
    row.className = "berita-card-edit";
    row.innerHTML = `
      <button type="button" class="row-remove">&times;</button>
      <div class="field-row">
        <div class="field"><label>Tag</label><input type="text" class="b-tag" value="${b.tag || ""}"></div>
        <div class="field"><label>Tanggal</label><input type="text" class="b-date" value="${b.date || ""}" placeholder="cth: 1 Januari 2026"></div>
        <div class="field"><label>Ikon (emoji, dipakai kalau tidak ada foto)</label><input type="text" class="b-icon" value="${b.icon || "📰"}"></div>
      </div>
      <div class="field" style="margin-bottom:10px;"><label>Judul</label><input type="text" class="b-title" value="${b.title || ""}"></div>
      <div class="field" style="margin-bottom:10px;"><label>Ringkasan</label><textarea class="b-excerpt">${b.excerpt || ""}</textarea></div>
      <div class="field"><label>Path Foto (kosongkan kalau pakai ikon)</label><input type="text" class="b-gambar" value="${b.gambar || ""}"></div>
    `;
    row.querySelector(".row-remove").addEventListener("click", () => row.remove());
    container.appendChild(row);
  }
  function collectBeritaRows() {
    const rows = document.querySelectorAll("#rows-berita .berita-card-edit");
    const out = [];
    rows.forEach(r => {
      const title = r.querySelector(".b-title").value.trim();
      if (!title) return;
      out.push({
        tag: r.querySelector(".b-tag").value.trim(),
        title: title,
        excerpt: r.querySelector(".b-excerpt").value.trim(),
        date: r.querySelector(".b-date").value.trim(),
        icon: r.querySelector(".b-icon").value.trim() || "📰",
        gambar: r.querySelector(".b-gambar").value.trim(),
      });
    });
    return out;
  }

  /* ---------- Isi form dari data yang sudah dimuat situs utama ---------- */
  function populateForms() {
    document.getElementById("f-total").value = DATA_DEMOGRAFI.totalPenduduk || 0;
    document.getElementById("f-lk").value = DATA_DEMOGRAFI.lakiLaki || 0;
    document.getElementById("f-pr").value = DATA_DEMOGRAFI.perempuan || 0;
    document.getElementById("f-umkm").value = DATA_DEMOGRAFI.jumlahUMKM || 0;
    renderKVRows("rows-usia", DATA_DEMOGRAFI.usia, "kelompok");
    renderKVRows("rows-mp", DATA_DEMOGRAFI.mataPencaharian, "label");
    renderKVRows("rows-agama", DATA_DEMOGRAFI.agama, "label");
    renderKVRows("rows-alamat", DATA_DEMOGRAFI.alamat, "label");
    renderBumdesRows(DATA_BUMDES);
    renderBeritaRows(DATA_BERITA);
  }

  async function loadFormsWhenReady() {
    try {
      const res = await fetch(APPS_SCRIPT_URL);
      const data = await res.json();
      window.DATA_DEMOGRAFI = data.demografi || {};
      window.DATA_BUMDES = data.bumdes || [];
      window.DATA_BERITA = data.berita || [];
      populateForms();
    } catch (e) {
      console.error("Gagal mengambil data dari Apps Script:", e);
      if (window.__siteDataReady) { populateForms(); }
      else { window.addEventListener("site-data-ready", populateForms, { once: true }); }
    }
  }

  /* ---------- Tombol tambah baris ---------- */
  document.querySelectorAll(".btn-add").forEach(btn => {
    btn.addEventListener("click", () => {
      const kind = btn.dataset.add;
      if (kind === "usia") addKVRow("rows-usia", "", "");
      else if (kind === "mp") addKVRow("rows-mp", "", "");
      else if (kind === "agama") addKVRow("rows-agama", "", "");
      else if (kind === "alamat") addKVRow("rows-alamat", "", "");
      else if (kind === "bumdes") addBumdesRow("🏪", "", "");
      else if (kind === "berita") addBeritaRow({});
    });
  });

  /* ---------- Navigasi sidebar ---------- */
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById("tab-" + btn.dataset.tab).classList.add("active");
      document.getElementById("topbar-title").textContent = btn.dataset.title || btn.textContent.trim();
      document.getElementById("topbar-desc").textContent = btn.dataset.desc || "";
      closeSidebar();
    });
  });

  /* ---------- Sidebar mobile toggle ---------- */
  const sidebar = document.getElementById("admin-sidebar");
  const backdrop = document.getElementById("sidebar-backdrop");
  function openSidebar(){ sidebar.classList.add("open"); backdrop.classList.add("show"); }
  function closeSidebar(){ sidebar.classList.remove("open"); backdrop.classList.remove("show"); }
  const toggleBtn = document.getElementById("sidebar-toggle");
  if (toggleBtn) toggleBtn.addEventListener("click", openSidebar);
  if (backdrop) backdrop.addEventListener("click", closeSidebar);

  /* ---------- Simpan ke Apps Script ---------- */
  async function saveKey(key, value, label) {
    const btns = document.querySelectorAll(".btn-save");
    btns.forEach(b => b.disabled = true);
    showStatus("Menyimpan...", "loading");
    try {
      const result = await postToScript({ token: ADMIN_TOKEN, key: key, value: value });
      if (result.ok) {
        showStatus(label + " tersimpan & langsung tersinkron ke situs.", "ok");
      } else {
        showStatus("Gagal menyimpan: " + (result.error || "kode admin salah/kedaluwarsa."), "err");
        if (result.error && result.error.toLowerCase().includes("token")) doLogout();
      }
    } catch (e) {
      showStatus("Gagal menyimpan (koneksi): " + e.message, "err");
    }
    btns.forEach(b => b.disabled = false);
  }

  document.getElementById("save-statistik").addEventListener("click", () => {
    const demografi = {
      totalPenduduk: parseInt(document.getElementById("f-total").value, 10) || 0,
      lakiLaki: parseInt(document.getElementById("f-lk").value, 10) || 0,
      perempuan: parseInt(document.getElementById("f-pr").value, 10) || 0,
      jumlahUMKM: parseInt(document.getElementById("f-umkm").value, 10) || 0,
      usia: collectKVRows("rows-usia", "kelompok"),
      mataPencaharian: collectKVRows("rows-mp", "label"),
      agama: collectKVRows("rows-agama", "label"),
      alamat: collectKVRows("rows-alamat", "label"),
    };
    saveKey("demografi", demografi, "Data statistik");
  });

  document.getElementById("save-bumdes").addEventListener("click", () => {
    saveKey("bumdes", collectBumdesRows(), "Data BUMDes");
  });

  document.getElementById("save-berita").addEventListener("click", () => {
    saveKey("berita", collectBeritaRows(), "Data berita");
  });

  /* ---------- Login / logout ---------- */
  function doLogout() {
    ADMIN_TOKEN = "";
    sessionStorage.removeItem("admin_token");
    document.getElementById("login-screen").style.display = "flex";
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("login-password").value = "";
  }

  async function tryLogin(token) {
    const btn = document.getElementById("login-btn");
    const errEl = document.getElementById("login-error");
    errEl.textContent = "";
    
    btn.disabled = true;
    btn.textContent = "Memeriksa...";
    try {
      const result = await postToScript({ action: "verify", token: token });
      if (result.ok) {
        ADMIN_TOKEN = token;
        sessionStorage.setItem("admin_token", token);
        document.getElementById("login-screen").style.display = "none";
        document.getElementById("dashboard").style.display = "flex";
        loadFormsWhenReady();
      } else {
        errEl.textContent = "Kode admin salah.";
      }
    } catch (e) {
      errEl.textContent = "Tidak bisa menghubungi server: " + e.message;
    }
    btn.disabled = false;
    btn.textContent = "Masuk";
  }

  document.getElementById("login-btn").addEventListener("click", () => {
    const token = document.getElementById("login-password").value;
    if (token) tryLogin(token);
  });
  document.getElementById("login-password").addEventListener("keydown", (e) => {
    if (e.key === "Enter") document.getElementById("login-btn").click();
  });
  document.getElementById("logout-btn").addEventListener("click", doLogout);

  if (ADMIN_TOKEN) tryLogin(ADMIN_TOKEN);
});

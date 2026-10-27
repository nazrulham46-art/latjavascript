// script.js - Advanced Interactive Features for Portal Nazrul Ilham

document.addEventListener("DOMContentLoaded", function() {
    console.log("Portal Pribadi Nazrul Ilham berhasil dimuat dengan JavaScript tingkat lanjut!");

    // ==========================================
    // 1. CUSTOM INTERACTIVE CURSOR
    // ==========================================
    // Membuat elemen HTML kursor secara otomatis
    const cursorDot = document.createElement("div");
    cursorDot.className = "cursor-dot";
    const cursorOutline = document.createElement("div");
    cursorOutline.className = "cursor-outline";
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    window.addEventListener("mousemove", function(e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        // Sedikit efek jeda halus (smooth trailing) untuk lingkaran luar
        cursorOutline.style.left = `${posX}px`;
        cursorOutline.style.top = `${posY}px`;
    });

    // Menambahkan efek hover pada elemen interaktif (link, tombol, card)
    const interactiveElements = document.querySelectorAll("a, button, .card, input, textarea");
    interactiveElements.forEach(el => {
        el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
        el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
    });


    // ==========================================
    // 2. DARK MODE TOGGLE & LOCALSTORAGE
    // ==========================================
    // Menambahkan tombol saklar tema ke dalam nav header secara otomatis jika belum ada
    const navElement = document.querySelector("nav");
    if (navElement && !document.getElementById("themeToggleBtn")) {
        const themeBtn = document.createElement("button");
        themeBtn.id = "themeToggleBtn";
        themeBtn.className = "theme-toggle-btn";
        themeBtn.innerHTML = "🌙"; // Ikon awal Bulan (Dark mode)
        navElement.appendChild(themeBtn);

        // Cek preferensi tersimpan sebelumnya
        const savedTheme = localStorage.getItem("nazrul_theme");
        if (savedTheme === "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
            themeBtn.innerHTML = "☀️";
        }

        themeBtn.addEventListener("click", function() {
            let currentTheme = document.documentElement.getAttribute("data-theme");
            if (currentTheme === "dark") {
                document.documentElement.removeAttribute("data-theme");
                localStorage.setItem("nazrul_theme", "light");
                themeBtn.innerHTML = "🌙";
            } else {
                document.documentElement.setAttribute("data-theme", "dark");
                localStorage.setItem("nazrul_theme", "dark");
                themeBtn.innerHTML = "☀️";
            }
        });
    }


    // ==========================================
    // 3. SCROLL REVEAL ANIMATION
    // ==========================================
    // Otomatis menambahkan kelas .reveal ke elemen utama (card, title, dll)
    const revealTargets = document.querySelectorAll(".card, .main-title, .badge-center");
    revealTargets.forEach(el => el.classList.add("reveal"));

    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.85;
        revealTargets.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", checkReveal);
    checkReveal(); // Jalankan sekali di awal saat halaman dimuat


    // ==========================================
    // 4. PAGE TRANSITION EFFECT
    // ==========================================
    const pageLinks = document.querySelectorAll("nav a, .logo");
    pageLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            const targetUrl = this.getAttribute("href");
            // Pastikan link menuju halaman internal HTML (bukan hash atau link eksternal kosong)
            if (targetUrl && targetUrl.endsWith(".html")) {
                e.preventDefault();
                document.body.style.opacity = "1";
                document.body.style.transition = "opacity 0.4s ease";
                document.body.style.opacity = "0"; // Efek fade out
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 400);
            }
        });
    });


    // ==========================================
    // 5. FORM KONTAK VALIDASI (KODE LAMA ANDA)
    // ==========================================
    const formKontak = document.getElementById("formKontak");
    if (formKontak) {
        formKontak.addEventListener("submit", function(event) {
            event.preventDefault();

            const nama = document.getElementById("inputNama").value;
            const email = document.getElementById("inputEmail").value;
            const pesan = document.getElementById("inputPesan").value;

            alert(`Terima kasih, ${nama}! Pesan Anda telah berhasil dikirim.\n\nDetail:\nEmail: ${email}\nPesan: "${pesan}"`);
            formKontak.reset();
        });
    }

    // Tombol standar lainnya
    const buttons = document.querySelectorAll(".btn-primary");
    buttons.forEach(button => {
        button.addEventListener("click", function(event) {
            console.log("Navigasi ke: " + this.getAttribute("href"));
        });
    });
});
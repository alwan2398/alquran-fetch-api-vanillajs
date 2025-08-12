// Fetch & Chek api
fetch("https://quran-api.santrikoding.com/api/surah/1")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Terjadi kesalahan:", error));

// Ambil data dari API
fetch("https://quran-api.santrikoding.com/api/surah/1")
    .then(response => {
        if (!response.ok) throw new Error("Gagal mengambil data");
        return response.json();
    })
    .then(data => {
        // Tampilkan nama surat
        document.getElementById("nama-surat").innerText = data.nama_latin;
        document.getElementById("nama").innerText = data.nama;

        // Deskripsi tanpa tag HTML
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = data.deskripsi;
        const deskripsiTanpaTag =
            tempDiv.textContent || tempDiv.innerText || "";
        document.getElementById("deskripsi").textContent = deskripsiTanpaTag;

        // Jumlah ayat
        document.getElementById("jumlah-ayat").innerText =
            "Jumlah ayat: " + data.jumlah_ayat;

        // Tampilkan semua ayat
        const container = document.getElementById("semua-ayat");

        data.ayat.forEach(ayat => {
            const ayatWrapper = document.createElement("div");
            ayatWrapper.classList.add("ayat");

            // Nomor ayat
            const ayatHeader = document.createElement("div");
            ayatHeader.classList.add("ayat-header");

            const ayatNumber = document.createElement("span");
            ayatNumber.classList.add("ayat-number");
            ayatNumber.textContent = ayat.nomor;

            ayatHeader.appendChild(ayatNumber);

            // Teks Arab
            const arabElem = document.createElement("div");
            arabElem.classList.add("arabic-text");
            arabElem.textContent = ayat.ar;

            // Teks Latin
            const latinElem = document.createElement("div");
            latinElem.classList.add("latin-text");
            latinElem.innerHTML = ayat.tr;

            // Susun dan tambahkan ke halaman
            ayatWrapper.appendChild(ayatHeader);
            ayatWrapper.appendChild(arabElem);
            ayatWrapper.appendChild(latinElem);

            container.appendChild(ayatWrapper);
        });
    })
    .catch(error => {
        console.error("Terjadi kesalahan:", error);
        document.getElementById("semua-ayat").textContent =
            "Gagal memuat ayat.";
    });

// KULLANICILAR (Doktor & Sekreter)
let users = [
    { name: "Dr. Ahmet Akın", email: "ahmet@hastane.com", password: "1234", role: "Doctor", clinic: "Dahiliye" },
    { name: "Dr. Selin Yılmaz", email: "selin@hastane.com", password: "1234", role: "Doctor", clinic: "Dahiliye" },
    { name: "Sekreter Ayşe", email: "ayse@hastane.com", password: "1234", role: "Secretary", clinic: "Dahiliye" },

    { name: "Dr. Mehmet Öz", email: "mehmet@hastane.com", password: "1234", role: "Doctor", clinic: "Kardiyoloji" },
    { name: "Dr. Can Demir", email: "can@hastane.com", password: "1234", role: "Doctor", clinic: "Kardiyoloji" },
    { name: "Sekreter Elif", email: "elif@hastane.com", password: "1234", role: "Secretary", clinic: "Kardiyoloji" },

    { name: "Dr. Zeynep Kaya", email: "zeynep@hastane.com", password: "1234", role: "Doctor", clinic: "Göz Hastalıkları" },
    { name: "Dr. Burak Arslan", email: "burak@hastane.com", password: "1234", role: "Doctor", clinic: "Göz Hastalıkları" },
    { name: "Sekreter Merve", email: "merve@hastane.com", password: "1234", role: "Secretary", clinic: "Göz Hastalıkları" }
];

let patients = JSON.parse(localStorage.getItem("patients")) || [];
let appointments = JSON.parse(localStorage.getItem("apps")) || [];
let tests = JSON.parse(localStorage.getItem("tests")) || [];

// GENEL
function showSection(id) {
    document.querySelectorAll(".card, .panel").forEach(e => e.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
}

// KAYIT
function registerPatient() {
    const name = document.getElementById("reg-name").value;
    const email = document.getElementById("reg-email").value.toLowerCase();
    const password = document.getElementById("reg-password").value;

    if (!name || !email || !password) {
        alert("Tüm alanları doldurun");
        return;
    }

    if (patients.find(p => p.email === email)) {
        alert("Bu e-posta zaten kayıtlı");
        return;
    }

    patients.push({ name, email, password, role: "Patient" });
    localStorage.setItem("patients", JSON.stringify(patients));

    alert("Kayıt başarılı");
    showSection("login-section");
}

// LOGIN
function login() {
    const email = document.getElementById("login-email").value.toLowerCase();
    const password = document.getElementById("login-password").value;

    let user =
        patients.find(p => p.email === email && p.password === password) ||
        users.find(u => u.email === email && u.password === password);

    if (!user) {
        alert("E-posta veya şifre hatalı");
        return;
    }

    localStorage.setItem("activeUser", JSON.stringify(user));

    if (user.role === "Patient") {
        showSection("patient-panel");
        loadPatient();
    }
    if (user.role === "Doctor") {
        showSection("doctor-panel");
        loadDoctor();
    }
    if (user.role === "Secretary") {
        showSection("secretary-panel");
        loadSecretary();
    }
}

// DOKTORLAR
function loadDoctors() {
    const clinic = document.getElementById("clinic-select").value;
    const doctorSelect = document.getElementById("doctor-select");

    doctorSelect.innerHTML = `<option value="">Doktor Seç</option>`;

    users
        .filter(u => u.role === "Doctor" && u.clinic === clinic)
        .forEach(d => {
            doctorSelect.innerHTML += `<option value="${d.name}">${d.name}</option>`;
        });
}

// RANDEVU
function bookAppointment() {
    const user = JSON.parse(localStorage.getItem("activeUser"));

    const clinic = document.getElementById("clinic-select").value;
    const doctor = document.getElementById("doctor-select").value;
    const date = document.getElementById("app-date").value;
    const time = document.getElementById("app-time").value;

    if (!clinic || !doctor || !date || !time) {
        alert("Tüm alanları doldurun");
        return;
    }

    appointments.push({
        id: Date.now(),
        patientName: user.name,
        patientEmail: user.email,
        clinic,
        doctor,
        date,
        time,
        status: "Pending"
    });

    localStorage.setItem("apps", JSON.stringify(appointments));
    loadPatient();
}

// HASTA PANEL
function loadPatient() {
    const user = JSON.parse(localStorage.getItem("activeUser"));

    document.getElementById("patient-apps").innerHTML = appointments
        .filter(a => a.patientEmail === user.email)
        .map(a => `
            <li>
                ${a.clinic} | ${a.doctor}<br>
                ${a.date} ${a.time}
                <button onclick="cancelApp(${a.id})">İptal</button>
            </li>
        `).join("");

    document.getElementById("patient-tests").innerHTML = tests
        .filter(t => t.patientEmail === user.email)
        .map(t => `<li>${t.testName} - ${t.status}</li>`)
        .join("");
}

// İPTAL
function cancelApp(id) {
    appointments = appointments.filter(a => a.id !== id);
    tests = tests.filter(t => t.appointmentId !== id);

    localStorage.setItem("apps", JSON.stringify(appointments));
    localStorage.setItem("tests", JSON.stringify(tests));
    loadPatient();
}

// DOKTOR PANEL
function loadDoctor() {
    const user = JSON.parse(localStorage.getItem("activeUser"));

    document.getElementById("doctor-apps").innerHTML = appointments
        .filter(a => a.doctor === user.name)
        .map(a => `
            <li>
                ${a.patientName} - ${a.date} ${a.time}
                <button onclick="requestTest(${a.id})">Tahlil İste</button>
            </li>
        `).join("");
}

function requestTest(appId) {
    const testName = prompt("Tahlil adı:");
    if (!testName) return;

    const app = appointments.find(a => a.id === appId);

    tests.push({
        id: Date.now(),
        appointmentId: appId,
        patientEmail: app.patientEmail,
        testName,
        status: "İstendi"
    });

    localStorage.setItem("tests", JSON.stringify(tests));
    alert("Tahlil istendi");
}

// SEKRETER PANEL
function loadSecretary() {
    const user = JSON.parse(localStorage.getItem("activeUser"));

    document.getElementById("secretary-apps").innerHTML = appointments
        .filter(a => a.clinic === user.clinic)
        .map(a => `
            <li>
                ${a.patientName} | ${a.doctor}<br>
                ${a.date} ${a.time}
            </li>
        `).join("");
}

function logout() {
    location.reload();
}

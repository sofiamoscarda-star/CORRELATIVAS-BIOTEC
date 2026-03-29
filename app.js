// ==========================================
// 1. CONFIGURACIÓN DE FIREBASE
// ==========================================
const firebaseConfig = {
  apiKey: "AIzaSyCextqboe-SvkasVMryCw_JiMzGc1W8Bmg",
  authDomain: "correlativas-biotec.firebaseapp.com",
  projectId: "correlativas-biotec",
  storageBucket: "correlativas-biotec.firebasestorage.app",
  messagingSenderId: "748468062463",
  appId: "1:748468062463:web:7606983bb57055eb9164ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// ==========================================
// 2. BASE DE DATOS DE MATERIAS Y CORRELATIVAS
// ==========================================
// R = Regularizada (para cursar), A = Aprobada (para aprobar final)
// Variable auxiliar para el Practicanato Preparatorio
const reqHasta7mo = [
    "IECQ", "QG_I", "FIS_I", "MAT_I", "LAB_I", "QG_II", "FIS_II", "MAT_II", "LAB_II", 
    "QO_I", "QI", "QF", "LAB_III", "QO_II", "QBG", "QAG", "LAB_IV", 
    "BCyM", "GENETICA", "MICROBIO", "MET_ANALIT", "MET_ESTAD", 
    "BIOTEC", "FFVA", "BIOINFO", "HIG_SEG", "BIOMAT", 
    "BIOFIS_Q", "PROT_REC", "PROC_BIOTEC_I", "GEN_MOL_AV", "NANO_BIOTEC"
].map(id => ({id: id, state: "A"}));

const subjectsDB = [
    // --- PRIMER AÑO ---
    { id: "IECQ", name: "Introducción a las Cs. Químicas", year: 1, term: 1, reqCourse: [], reqApprove: [] },
    { id: "QG_I", name: "Química General I", year: 1, term: 1, reqCourse: [{id:"IECQ", state:"R"}], reqApprove: [{id:"IECQ", state:"A"}] },
    { id: "FIS_I", name: "Física I", year: 1, term: 1, reqCourse: [{id:"IECQ", state:"R"}], reqApprove: [{id:"IECQ", state:"A"}] },
    { id: "MAT_I", name: "Matemática I", year: 1, term: 1, reqCourse: [{id:"IECQ", state:"R"}], reqApprove: [{id:"IECQ", state:"A"}] },
    { id: "LAB_I", name: "Laboratorio I", year: 1, term: 1, reqCourse: [{id:"IECQ", state:"R"}], reqApprove: [{id:"IECQ", state:"A"}] },
    
    { id: "QG_II", name: "Química General II", year: 1, term: 2, reqCourse: [{id:"IECQ", state:"A"}, {id:"QG_I", state:"R"}], reqApprove: [{id:"IECQ", state:"A"}, {id:"QG_I", state:"A"}] },
    { id: "FIS_II", name: "Física II", year: 1, term: 2, reqCourse: [{id:"IECQ", state:"A"}, {id:"FIS_I", state:"R"}], reqApprove: [{id:"IECQ", state:"A"}, {id:"FIS_I", state:"A"}] },
    { id: "MAT_II", name: "Matemática II", year: 1, term: 2, reqCourse: [{id:"IECQ", state:"A"}, {id:"MAT_I", state:"R"}], reqApprove: [{id:"IECQ", state:"A"}, {id:"MAT_I", state:"A"}] },
    { id: "LAB_II", name: "Laboratorio II", year: 1, term: 2, reqCourse: [{id:"IECQ", state:"A"}, {id:"LAB_I", state:"R"}], reqApprove: [{id:"IECQ", state:"A"}, {id:"LAB_I", state:"A"}] },

    // --- SEGUNDO AÑO ---
    { id: "QO_I", name: "Química Orgánica I", year: 2, term: 1, reqCourse: [{id:"QG_I", state:"R"}, {id:"QG_II", state:"R"}], reqApprove: [{id:"QG_I", state:"A"}, {id:"QG_II", state:"A"}] },
    { id: "QI", name: "Química Inorgánica", year: 2, term: 1, reqCourse: [{id:"QG_I", state:"R"}, {id:"QG_II", state:"R"}], reqApprove: [{id:"QG_I", state:"A"}, {id:"QG_II", state:"A"}] },
    { id: "QF", name: "Química Física", year: 2, term: 1, reqCourse: [{id:"QG_I", state:"A"}, {id:"QG_II", state:"R"}, {id:"FIS_II", state:"R"}, {id:"MAT_II", state:"R"}], reqApprove: [{id:"QG_I", state:"A"}, {id:"QG_II", state:"A"}, {id:"FIS_II", state:"A"}, {id:"MAT_II", state:"A"}] },
    { id: "LAB_III", name: "Laboratorio III", year: 2, term: 1, reqCourse: [{id:"QG_II", state:"R"}, {id:"FIS_II", state:"R"}, {id:"LAB_I", state:"A"}, {id:"LAB_II", state:"R"}], reqApprove: [{id:"QG_II", state:"A"}, {id:"FIS_II", state:"A"}, {id:"LAB_I", state:"A"}, {id:"LAB_II", state:"A"}] },
    
    { id: "QO_II", name: "Química Orgánica II", year: 2, term: 2, reqCourse: [{id:"QO_I", state:"R"}, {id:"QG_II", state:"A"}], reqApprove: [{id:"QO_I", state:"A"}, {id:"QG_II", state:"A"}] },
    { id: "QBG", name: "Química Biológica General", year: 2, term: 2, reqCourse: [{id:"QO_I", state:"R"}, {id:"QG_II", state:"A"}], reqApprove: [{id:"QO_I", state:"A"}, {id:"QG_II", state:"A"}] },
    { id: "QAG", name: "Química Analítica General", year: 2, term: 2, reqCourse: [{id:"QI", state:"R"}, {id:"LAB_III", state:"R"}, {id:"QG_I", state:"A"}, {id:"QF", state:"R"}], reqApprove: [{id:"QI", state:"A"}, {id:"LAB_III", state:"A"}, {id:"QG_II", state:"A"}, {id:"QF", state:"A"}] },
    { id: "LAB_IV", name: "Laboratorio IV", year: 2, term: 2, reqCourse: [{id:"QO_I", state:"R"}, {id:"LAB_II", state:"A"}, {id:"LAB_III", state:"R"}], reqApprove: [{id:"QO_I", state:"A"}, {id:"LAB_II", state:"A"}, {id:"LAB_III", state:"A"}] },

    // --- TERCER AÑO ---
    { id: "BCyM", name: "Biología Celular y Molecular", year: 3, term: 1, reqCourse: [{id:"QO_II", state:"R"}, {id:"QBG", state:"R"}, {id:"QO_I", state:"A"}], reqApprove: [{id:"QO_I", state:"A"}, {id:"QBG", state:"A"}, {id:"QO_II", state:"A"}] },
    { id: "GENETICA", name: "Genética", year: 3, term: 1, reqCourse: [], reqApprove: [{id:"BCyM", state:"A"}] },
    { id: "MICROBIO", name: "Microbiología", year: 3, term: 1, reqCourse: [{id:"QBG", state:"R"}], reqApprove: [{id:"QBG", state:"A"}] },
    { id: "MET_ANALIT", name: "Métodos Analíticos", year: 3, term: 1, reqCourse: [{id:"QAG", state:"R"}, {id:"QO_I", state:"R"}], reqApprove: [{id:"QAG", state:"A"}, {id:"QO_II", state:"A"}] },
    { id: "MET_ESTAD", name: "Métodos Estadísticos", year: 3, term: 1, reqCourse: [{id:"MAT_II", state:"R"}, {id:"LAB_II", state:"R"}], reqApprove: [{id:"MAT_II", state:"A"}, {id:"LAB_II", state:"A"}] },
    
    { id: "BIOTEC", name: "Biotecnología", year: 3, term: 2, reqCourse: [{id:"BCyM", state:"A"}], reqApprove: [{id:"BCyM", state:"A"}] },
    { id: "FFVA", name: "Fisiología Vegetal y Animal", year: 3, term: 2, reqCourse: [{id:"BCyM", state:"A"}], reqApprove: [{id:"BCyM", state:"A"}] },
    { id: "BIOINFO", name: "Bioinformática y Biol. Comp.", year: 3, term: 2, reqCourse: [{id:"BCyM", state:"R"}, {id:"GENETICA", state:"R"}, {id:"MAT_II", state:"A"}], reqApprove: [{id:"BCyM", state:"A"}, {id:"GENETICA", state:"A"}, {id:"MAT_II", state:"A"}] },
    { id: "HIG_SEG", name: "Higiene y Seguridad Laboral", year: 3, term: 2, reqCourse: [{id:"BCyM", state:"R"}, {id:"QO_II", state:"A"}], reqApprove: [{id:"BCyM", state:"A"}, {id:"QO_II", state:"A"}] },
    { id: "BIOMAT", name: "Biomateriales", year: 3, term: 2, reqCourse: [{id:"QF", state:"A"}, {id:"QO_II", state:"A"}, {id:"QBG", state:"A"}, {id:"BIOTEC", state:"R"}, {id:"MICROBIO", state:"A"}, {id:"BCyM", state:"A"}], reqApprove: [{id:"QF", state:"A"}, {id:"QO_II", state:"A"}, {id:"QBG", state:"A"}, {id:"BIOTEC", state:"A"}, {id:"MICROBIO", state:"A"}, {id:"BCyM", state:"A"}] },

    // --- CUARTO AÑO ---
    { id: "BIOFIS_Q", name: "Biofísica Química", year: 4, term: 1, reqCourse: [{id:"QF", state:"A"}, {id:"QO_II", state:"A"}, {id:"QBG", state:"A"}], reqApprove: [{id:"QF", state:"A"}, {id:"QO_II", state:"A"}, {id:"QBG", state:"A"}] },
    { id: "PROT_REC", name: "Proteínas Recombinantes", year: 4, term: 1, reqCourse: [{id:"BIOTEC", state:"R"}, {id:"MICROBIO", state:"A"}], reqApprove: [{id:"BIOTEC", state:"A"}, {id:"MICROBIO", state:"A"}] },
    { id: "PROC_BIOTEC_I", name: "Procesos Biotecnológicos I", year: 4, term: 1, reqCourse: [{id:"BCyM", state:"A"}], reqApprove: [{id:"BCyM", state:"A"}] },
    { id: "GEN_MOL_AV", name: "Genética Molecular Avanzada", year: 4, term: 1, reqCourse: [{id:"BCyM", state:"A"}, {id:"GENETICA", state:"A"}, {id:"MICROBIO", state:"A"}], reqApprove: [{id:"BCyM", state:"A"}, {id:"GENETICA", state:"A"}, {id:"MICROBIO", state:"A"}] },
    { id: "NANO_BIOTEC", name: "Nanobiotecnología", year: 4, term: 1, reqCourse: [{id:"BIOTEC", state:"R"}, {id:"BIOINFO", state:"R"}, {id:"MET_ANALIT", state:"R"}], reqApprove: [{id:"BIOTEC", state:"A"}, {id:"BIOINFO", state:"A"}, {id:"MET_ANALIT", state:"A"}] },

    { id: "PROC_BIOTEC_II", name: "Procesos Biotecnológicos II", year: 4, term: 2, reqCourse: [{id:"PROC_BIOTEC_I", state:"R"}, {id:"NANO_BIOTEC", state:"R"}], reqApprove: [{id:"PROC_BIOTEC_I", state:"A"}, {id:"NANO_BIOTEC", state:"A"}] },
    { id: "INMUNO", name: "Inmunología Aplicada", year: 4, term: 2, reqCourse: [{id:"FFVA", state:"R"}, {id:"MICROBIO", state:"A"}, {id:"BIOTEC", state:"A"}], reqApprove: [{id:"FFVA", state:"A"}, {id:"MICROBIO", state:"A"}, {id:"BIOTEC", state:"A"}] },
    { id: "BIOTEC_AMB", name: "Biotecnología Ambiental", year: 4, term: 2, reqCourse: [{id:"PROC_BIOTEC_I", state:"R"}, {id:"MET_ANALIT", state:"R"}, {id:"BIOTEC", state:"A"}], reqApprove: [{id:"PROC_BIOTEC_I", state:"A"}, {id:"MET_ANALIT", state:"A"}, {id:"BIOTEC", state:"A"}] },
    { id: "BIOTEC_VEG", name: "Biotecnología Vegetal", year: 4, term: 2, reqCourse: [{id:"FFVA", state:"R"}, {id:"BCyM", state:"A"}], reqApprove: [{id:"FFVA", state:"A"}, {id:"BCyM", state:"A"}] },
    { id: "ETICA", name: "Ética y Legislación", year: 4, term: 2, reqCourse: [{id:"BIOTEC", state:"A"}], reqApprove: [{id:"BIOTEC", state:"A"}] },

    // --- QUINTO AÑO ---
    { id: "PROY_PLANTAS", name: "Proyectos en Plantas Biotec.", year: 5, term: 1, reqCourse: [{id:"PROC_BIOTEC_I", state:"A"}, {id:"PROC_BIOTEC_II", state:"R"}], reqApprove: [{id:"PROC_BIOTEC_I", state:"A"}, {id:"PROC_BIOTEC_II", state:"A"}] },
    { id: "ECON_GEST", name: "Economía y Gestión", year: 5, term: 1, reqCourse: [{id:"HIG_SEG", state:"A"}, {id:"ETICA", state:"R"}], reqApprove: [{id:"HIG_SEG", state:"A"}, {id:"ETICA", state:"A"}] },
    { id: "FARMACOS", name: "Fármacos Biotecnológicos", year: 5, term: 1, reqCourse: [{id:"FFVA", state:"A"}, {id:"NANO_BIOTEC", state:"A"}], reqApprove: [{id:"FFVA", state:"A"}, {id:"NANO_BIOTEC", state:"A"}] },
    { id: "ELEC_1", name: "Asignatura Electiva I", year: 5, term: 1, isElective: true, reqCourse: [], reqApprove: [] },
    { id: "PRACT_PREP", name: "Practicanato Preparatorio", year: 5, term: 1, reqCourse: reqHasta7mo, reqApprove: reqHasta7mo },

    { id: "ELEC_2", name: "Asignatura Electiva II", year: 5, term: 2, isElective: true, reqCourse: [], reqApprove: [] },
    { id: "PRACT_PROF", name: "Practicanato Profesional", year: 5, term: 2, reqCourse: [...reqHasta7mo, {id:"PRACT_PREP", state:"R"}], reqApprove: [] }, // reqApprove se calcula dinámico

    // --- TRANSVERSALES --- (Las ubicamos en Año 1 y 2 visualmente para que no queden sueltas)
    { id: "INGLES", name: "Inglés", year: 1, term: 1, reqCourse: [], reqApprove: [] },
    { id: "INFO", name: "Informática", year: 1, term: 2, reqCourse: [], reqApprove: [] }

];

const electivasOptions = {
    "default": { name: "Elegir Electiva...", reqCourse: [], reqApprove: [] },
    "broma": { name: "Elementos de Bromatología", reqCourse: [{id:"BCyM",state:"A"}, {id:"MICROBIO",state:"A"}, {id:"QAG",state:"A"}], reqApprove: [{id:"BCyM",state:"A"}, {id:"MICROBIO",state:"A"}, {id:"QAG",state:"A"}] },
    "biofis_m": { name: "Biofísica de Macromoléculas", reqCourse: [{id:"BCyM",state:"A"}, {id:"BIOFIS_Q",state:"A"}], reqApprove: [{id:"BCyM",state:"A"}, {id:"BIOFIS_Q",state:"A"}] },
    "bioq_m": { name: "Bioquímica de Macromoléculas", reqCourse: [{id:"BCyM",state:"A"}], reqApprove: [{id:"BCyM",state:"A"}] },
    "farma": { name: "Farmacología", reqCourse: [{id:"BCyM",state:"A"}, {id:"FFVA",state:"A"}], reqApprove: [{id:"BCyM",state:"A"}, {id:"FFVA",state:"A"}] },
    "patologica": { name: "Química Biológica Patológica", reqCourse: [{id:"BCyM",state:"A"}], reqApprove: [{id:"BCyM",state:"A"}] },
    "bioinorganica": { name: "Química Bioinorgánica", reqCourse: [{id:"QI",state:"A"}, {id:"QBG",state:"A"}], reqApprove: [{id:"QI",state:"A"}, {id:"QBG",state:"A"}] }
};

// Estado global del usuario
let currentUser = null;
let userData = {};
let currentSubjectOpened = null; // Para saber qué modal está abierto

// Inicializar datos vacíos
function initUserData() {
    let data = {};
    subjectsDB.forEach(sub => {
        data[sub.id] = {
            state: 'no_cursada', // 'no_cursada', 'en_curso', 'regularizada', 'aprobada'
            finalGrade: null,
            examsWeight: 70,
            worksWeight: 30,
            exams: [], // { type: '1er parcial', topic: '', grade: null }
            works: []  // { name: '', topic: '', grade: null }
        };
    });
    return data;
}

// ==========================================
// 3. LÓGICA DE CORRELATIVIDADES Y ESTADOS
// ==========================================
function checkLockStatus(subject) {
    let canCourse = true;
    let canApprove = true;
    const data = userData[subject.id];

    // --- Lógica Especial para Electivas Dinámicas ---
    let reqC = subject.reqCourse;
    let reqA = subject.reqApprove;

    if (subject.isElective) {
        const choice = data.electiveChoice || "default";
        reqC = electivasOptions[choice].reqCourse;
        reqA = electivasOptions[choice].reqApprove;
        
        // Si no seleccionó ninguna, bloqueamos
        if (choice === "default") { canCourse = false; canApprove = false; }
    }

    // --- Lógica Especial para Practicanato Profesional ---
    if (subject.id === 'PRACT_PROF') {
        let allApproved = true;
        subjectsDB.forEach(s => {
            if (s.id !== 'PRACT_PROF' && userData[s.id].state !== 'aprobada') allApproved = false;
        });
        canApprove = allApproved; // Sobrescribe la regla para requerir todo
    } else {
        // Validación normal de aprobadas
        reqA.forEach(req => {
            if (userData[req.id].state !== 'aprobada') canApprove = false;
        });
    }

    // Validación normal de cursadas
    reqC.forEach(req => {
        const reqState = userData[req.id].state;
        if (req.state === 'A' && reqState !== 'aprobada') canCourse = false;
        if (req.state === 'R' && reqState !== 'aprobada' && reqState !== 'regularizada') canCourse = false;
    });

    return { canCourse, canApprove };
}

// ==========================================
// 4. CÁLCULO DE NOTAS AVANZADO
// ==========================================
function calculateGrades(subjId) {
    const data = userData[subjId];
    if (data.state !== 'aprobada' && data.state !== 'regularizada') {
        data.finalGrade = null;
        return;
    }

    let examScore = 0;
    let workScore = 0;

    // Lógica de reemplazo de recuperatorios o Examen Final
    let finalExam = data.exams.find(e => e.type === 'Examen Final' && e.grade);
    if (finalExam) {
        // Si hay examen final, suele valer el 100% de la nota (según tu instrucción)
        data.finalGrade = parseFloat(finalExam.grade);
        return;
    }

    // Si no hay final, promediamos parciales y trabajos
    let p1 = data.exams.find(e => e.type === '1er parcial');
    let p2 = data.exams.find(e => e.type === '2do parcial');
    let r1 = data.exams.find(e => e.type === 'Recup. 1er parcial');
    let r2 = data.exams.find(e => e.type === 'Recup. 2do parcial');

    let notaP1 = (r1 && r1.grade) ? parseFloat(r1.grade) : ((p1 && p1.grade) ? parseFloat(p1.grade) : 0);
    let notaP2 = (r2 && r2.grade) ? parseFloat(r2.grade) : ((p2 && p2.grade) ? parseFloat(p2.grade) : 0);

    let examenesValidos = 0;
    if (notaP1 > 0) { examScore += notaP1; examenesValidos++; }
    if (notaP2 > 0) { examScore += notaP2; examenesValidos++; }
    
    let promExamenes = examenesValidos > 0 ? (examScore / examenesValidos) : 0;

    // Trabajos
    let worksValidos = data.works.filter(w => w.grade);
    let sumaWorks = worksValidos.reduce((acc, w) => acc + parseFloat(w.grade), 0);
    let promWorks = worksValidos.length > 0 ? (sumaWorks / worksValidos.length) : 0;

    // Ponderación
    if (promExamenes > 0 && promWorks > 0) {
        data.finalGrade = ((promExamenes * data.examsWeight) / 100) + ((promWorks * data.worksWeight) / 100);
    } else if (promExamenes > 0) {
        data.finalGrade = promExamenes;
    } else if (promWorks > 0) {
        data.finalGrade = promWorks;
    } else {
        data.finalGrade = null;
    }
    
    // Redondeo a 2 decimales
    if(data.finalGrade) data.finalGrade = Math.round(data.finalGrade * 100) / 100;
}

// ==========================================
// 5. RENDERIZADO DE INTERFAZ (UI)
// ==========================================
function renderMalla() {
    const grid = document.getElementById('malla-grid');
    grid.innerHTML = '';
    
    let totalAprobadas = 0;

    // Agrupar por años
    const years = [1, 2, 3, 4, 5];
    years.forEach(year => {
        const yearCol = document.createElement('div');
        yearCol.className = 'year-column';
        yearCol.innerHTML = `<h3 class="year-title y-${year}">Año ${year}</h3>`;

        const subjectsByYear = subjectsDB.filter(s => s.year === year);
        if(subjectsByYear.length === 0) return;

        subjectsByYear.forEach(sub => {
            const data = userData[sub.id];
            const locks = checkLockStatus(sub);
            
            // Forzar estado si no cumple correlativas
            let lockClass = "";
            if (!locks.canCourse) {
                lockClass = "bloqueada";
                if(data.state !== 'no_cursada') {
                    data.state = 'no_cursada'; // Auto-corrección
                }
            }

            if (data.state === 'aprobada') totalAprobadas++;

            const card = document.createElement('div');
            card.className = `subject-card ${data.state} ${lockClass}`;
            
            let gradeHtml = (data.finalGrade && data.state === 'aprobada') ? `<span style="color:#888; font-size:12px;">(Nota: ${data.finalGrade})</span>` : '';

            // Generar el selector de Electivas si aplica
            let electiveHtml = '';
            if (sub.isElective) {
                const currentChoice = data.electiveChoice || 'default';
                electiveHtml = `<select class="status-select" style="margin-bottom:5px; background:var(--pink-lighter);" onchange="changeElective('${sub.id}', this.value)">`;
                for (const [key, value] of Object.entries(electivasOptions)) {
                    electiveHtml += `<option value="${key}" ${currentChoice === key ? 'selected' : ''}>${value.name}</option>`;
                }
                electiveHtml += `</select>`;
                
                // Actualiza el título visualmente para que no diga "Asignatura Electiva I" si ya elegiste
                if(currentChoice !== 'default') sub.name = electivasOptions[currentChoice].name;
            }

            card.innerHTML = `
                <div class="subject-header">
                    <span class="status-dot dot-${data.state}"></span>
                    <span class="subject-title" onclick="openModal('${sub.id}')">${sub.name}</span>
                </div>
                ${gradeHtml}
                ${electiveHtml}
                <select class="status-select" onchange="changeState('${sub.id}', this.value)" ${!locks.canCourse ? 'disabled' : ''}>
                    <option value="no_cursada" ${data.state === 'no_cursada' ? 'selected' : ''}>No Cursada</option>
                    <option value="en_curso" ${data.state === 'en_curso' ? 'selected' : ''}>En Curso</option>
                    <option value="regularizada" ${data.state === 'regularizada' ? 'selected' : ''}>Regularizada</option>
                    ${locks.canApprove ? `<option value="aprobada" ${data.state === 'aprobada' ? 'selected' : ''}>Aprobada</option>` : '<option disabled>Aprobada (Faltan Correlativas)</option>'}
                </select>
            `;
            yearCol.appendChild(card);
        });
        grid.appendChild(yearCol);
    });

    function changeElective(subjId, choiceValue) {
    userData[subjId].electiveChoice = choiceValue;
    // Resetea el estado a no cursada por seguridad si cambia la materia
    userData[subjId].state = 'no_cursada'; 
    saveToFirebase();
    renderMalla();
}

    // Actualizar barra de progreso
    const percentage = Math.round((totalAprobadas / subjectsDB.length) * 100);
    document.getElementById('progress-bar').style.width = percentage + '%';
    document.getElementById('progress-text').innerText = `${percentage}% (${totalAprobadas} de ${subjectsDB.length})`;
}

function changeState(subjId, newState) {
    userData[subjId].state = newState;
    calculateGrades(subjId);
    renderMalla(); // Re-renderiza para actualizar correlativas bloqueadas en cadena
    saveToFirebase();
}

// ==========================================
// 6. MODAL INTERACTIVO DE MATERIA
// ==========================================
function openModal(subjId) {
    const locks = checkLockStatus(subjectsDB.find(s => s.id === subjId));
    if (!locks.canCourse) return; // Si está bloqueada, no abre informe

    currentSubjectOpened = subjId;
    const sub = subjectsDB.find(s => s.id === subjId);
    const data = userData[subjId];

    document.getElementById('modal-title').innerText = sub.name;
    document.getElementById('modal-nota-final').innerText = data.finalGrade || '-';
    document.getElementById('peso-examenes').value = data.examsWeight;
    document.getElementById('peso-trabajos').value = data.worksWeight;

    renderExamenesModal(data);
    renderTrabajosModal(data);

    document.getElementById('informe-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('informe-modal').classList.remove('active');
    currentSubjectOpened = null;
}

function renderExamenesModal(data) {
    const list = document.getElementById('examenes-list');
    list.innerHTML = '';
    data.exams.forEach((exam, index) => {
        list.innerHTML += `
            <div class="item-row">
                <select onchange="updateExam(${index}, 'type', this.value)">
                    <option value="1er parcial" ${exam.type==='1er parcial'?'selected':''}>1er parcial</option>
                    <option value="2do parcial" ${exam.type==='2do parcial'?'selected':''}>2do parcial</option>
                    <option value="Recup. 1er parcial" ${exam.type==='Recup. 1er parcial'?'selected':''}>Recup. 1er parcial</option>
                    <option value="Recup. 2do parcial" ${exam.type==='Recup. 2do parcial'?'selected':''}>Recup. 2do parcial</option>
                    <option value="Examen Final" ${exam.type==='Examen Final'?'selected':''}>Examen Final</option>
                </select>
                <input type="text" placeholder="Temas..." value="${exam.topic}" onchange="updateExam(${index}, 'topic', this.value)">
                <input type="number" class="nota-input" placeholder="Nota" value="${exam.grade || ''}" onchange="updateExam(${index}, 'grade', this.value)">
                <button onclick="removeExam(${index})" style="background:#ff3333">X</button>
            </div>
        `;
    });
}

function renderTrabajosModal(data) {
    const list = document.getElementById('trabajos-list');
    list.innerHTML = '';
    data.works.forEach((work, index) => {
        list.innerHTML += `
            <div class="item-row">
                <input type="text" placeholder="Nombre (Ej: Sem. 1)" value="${work.name}" onchange="updateWork(${index}, 'name', this.value)">
                <input type="text" placeholder="Temas..." value="${work.topic}" onchange="updateWork(${index}, 'topic', this.value)">
                <input type="number" class="nota-input" placeholder="Nota" value="${work.grade || ''}" onchange="updateWork(${index}, 'grade', this.value)">
                <button onclick="removeWork(${index})" style="background:#ff3333">X</button>
            </div>
        `;
    });
}

// Funciones auxiliares del modal
function addExamen() { userData[currentSubjectOpened].exams.push({type: '1er parcial', topic: '', grade: null}); renderExamenesModal(userData[currentSubjectOpened]); }
function removeExam(i) { userData[currentSubjectOpened].exams.splice(i, 1); renderExamenesModal(userData[currentSubjectOpened]); }
function updateExam(i, field, val) { userData[currentSubjectOpened].exams[i][field] = val; }

function addTrabajo() { userData[currentSubjectOpened].works.push({name: '', topic: '', grade: null}); renderTrabajosModal(userData[currentSubjectOpened]); }
function removeWork(i) { userData[currentSubjectOpened].works.splice(i, 1); renderTrabajosModal(userData[currentSubjectOpened]); }
function updateWork(i, field, val) { userData[currentSubjectOpened].works[i][field] = val; }

function saveInforme() {
    const data = userData[currentSubjectOpened];
    data.examsWeight = document.getElementById('peso-examenes').value;
    data.worksWeight = document.getElementById('peso-trabajos').value;
    
    calculateGrades(currentSubjectOpened);
    saveToFirebase();
    renderMalla();
    closeModal();
}

// ==========================================
// 7. NAVEGACIÓN Y FIREBASE
// ==========================================
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
    document.querySelectorAll('.tabs button').forEach(b => b.classList.remove('active'));
    
    document.getElementById(`tab-${tabId}`).classList.remove('hidden');
    event.target.classList.add('active');
}

async function login() {
    const user = document.getElementById('username-input').value;
    if(!user) return alert("Ingresa un usuario");
    
    currentUser = user;
    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('main-nav').classList.remove('hidden');
    document.getElementById('app-container').classList.remove('hidden');
    document.getElementById('progress-footer').classList.remove('hidden');

    // Cargar datos de Firebase
    const doc = await db.collection("users").doc(currentUser).get();
    if (doc.exists) {
        userData = doc.data();
        // Sincronizar por si agregaste nuevas materias al código
        let defaultData = initUserData();
        userData = { ...defaultData, ...userData }; 
    } else {
        userData = initUserData();
    }
    renderMalla();
}

function saveToFirebase() {
    if(currentUser) {
        db.collection("users").doc(currentUser).set(userData);
    }
}
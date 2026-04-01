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
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ==========================================
// 2. BASE DE DATOS DE MATERIAS
// ==========================================
const reqHasta7mo = [
    "IECQ", "QG_I", "FIS_I", "MAT_I", "LAB_I", "QG_II", "FIS_II", "MAT_II", "LAB_II",
    "QO_I", "QI", "QF", "LAB_III", "QO_II", "QBG", "QAG", "LAB_IV",
    "BCyM", "GENETICA", "MICROBIO", "MET_ANALIT", "MET_ESTAD",
    "BIOTEC", "FFVA", "BIOINFO", "HIG_SEG", "BIOMAT",
    "BIOFIS_Q", "PROT_REC", "PROC_BIOTEC_I", "GEN_MOL_AV", "NANO_BIOTEC"
].map(id => ({ id: id, state: "A" }));

const subjectsDB = [
    { id: "IECQ", name: "Introducción a las Cs. Químicas", year: 1, term: 1, reqCourse: [], reqApprove: [] },
    { id: "QG_I", name: "Química General I", year: 1, term: 1, reqCourse: [{id:"IECQ", state:"R"}], reqApprove: [{id:"IECQ", state:"A"}] },
    { id: "FIS_I", name: "Física I", year: 1, term: 1, reqCourse: [{id:"IECQ", state:"R"}], reqApprove: [{id:"IECQ", state:"A"}] },
    { id: "MAT_I", name: "Matemática I", year: 1, term: 1, reqCourse: [{id:"IECQ", state:"R"}], reqApprove: [{id:"IECQ", state:"A"}] },
    { id: "LAB_I", name: "Laboratorio I", year: 1, term: 1, reqCourse: [{id:"IECQ", state:"R"}], reqApprove: [{id:"IECQ", state:"A"}] },
    { id: "QG_II", name: "Química General II", year: 1, term: 2, reqCourse: [{id:"IECQ", state:"A"}, {id:"QG_I", state:"R"}], reqApprove: [{id:"IECQ", state:"A"}, {id:"QG_I", state:"A"}] },
    { id: "FIS_II", name: "Física II", year: 1, term: 2, reqCourse: [{id:"IECQ", state:"A"}, {id:"FIS_I", state:"R"}], reqApprove: [{id:"IECQ", state:"A"}, {id:"FIS_I", state:"A"}] },
    { id: "MAT_II", name: "Matemática II", year: 1, term: 2, reqCourse: [{id:"IECQ", state:"A"}, {id:"MAT_I", state:"R"}], reqApprove: [{id:"IECQ", state:"A"}, {id:"MAT_I", state:"A"}] },
    { id: "LAB_II", name: "Laboratorio II", year: 1, term: 2, reqCourse: [{id:"IECQ", state:"A"}, {id:"LAB_I", state:"R"}], reqApprove: [{id:"IECQ", state:"A"}, {id:"LAB_I", state:"A"}] },
    { id: "QO_I", name: "Química Orgánica I", year: 2, term: 1, reqCourse: [{id:"QG_I", state:"R"}, {id:"QG_II", state:"R"}], reqApprove: [{id:"QG_I", state:"A"}, {id:"QG_II", state:"A"}] },
    { id: "QI", name: "Química Inorgánica", year: 2, term: 1, reqCourse: [{id:"QG_I", state:"R"}, {id:"QG_II", state:"R"}], reqApprove: [{id:"QG_I", state:"A"}, {id:"QG_II", state:"A"}] },
    { id: "QF", name: "Química Física", year: 2, term: 1, reqCourse: [{id:"QG_I", state:"A"}, {id:"QG_II", state:"R"}, {id:"FIS_II", state:"R"}, {id:"MAT_II", state:"R"}], reqApprove: [{id:"QG_I", state:"A"}, {id:"QG_II", state:"A"}, {id:"FIS_II", state:"A"}, {id:"MAT_II", state:"A"}] },
    { id: "LAB_III", name: "Laboratorio III", year: 2, term: 1, reqCourse: [{id:"QG_II", state:"R"}, {id:"FIS_II", state:"R"}, {id:"LAB_I", state:"A"}, {id:"LAB_II", state:"R"}], reqApprove: [{id:"QG_II", state:"A"}, {id:"FIS_II", state:"A"}, {id:"LAB_I", state:"A"}, {id:"LAB_II", state:"A"}] },
    { id: "QO_II", name: "Química Orgánica II", year: 2, term: 2, reqCourse: [{id:"QO_I", state:"R"}, {id:"QG_II", state:"A"}], reqApprove: [{id:"QO_I", state:"A"}, {id:"QG_II", state:"A"}] },
    { id: "QBG", name: "Química Biológica General", year: 2, term: 2, reqCourse: [{id:"QO_I", state:"R"}, {id:"QG_II", state:"A"}], reqApprove: [{id:"QO_I", state:"A"}, {id:"QG_II", state:"A"}] },
    { id: "QAG", name: "Química Analítica General", year: 2, term: 2, reqCourse: [{id:"QI", state:"R"}, {id:"LAB_III", state:"R"}, {id:"QG_I", state:"A"}, {id:"QF", state:"R"}], reqApprove: [{id:"QI", state:"A"}, {id:"LAB_III", state:"A"}, {id:"QG_II", state:"A"}, {id:"QF", state:"A"}] },
    { id: "LAB_IV", name: "Laboratorio IV", year: 2, term: 2, reqCourse: [{id:"QO_I", state:"R"}, {id:"LAB_II", state:"A"}, {id:"LAB_III", state:"R"}], reqApprove: [{id:"QO_I", state:"A"}, {id:"LAB_II", state:"A"}, {id:"LAB_III", state:"A"}] },
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
    { id: "PROY_PLANTAS", name: "Proyectos en Plantas Biotec.", year: 5, term: 1, reqCourse: [{id:"PROC_BIOTEC_I", state:"A"}, {id:"PROC_BIOTEC_II", state:"R"}], reqApprove: [{id:"PROC_BIOTEC_I", state:"A"}, {id:"PROC_BIOTEC_II", state:"A"}] },
    { id: "ECON_GEST", name: "Economía y Gestión", year: 5, term: 1, reqCourse: [{id:"HIG_SEG", state:"A"}, {id:"ETICA", state:"R"}], reqApprove: [{id:"HIG_SEG", state:"A"}, {id:"ETICA", state:"A"}] },
    { id: "FARMACOS", name: "Fármacos Biotecnológicos", year: 5, term: 1, reqCourse: [{id:"FFVA", state:"A"}, {id:"NANO_BIOTEC", state:"A"}], reqApprove: [{id:"FFVA", state:"A"}, {id:"NANO_BIOTEC", state:"A"}] },
    { id: "ELEC_1", name: "Asignatura Electiva I", year: 5, term: 1, isElective: true, reqCourse: [], reqApprove: [] },
    { id: "PRACT_PREP", name: "Practicanato Preparatorio", year: 5, term: 1, reqCourse: reqHasta7mo, reqApprove: reqHasta7mo },
    { id: "ELEC_2", name: "Asignatura Electiva II", year: 5, term: 2, isElective: true, reqCourse: [], reqApprove: [] },
    { id: "PRACT_PROF", name: "Practicanato Profesional", year: 5, term: 2, reqCourse: [...reqHasta7mo, {id:"PRACT_PREP", state:"R"}], reqApprove: [] },
    { id: "INGLES", name: "Inglés", isTransversal: true, reqCourse: [], reqApprove: [] },
    { id: "INFO", name: "Informática", isTransversal: true, reqCourse: [], reqApprove: [] }
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

// ==========================================
// 3. ESTADO GLOBAL
// ==========================================
let currentUser = null;
let userData = {};
let expandedSubjects = {};
let expandedYears = {};
let expandedTerms = {};
let previousLockStates = {}; 

// ==========================================
// 4. UTILIDADES CORE 
// ==========================================
function initUserData() {
    let data = {};
    subjectsDB.forEach(sub => {
        data[sub.id] = {
            state: 'no_cursada', finalGrade: null, examsWeight: 70, worksWeight: 30,
            exams: [], works: [], reviewTopics: {}, electiveChoice: sub.isElective ? 'default' : undefined,
            placedYear: null, placedTerm: null
        };
        previousLockStates[sub.id] = true; 
    });
    return data;
}

function isValidGrade(value) { return value !== null && value !== undefined && value !== '' && !isNaN(parseFloat(value)); }
function normalizeText(text) { return (text || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim(); }
function sanitizeDomId(value) { return (value || '').replace(/[^a-zA-Z0-9_-]/g, '_'); }
function focusElement(el) { const input = el.parentElement.querySelector('input'); if(input) input.focus(); }

function resetSubject(subjId) {
    if (!userData[subjId]) return;
    userData[subjId].state = 'no_cursada';
    userData[subjId].finalGrade = null;
    userData[subjId].exams = [];
    userData[subjId].works = [];
    userData[subjId].reviewTopics = {};
}

function sanitizeSubjectData(subjId) {
    const data = userData[subjId];
    if (!data) return;
    if (!data.reviewTopics || typeof data.reviewTopics !== 'object') {
        data.reviewTopics = {};
    }
    if (data.state === 'no_cursada') {
        data.finalGrade = null; data.exams = []; data.works = []; data.reviewTopics = {}; return;
    }
    if (data.state === 'en_curso') {
        data.finalGrade = null; return;
    }
    if (data.state === 'regularizada' || data.state === 'aprobada') {
        calculateGrades(subjId);
    }
}

function validateSubjectsDB() {
    const ids = new Set(subjectsDB.map(s => s.id));
    subjectsDB.forEach(subject => {
        [...subject.reqCourse, ...subject.reqApprove].forEach(req => {
            if (!ids.has(req.id)) console.warn(`Correlativa inexistente en ${subject.id}: ${req.id}`);
        });
    });
}

// FUNCIONES DE COLOR
function getContrastTextColor(hex) {
    if (!hex) return '#333333';
    let color = hex.replace('#', '');
    if (color.length === 3) {
        color = color.split('').map(c => c + c).join('');
    }
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 150 ? '#333333' : '#ffffff';
}

function openTopicColorPicker(subjId, topicKey) {
    const input = document.getElementById(`topic-color-${subjId}-${sanitizeDomId(topicKey)}`);
    if (input) input.click();
}


// ==========================================
// 5. CÁLCULOS Y CORRELATIVIDADES
// ==========================================
function checkLockStatus(subject) {
    let canCourse = true, canApprove = true;
    const data = userData[subject.id] || {};
    let reqC = subject.reqCourse || [], reqA = subject.reqApprove || [];

    if (subject.isElective) {
        const choice = data.electiveChoice || "default";
        reqC = electivasOptions[choice]?.reqCourse || [];
        reqA = electivasOptions[choice]?.reqApprove || [];
        if (choice === "default") { canCourse = false; canApprove = false; }
    }

    reqC.forEach(req => {
        const reqState = (userData[req.id] || {}).state;
        if (!reqState) { canCourse = false; return; }
        if (req.state === 'A' && reqState !== 'aprobada') canCourse = false;
        if (req.state === 'R' && reqState !== 'aprobada' && reqState !== 'regularizada') canCourse = false;
    });

    if (subject.id === 'PRACT_PROF') {
        canApprove = subjectsDB.every(s => s.id === 'PRACT_PROF' || (userData[s.id] && userData[s.id].state === 'aprobada'));
    } else {
        reqA.forEach(req => {
            if ((userData[req.id] || {}).state !== 'aprobada') canApprove = false;
        });
    }
    return { canCourse, canApprove };
}

function normalizeUserData() {
    subjectsDB.forEach(sub => {
        const data = userData[sub.id];
        if (!data) return;
        const locks = checkLockStatus(sub);
        
        if (!locks.canCourse) {
            resetSubject(sub.id);
        } else if (data.state === 'aprobada' && !locks.canApprove) {
            data.state = 'regularizada';
        }

        sanitizeSubjectData(sub.id);
    });
}

function calculateGrades(subjId) {
    const data = userData[subjId];
    if (!data) return;

    let finalExam = (data.exams || []).find(e => e.type === 'Examen Final' && isValidGrade(e.grade));
    if (finalExam) { data.finalGrade = Math.round(parseFloat(finalExam.grade) * 100) / 100; return; }

    let p1 = (data.exams || []).find(e => e.type === '1er parcial');
    let p2 = (data.exams || []).find(e => e.type === '2do parcial');
    let r1 = (data.exams || []).find(e => e.type === 'Recup. 1er parcial');
    let r2 = (data.exams || []).find(e => e.type === 'Recup. 2do parcial');

    let notaP1 = isValidGrade(r1?.grade) ? parseFloat(r1.grade) : (isValidGrade(p1?.grade) ? parseFloat(p1.grade) : null);
    let notaP2 = isValidGrade(r2?.grade) ? parseFloat(r2.grade) : (isValidGrade(p2?.grade) ? parseFloat(p2.grade) : null);

    let notasExamenes = [notaP1, notaP2].filter(n => n !== null);
    let promExamenes = notasExamenes.length ? notasExamenes.reduce((a, b) => a + b) / notasExamenes.length : null;

    let worksValidos = (data.works || []).filter(w => isValidGrade(w.grade));
    let promWorks = worksValidos.length ? worksValidos.reduce((acc, w) => acc + parseFloat(w.grade), 0) / worksValidos.length : null;

    if (promExamenes !== null && promWorks !== null) data.finalGrade = ((promExamenes * data.examsWeight) / 100) + ((promWorks * data.worksWeight) / 100);
    else if (promExamenes !== null) data.finalGrade = promExamenes;
    else if (promWorks !== null) data.finalGrade = promWorks;
    else data.finalGrade = null;

    if (data.finalGrade !== null) data.finalGrade = Math.round(data.finalGrade * 100) / 100;
}

// ==========================================
// 6. RENDERIZADO COMPARTIDO
// ==========================================
function generateEvalHTML(subjId, data, type) {
    let html = '';
    const isExam = type === 'exams';
    const arr = data[type] || [];

    arr.forEach((item, i) => {
        const textLabel = isExam ? (item.type || '1er parcial') : (item.name && item.name.trim() ? item.name : 'Trabajo');
        const gradeText = isValidGrade(item.grade) ? item.grade : '—';
        
        let typeInputHtml = isExam ? `
            <select class="compact-select" onchange="updateItem('${subjId}', 'exams', ${i}, 'type', this.value)">
                <option value="1er parcial" ${item.type === '1er parcial' ? 'selected' : ''}>1er parcial</option>
                <option value="2do parcial" ${item.type === '2do parcial' ? 'selected' : ''}>2do parcial</option>
                <option value="Recup. 1er parcial" ${item.type === 'Recup. 1er parcial' ? 'selected' : ''}>Recup. 1</option>
                <option value="Recup. 2do parcial" ${item.type === 'Recup. 2do parcial' ? 'selected' : ''}>Recup. 2</option>
                <option value="Examen Final" ${item.type === 'Examen Final' ? 'selected' : ''}>Examen Final</option>
            </select>
        ` : `<input type="text" class="compact-work-name-input" placeholder="Nombre" value="${item.name || ''}" onchange="updateItem('${subjId}', 'works', ${i}, 'name', this.value)">`;

        html += `
            <div class="eval-item eval-item-compact" tabindex="0">
                <div class="panel-row panel-row-compact">
                    ${typeInputHtml}
                    <input type="number" class="compact-grade-input" placeholder="Nota" value="${item.grade ?? ''}" onchange="updateItem('${subjId}', '${type}', ${i}, 'grade', this.value)">
                    <div class="compact-static-row" onclick="focusElement(this)">
                        <span class="compact-static-label">${textLabel}</span>
                        <span class="compact-static-grade">${gradeText}</span>
                    </div>
                    <button class="text-btn-del" onclick="removeItem('${subjId}', '${type}', ${i})" title="Borrar">X</button>
                </div>
                <input type="text" class="tema-input" placeholder="Escribir temas aquí y presionar Enter..." value="${item.topic || ''}" onchange="updateItem('${subjId}', '${type}', ${i}, 'topic', this.value)" onkeydown="if(event.key==='Enter'){ event.preventDefault(); this.blur(); }">
            </div>
        `;
    });
    return html;
}

function generateSubjectCardHTML(sub, context) {
    const data = userData[sub.id] || {};
    const locks = checkLockStatus(sub);
    const isLocked = !locks.canCourse;

    let animClass = "";
    if (previousLockStates[sub.id] === true && !isLocked) { animClass = "unlock-anim"; }
    previousLockStates[sub.id] = isLocked;

    let displayName = sub.name;
    let electiveHtml = '';

    if (sub.isElective) {
        const currentChoice = data.electiveChoice || 'default';
        electiveHtml = `<select class="status-select elective-select" onchange="changeElective('${sub.id}', this.value)">`;
        for (const [key, val] of Object.entries(electivasOptions)) {
            electiveHtml += `<option value="${key}" ${currentChoice === key ? 'selected' : ''}>${val.name}</option>`;
        }
        electiveHtml += `</select>`;
        if (currentChoice !== 'default') displayName = electivasOptions[currentChoice].name;
    }

    if (isLocked && context === 'malla') {
        return `
            <div class="subject-card bloqueada" onclick="mostrarModalInfo('${sub.id}')">
                <span class="lock-icon">🔒</span>
                <div class="blocked-title">${displayName}</div>
            </div>
        `;
    }

    const gradeHtml = (data.finalGrade !== null && data.state === 'aprobada') ? `<span class="subject-grade">(Nota: ${data.finalGrade})</span>` : '';
    const lockClass = isLocked ? "bloqueada" : "";
    const isExpanded = expandedSubjects[sub.id];

    let informeHtml = '';
    if (!isLocked) {
        if (context === 'malla') {
            const validExams = (data.exams || []).filter(e => e.type && isValidGrade(e.grade));
            const miniInformeContent = validExams.length === 0 ? `<div class="mini-informe-vacio">Sin evaluaciones</div>` : 
                `<div class="mini-informe-lista">${validExams.map(e => `<div class="mini-informe-item"><span class="mini-informe-tipo">${e.type}</span><span class="mini-informe-nota">${e.grade}</span></div>`).join('')}</div>`;
            
            informeHtml = `
                <div class="informe-toggle informe-toggle-mini" onclick="toggleInforme('${sub.id}')">${isExpanded ? '▼ Ocultar informe' : '▶ Ver informe'}</div>
                <div class="informe-panel mini-informe-panel" style="display: ${isExpanded ? 'block' : 'none'};">${miniInformeContent}</div>
            `;
        } else {
            informeHtml = `
                <div class="informe-toggle" onclick="toggleInforme('${sub.id}')">${isExpanded ? '▼ Ocultar Informe' : '▶ Informe de Materia'}</div>
                <div class="informe-panel" style="display: ${isExpanded ? 'block' : 'none'};">
                    <div class="pesos-config-container">
                        <div class="pesos-config-inline">
                            <label>Exámenes: <input type="number" class="peso-input" value="${data.examsWeight ?? 70}" onchange="updateWeight('${sub.id}', 'examsWeight', this.value)"> %</label>
                        </div>
                        <div class="pesos-config-inline">
                            <label>Trabajos: <input type="number" class="peso-input" value="${data.worksWeight ?? 30}" onchange="updateWeight('${sub.id}', 'worksWeight', this.value)"> %</label>
                        </div>
                    </div>
                    <h4>Datos de Exámenes</h4>
                    ${generateEvalHTML(sub.id, data, 'exams')}
                    <button class="text-btn-add" onclick="addItem('${sub.id}', 'exams')"><span class="plus-icon">+</span> Agregar Examen</button>
                    <h4 style="margin-top:10px;">Trabajos con Nota</h4>
                    ${generateEvalHTML(sub.id, data, 'works')}
                    <button class="text-btn-add" onclick="addItem('${sub.id}', 'works')"><span class="plus-icon">+</span> Agregar Trabajo</button>
                    <h4 style="margin-top:14px;">Repasos por Temas</h4>
                    ${renderRepasosGrid(sub.id)}
                </div>
            `;
        }
    }

    const transversalBtn = sub.isTransversal ? `<button class="text-btn-del" onclick="removeTransversal('${sub.id}')" title="Quitar">✖</button>` : '';
    const statusSelectHtml = `
        <select class="status-select" onchange="changeState('${sub.id}', this.value)" ${isLocked ? 'disabled' : ''}>
            <option value="no_cursada" ${data.state === 'no_cursada' ? 'selected' : ''}>No Cursada</option>
            <option value="en_curso" ${data.state === 'en_curso' ? 'selected' : ''}>En Curso</option>
            <option value="regularizada" ${data.state === 'regularizada' ? 'selected' : ''}>Regularizada</option>
            ${locks.canApprove ? `<option value="aprobada" ${data.state === 'aprobada' ? 'selected' : ''}>Aprobada</option>` : `<option disabled>Aprobada (Faltan Correlativas)</option>`}
        </select>
    `;

    const cardBaseClass = context === 'malla' ? 'subject-card' : 'subject-card subject-card-large';

    return `
        <div class="${cardBaseClass} ${data.state || 'no_cursada'} ${lockClass} ${animClass}">
            <div class="subject-header">
                <span class="subject-title">${displayName}</span>
                <div class="subject-actions">${transversalBtn}<span class="status-dot dot-${data.state || 'no_cursada'}"></span></div>
            </div>
            ${gradeHtml}
            ${electiveHtml}
            ${statusSelectHtml}
            ${informeHtml}
        </div>
    `;
}

// ==========================================
// 7. FUNCIONES PRINCIPALES DE RENDER
// ==========================================
function updateStats() {
    let counts = { aprobada: 0, regularizada: 0, en_curso: 0, no_cursada: 0 };
    subjectsDB.forEach(s => {
        if(userData[s.id]) counts[userData[s.id].state || 'no_cursada']++;
    });
    const statsContainer = document.getElementById('materias-stats');
    if(statsContainer) {
        statsContainer.innerHTML = `
            <div class="stat-item"><span class="status-dot dot-aprobada"></span> Aprobadas: ${counts.aprobada}</div>
            <div class="stat-item"><span class="status-dot dot-regularizada"></span> Regulares: ${counts.regularizada}</div>
            <div class="stat-item"><span class="status-dot dot-en_curso"></span> En curso: ${counts.en_curso}</div>
            <div class="stat-item"><span class="status-dot dot-no_cursada"></span> No cursadas: ${counts.no_cursada}</div>
        `;
    }
}

function renderMalla() {
    const grid = document.getElementById('malla-grid');
    grid.innerHTML = '';
    let totalAprobadas = 0;

    [1, 2, 3, 4, 5].forEach(year => {
        const yearCol = document.createElement('div');
        yearCol.className = 'year-column';
        yearCol.innerHTML = `<div class="year-header header-${year}">Año ${year}</div>`;

        [1, 2].forEach(term => {
            let subjectsByTerm = subjectsDB.filter(s => !s.isTransversal && s.year === year && s.term === term);
            subjectsByTerm = subjectsByTerm.concat(subjectsDB.filter(s => s.isTransversal && userData[s.id]?.placedYear === year && userData[s.id]?.placedTerm === term));

            if (subjectsByTerm.length > 0) {
                const termBox = document.createElement('div');
                termBox.className = `term-box bg-${year}`;
                termBox.innerHTML = `<div class="term-title">Cuatrimestre ${term}</div>`;

                subjectsByTerm.forEach(sub => {
                    if (userData[sub.id]?.state === 'aprobada') totalAprobadas++;
                    termBox.insertAdjacentHTML('beforeend', generateSubjectCardHTML(sub, 'malla'));
                });

                const unplaced = subjectsDB.filter(s => s.isTransversal && !userData[s.id]?.placedYear);
                if (unplaced.length > 0) {
                    termBox.insertAdjacentHTML('beforeend', `<select class="transversal-select" onchange="if(this.value) addTransversal(this.value, ${year}, ${term})"><option value="">+ Añadir Transversal</option>${unplaced.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}</select>`);
                }
                yearCol.appendChild(termBox);
            }
        });
        grid.appendChild(yearCol);
    });

    const percentage = Math.round((totalAprobadas / subjectsDB.length) * 100);
    document.getElementById('progress-bar').style.width = percentage + '%';
    document.getElementById('progress-text').innerText = `Progreso: ${percentage}% (${totalAprobadas} de ${subjectsDB.length} asignaturas)`;

    updateStats(); 
    renderMaterias();
    renderPromedios();
}

function renderMaterias() {
    const container = document.getElementById('materias-list');
    if (!container) return;
    const searchValue = normalizeText(document.getElementById('materias-search')?.value || '');
    let html = '';

    [1, 2, 3, 4, 5].forEach(year => {
        const yearKeyOpen = searchValue ? true : !!expandedYears[year];
        let yearContent = '';

        [1, 2].forEach(term => {
            const termKeyOpen = searchValue ? true : !!expandedTerms[`${year}-${term}`];
            let subjectsByTerm = subjectsDB.filter(s => !s.isTransversal && s.year === year && s.term === term);
            subjectsByTerm = subjectsByTerm.concat(subjectsDB.filter(s => s.isTransversal && userData[s.id]?.placedYear === year && userData[s.id]?.placedTerm === term));

            if (searchValue) subjectsByTerm = subjectsByTerm.filter(sub => normalizeText(sub.name).includes(searchValue));

            if (termKeyOpen && subjectsByTerm.length > 0) {
                yearContent += `<div class="materias-term-block"><div class="materias-term-header" onclick="toggleTerm(${year}, ${term})"><span>▼ Cuatrimestre ${term}</span></div><div class="materias-subject-list">`;
                subjectsByTerm.forEach(sub => yearContent += generateSubjectCardHTML(sub, 'materias'));
                yearContent += `</div></div>`;
            } else if (!termKeyOpen && subjectsByTerm.length > 0 && !searchValue) {
                yearContent += `<div class="materias-term-block"><div class="materias-term-header" onclick="toggleTerm(${year}, ${term})"><span>▶ Cuatrimestre ${term}</span></div></div>`;
            }
        });

        if (yearContent || !searchValue) {
            html += `<div class="materias-year-block"><div class="materias-year-header" onclick="toggleYear(${year})"><span>${yearKeyOpen ? '▼' : '▶'} Año ${year}</span></div>${yearKeyOpen ? yearContent : ''}</div>`;
        }
    });

    container.innerHTML = html.trim() ? html : `<p class="materias-empty">No hay materias que coincidan con la búsqueda.</p>`;
}

// ==========================================
// 8. LÓGICA DE REPASOS Y PROMEDIOS 
// ==========================================
function collectSubjectTopics(subjId) {
    const data = userData[subjId] || {}; const groups = [];
    ['exams', 'works'].forEach(type => {
        (data[type] || []).forEach((item, index) => {
            const title = type === 'exams' ? (item.type || `Examen ${index + 1}`) : (item.name || `Trabajo ${index + 1}`);
            const topics = (item.topic || '').split(',').map(t => t.trim()).filter(t => t.length > 0);
            groups.push({ sourceTitle: title, topics: topics.map(t => ({ key: `${type}_${index}__${t}`.toLowerCase(), topic: t })) });
        });
    });
    return groups;
}

function ensureReviewTopicsSync(subjId) {
    const data = userData[subjId]; if (!data) return;
    if (!data.reviewTopics) data.reviewTopics = {};
    const validKeys = new Set();
    collectSubjectTopics(subjId).forEach(group => group.topics.forEach(item => {
        validKeys.add(item.key);
        if (!data.reviewTopics[item.key]) data.reviewTopics[item.key] = { topic: item.topic, source: group.sourceTitle, color: '#fff176', reviews: [''] };
        else { data.reviewTopics[item.key].topic = item.topic; data.reviewTopics[item.key].source = group.sourceTitle; }
    }));
    Object.keys(data.reviewTopics).forEach(k => { if (!validKeys.has(k)) delete data.reviewTopics[k]; });
}

// LOGICA TOTALMENTE NUEVA PARA REPASOS CON FLEXBOX Y POR TEMA INDIVIDUAL
function renderRepasosGrid(subjId) {
    ensureReviewTopicsSync(subjId);
    const groups = collectSubjectTopics(subjId).filter(g => g.topics.length > 0);
    if (!groups.length) return `<div class="repasos-excel-wrap"><table class="repasos-excel-table"><tr><td class="repaso-excel-empty" style="padding:10px;text-align:center;color:#888;">Sin temas cargados</td></tr></table></div>`;

    return `<div class="repasos-excel-wrap">${groups.map(group => {
        const data = userData[subjId];
        
        return `<table class="repasos-excel-table">
            <tr><th colspan="2" class="repaso-excel-title">${group.sourceTitle}</th></tr>
            <tr>
                <th class="repaso-excel-topic-header" style="width:25%;">TEMAS</th>
                <th class="repaso-excel-reviews-header">REPASOS</th>
            </tr>
            ${group.topics.map(item => {
                const revData = data.reviewTopics[item.key];
                const reviews = (revData.reviews && revData.reviews.length > 0) ? revData.reviews : [''];
                const tColor = getContrastTextColor(revData.color);
                
                return `<tr>
                    <td class="repaso-excel-topic-cell" style="background:${revData.color}; color:${tColor};" onclick="openTopicColorPicker('${subjId}', '${item.key}')">
                        ${revData.topic}
                        <input type="color" id="topic-color-${subjId}-${sanitizeDomId(item.key)}" class="topic-color-hidden" value="${revData.color}" onchange="updateReviewTopicColor('${subjId}', '${item.key}', this.value)">
                    </td>
                    <td class="repaso-excel-reviews-cell">
                        <div class="reviews-flex-container">
                            ${reviews.map((r, i) => `
                                <div style="display: flex; align-items: center; gap: 2px;">
                                    <input type="date" class="repaso-excel-date" value="${r}" onchange="updateReviewTopicDate('${subjId}', '${item.key}', ${i}, this.value)">
                                    <button class="text-btn-del" style="padding: 0 4px; font-size: 1rem; background: none; border: none; cursor: pointer; margin-right: 4px;" onclick="removeReviewDate('${subjId}', '${item.key}', ${i})" title="Eliminar fecha">✖</button>
                                </div>
                            `).join('')}
                            <button class="repaso-excel-plus-btn" onclick="addReviewDate('${subjId}', '${item.key}')" title="Agregar repaso a este tema">+</button>
                        </div>
                    </td>
                </tr>`;
            }).join('')}</table>`;
    }).join('')}</div>`;
}

function renderPromedios() {
    const tbody = document.querySelector('#tabla-promedios-excel tbody');
    if (!tbody) return; tbody.innerHTML = '';
    const yearAverages = [];

    [1, 2, 3, 4, 5].forEach(year => {
        const subjectsYear = subjectsDB.filter(sub => !sub.isTransversal && sub.year === year).sort((a, b) => a.term !== b.term ? a.term - b.term : a.name.localeCompare(b.name));
        if (!subjectsYear.length) return;
        const yearRows = []; const termAverages = [];

        [1, 2].forEach(term => {
            const subjectsTerm = subjectsYear.filter(sub => sub.term === term);
            if (!subjectsTerm.length) return;
            const validGrades = [];
            subjectsTerm.forEach(sub => {
                const data = userData[sub.id] || {};
                const name = sub.isElective && data.electiveChoice && data.electiveChoice !== 'default' ? electivasOptions[data.electiveChoice].name : sub.name;
                const grade = data.state === 'aprobada' && data.finalGrade !== null ? data.finalGrade : null;
                if (grade !== null) validGrades.push(parseFloat(grade));
                yearRows.push({ year, term, subject: name, grade, showYear: false, showTerm: false, yearRowspan: 0, termRowspan: 0, termAverage: '', yearAverage: '', formula: '' });
            });
            const tAvg = validGrades.length ? Math.round((validGrades.reduce((a, b) => a + b, 0) / validGrades.length) * 100) / 100 : null;
            if (tAvg !== null) termAverages.push(tAvg);
            const startIdx = yearRows.length - subjectsTerm.length;
            yearRows[startIdx].showTerm = true; yearRows[startIdx].termRowspan = subjectsTerm.length;
            yearRows[startIdx].termAverage = tAvg ?? '-'; yearRows[startIdx].formula = validGrades.length ? `(${validGrades.join(' + ')}) / ${validGrades.length} = ${tAvg}` : '-';
        });

        const yAvg = termAverages.length ? Math.round((termAverages.reduce((a, b) => a + b, 0) / termAverages.length) * 100) / 100 : null;
        if (yAvg !== null) yearAverages.push(yAvg);
        if (yearRows.length) { yearRows[0].showYear = true; yearRows[0].yearRowspan = yearRows.length; yearRows[0].yearAverage = yAvg ?? '-'; }

        yearRows.forEach((r, i) => {
            tbody.innerHTML += `<tr>${r.showYear ? `<td rowspan="${r.yearRowspan}">Año ${r.year}</td>` : ''}${r.showTerm ? `<td rowspan="${r.termRowspan}">Cuatrimestre ${r.term}</td>` : ''}
                <td class="materia-cell">${r.subject}</td><td class="nota-cell">${r.grade ?? '-'}</td>
                ${r.showTerm ? `<td rowspan="${r.termRowspan}" class="promedio-cuatrimestre">${r.termAverage}</td>` : ''}
                ${r.showYear ? `<td rowspan="${r.yearRowspan}" class="promedio-anio">${r.yearAverage}</td>` : ''}
                ${i === 0 ? `<td rowspan="${yearRows.length}" class="empty-cell"></td>` : ''}<td class="formula-cell">${r.formula || '-'}</td></tr>`;
        });
    });

    const promGen = yearAverages.length ? Math.round((yearAverages.reduce((a, b) => a + b, 0) / yearAverages.length) * 100) / 100 : null;
    const rows = tbody.querySelectorAll('tr');
    if (rows.length) {
        const cell = document.createElement('td'); cell.className = 'promedio-general'; cell.rowSpan = rows.length; cell.textContent = promGen ?? '-';
        rows[0].insertBefore(cell, rows[0].children[6]);
    }
    tbody.innerHTML += `<tr><td colspan="7" class="empty-cell"></td><td class="formula-cell">${yearAverages.length ? `(${yearAverages.join(' + ')}) / ${yearAverages.length} = ${promGen}` : '-'}</td></tr>`;
}

// ==========================================
// 9. EVENTOS DE USUARIO Y MODALES
// ==========================================
function toggleYear(year) { expandedYears[year] = !expandedYears[year]; renderMaterias(); }
function toggleTerm(year, term) { expandedTerms[`${year}-${term}`] = !expandedTerms[`${year}-${term}`]; renderMaterias(); }
function toggleInforme(subjId) { expandedSubjects[subjId] = !expandedSubjects[subjId]; renderMalla(); }
function switchTab(tabId, event) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
    document.querySelectorAll('.tabs button').forEach(b => b.classList.remove('active'));
    document.getElementById(`tab-${tabId}`).classList.remove('hidden');
    event.target.classList.add('active');
}

function mostrarModalInfo(subjId) {
    const subject = subjectsDB.find(s => s.id === subjId);
    if(!subject) return;
    document.getElementById('info-modal-title').innerText = subject.name;
    
    let html = `<h3>Para cursar necesitás tener:</h3><ul>`;
    if (subject.reqCourse.length === 0) html += `<li>Ninguna condición extra</li>`;
    subject.reqCourse.forEach(req => {
        const reqSubj = subjectsDB.find(s => s.id === req.id);
        html += `<li>${reqSubj.name} (${req.state === 'A' ? 'Aprobada' : 'Regularizada'})</li>`;
    });
    
    html += `</ul><h3 style="margin-top:15px;">Para aprobar necesitás tener:</h3><ul>`;
    if (subject.reqApprove.length === 0) html += `<li>Ninguna condición extra</li>`;
    subject.reqApprove.forEach(req => {
        const reqSubj = subjectsDB.find(s => s.id === req.id);
        html += `<li>${reqSubj.name} (Aprobada)</li>`;
    });
    html += `</ul>`;

    document.getElementById('info-modal-body').innerHTML = html;
    document.getElementById('info-modal').classList.add('active');
}
function cerrarModalInfo() { document.getElementById('info-modal').classList.remove('active'); }

async function addItem(subjId, type) { if (userData[subjId]) { userData[subjId][type].push(type === 'exams' ? { type: '1er parcial', topic: '', grade: null } : { name: '', topic: '', grade: null }); await saveAndRender(subjId); } }
async function removeItem(subjId, type, index) { if (userData[subjId]) { userData[subjId][type].splice(index, 1); await saveAndRender(subjId); } }

async function updateItem(subjId, type, index, field, val) { 
    if (userData[subjId]) { 
        userData[subjId][type][index][field] = val; 
        if (field === 'topic') { 
            ensureReviewTopicsSync(subjId); 
            await saveToFirebase(); 
            renderMaterias(); 
        } else { 
            await saveAndRender(subjId); 
        } 
    } 
}

async function updateWeight(subjId, field, val) { 
    if (userData[subjId]) { 
        let newValue = Math.max(0, Math.min(100, parseFloat(val) || 0));
        userData[subjId][field] = newValue;
        
        if (field === 'examsWeight') {
            userData[subjId]['worksWeight'] = 100 - newValue;
        } else {
            userData[subjId]['examsWeight'] = 100 - newValue;
        }
        
        await saveAndRender(subjId); 
    } 
}

async function updateReviewTopicColor(subjId, topicKey, color) { if (userData[subjId]?.reviewTopics[topicKey]) { userData[subjId].reviewTopics[topicKey].color = color; await saveToFirebase(); renderMaterias(); } }
async function updateReviewTopicDate(subjId, topicKey, index, value) { if (userData[subjId]?.reviewTopics[topicKey]) { userData[subjId].reviewTopics[topicKey].reviews[index] = value; await saveToFirebase(); } }

// LOGICA NUEVA PARA AGREGAR REPASO A UN SOLO TEMA
async function addReviewDate(subjId, topicKey) { 
    if (userData[subjId]?.reviewTopics[topicKey]) { 
        if (!userData[subjId].reviewTopics[topicKey].reviews) {
            userData[subjId].reviewTopics[topicKey].reviews = [];
        }
        userData[subjId].reviewTopics[topicKey].reviews.push(''); 
        await saveToFirebase(); 
        renderMaterias(); 
    } 
}

async function removeReviewDate(subjId, topicKey, index) { 
    if (userData[subjId]?.reviewTopics[topicKey]?.reviews) { 
        userData[subjId].reviewTopics[topicKey].reviews.splice(index, 1); 
        // Si borramos todas las fechas, dejamos un input vacío para que no desaparezca la opción de escribir
        if (userData[subjId].reviewTopics[topicKey].reviews.length === 0) {
            userData[subjId].reviewTopics[topicKey].reviews.push('');
        }
        await saveToFirebase(); 
        renderMaterias(); 
    } 
}

async function saveAndRender(subjId) { sanitizeSubjectData(subjId); normalizeUserData(); await saveToFirebase(); renderMalla(); }

async function changeState(subjId, newState) {
    if (!userData[subjId]) return;
    userData[subjId].state = newState;
    if (newState === 'no_cursada') { resetSubject(subjId); }
    if (newState === 'en_curso') userData[subjId].finalGrade = null;
    await saveAndRender(subjId);
}
async function changeElective(subjId, choice) { if (userData[subjId]) { userData[subjId].electiveChoice = choice; resetSubject(subjId); await saveAndRender(subjId); } }
async function addTransversal(subjId, year, term) { if (!userData[subjId]) userData[subjId] = initUserData()[subjId]; userData[subjId].placedYear = year; userData[subjId].placedTerm = term; await saveAndRender(subjId); }
function removeTransversal(subjId) { if (userData[subjId]) { userData[subjId].placedYear = null; userData[subjId].placedTerm = null; changeState(subjId, 'no_cursada'); } }

// ==========================================
// 10. LOGIN, FIREBASE Y ARRANQUE
// ==========================================
async function login() {
    const user = document.getElementById('username-input').value.trim();
    if (!user) return alert("Ingresa un usuario");
    localStorage.setItem("mallaUser", user); currentUser = user;
    document.getElementById('login-screen').classList.remove('active');
    try {
        const doc = await db.collection("users").doc(currentUser).get();
        if (doc.exists) {
            let defaultData = initUserData(); userData = { ...defaultData, ...doc.data() };
            subjectsDB.forEach(sub => { userData[sub.id] = { ...defaultData[sub.id], ...userData[sub.id] }; sanitizeSubjectData(sub.id); });
        } else { userData = initUserData(); }
        normalizeUserData(); await saveToFirebase(); renderMalla();
    } catch (error) { console.error("Error al cargar datos:", error); alert("Hubo un problema al cargar los datos."); }
}

async function saveToFirebase() { if (currentUser) { try { await db.collection("users").doc(currentUser).set(JSON.parse(JSON.stringify(userData))); } catch (error) { console.error("Error guardando:", error); } } }

window.onload = () => {
    validateSubjectsDB();
    userData = initUserData();
    renderMalla();
    const savedUser = localStorage.getItem("mallaUser");
    if (savedUser) document.getElementById('username-input').value = savedUser;
};
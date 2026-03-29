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
// 2. BASE DE DATOS DE MATERIAS Y CORRELATIVAS
// ==========================================
// reqCourse: requisitos para cursar
// reqApprove: requisitos para aprobar
// state "R" = alcanza con regularizada o aprobada
// state "A" = debe estar aprobada

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

// ==========================================
// 4. UTILIDADES
// ==========================================
function initUserData() {
    let data = {};
    subjectsDB.forEach(sub => {
        data[sub.id] = {
            state: 'no_cursada',
            finalGrade: null,
            examsWeight: 70,
            worksWeight: 30,
            exams: [],
            works: [],
            electiveChoice: sub.isElective ? 'default' : undefined,
            placedYear: null,
            placedTerm: null
        };
    });
    return data;
}

function isValidGrade(value) {
    return value !== null && value !== undefined && value !== '' && !isNaN(parseFloat(value));
}

function resetSubject(subjId) {
    if (!userData[subjId]) return;
    userData[subjId].state = 'no_cursada';
    userData[subjId].finalGrade = null;
    userData[subjId].exams = [];
    userData[subjId].works = [];
}

function validateSubjectsDB() {
    const ids = new Set(subjectsDB.map(s => s.id));

    subjectsDB.forEach(subject => {
        [...subject.reqCourse, ...subject.reqApprove].forEach(req => {
            if (!ids.has(req.id)) {
                console.warn(`Correlativa inexistente en ${subject.id}: ${req.id}`);
            }
        });
    });
}

// ==========================================
// 5. CORRELATIVIDADES
// ==========================================
function checkLockStatus(subject) {
    let canCourse = true;
    let canApprove = true;
    const data = userData[subject.id] || {};

    let reqC = subject.reqCourse || [];
    let reqA = subject.reqApprove || [];

    if (subject.isElective) {
        const choice = data.electiveChoice || "default";
        reqC = electivasOptions[choice]?.reqCourse || [];
        reqA = electivasOptions[choice]?.reqApprove || [];

        if (choice === "default") {
            canCourse = false;
            canApprove = false;
        }
    }

    reqC.forEach(req => {
        const reqData = userData[req.id];
        if (!reqData) {
            canCourse = false;
            return;
        }

        const reqState = reqData.state;
        if (req.state === 'A' && reqState !== 'aprobada') canCourse = false;
        if (req.state === 'R' && reqState !== 'aprobada' && reqState !== 'regularizada') canCourse = false;
    });

    if (subject.id === 'PRACT_PROF') {
        let allApproved = true;
        subjectsDB.forEach(s => {
            if (s.id !== 'PRACT_PROF' && userData[s.id] && userData[s.id].state !== 'aprobada') {
                allApproved = false;
            }
        });
        canApprove = allApproved;
    } else {
        reqA.forEach(req => {
            const reqData = userData[req.id];
            if (!reqData || reqData.state !== 'aprobada') canApprove = false;
        });
    }

    return { canCourse, canApprove };
}

// ==========================================
// 6. CÁLCULO DE NOTAS
// ==========================================
function calculateGrades(subjId) {
    const data = userData[subjId];
    if (!data) return;

    if (data.state !== 'aprobada' && data.state !== 'regularizada') {
        data.finalGrade = null;
        return;
    }

    let finalExam = (data.exams || []).find(e => e.type === 'Examen Final' && isValidGrade(e.grade));
    if (finalExam) {
        data.finalGrade = Math.round(parseFloat(finalExam.grade) * 100) / 100;
        return;
    }

    let p1 = (data.exams || []).find(e => e.type === '1er parcial');
    let p2 = (data.exams || []).find(e => e.type === '2do parcial');
    let r1 = (data.exams || []).find(e => e.type === 'Recup. 1er parcial');
    let r2 = (data.exams || []).find(e => e.type === 'Recup. 2do parcial');

    let notaP1 = isValidGrade(r1?.grade) ? parseFloat(r1.grade) : (isValidGrade(p1?.grade) ? parseFloat(p1.grade) : null);
    let notaP2 = isValidGrade(r2?.grade) ? parseFloat(r2.grade) : (isValidGrade(p2?.grade) ? parseFloat(p2.grade) : null);

    let notasExamenes = [];
    if (notaP1 !== null) notasExamenes.push(notaP1);
    if (notaP2 !== null) notasExamenes.push(notaP2);

    let promExamenes = notasExamenes.length > 0
        ? notasExamenes.reduce((a, b) => a + b, 0) / notasExamenes.length
        : null;

    let worksValidos = (data.works || []).filter(w => isValidGrade(w.grade));
    let promWorks = worksValidos.length > 0
        ? worksValidos.reduce((acc, w) => acc + parseFloat(w.grade), 0) / worksValidos.length
        : null;

    if (promExamenes !== null && promWorks !== null) {
        data.finalGrade = ((promExamenes * data.examsWeight) / 100) + ((promWorks * data.worksWeight) / 100);
    } else if (promExamenes !== null) {
        data.finalGrade = promExamenes;
    } else if (promWorks !== null) {
        data.finalGrade = promWorks;
    } else {
        data.finalGrade = null;
    }

    if (data.finalGrade !== null) {
        data.finalGrade = Math.round(data.finalGrade * 100) / 100;
    }
}

// ==========================================
// 7. RENDER PRINCIPAL
// ==========================================
function renderMalla() {
    const grid = document.getElementById('malla-grid');
    grid.innerHTML = '';

    let totalAprobadas = 0;
    const years = [1, 2, 3, 4, 5];

    years.forEach(year => {
        const yearCol = document.createElement('div');
        yearCol.className = 'year-column';

        const yearHeader = document.createElement('div');
        yearHeader.className = `year-header header-${year}`;
        yearHeader.innerText = `Año ${year}`;
        yearCol.appendChild(yearHeader);

        const terms = [1, 2];

        terms.forEach(term => {
            let subjectsByTerm = subjectsDB.filter(s => !s.isTransversal && s.year === year && s.term === term);
            const placedTransversales = subjectsDB.filter(
                s => s.isTransversal &&
                userData[s.id] &&
                userData[s.id].placedYear === year &&
                userData[s.id].placedTerm === term
            );

            subjectsByTerm = subjectsByTerm.concat(placedTransversales);

            if (subjectsByTerm.length > 0) {
                const termBox = document.createElement('div');
                termBox.className = `term-box bg-${year}`;

                const termTitle = document.createElement('div');
                termTitle.className = 'term-title';
                termTitle.innerText = `Cuatrimestre ${term}`;
                termBox.appendChild(termTitle);

                subjectsByTerm.forEach(sub => {
                    const data = userData[sub.id] || {};
                    const locks = checkLockStatus(sub);

                    let lockClass = !locks.canCourse ? "bloqueada" : "";

                    if (data.state === 'aprobada') totalAprobadas++;

                    const card = document.createElement('div');
                    card.className = `subject-card ${data.state || 'no_cursada'} ${lockClass}`;

                    let gradeHtml = (data.finalGrade !== null && data.state === 'aprobada')
                        ? `<span class="subject-grade">(Nota: ${data.finalGrade})</span>`
                        : '';

                    let displayName = sub.name;
                    let electiveHtml = '';

                    if (sub.isElective) {
                        const currentChoice = data.electiveChoice || 'default';

                        electiveHtml = `<select class="status-select elective-select" onchange="changeElective('${sub.id}', this.value)">`;
                        for (const [key, value] of Object.entries(electivasOptions)) {
                            electiveHtml += `<option value="${key}" ${currentChoice === key ? 'selected' : ''}>${value.name}</option>`;
                        }
                        electiveHtml += `</select>`;

                        if (currentChoice !== 'default') {
                            displayName = electivasOptions[currentChoice].name;
                        }
                    }

                    let informeHtml = '';
                    if (locks.canCourse) {
                        const isExpanded = expandedSubjects[sub.id];

                        let examsHtml = (data.exams || []).map((exam, i) => `
                            <div class="eval-item">
                                <div class="panel-row">
                                    <select onchange="updateItem('${sub.id}', 'exams', ${i}, 'type', this.value)">
                                        <option value="1er parcial" ${exam.type==='1er parcial'?'selected':''}>1er parc.</option>
                                        <option value="2do parcial" ${exam.type==='2do parcial'?'selected':''}>2do parc.</option>
                                        <option value="Recup. 1er parcial" ${exam.type==='Recup. 1er parcial'?'selected':''}>Rec. 1</option>
                                        <option value="Recup. 2do parcial" ${exam.type==='Recup. 2do parcial'?'selected':''}>Rec. 2</option>
                                        <option value="Examen Final" ${exam.type==='Examen Final'?'selected':''}>Final</option>
                                    </select>
                                    <input type="number" class="nota-input" placeholder="Nota" value="${exam.grade ?? ''}" onchange="updateItem('${sub.id}', 'exams', ${i}, 'grade', this.value)">
                                    <button class="text-btn-del" onclick="removeItem('${sub.id}', 'exams', ${i})" title="Borrar">X</button>
                                </div>
                                <input type="text" class="tema-input" placeholder="Escribir temas aquí..." value="${exam.topic || ''}" onchange="updateItem('${sub.id}', 'exams', ${i}, 'topic', this.value)">
                            </div>
                        `).join('');

                        let worksHtml = (data.works || []).map((work, i) => `
                            <div class="eval-item">
                                <div class="panel-row">
                                    <input type="text" placeholder="Nombre" value="${work.name || ''}" onchange="updateItem('${sub.id}', 'works', ${i}, 'name', this.value)" style="flex:1; min-width:0;">
                                    <input type="number" class="nota-input" placeholder="Nota" value="${work.grade ?? ''}" onchange="updateItem('${sub.id}', 'works', ${i}, 'grade', this.value)">
                                    <button class="text-btn-del" onclick="removeItem('${sub.id}', 'works', ${i})" title="Borrar">X</button>
                                </div>
                                <input type="text" class="tema-input" placeholder="Escribir temas aquí..." value="${work.topic || ''}" onchange="updateItem('${sub.id}', 'works', ${i}, 'topic', this.value)">
                            </div>
                        `).join('');

                        informeHtml = `
                            <div class="informe-toggle" onclick="toggleInforme('${sub.id}')">
                                ${isExpanded ? '▼ Ocultar Informe' : '▶ Informe de Materia'}
                            </div>

                            <div class="informe-panel" style="display: ${isExpanded ? 'block' : 'none'};">
                                <h4>Datos de Exámenes</h4>
                                ${examsHtml}
                                <button class="text-btn-add" onclick="addItem('${sub.id}', 'exams')">
                                    <span class="plus-icon">+</span> Agregar Examen
                                </button>

                                <h4 style="margin-top:10px;">Trabajos con Nota</h4>
                                ${worksHtml}
                                <button class="text-btn-add" onclick="addItem('${sub.id}', 'works')">
                                    <span class="plus-icon">+</span> Agregar Trabajo
                                </button>

                                <div class="pesos-config">
                                    <label>Exámenes:
                                        <input type="number" value="${data.examsWeight ?? 70}" onchange="updateWeight('${sub.id}', 'examsWeight', this.value)">%
                                    </label>
                                    <label>Trabajos:
                                        <input type="number" value="${data.worksWeight ?? 30}" onchange="updateWeight('${sub.id}', 'worksWeight', this.value)">%
                                    </label>
                                </div>
                            </div>
                        `;
                    }

                    card.innerHTML = `
                        <div class="subject-header">
                            <span class="subject-title">${displayName}</span>
                            <div class="subject-actions">
                                ${sub.isTransversal ? `<button class="text-btn-del" onclick="removeTransversal('${sub.id}')" title="Quitar transversal">✖</button>` : ''}
                                <span class="status-dot dot-${data.state || 'no_cursada'}"></span>
                            </div>
                        </div>
                        ${gradeHtml}
                        ${electiveHtml}
                        <select class="status-select" onchange="changeState('${sub.id}', this.value)" ${!locks.canCourse ? 'disabled' : ''}>
                            <option value="no_cursada" ${data.state === 'no_cursada' ? 'selected' : ''}>No Cursada</option>
                            <option value="en_curso" ${data.state === 'en_curso' ? 'selected' : ''}>En Curso</option>
                            <option value="regularizada" ${data.state === 'regularizada' ? 'selected' : ''}>Regularizada</option>
                            ${locks.canApprove
                                ? `<option value="aprobada" ${data.state === 'aprobada' ? 'selected' : ''}>Aprobada</option>`
                                : `<option disabled>Aprobada (Faltan Correlativas)</option>`
                            }
                        </select>
                        ${informeHtml}
                    `;

                    termBox.appendChild(card);
                });

                const unplacedTransversales = subjectsDB.filter(
                    s => s.isTransversal && (!userData[s.id] || !userData[s.id].placedYear)
                );

                if (unplacedTransversales.length > 0) {
                    let optionsHtml = unplacedTransversales
                        .map(s => `<option value="${s.id}">${s.name}</option>`)
                        .join('');

                    const addTransversalHtml = `
                        <select class="transversal-select" onchange="if(this.value) addTransversal(this.value, ${year}, ${term})">
                            <option value="">+ Añadir Transversal</option>
                            ${optionsHtml}
                        </select>
                    `;
                    termBox.insertAdjacentHTML('beforeend', addTransversalHtml);
                }

                yearCol.appendChild(termBox);
            }
        });

        grid.appendChild(yearCol);
    });

    const percentage = Math.round((totalAprobadas / subjectsDB.length) * 100);
    document.getElementById('progress-bar').style.width = percentage + '%';
    document.getElementById('progress-text').innerText = `Progreso: ${percentage}% (${totalAprobadas} de ${subjectsDB.length} asignaturas)`;

    renderMaterias();
    renderPromedios();
}

// ==========================================
// 8. RENDER DE OTRAS TABS
// ==========================================
function renderMaterias() {
    const container = document.getElementById('materias-list');
    if (!container) return;

    const materias = subjectsDB
        .filter(s => !s.isTransversal)
        .map(sub => {
            const data = userData[sub.id] || {};
            return `
                <div class="subject-card ${data.state || 'no_cursada'}" style="margin: 10px 20px;">
                    <div class="subject-header">
                        <span class="subject-title">${sub.name}</span>
                        <span class="status-dot dot-${data.state || 'no_cursada'}"></span>
                    </div>
                    <div style="margin-top: 8px;">Año ${sub.year} - Cuatrimestre ${sub.term}</div>
                    <div style="margin-top: 6px;">Estado: ${formatState(data.state || 'no_cursada')}</div>
                    ${data.finalGrade !== null ? `<div style="margin-top: 6px;">Nota final: ${data.finalGrade}</div>` : ''}
                </div>
            `;
        })
        .join('');

    container.innerHTML = materias || '<p style="padding:20px;">No hay materias para mostrar.</p>';
}

function renderPromedios() {
    const tbody = document.querySelector('#tabla-promedios tbody');
    const promedioEl = document.getElementById('promedio-general-val');
    if (!tbody || !promedioEl) return;

    const approvedWithGrade = subjectsDB
        .filter(sub => userData[sub.id] && userData[sub.id].state === 'aprobada' && userData[sub.id].finalGrade !== null);

    tbody.innerHTML = '';

    if (approvedWithGrade.length === 0) {
        promedioEl.textContent = '-';
        tbody.innerHTML = `<tr><td colspan="3">Todavía no hay materias aprobadas con nota cargada.</td></tr>`;
        return;
    }

    let sum = 0;

    approvedWithGrade.forEach(sub => {
        const grade = userData[sub.id].finalGrade;
        sum += grade;

        tbody.innerHTML += `
            <tr>
                <td>${sub.name}</td>
                <td>${sub.year ?? '-'}</td>
                <td>${grade}</td>
            </tr>
        `;
    });

    const promedio = Math.round((sum / approvedWithGrade.length) * 100) / 100;
    promedioEl.textContent = promedio;
}

function formatState(state) {
    switch (state) {
        case 'no_cursada': return 'No cursada';
        case 'en_curso': return 'En curso';
        case 'regularizada': return 'Regularizada';
        case 'aprobada': return 'Aprobada';
        default: return state;
    }
}

// ==========================================
// 9. INFORME DE MATERIA
// ==========================================
function toggleInforme(subjId) {
    expandedSubjects[subjId] = !expandedSubjects[subjId];
    renderMalla();
}

function addItem(subjId, type) {
    if (!userData[subjId]) return;

    if (type === 'exams') {
        userData[subjId].exams.push({ type: '1er parcial', topic: '', grade: null });
    } else {
        userData[subjId].works.push({ name: '', topic: '', grade: null });
    }

    saveAndRender(subjId);
}

function removeItem(subjId, type, index) {
    if (!userData[subjId] || !userData[subjId][type]) return;
    userData[subjId][type].splice(index, 1);
    saveAndRender(subjId);
}

function updateItem(subjId, type, index, field, val) {
    if (!userData[subjId] || !userData[subjId][type] || !userData[subjId][type][index]) return;
    userData[subjId][type][index][field] = val;
    saveAndRender(subjId);
}

function updateWeight(subjId, field, val) {
    if (!userData[subjId]) return;
    userData[subjId][field] = Math.max(0, Math.min(100, parseFloat(val) || 0));
    saveAndRender(subjId);
}

function saveAndRender(subjId) {
    calculateGrades(subjId);
    saveToFirebase();
    renderMalla();
}

// ==========================================
// 10. CAMBIO DE ESTADO / ELECTIVAS / TRANSVERSALES
// ==========================================
function changeState(subjId, newState) {
    if (!userData[subjId]) return;

    userData[subjId].state = newState;

    if (newState === 'no_cursada') {
        userData[subjId].finalGrade = null;
        userData[subjId].exams = [];
        userData[subjId].works = [];
    }

    calculateGrades(subjId);
    saveToFirebase();
    renderMalla();
}

function changeElective(subjId, choice) {
    if (!userData[subjId]) return;

    userData[subjId].electiveChoice = choice;
    resetSubject(subjId);
    saveToFirebase();
    renderMalla();
}

function addTransversal(subjId, year, term) {
    if (!userData[subjId]) {
        userData[subjId] = initUserData()[subjId];
    }

    userData[subjId].placedYear = year;
    userData[subjId].placedTerm = term;
    saveToFirebase();
    renderMalla();
}

function removeTransversal(subjId) {
    if (!userData[subjId]) return;

    userData[subjId].placedYear = null;
    userData[subjId].placedTerm = null;
    changeState(subjId, 'no_cursada');
}

// ==========================================
// 11. NAVEGACIÓN
// ==========================================
function switchTab(tabId, event) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
    document.querySelectorAll('.tabs button').forEach(b => b.classList.remove('active'));

    document.getElementById(`tab-${tabId}`).classList.remove('hidden');
    event.target.classList.add('active');
}

// ==========================================
// 12. LOGIN Y FIREBASE
// ==========================================
async function login() {
    const user = document.getElementById('username-input').value.trim();
    if (!user) {
        alert("Ingresa un usuario");
        return;
    }

    localStorage.setItem("mallaUser", user);
    currentUser = user;

    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('main-nav').classList.remove('hidden');
    document.getElementById('app-container').classList.remove('hidden');
    document.getElementById('progress-footer').classList.remove('hidden');

    try {
        const doc = await db.collection("users").doc(currentUser).get();

        if (doc.exists) {
            let defaultData = initUserData();
            userData = { ...defaultData, ...doc.data() };

            subjectsDB.forEach(sub => {
                userData[sub.id] = {
                    ...defaultData[sub.id],
                    ...userData[sub.id]
                };
            });
        } else {
            userData = initUserData();
        }

        renderMalla();
    } catch (error) {
        console.error("Error al cargar datos:", error);
        alert("Hubo un problema al cargar los datos.");
    }
}

async function saveToFirebase() {
    if (!currentUser) return;

    try {
        await db.collection("users").doc(currentUser).set(userData);
    } catch (error) {
        console.error("Error guardando en Firebase:", error);
    }
}

// ==========================================
// 13. INICIALIZACIÓN
// ==========================================
window.onload = () => {
    validateSubjectsDB();

    userData = initUserData();
    renderMalla();

    const savedUser = localStorage.getItem("mallaUser");
    if (savedUser) {
        document.getElementById('username-input').value = savedUser;
    }
};
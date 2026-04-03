/**
 * AUAFIT — Estrategia de Marketing Aquaboard Cali
 * Generates a premium PDF using PDFKit (pure Node.js)
 */

const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

// ── BRAND COLORS (hex → rgb arrays) ──────────────
const NAVY  = [0,   51,  102];
const BLUE  = [0,   102, 204];
const CYAN  = [0,   180, 216];
const WHITE = [255, 255, 255];
const LGRAY = [240, 244, 248];
const DGRAY = [51,  65,  85];
const MGRAY = [180, 200, 220];

const OUTPUT = "C:/Users/natha/OneDrive/Documentos/GitHub/AUAFIT/Estrategia Marketing Aquaboard Cali.pdf";

const doc = new PDFDocument({ size: "A4", margin: 0, bufferPages: true });
doc.pipe(fs.createWriteStream(OUTPUT));

const W = doc.page.width;   // 595
const H = doc.page.height;  // 842

function rgb(arr) { return arr; }

// ── HELPERS ──────────────────────────────────────
function rect(x, y, w, h, color) {
  doc.rect(x, y, w, h).fill(color);
}

function text(str, x, y, opts = {}) {
  const { size = 11, color = DGRAY, bold = false, align = "left", width = W - x - 40 } = opts;
  doc.font(bold ? "Helvetica-Bold" : "Helvetica")
     .fontSize(size)
     .fillColor(color)
     .text(str, x, y, { align, width, lineGap: 2 });
}

function pageHeader(title, subtitle) {
  rect(0, 0, W, 70, NAVY);
  doc.font("Helvetica-Bold").fontSize(22).fillColor(WHITE).text(title, 30, 16, { width: W - 60 });
  if (subtitle) {
    doc.font("Helvetica").fontSize(11).fillColor(CYAN).text(subtitle, 30, 46, { width: W - 60 });
  }
}

function divider(y, color = CYAN) {
  rect(30, y, W - 60, 2, color);
}

function newPage(title, subtitle) {
  doc.addPage();
  pageHeader(title, subtitle);
}

function card(x, y, w, h, bg, title, titleColor, body, bodyColor) {
  rect(x, y, w, h, bg);
  doc.font("Helvetica-Bold").fontSize(11).fillColor(titleColor).text(title, x + 10, y + 10, { width: w - 20 });
  doc.font("Helvetica").fontSize(10).fillColor(bodyColor).text(body, x + 10, y + 28, { width: w - 20, lineGap: 3 });
}

function pageNumber(n) {
  doc.font("Helvetica").fontSize(9).fillColor(MGRAY)
     .text(`${n}`, 0, H - 25, { align: "center", width: W });
}

// ═══════════════════════════════════════════════
// PAGE 1 — COVER
// ═══════════════════════════════════════════════
rect(0, 0, W, H, NAVY);
rect(0, 0, 8, H, CYAN);                     // left accent
rect(0, H - 80, W, 80, BLUE);               // bottom bar
rect(30, H - 82, 300, 4, CYAN);             // accent line

doc.font("Helvetica-Bold").fontSize(36).fillColor(CYAN).text("AUAFIT", 30, 60, { width: 400 });
doc.font("Helvetica-Bold").fontSize(40).fillColor(WHITE).text("Estrategia de Marketing", 30, 120, { width: W - 60, lineGap: 4 });
doc.font("Helvetica").fontSize(18).fillColor([168, 212, 245]).text("Aquaboard · Hotel Intercontinental Cali", 30, 215, { width: W - 60 });
rect(30, 255, 280, 3, CYAN);
doc.font("Helvetica").fontSize(13).fillColor([120, 180, 220]).text("Abril 2026", 30, 268);
doc.font("Helvetica").fontSize(11).fillColor(WHITE).text("Estrategia de crecimiento — 8 semanas", 30, H - 60, { width: W - 60, align: "center" });
pageNumber(1);

// ═══════════════════════════════════════════════
// PAGE 2 — DIAGNÓSTICO
// ═══════════════════════════════════════════════
newPage("Diagnóstico de Situación Actual", "Punto de partida — Abril 2026");

const diagRows = [
  ["Inscritos actuales", "13 miembros"],
  ["Boards disponibles", "9 por sesión"],
  ["Capacidad al 80%", "7–8 personas por clase"],
  ["Sesiones semanales", "6 (Lunes, Miércoles, Viernes × 9AM y 5:30PM)"],
  ["Ventaja competitiva", "Único aquaboard en hotel 5 estrellas en Cali"],
  ["Principal barrera", "Bajo awareness local"],
];

let ty = 88;
// header
rect(30, ty, 250, 24, NAVY); rect(282, ty, 283, 24, NAVY);
doc.font("Helvetica-Bold").fontSize(10).fillColor(WHITE);
doc.text("Variable", 38, ty + 7, { width: 240 });
doc.text("Situación", 290, ty + 7, { width: 270 });
ty += 24;

diagRows.forEach(([varr, sit], i) => {
  const bg = i % 2 === 0 ? LGRAY : WHITE;
  rect(30, ty, 250, 26, bg); rect(282, ty, 283, 26, bg);
  doc.rect(30, ty, 533, 26).stroke(MGRAY);
  doc.font("Helvetica").fontSize(10).fillColor(DGRAY);
  doc.text(varr, 38, ty + 8, { width: 238 });
  doc.text(sit, 290, ty + 8, { width: 270 });
  ty += 26;
});

// Insight box
ty += 14;
rect(30, ty, 533, 80, CYAN);
doc.font("Helvetica-Bold").fontSize(11).fillColor(WHITE)
   .text("Insight clave:", 40, ty + 10, { width: 513 });
doc.font("Helvetica").fontSize(11).fillColor(WHITE)
   .text("Con 20–25 miembros activos que asistan 2.5 veces/semana ya se alcanza el 80% de ocupación. El objetivo es compromiso, no volumen.", 40, ty + 28, { width: 513, lineGap: 3 });

// Math
ty += 98;
rect(30, ty, 533, 100, LGRAY);
const maths = [
  "• 9 boards × 80% = 7–8 personas por sesión",
  "• 6 sesiones/semana × 7.5 promedio = 45 asistencias/semana necesarias",
  "• A 2.5 sesiones/miembro/semana → 18–20 miembros activos",
  "• Meta realista: 25 miembros comprometidos",
];
doc.font("Helvetica").fontSize(10).fillColor(DGRAY);
maths.forEach((m, i) => doc.text(m, 42, ty + 10 + i * 20, { width: 509 }));
pageNumber(2);

// ═══════════════════════════════════════════════
// PAGE 3 — PILAR 1: OPEN DAYS
// ═══════════════════════════════════════════════
newPage("Pilar 1 — Clases de Prueba Gratuitas", "Semanas 1–2");

const openCards = [
  ["CUÁNDO", "2 sábados consecutivos\n10AM y 12PM\nCupo máximo: 12 personas por sesión"],
  ["QUIÉNES", "Influencers fitness Cali\nInstructoras yoga/pilates\nMédicos y fisioterapeutas"],
  ["CIERRE", "Descuento del 20% para quienes se inscriban ese mismo día\nOferta de tiempo limitado en el momento"],
  ["POR QUÉ FUNCIONA", "En Cali la cultura fitness es alta.\nUna sola clase convierte al prospecto.\nEl boca a boca post-experiencia es el canal más poderoso."],
];

openCards.forEach(([title, body], i) => {
  const x = i % 2 === 0 ? 30 : 305;
  const y = 90 + Math.floor(i / 2) * 190;
  const bg = i % 2 === 0 ? LGRAY : NAVY;
  const tc = i % 2 === 0 ? NAVY : CYAN;
  const bc = i % 2 === 0 ? DGRAY : WHITE;
  rect(x, y, 260, 175, bg);
  doc.font("Helvetica-Bold").fontSize(13).fillColor(tc).text(title, x + 12, y + 14, { width: 236 });
  rect(x + 12, y + 34, 60, 2, CYAN);
  doc.font("Helvetica").fontSize(11).fillColor(bc).text(body, x + 12, y + 44, { width: 236, lineGap: 4 });
});
pageNumber(3);

// ═══════════════════════════════════════════════
// PAGE 4 — PILAR 2: ALIANZAS B2B
// ═══════════════════════════════════════════════
newPage("Pilar 2 — Alianzas Estratégicas B2B", "Semanas 1–4");

// Left column
rect(30, 88, 255, 30, BLUE);
doc.font("Helvetica-Bold").fontSize(12).fillColor(WHITE).text("Empresas Target", 40, 96, { width: 235 });
rect(30, 118, 255, 20, LGRAY);
doc.font("Helvetica").fontSize(9).fillColor(NAVY).text("Zona: El Peñón / Granada / Ciudad Jardín", 38, 123, { width: 240 });

const targets = [
  "• Coomeva, Comfenalco, Sura\n  (bienestar laboral)",
  "• Clínicas y hospitales\n  (fisioterapia acuática)",
  "• Centros de estética y recuperación corporal",
];
rect(30, 138, 255, 330, LGRAY);
doc.font("Helvetica").fontSize(11).fillColor(DGRAY);
targets.forEach((t, i) => doc.text(t, 40, 148 + i * 80, { width: 235, lineGap: 4 }));

// Right column
rect(300, 88, 265, 380, NAVY);
doc.font("Helvetica-Bold").fontSize(18).fillColor(CYAN).text("Plan Wellness Team", 312, 100, { width: 241 });
rect(312, 130, 241, 2, CYAN);
const planItems = [
  "8 cupos fijos LMV 9AM",
  "Precio especial con factura a la empresa",
  "Empleados sin costo directo de bolsillo",
  "Mínima fricción de compra",
];
planItems.forEach((item, i) => {
  doc.font("Helvetica-Bold").fontSize(12).fillColor(CYAN).text("✓", 312, 148 + i * 52, { width: 20 });
  doc.font("Helvetica").fontSize(11).fillColor(WHITE).text(item, 332, 148 + i * 52, { width: 221 });
});

rect(300, 430, 265, 40, CYAN);
doc.font("Helvetica-Bold").fontSize(11).fillColor(NAVY).text("META: 2 empresas = 16 cupos → 9AM al 80%", 308, 441, { width: 249, align: "center" });
pageNumber(4);

// ═══════════════════════════════════════════════
// PAGE 5 — PILAR 3: MICRO-INFLUENCERS
// ═══════════════════════════════════════════════
newPage("Pilar 3 — Micro-Influencers Cali", "Semanas 1–3  ·  Costo: $0 en efectivo");

const infCards = [
  ["Fisioterapeutas\ny Médicos Deportivos", "Audiencia interesada en recuperación y bienestar activo. Alta credibilidad.", LGRAY, NAVY, DGRAY],
  ["Pilates / Yoga\n/ Crossfit", "Instructoras con comunidad fitness local comprometida.", NAVY, CYAN, WHITE],
  ["Mamás Activas\ny Lifestyle", "Grupos de WhatsApp de alto alcance. Cultura de recomendación.", LGRAY, NAVY, DGRAY],
  ["Salsa Fitness\n(Cultura Cali)", "Audiencia local muy alta. El aquaboard como experiencia única en Cali.", NAVY, CYAN, WHITE],
];

infCards.forEach(([title, body, bg, tc, bc], i) => {
  const x = i % 2 === 0 ? 30 : 305;
  const y = 90 + Math.floor(i / 2) * 185;
  rect(x, y, 260, 170, bg);
  doc.font("Helvetica-Bold").fontSize(12).fillColor(tc).text(title, x + 12, y + 14, { width: 236, lineGap: 2 });
  rect(x + 12, y + 52, 50, 2, CYAN);
  doc.font("Helvetica").fontSize(10).fillColor(bc).text(body, x + 12, y + 62, { width: 236, lineGap: 3 });
});

rect(30, 462, 535, 38, CYAN);
doc.font("Helvetica-Bold").fontSize(11).fillColor(NAVY)
   .text("Propuesta: 1 mes de membresía gratis  →  3 Stories + 1 Reel  |  Perfil: 5.000–50.000 seguidores, audiencia local", 38, 472, { width: 519, align: "center" });
pageNumber(5);

// ═══════════════════════════════════════════════
// PAGE 6 — PILAR 4: CONTENIDO DIGITAL
// ═══════════════════════════════════════════════
newPage("Pilar 4 — Estrategia de Contenido Digital", "Instagram & TikTok");

const contentRows = [
  ["Tipo de Contenido", "Frecuencia", "Ejemplo"],
  ["Reels de clase en acción", "3/semana", '"Así se siente hacer pilates sobre el agua"'],
  ["Antes y después (transformación)", "2/semana", "Postura, core, bienestar"],
  ["Tutorial de 30 segundos", "1/semana", '"El ejercicio más difícil para mis alumnos"'],
  ["Testimonio de miembro real", "1/semana", "Video auténtico, no texto"],
  ["Behind the scenes del hotel", "1/semana", "El entorno premium es parte del valor"],
];

let cy = 88;
const colW = [200, 90, 243];
const colX = [30, 232, 324];

contentRows.forEach((row, ri) => {
  const rowH = 34;
  const bg = ri === 0 ? NAVY : ri % 2 === 0 ? WHITE : LGRAY;
  colW.forEach((w, ci) => {
    rect(colX[ci], cy, w, rowH, bg);
    doc.font(ri === 0 ? "Helvetica-Bold" : "Helvetica")
       .fontSize(10)
       .fillColor(ri === 0 ? WHITE : DGRAY)
       .text(row[ci], colX[ci] + 6, cy + 10, { width: w - 12 });
  });
  cy += rowH;
});

cy += 16;
rect(30, cy, 535, 40, CYAN);
doc.font("Helvetica-Bold").fontSize(10).fillColor(NAVY)
   .text("Tip: Publicar el contenido de la clase de 5:30PM ese mismo día en la noche. La audiencia está activa.", 40, cy + 6, { width: 515 });
doc.font("Helvetica").fontSize(10).fillColor(NAVY)
   .text("Hashtags: #FitnessCali  #CaliActiva  #AquaFitness  #HotelIntercontinentalCali  #BienestarCali", 40, cy + 22, { width: 515 });
pageNumber(6);

// ═══════════════════════════════════════════════
// PAGE 7 — PILAR 5: HORARIOS
// ═══════════════════════════════════════════════
newPage("Pilar 5 — Dos Horarios, Dos Audiencias", "Estrategia diferenciada por sesión");

// 9AM
rect(30, 88, 258, 380, BLUE);
doc.font("Helvetica-Bold").fontSize(32).fillColor(WHITE).text("9:00 AM", 40, 98, { width: 238 });
rect(40, 142, 238, 2, CYAN);
const amData = [
  ["Audiencia:", "Mamás, trabajo remoto, mujeres 30–50"],
  ["Canal:", "WhatsApp comunidades, Pilates studios cercanos"],
  ["Mensaje:", '"Recarga tu mañana antes que empiece el día"'],
  ["Alianza:", "Descuento en cafeterías premium cerca del hotel"],
];
amData.forEach(([label, val], i) => {
  doc.font("Helvetica-Bold").fontSize(10).fillColor(CYAN).text(label, 40, 155 + i * 66, { width: 238 });
  doc.font("Helvetica").fontSize(11).fillColor(WHITE).text(val, 40, 170 + i * 66, { width: 238, lineGap: 2 });
});

// 5:30PM
rect(305, 88, 258, 380, NAVY);
doc.font("Helvetica-Bold").fontSize(32).fillColor(WHITE).text("5:30 PM", 315, 98, { width: 238 });
rect(315, 142, 238, 2, CYAN);
const pmData = [
  ["Audiencia:", "Ejecutivos, empleados de oficina, jóvenes 25–38"],
  ["Canal:", "LinkedIn Cali, flyers en edificios de oficinas"],
  ["Mensaje:", '"Desconéctate del trabajo. Literalmente."'],
  ["Alianza:", "Empresas del sector financiero y tecnológico Cali"],
];
pmData.forEach(([label, val], i) => {
  doc.font("Helvetica-Bold").fontSize(10).fillColor(CYAN).text(label, 315, 155 + i * 66, { width: 238 });
  doc.font("Helvetica").fontSize(11).fillColor(WHITE).text(val, 315, 170 + i * 66, { width: 238, lineGap: 2 });
});
pageNumber(7);

// ═══════════════════════════════════════════════
// PAGE 8 — PILAR 6: RETENCIÓN
// ═══════════════════════════════════════════════
newPage("Pilar 6 — Convertir Miembros en Embajadores", "Estrategia de retención y referidos");

const retCards = [
  ["TRAE UN AMIGO", "1 semana gratis por cada referido que se inscriba y pague.\nSin costo extra para el negocio — el referido cubre el costo.", LGRAY, NAVY, DGRAY],
  ["RETO 30 DÍAS", "Reconocimiento en redes para los miembros más constantes.\nRequiere permiso del cliente. Genera contenido auténtico.", NAVY, CYAN, WHITE],
  ["COMUNIDAD VIP", "Grupo de WhatsApp exclusivo: noticias, motivación y reserva prioritaria.\nReconocimiento mensual al miembro más constante.", BLUE, CYAN, WHITE],
];

retCards.forEach(([title, body, bg, tc, bc], i) => {
  const y = 98 + i * 175;
  rect(30, y, 535, 160, bg);
  doc.font("Helvetica-Bold").fontSize(15).fillColor(tc).text(title, 44, y + 14, { width: 507 });
  rect(44, y + 38, 80, 2, CYAN);
  doc.font("Helvetica").fontSize(11).fillColor(bc).text(body, 44, y + 50, { width: 507, lineGap: 4 });
});
pageNumber(8);

// ═══════════════════════════════════════════════
// PAGE 9 — GANTT
// ═══════════════════════════════════════════════
newPage("Cronograma de Implementación — 8 Semanas", "Diagrama de Gantt");

const ganttActivities = [
  { name: "Contactar micro-influencers",  weeks: [1,2] },
  { name: "Open Day #1",                  weeks: [2] },
  { name: "Open Day #2",                  weeks: [3] },
  { name: "Visitas corporativas",          weeks: [1,2,3,4] },
  { name: 'Programa "Trae un amigo"',      weeks: [3,4,5,6,7,8] },
  { name: "Primer cierre corporativo",     weeks: [4] },
  { name: "Contenido orgánico redes",      weeks: [1,2,3,4,5,6,7,8] },
  { name: "Pauta digital Instagram Ads",   weeks: [2,3,4,5,6,7,8] },
  { name: "Análisis y optimización",       weeks: [4,6,8] },
];

const actColW = 210;
const weekColW = 40;
const ganttX = 30;
let gy = 88;
const rowH = 32;

// Header
rect(ganttX, gy, actColW, rowH, NAVY);
doc.font("Helvetica-Bold").fontSize(9).fillColor(WHITE).text("Actividad", ganttX + 6, gy + 10, { width: actColW - 12 });
for (let w = 1; w <= 8; w++) {
  rect(ganttX + actColW + (w-1)*weekColW, gy, weekColW, rowH, NAVY);
  doc.font("Helvetica-Bold").fontSize(9).fillColor(WHITE)
     .text(`S${w}`, ganttX + actColW + (w-1)*weekColW, gy + 10, { width: weekColW, align: "center" });
}
gy += rowH;

ganttActivities.forEach(({ name, weeks }, ri) => {
  const bg = ri % 2 === 0 ? LGRAY : WHITE;
  rect(ganttX, gy, actColW, rowH, bg);
  doc.font("Helvetica").fontSize(9).fillColor(DGRAY).text(name, ganttX + 6, gy + 11, { width: actColW - 12 });
  for (let w = 1; w <= 8; w++) {
    const cellBg = weeks.includes(w) ? CYAN : bg;
    rect(ganttX + actColW + (w-1)*weekColW, gy, weekColW, rowH, cellBg);
    doc.rect(ganttX + actColW + (w-1)*weekColW, gy, weekColW, rowH).stroke(MGRAY);
  }
  doc.rect(ganttX, gy, actColW, rowH).stroke(MGRAY);
  gy += rowH;
});

// Legend
gy += 12;
rect(ganttX, gy, 14, 14, CYAN);
doc.font("Helvetica").fontSize(9).fillColor(DGRAY).text("Semana activa", ganttX + 18, gy + 2, { width: 120 });
rect(ganttX + 140, gy, 14, 14, LGRAY);
doc.font("Helvetica").fontSize(9).fillColor(DGRAY).text("Sin actividad", ganttX + 158, gy + 2, { width: 120 });
pageNumber(9);

// ═══════════════════════════════════════════════
// PAGE 10 — PRESUPUESTO & KPIs
// ═══════════════════════════════════════════════
newPage("Presupuesto y Métricas de Éxito", "Inversión y KPIs — Mes 1 y Mes 2");

// Budget table
const budgetRows = [
  ["Acción", "Costo Estimado"],
  ["Open Days (logística, material)", "$300.000–500.000 COP"],
  ["Micro-influencers (membresías)", "$0 en efectivo"],
  ["Pauta digital Instagram Ads", "$200.000–400.000 COP/semana"],
  ["Material impreso (flyers edificios)", "$150.000 COP"],
  ["TOTAL MES 1", "~$1.000.000–1.500.000 COP"],
];

let by = 90;
budgetRows.forEach((row, ri) => {
  const isHeader = ri === 0;
  const isTotal = ri === budgetRows.length - 1;
  const bg = isHeader ? NAVY : isTotal ? CYAN : ri % 2 === 0 ? LGRAY : WHITE;
  const fc = isHeader || isTotal ? WHITE : DGRAY;
  const tf = isHeader || isTotal ? "Helvetica-Bold" : "Helvetica";
  rect(30, by, 350, 28, bg); rect(382, by, 183, 28, bg);
  doc.font(tf).fontSize(10).fillColor(fc).text(row[0], 38, by + 9, { width: 340 });
  doc.font(tf).fontSize(10).fillColor(fc).text(row[1], 388, by + 9, { width: 171 });
  by += 28;
});

// KPIs
by += 20;
doc.font("Helvetica-Bold").fontSize(13).fillColor(NAVY).text("Métricas de Éxito (KPIs)", 30, by, { width: 535 });
by += 22;

const kpis = [
  ["Inscritos fin mes 1", "20 miembros"],
  ["Inscritos fin mes 2", "30–35 miembros"],
  ["Ocupación por clase", "80% (7–8 personas)"],
  ["Retención mensual", ">70%"],
  ["Referidos mes 1", "5 nuevos"],
];

kpis.forEach(([label, value], i) => {
  const x = 30 + (i % 3) * 182;
  const y = by + Math.floor(i / 3) * 90;
  const bg = i % 2 === 0 ? BLUE : NAVY;
  rect(x, y, 170, 78, bg);
  doc.font("Helvetica").fontSize(9).fillColor([168, 212, 245]).text(label, x + 8, y + 10, { width: 154 });
  doc.font("Helvetica-Bold").fontSize(16).fillColor(WHITE).text(value, x + 8, y + 38, { width: 154 });
});
pageNumber(10);

// ═══════════════════════════════════════════════
// PAGE 11 — CIERRE
// ═══════════════════════════════════════════════
doc.addPage();
rect(0, 0, W, H, NAVY);
rect(0, 0, 8, H, CYAN);
rect(0, H - 70, W, 70, BLUE);

doc.font("Helvetica-Bold").fontSize(42).fillColor(WHITE).text("El momento es ahora.", 30, 80, { width: W - 60 });
rect(30, 175, 320, 4, CYAN);

const closingLines = [
  "Cali tiene la cultura fitness.",
  "El Hotel Intercontinental tiene el escenario.",
  "AUAFIT tiene el producto.",
];
closingLines.forEach((line, i) => {
  doc.font("Helvetica").fontSize(17).fillColor([168, 212, 245]).text(line, 30, 195 + i * 42, { width: W - 60 });
});

rect(30, 340, W - 60, 50, CYAN);
doc.font("Helvetica-Bold").fontSize(13).fillColor(NAVY)
   .text("Implementar semana 1: Contactar influencers + confirmar fecha Open Day", 40, 357, { width: W - 80, align: "center" });

doc.font("Helvetica").fontSize(12).fillColor(WHITE).text("AUAFIT  ·  www.auafit.com", 30, H - 48, { width: W - 60, align: "center" });
pageNumber(11);

// ─────────────────────────────────────────────
doc.end();
console.log("PDF saved to:", OUTPUT);

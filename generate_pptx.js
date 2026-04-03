const PptxGenJS = require("pptxgenjs");

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE"; // 16:9

// Brand colors
const NAVY = "003366";
const BLUE = "0066CC";
const CYAN = "00B4D8";
const WHITE = "FFFFFF";
const LGRAY = "F0F4F8";
const DGRAY = "334155";

// ─────────────────────────────────────────────
// SLIDE 1 — COVER
// ─────────────────────────────────────────────
{
  const slide = pptx.addSlide();
  slide.background = { color: NAVY };

  // Cyan accent bar left
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.18, h: 7.5, fill: { color: CYAN } });

  // Blue geometric accent bottom-right
  slide.addShape(pptx.ShapeType.rect, { x: 8.5, y: 5.2, w: 5, h: 2.3, fill: { color: BLUE }, line: { color: BLUE } });
  slide.addShape(pptx.ShapeType.rect, { x: 9.2, y: 4.6, w: 3.8, h: 0.18, fill: { color: CYAN }, line: { color: CYAN } });

  // AUAFIT brand
  slide.addText("AUAFIT", {
    x: 0.5, y: 0.55, w: 6, h: 0.75,
    fontSize: 38, bold: true, color: CYAN,
    fontFace: "Calibri",
  });

  // Title
  slide.addText("Estrategia de Marketing", {
    x: 0.5, y: 1.6, w: 9, h: 1,
    fontSize: 44, bold: true, color: WHITE,
    fontFace: "Calibri",
  });

  // Subtitle
  slide.addText("Aquaboard · Hotel Intercontinental Cali", {
    x: 0.5, y: 2.75, w: 9, h: 0.65,
    fontSize: 22, color: "A8D4F5",
    fontFace: "Calibri",
  });

  // Divider
  slide.addShape(pptx.ShapeType.rect, { x: 0.5, y: 3.55, w: 5.5, h: 0.06, fill: { color: CYAN }, line: { color: CYAN } });

  // Date
  slide.addText("Abril 2026", {
    x: 0.5, y: 3.8, w: 4, h: 0.45,
    fontSize: 16, color: "7BAFD4",
    fontFace: "Calibri",
  });
}

// ─────────────────────────────────────────────
// SLIDE 2 — DIAGNÓSTICO
// ─────────────────────────────────────────────
{
  const slide = pptx.addSlide();
  slide.background = { color: WHITE };

  // Header bar
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 1.1, fill: { color: NAVY }, line: { color: NAVY } });
  slide.addText("Diagnóstico Actual", {
    x: 0.4, y: 0.15, w: 10, h: 0.8,
    fontSize: 30, bold: true, color: WHITE, fontFace: "Calibri",
  });

  // Left table
  const rows = [
    [{ text: "Variable", options: { bold: true, color: WHITE, fill: NAVY } }, { text: "Situación", options: { bold: true, color: WHITE, fill: NAVY } }],
    ["Inscritos actuales", "13 miembros"],
    ["Boards disponibles", "9 por sesión"],
    ["Meta 80% ocupación", "7–8 personas/clase"],
    ["Sesiones semanales", "6 (LMV × 9AM y 5:30PM)"],
    ["Principal barrera", "Bajo awareness local"],
  ];

  slide.addTable(rows, {
    x: 0.4, y: 1.3, w: 6.5, h: 3.8,
    fontSize: 13, fontFace: "Calibri",
    border: { pt: 1, color: "DDEEFF" },
    colW: [3.2, 3.3],
    rowH: 0.52,
    fill: { color: LGRAY },
    align: "left",
  });

  // Right insight box
  slide.addShape(pptx.ShapeType.rect, { x: 7.2, y: 1.3, w: 5.7, h: 2.4, fill: { color: CYAN }, line: { color: CYAN } });
  slide.addText(
    "Con 20–25 miembros activos que asistan 2.5 veces/semana ya se alcanza el 80% de ocupacion. El objetivo es compromiso, no volumen.",
    { x: 7.35, y: 1.4, w: 5.4, h: 2.1, fontSize: 15, color: WHITE, bold: false, fontFace: "Calibri", valign: "middle", wrap: true }
  );

  // Math breakdown
  slide.addShape(pptx.ShapeType.rect, { x: 7.2, y: 3.9, w: 5.7, h: 2.5, fill: { color: LGRAY }, line: { color: "DDEEFF" } });
  const mathLines = [
    "9 boards x 80% = 7–8 personas por sesion",
    "6 sesiones/semana x 7.5 = 45 asistencias necesarias",
    "A 2.5 sesiones/miembro → 18–20 miembros activos",
    "Meta realista: 25 miembros comprometidos",
  ];
  slide.addText(mathLines.map(t => ({ text: "• " + t + "\n", options: {} })), {
    x: 7.35, y: 4.0, w: 5.4, h: 2.3,
    fontSize: 12, color: DGRAY, fontFace: "Calibri", valign: "top", wrap: true,
  });
}

// ─────────────────────────────────────────────
// Helper: slide with header bar
// ─────────────────────────────────────────────
function addHeader(slide, title, subtitle) {
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 1.1, fill: { color: NAVY }, line: { color: NAVY } });
  slide.addText(title, { x: 0.4, y: 0.08, w: 10, h: 0.65, fontSize: 26, bold: true, color: WHITE, fontFace: "Calibri" });
  if (subtitle) {
    slide.addText(subtitle, { x: 0.4, y: 0.72, w: 10, h: 0.35, fontSize: 13, color: CYAN, fontFace: "Calibri" });
  }
}

function addCard(slide, x, y, w, h, title, body, bgColor) {
  slide.addShape(pptx.ShapeType.roundRect, { x, y, w, h, fill: { color: bgColor || LGRAY }, line: { color: "DDEEFF", pt: 1 }, rectRadius: 0.1 });
  slide.addText(title, { x: x + 0.15, y: y + 0.12, w: w - 0.3, h: 0.4, fontSize: 13, bold: true, color: bgColor === NAVY ? WHITE : NAVY, fontFace: "Calibri" });
  slide.addText(body, { x: x + 0.15, y: y + 0.52, w: w - 0.3, h: h - 0.65, fontSize: 11, color: bgColor === NAVY ? "A8D4F5" : DGRAY, fontFace: "Calibri", wrap: true });
}

// ─────────────────────────────────────────────
// SLIDE 3 — PILAR 1: OPEN DAYS
// ─────────────────────────────────────────────
{
  const slide = pptx.addSlide();
  slide.background = { color: WHITE };
  addHeader(slide, "Pilar 1 — Clases de Prueba Gratuitas", "Semanas 1–2");

  const cards = [
    ["CUANDO", "2 sabados consecutivos\n10AM y 12PM\nCupo max: 12 personas/sesion"],
    ["QUIENES", "Influencers fitness\nInstructoras yoga/pilates\nMedicos y fisioterapeutas"],
    ["CIERRE", "Descuento 20% para quienes\nse inscriban ese mismo dia\nOferta por tiempo limitado"],
    ["POR QUE FUNCIONA", "Una sola clase convierte.\nEl boca a boca post-experiencia\nes el canal mas poderoso en Cali."],
  ];

  const positions = [
    [0.4, 1.25], [7.0, 1.25], [0.4, 4.0], [7.0, 4.0],
  ];

  cards.forEach(([title, body], i) => {
    const [x, y] = positions[i];
    addCard(slide, x, y, 6.2, 2.5, title, body, i % 2 === 0 ? LGRAY : NAVY);
  });
}

// ─────────────────────────────────────────────
// SLIDE 4 — PILAR 2: ALIANZAS B2B
// ─────────────────────────────────────────────
{
  const slide = pptx.addSlide();
  slide.background = { color: WHITE };
  addHeader(slide, "Pilar 2 — Alianzas Corporativas", "Semanas 1–4");

  // Left: targets
  slide.addShape(pptx.ShapeType.rect, { x: 0.4, y: 1.3, w: 5.9, h: 5.5, fill: { color: LGRAY }, line: { color: "DDEEFF", pt: 1 } });
  slide.addText("Empresas Target", { x: 0.55, y: 1.45, w: 5.6, h: 0.45, fontSize: 16, bold: true, color: NAVY, fontFace: "Calibri" });
  slide.addText("Zona: El Penon / Granada / Ciudad Jardin", { x: 0.55, y: 1.9, w: 5.6, h: 0.35, fontSize: 11, color: CYAN, fontFace: "Calibri", italic: true });
  const targets = ["• Coomeva, Comfenalco, Sura\n  (bienestar laboral)", "• Clinicas y hospitales\n  (fisioterapia acuatica)", "• Centros de estetica\n  y recuperacion corporal"];
  slide.addText(targets.join("\n\n"), { x: 0.55, y: 2.35, w: 5.6, h: 3.5, fontSize: 14, color: DGRAY, fontFace: "Calibri", wrap: true });

  // Right: plan
  slide.addShape(pptx.ShapeType.rect, { x: 6.8, y: 1.3, w: 6.1, h: 5.5, fill: { color: NAVY }, line: { color: NAVY } });
  slide.addText("Plan Wellness Team", { x: 7.0, y: 1.45, w: 5.7, h: 0.55, fontSize: 20, bold: true, color: CYAN, fontFace: "Calibri" });
  const planItems = [
    "8 cupos fijos LMV 9AM",
    "Precio especial con factura a la empresa",
    "Empleados sin costo de bolsillo",
    "Minima friccion de compra",
  ];
  planItems.forEach((item, i) => {
    slide.addText("✓  " + item, { x: 7.0, y: 2.2 + i * 0.75, w: 5.7, h: 0.6, fontSize: 14, color: WHITE, fontFace: "Calibri" });
  });
  slide.addShape(pptx.ShapeType.rect, { x: 7.0, y: 5.5, w: 5.7, h: 0.9, fill: { color: CYAN }, line: { color: CYAN } });
  slide.addText("META: 2 empresas = 16 cupos → 9AM al 80%", { x: 7.1, y: 5.6, w: 5.5, h: 0.7, fontSize: 14, bold: true, color: NAVY, fontFace: "Calibri", valign: "middle" });
}

// ─────────────────────────────────────────────
// SLIDE 5 — PILAR 3: MICRO-INFLUENCERS
// ─────────────────────────────────────────────
{
  const slide = pptx.addSlide();
  slide.background = { color: WHITE };
  addHeader(slide, "Pilar 3 — Micro-Influencers Cali", "Semanas 1–3  ·  Costo: $0 en efectivo");

  const profiles = [
    ["Fisioterapeutas", "Medicos deportivos\nAudiencia interesada en recuperacion y bienestar activo"],
    ["Pilates / Yoga / Crossfit", "Instructoras con comunidad\nfitness local comprometida"],
    ["Mamas Activas", "Lifestyle y bienestar familiar\nGrupos de WhatsApp de alto alcance"],
    ["Salsa Fitness", "Cultura Cali — audiencia\nlocal muy alta. Unico en su tipo."],
  ];

  profiles.forEach(([title, body], i) => {
    const x = i < 2 ? 0.4 + i * 6.4 : 0.4 + (i - 2) * 6.4;
    const y = i < 2 ? 1.3 : 4.1;
    addCard(slide, x, y, 6.1, 2.5, title, body, i % 2 === 0 ? LGRAY : NAVY);
  });

  // Bottom strip
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 6.85, w: 13.33, h: 0.65, fill: { color: CYAN }, line: { color: CYAN } });
  slide.addText("Propuesta: 1 mes de membresia gratis  →  3 Stories + 1 Reel  ·  Perfil: 5.000–50.000 seguidores, audiencia local Cali", {
    x: 0.3, y: 6.9, w: 12.7, h: 0.5, fontSize: 13, bold: true, color: NAVY, fontFace: "Calibri", align: "center",
  });
}

// ─────────────────────────────────────────────
// SLIDE 6 — PILAR 4: CONTENIDO DIGITAL
// ─────────────────────────────────────────────
{
  const slide = pptx.addSlide();
  slide.background = { color: WHITE };
  addHeader(slide, "Pilar 4 — Instagram & TikTok", "Estrategia de contenido orgánico");

  const tableRows = [
    [
      { text: "Tipo de Contenido", options: { bold: true, color: WHITE, fill: NAVY, align: "center" } },
      { text: "Frecuencia", options: { bold: true, color: WHITE, fill: NAVY, align: "center" } },
      { text: "Ejemplo", options: { bold: true, color: WHITE, fill: NAVY, align: "center" } },
    ],
    ["Reels de clase en accion", "3/semana", '"Asi se siente hacer pilates sobre el agua"'],
    ["Antes y despues (transformacion)", "2/semana", "Postura, core, bienestar"],
    ["Tutorial de 30 segundos", "1/semana", '"El ejercicio mas dificil para mis alumnos"'],
    ["Testimonio de miembro real", "1/semana", "Video autentico, no texto"],
    ["Behind the scenes del hotel", "1/semana", "El entorno premium es parte del valor"],
  ];

  slide.addTable(tableRows, {
    x: 0.4, y: 1.3, w: 12.5, h: 4.2,
    fontSize: 13, fontFace: "Calibri",
    border: { pt: 1, color: "DDEEFF" },
    colW: [4.5, 2.2, 5.8],
    rowH: 0.6,
    fill: { color: LGRAY },
    align: "left",
  });

  slide.addShape(pptx.ShapeType.rect, { x: 0.4, y: 5.75, w: 12.5, h: 0.75, fill: { color: CYAN }, line: { color: CYAN } });
  slide.addText("Tip: Publicar el contenido de la clase de 5:30PM ese mismo dia en la noche.  Hashtags: #FitnessCali  #CaliActiva  #AquaFitness  #BienestarCali", {
    x: 0.55, y: 5.82, w: 12.2, h: 0.6, fontSize: 12, bold: true, color: NAVY, fontFace: "Calibri", align: "center",
  });
}

// ─────────────────────────────────────────────
// SLIDE 7 — PILAR 5: DOS HORARIOS
// ─────────────────────────────────────────────
{
  const slide = pptx.addSlide();
  slide.background = { color: WHITE };
  addHeader(slide, "Pilar 5 — Dos Horarios, Dos Audiencias", "Estrategia diferenciada por sesión");

  // 9AM card
  slide.addShape(pptx.ShapeType.rect, { x: 0.4, y: 1.3, w: 6.0, h: 5.5, fill: { color: BLUE }, line: { color: BLUE } });
  slide.addText("9:00 AM", { x: 0.6, y: 1.5, w: 5.6, h: 0.8, fontSize: 36, bold: true, color: WHITE, fontFace: "Calibri" });
  const am = [
    ["Audiencia", "Mamas, trabajo remoto, mujeres 30–50"],
    ["Canal", "WhatsApp comunidades, Pilates studios"],
    ["Mensaje", '"Recarga tu manana antes\nque empiece el dia"'],
    ["Alianza", "Cafeterias premium cerca del hotel"],
  ];
  am.forEach(([label, val], i) => {
    slide.addText(label + ":", { x: 0.6, y: 2.55 + i * 1.0, w: 1.8, h: 0.4, fontSize: 12, bold: true, color: CYAN, fontFace: "Calibri" });
    slide.addText(val, { x: 0.6, y: 2.9 + i * 1.0, w: 5.6, h: 0.5, fontSize: 13, color: WHITE, fontFace: "Calibri", wrap: true });
  });

  // 5:30PM card
  slide.addShape(pptx.ShapeType.rect, { x: 6.9, y: 1.3, w: 6.0, h: 5.5, fill: { color: NAVY }, line: { color: NAVY } });
  slide.addText("5:30 PM", { x: 7.1, y: 1.5, w: 5.6, h: 0.8, fontSize: 36, bold: true, color: WHITE, fontFace: "Calibri" });
  const pm = [
    ["Audiencia", "Ejecutivos, empleados, jovenes 25–38"],
    ["Canal", "LinkedIn Cali, edificios de oficinas"],
    ["Mensaje", '"Desconectate del trabajo.\nLiteralmente."'],
    ["Alianza", "Empresas financieras y tech Cali"],
  ];
  pm.forEach(([label, val], i) => {
    slide.addText(label + ":", { x: 7.1, y: 2.55 + i * 1.0, w: 1.8, h: 0.4, fontSize: 12, bold: true, color: CYAN, fontFace: "Calibri" });
    slide.addText(val, { x: 7.1, y: 2.9 + i * 1.0, w: 5.6, h: 0.5, fontSize: 13, color: WHITE, fontFace: "Calibri", wrap: true });
  });
}

// ─────────────────────────────────────────────
// SLIDE 8 — PILAR 6: RETENCIÓN
// ─────────────────────────────────────────────
{
  const slide = pptx.addSlide();
  slide.background = { color: WHITE };
  addHeader(slide, "Pilar 6 — Convertir Miembros en Embajadores", "Estrategia de retención y referidos");

  const programs = [
    ["TRAE UN AMIGO", "1 semana gratis por cada referido que se inscriba y pague.\nSin costo extra para el negocio.", LGRAY],
    ["RETO 30 DIAS", "Reconocimiento en redes para los mas constantes.\n(Con permiso del cliente)", NAVY],
    ["COMUNIDAD VIP", "WhatsApp exclusivo: noticias, motivacion, reserva\nprioritaria + reconocimiento mensual al mas constante.", BLUE],
  ];

  programs.forEach(([title, body, bg], i) => {
    const x = 0.4 + i * 4.3;
    slide.addShape(pptx.ShapeType.rect, { x, y: 1.4, w: 4.0, h: 5.2, fill: { color: bg }, line: { color: "DDEEFF", pt: 1 } });
    slide.addText(title, { x: x + 0.2, y: 1.6, w: 3.6, h: 0.6, fontSize: 16, bold: true, color: bg === LGRAY ? NAVY : WHITE, fontFace: "Calibri", align: "center" });
    slide.addShape(pptx.ShapeType.rect, { x: x + 0.2, y: 2.3, w: 3.6, h: 0.05, fill: { color: CYAN }, line: { color: CYAN } });
    slide.addText(body, { x: x + 0.2, y: 2.5, w: 3.6, h: 3.8, fontSize: 13, color: bg === LGRAY ? DGRAY : WHITE, fontFace: "Calibri", wrap: true, valign: "top" });
  });
}

// ─────────────────────────────────────────────
// SLIDE 9 — GANTT
// ─────────────────────────────────────────────
{
  const slide = pptx.addSlide();
  slide.background = { color: WHITE };
  addHeader(slide, "Cronograma de Implementacion — 8 Semanas", "Diagrama de Gantt");

  const activities = [
    { name: "Contactar micro-influencers", weeks: [1, 2] },
    { name: "Open Day #1", weeks: [2] },
    { name: "Open Day #2", weeks: [3] },
    { name: "Visitas corporativas", weeks: [1, 2, 3, 4] },
    { name: 'Programa "Trae un amigo"', weeks: [3, 4, 5, 6, 7, 8] },
    { name: "Primer cierre corporativo", weeks: [4] },
    { name: "Contenido organico redes", weeks: [1, 2, 3, 4, 5, 6, 7, 8] },
    { name: "Pauta digital Instagram Ads", weeks: [2, 3, 4, 5, 6, 7, 8] },
    { name: "Analisis y optimizacion", weeks: [4, 6, 8] },
  ];

  // Header row
  const headerRow = [
    { text: "Actividad", options: { bold: true, color: WHITE, fill: NAVY, align: "left" } },
    ...Array.from({ length: 8 }, (_, i) => ({
      text: `S${i + 1}`,
      options: { bold: true, color: WHITE, fill: NAVY, align: "center" },
    })),
  ];

  const dataRows = activities.map(({ name, weeks }) => [
    { text: name, options: { align: "left", fontSize: 11 } },
    ...Array.from({ length: 8 }, (_, i) => ({
      text: weeks.includes(i + 1) ? "" : "",
      options: {
        align: "center",
        fill: weeks.includes(i + 1) ? CYAN : "F0F4F8",
      },
    })),
  ]);

  slide.addTable([headerRow, ...dataRows], {
    x: 0.3, y: 1.25, w: 12.7, h: 5.8,
    fontSize: 11, fontFace: "Calibri",
    border: { pt: 1, color: "DDEEFF" },
    colW: [4.5, ...Array(8).fill(1.025)],
    rowH: 0.52,
  });
}

// ─────────────────────────────────────────────
// SLIDE 10 — PRESUPUESTO
// ─────────────────────────────────────────────
{
  const slide = pptx.addSlide();
  slide.background = { color: WHITE };
  addHeader(slide, "Presupuesto Mes 1", "Inversion estimada para implementacion completa");

  const budgetRows = [
    [
      { text: "Accion", options: { bold: true, color: WHITE, fill: NAVY } },
      { text: "Costo Estimado", options: { bold: true, color: WHITE, fill: NAVY, align: "center" } },
    ],
    ["Open Days (logistica, material)", "$300.000–500.000 COP"],
    ["Micro-influencers (membresias)", "$0 en efectivo"],
    ["Pauta digital Instagram Ads", "$200.000–400.000 COP/semana"],
    ["Material impreso (flyers edificios)", "$150.000 COP"],
    [
      { text: "TOTAL MES 1", options: { bold: true, color: WHITE, fill: CYAN } },
      { text: "~$1.000.000–1.500.000 COP", options: { bold: true, color: WHITE, fill: CYAN, align: "center" } },
    ],
  ];

  slide.addTable(budgetRows, {
    x: 1.5, y: 1.5, w: 10.3, h: 3.8,
    fontSize: 14, fontFace: "Calibri",
    border: { pt: 1, color: "DDEEFF" },
    colW: [6.5, 3.8],
    rowH: 0.58,
    fill: { color: LGRAY },
    align: "left",
  });

  // Note
  slide.addText("El costo de micro-influencers es 0 en efectivo — se cubren con membresias que solo tienen costo si no se convierten en clientes pagos.", {
    x: 1.5, y: 5.5, w: 10.3, h: 0.8, fontSize: 12, color: DGRAY, fontFace: "Calibri", italic: true, wrap: true,
  });
}

// ─────────────────────────────────────────────
// SLIDE 11 — KPIs
// ─────────────────────────────────────────────
{
  const slide = pptx.addSlide();
  slide.background = { color: WHITE };
  addHeader(slide, "Metricas de Exito", "KPIs para seguimiento mensual");

  const kpis = [
    ["Inscritos\nFin Mes 1", "20\nmiembros", BLUE],
    ["Inscritos\nFin Mes 2", "30–35\nmiembros", NAVY],
    ["Ocupacion\npor clase", "80%\n7–8 personas", CYAN],
    ["Retencion\nmensual", ">70%", BLUE],
    ["Referidos\nMes 1", "5 nuevos", NAVY],
  ];

  kpis.forEach(([label, value, bg], i) => {
    const x = 0.5 + i * 2.5;
    slide.addShape(pptx.ShapeType.roundRect, { x, y: 1.5, w: 2.2, h: 4.5, fill: { color: bg }, line: { color: bg }, rectRadius: 0.12 });
    slide.addText(label, { x: x + 0.1, y: 1.7, w: 2.0, h: 1.0, fontSize: 13, color: bg === CYAN ? NAVY : WHITE, fontFace: "Calibri", align: "center", wrap: true });
    slide.addShape(pptx.ShapeType.rect, { x: x + 0.3, y: 2.85, w: 1.6, h: 0.05, fill: { color: bg === CYAN ? NAVY : WHITE }, line: { color: bg === CYAN ? NAVY : WHITE } });
    slide.addText(value, { x: x + 0.05, y: 3.1, w: 2.1, h: 1.8, fontSize: 22, bold: true, color: bg === CYAN ? NAVY : WHITE, fontFace: "Calibri", align: "center", valign: "middle", wrap: true });
  });
}

// ─────────────────────────────────────────────
// SLIDE 12 — CIERRE
// ─────────────────────────────────────────────
{
  const slide = pptx.addSlide();
  slide.background = { color: NAVY };

  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.18, h: 7.5, fill: { color: CYAN } });
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 6.5, w: 13.33, h: 1.0, fill: { color: BLUE }, line: { color: BLUE } });

  slide.addText("El momento es ahora.", {
    x: 0.5, y: 0.8, w: 12.3, h: 1.3, fontSize: 48, bold: true, color: WHITE, fontFace: "Calibri",
  });

  slide.addShape(pptx.ShapeType.rect, { x: 0.5, y: 2.3, w: 6, h: 0.08, fill: { color: CYAN }, line: { color: CYAN } });

  const lines = [
    "Cali tiene la cultura fitness.",
    "El Hotel Intercontinental tiene el escenario.",
    "AUAFIT tiene el producto.",
  ];
  lines.forEach((line, i) => {
    slide.addText(line, { x: 0.5, y: 2.6 + i * 0.65, w: 12, h: 0.6, fontSize: 18, color: "A8D4F5", fontFace: "Calibri" });
  });

  slide.addShape(pptx.ShapeType.rect, { x: 0.5, y: 4.7, w: 12.3, h: 0.8, fill: { color: CYAN }, line: { color: CYAN } });
  slide.addText("Implementar semana 1: Contactar influencers + confirmar fecha Open Day", {
    x: 0.65, y: 4.78, w: 12.0, h: 0.65, fontSize: 15, bold: true, color: NAVY, fontFace: "Calibri", align: "center",
  });

  slide.addText("AUAFIT  ·  www.auafit.com", {
    x: 0.5, y: 6.6, w: 12.3, h: 0.45, fontSize: 13, color: WHITE, fontFace: "Calibri", align: "center",
  });
}

// ─────────────────────────────────────────────
// SAVE
// ─────────────────────────────────────────────
pptx.writeFile({ fileName: "C:/Users/natha/OneDrive/Documentos/GitHub/AUAFIT/Estrategia Marketing Aquaboard Cali.pptx" })
  .then(() => console.log("PPTX saved successfully."))
  .catch(err => { console.error("Error:", err); process.exit(1); });

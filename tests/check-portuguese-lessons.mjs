import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";

const html = fs.readFileSync("index.html", "utf8");

const inlineScripts = [...html.matchAll(/<script>([\\s\\S]*?)<\\/script>/g)];
assert.ok(inlineScripts.length >= 1, "No se encontró el JavaScript de la aplicación");
assert.doesNotThrow(() => new vm.Script(inlineScripts[0][1]), "El JavaScript de la aplicación debe ser sintácticamente válido");


function capture(pattern, label) {
  const match = html.match(pattern);
  assert.ok(match, "No se encontró el bloque: " + label);
  return match[1];
}

function readLessonBank(name, initialPattern, appendPattern) {
  const initial = JSON.parse(capture(initialPattern, "banco inicial " + name));
  const appended = [...html.matchAll(appendPattern)].flatMap(match => JSON.parse(match[1]));
  return { initial, all: [...initial, ...appended], appended };
}

const spanish = readLessonBank(
  "lessons",
  /const lessons=(\[[\s\S]*?\]);/,
  /lessons\.push\(\.\.\.(\[[\s\S]*?\])\);/g
);
const portuguese = readLessonBank(
  "ptLessons",
  /const ptLessons=(\[[\s\S]*?\]);/,
  /ptLessons\.push\(\.\.\.(\[[\s\S]*?\])\);/g
);

assert.equal(spanish.initial.length, 10, "El bloque inicial en español debe contener 10 lecciones");
assert.equal(spanish.appended.length, 60, "Español debe conservar las 30 lecciones añadidas anteriormente y agregar las lecciones 41 a 70");
assert.equal(spanish.all.length, 70, "Español debe tener 70 lecciones en total");
assert.equal(portuguese.initial.length, 10, "El bloque inicial en portugués debe contener 10 lecciones");
assert.equal(portuguese.appended.length, 60, "Portugués debe conservar las 60 lecciones agregadas");
assert.equal(portuguese.all.length, 70, "Portugués debe tener 70 lecciones en total");

for (const pair of [["español", spanish], ["portugués", portuguese]]) {
  const language = pair[0], bank = pair[1];
  for (const [index, lesson] of bank.all.entries()) {
    assert.ok(Array.isArray(lesson), language + ", lección " + (index + 1) + ": formato inválido");
    assert.ok([3, 5].includes(lesson.length), language + ", lección " + (index + 1) + ": cantidad inesperada de campos");
    for (const [fieldIndex, value] of lesson.entries()) {
      assert.equal(typeof value, "string", language + ", lección " + (index + 1) + ", campo " + (fieldIndex + 1) + ": no es texto");
      assert.ok(value.trim().length > 0, language + ", lección " + (index + 1) + ", campo " + (fieldIndex + 1) + ": vacío");
    }
  }
}
for (const [index, lesson] of spanish.appended.entries()) {
  assert.equal(lesson.length, 5, "Lección agregada en español " + (index + 11) + ": faltan práctica u objetivo de aprendizaje");
}
for (const [index, lesson] of portuguese.appended.entries()) {
  assert.equal(lesson.length, 5, "Lección en portugués " + (index + 11) + ": faltan práctica u objetivo de aprendizaje");
}

assert.match(html, /const arr=lang==="pt"\?ptLessons:lessons/, "La lista de lecciones no selecciona el banco según el idioma");
assert.match(html, /\$\("lang"\)\.onchange=[\s\S]*?renderLessons\(\)/, "Cambiar idioma no vuelve a dibujar la lista de lecciones");
assert.match(html, /function showLesson\(i\)\{currentLessonIndex=i;const l=\(lang==="pt"\?ptLessons:lessons\)\[i\]/, "El detalle no carga las lecciones según el idioma");
assert.match(html, /const lessonChecksPt=\[/, "Falta el banco de preguntas en portugués");
assert.match(html, /const pool=\(lang==="pt"\?lessonChecksPt:lessonChecks\)/, "El cuestionario no selecciona las preguntas según el idioma");

const stageMatch = html.match(/const stages=lang==="pt"\?\[([\s\S]*?)\]:\[([\s\S]*?)\];/);
assert.ok(stageMatch, "No se encontraron los títulos de niveles por idioma");
const portugueseStages = vm.runInNewContext("[" + stageMatch[1] + "]");
const spanishStages = vm.runInNewContext("[" + stageMatch[2] + "]");
assert.equal(spanishStages.length, 7, "Español debe definir los siete niveles");
assert.equal(portugueseStages.length, 7, "Portugués debe definir los siete niveles");
for (const [index, stage] of spanishStages.entries()) {
  assert.ok(stage.includes("Nivel " + (index + 1)), "Falta el nombre del nivel " + (index + 1) + " en español");
}
for (const [index, stage] of portugueseStages.entries()) {
  assert.ok(stage.includes("Nível " + (index + 1)), "Falta el nombre del nivel " + (index + 1) + " en portugués");
}
assert.match(html, /Math\.floor\(i\/10\)/, "El listado debe agrupar cada diez lecciones en su nivel");

assert.match(html, /de 70 lecciones completadas/, "El progreso debe reflejar las 70 lecciones");
assert.match(html, /id="staffTrainer"/, "Falta el entrenador interactivo de lectura musical");
assert.match(html, /function renderStaffTrainer\(\)/, "Falta la función que dibuja el entrenador");
assert.match(html, /function checkStaffAnswer\(/, "El entrenador no corrige las respuestas");
assert.match(html, /y-20/, "La posición visual de las notas del entrenador no coincide con el pentagrama");
assert.match(html, /id="staffIntro"/, "La introducción del entrenador debe localizarse por idioma");
assert.match(html, /Treinador de leitura: que nota é\?/, "Falta el título en portugués del entrenador");
assert.match(html, /de 70 aulas concluídas/, "El progreso en portugués debe reflejar las 70 lecciones");
assert.match(html, /<line x1="70" y1="185" x2="90" y2="185"\/>/, "El Do central debe tener su línea adicional correctamente ubicada");
assert.doesNotMatch(html, /de 40 lecciones completadas|de 40 aulas concluídas/, "No debe quedar el contador antiguo de 40 lecciones");


console.log("OK: 70 lecciones en cada idioma, campos completos en las 30 nuevas lecciones españolas, siete niveles por idioma y cuestionarios localizados.");

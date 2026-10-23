import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";

const html = fs.readFileSync("index.html", "utf8");

function capture(pattern, label) {
  const match = html.match(pattern);
  assert.ok(match, `No se encontró el bloque: ${label}`);
  return match[1];
}

const initialSource = capture(/const ptLessons=(\[[\s\S]*?\]);/, "las primeras 10 lecciones en portugués");
const appendedSource = capture(/ptLessons\.push\(\.\.\.(\[[\s\S]*?\])\);/, "las lecciones 11 a 40 en portugués");

const initial = vm.runInNewContext(initialSource);
const appended = vm.runInNewContext(appendedSource);
const all = [...initial, ...appended];

assert.equal(initial.length, 10, "El bloque inicial debe contener 10 lecciones");
assert.equal(appended.length, 30, "El bloque agregado debe contener exactamente las lecciones 11 a 40");
assert.equal(all.length, 40, "Portugués debe tener 40 lecciones en total");

for (const [index, lesson] of all.entries()) {
  assert.ok(Array.isArray(lesson), `Lección ${index + 1}: formato inválido`);
  assert.ok([3, 5].includes(lesson.length), `Lección ${index + 1}: cantidad inesperada de campos`);
  for (const [fieldIndex, value] of lesson.entries()) {
    assert.equal(typeof value, "string", `Lección ${index + 1}, campo ${fieldIndex + 1}: no es texto`);
    assert.ok(value.trim().length > 0, `Lección ${index + 1}, campo ${fieldIndex + 1}: vacío`);
  }
}
for (const [index, lesson] of appended.entries()) {
  assert.equal(lesson.length, 5, `Lección ${index + 11}: faltan práctica u objetivo de aprendizaje`);
}

assert.match(html, /const arr=lang==="pt"\?ptLessons:lessons/, "La lista de lecciones no selecciona el idioma portugués");
assert.match(html, /\$\("lang"\)\.onchange=[\s\S]*?renderLessons\(\)/, "Cambiar idioma no vuelve a dibujar la lista de lecciones");
assert.match(html, /function showLesson\\(i\\)\\{currentLessonIndex=i;const l=\\(lang==="pt"\\?ptLessons:lessons\\)\\[i\\]/, "La pantalla de detalle no carga las lecciones en portugués");
assert.match(html, /const lessonChecksPt=\\[/, "Falta el banco de preguntas en portugués");
assert.match(html, /const pool=\\(lang==="pt"\\?lessonChecksPt:lessonChecks\\)/, "El cuestionario no selecciona las preguntas según el idioma");

console.log("OK: 40 lecciones en portugués; las lecciones 11–40 tienen cinco campos completos; el selector y el detalle usan ptLessons.");

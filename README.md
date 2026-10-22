# Escuela de Armónica AKD impresiones

Aplicación web progresiva (PWA) educativa para armónica diatónica Richter en Do (C), pensada primero para móvil y con contenidos en español y portugués.

## Probar la aplicación

- Abrí `index.html` en un navegador moderno para probar la versión web.
- Para instalarla como aplicación y aprovechar el modo sin conexión, publicala con HTTPS mediante GitHub Pages.
- El progreso se guarda en el almacenamiento local del navegador de ese dispositivo.

## Incluye actualmente

- 40 lecciones en español y portugués distribuidas en cuatro etapas: fundamentos, desarrollo, técnicas intermedias y nivel avanzado. Las lecciones 11–40 incluyen explicación, práctica guiada y objetivo de aprendizaje.
- Mapa de los 10 agujeros de una armónica Richter en Do.
- Referencias sonoras sintetizadas con Web Audio para notas, escala y melodías cortas.
- Control de velocidad de práctica (BPM).
- Registro local de lecciones y rutina diaria.
- Autoevaluación interactiva de dos preguntas por lección, con corrección inmediata en español y portugués; las preguntas varían según la etapa formativa.
- Interfaz adaptable a pantallas móviles y selector español/portugués.
- Manifiesto PWA y service worker para caché básica.

## Libro de método AKD

- [Capítulo 2: lectura musical y tablatura](libro-metodo-akd-capitulo-2.md)
- [Capítulo 3: silencios, puntillos y articulación](libro-metodo-akd-capitulo-3.md)
- [Capítulo 4: escalas, tonalidades y construcción de melodías](libro-metodo-akd-capitulo-4.md)
- [Capítulo 5: control del aire y primeras notas alteradas](libro-metodo-akd-capitulo-5.md)

## Convención de tablatura

- `4 ↓`: soplar por el agujero 4.
- `4 ↑`: aspirar por el agujero 4.

## Alcance y próximos hitos

Esta es una versión web progresiva en desarrollo, instalable desde un navegador compatible, no una APK Android nativa. La ruta formativa ya contiene 40 lecciones bilingües, pero el método completo sigue en construcción: el repertorio de la app ya contiene 40 piezas de práctica (melodías tradicionales y estudios originales AKD); varias son fragmentos pedagógicos y requieren una revisión musical final antes de considerarse arreglos definitivos. Los sonidos son tonos electrónicos de referencia, no grabaciones reales de armónica; todavía no incluye detección de notas por micrófono, cuentas de usuario ni sincronización en la nube.

Siguientes hitos de desarrollo:
1. Validar tablaturas y melodías nota por nota.
2. Profundizar cada lección con partituras/tablaturas verificadas y evaluación interactiva.
3. Incorporar grabaciones reales y, más adelante, detección de notas por micrófono.
4. Revisar nota por nota las 40 piezas, validar su fidelidad musical y completar las tablaturas y duraciones.
5. Empaquetar la experiencia para Android.

## Publicación

El flujo de GitHub Actions en `.github/workflows/pages.yml` intenta publicar automáticamente la carpeta raíz en GitHub Pages cada vez que se actualiza la rama `main`. Si el repositorio aún no tiene Pages habilitado para GitHub Actions, hay que seleccionar **Settings → Pages → Build and deployment → Source: GitHub Actions** una sola vez.

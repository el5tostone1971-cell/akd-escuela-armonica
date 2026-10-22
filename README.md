# Escuela de Armónica AKD impresiones

Aplicación web progresiva (PWA) educativa para armónica diatónica Richter en Do (C), pensada primero para móvil y con contenidos en español y portugués.

## Probar la aplicación

- Abrí `index.html` en un navegador moderno para probar la versión web.
- Para instalarla como aplicación y aprovechar el modo sin conexión, publicala con HTTPS mediante GitHub Pages.
- El progreso se guarda en el almacenamiento local del navegador de ese dispositivo.

## Incluye actualmente

- 10 lecciones iniciales: instrumento, tablatura, nota limpia, respiración, cambios de agujero, pulso, escala de Do, primera melodía, articulación y preparación conceptual para bending.
- Mapa de los 10 agujeros de una armónica Richter en Do.
- Referencias sonoras sintetizadas con Web Audio para notas, escala y melodías cortas.
- Control de velocidad de práctica (BPM).
- Registro local de lecciones y rutina diaria.
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

Esta es una primera versión funcional de la aplicación web, no una APK Android nativa ni un curso completo. Los sonidos actuales son tonos electrónicos de referencia, no grabaciones reales de armónica; todavía no incluye detección de notas por micrófono, cuentas de usuario ni sincronización en la nube.

Siguientes hitos de desarrollo:
1. Validar tablaturas y melodías nota por nota.
2. Ampliar el método teórico y práctico por niveles, incluyendo bending, vibrato, ritmo e improvisación.
3. Incorporar ejercicios guiados con evaluación y grabaciones de armónica.
4. Completar el repertorio progresivo de 40 piezas respetando derechos de autor.
5. Empaquetar la experiencia para Android.

## Publicación

El flujo de GitHub Actions en `.github/workflows/pages.yml` intenta publicar automáticamente la carpeta raíz en GitHub Pages cada vez que se actualiza la rama `main`. Si el repositorio aún no tiene Pages habilitado para GitHub Actions, hay que seleccionar **Settings → Pages → Build and deployment → Source: GitHub Actions** una sola vez.

# Actualización del 21 de septiembre de 2026

## Android

Descomprimir el paquete Android, copiar app sobre la carpeta app del proyecto local y reemplazar los archivos. Generar un APK e instalarlo sobre Impulso sin desinstalar, conservando la misma firma. Se recomienda exportar una copia antes.

## GitHub Pages

Descomprimir el paquete web. Subir su contenido a la raíz del mismo repositorio con Add file → Upload files → Commit changes. No borrar el repositorio ni la carpeta downloads. Después de compilar el nuevo APK, reemplazar downloads/app-debug.apk por el instalador nuevo (o downloads/impulso.apk si ese es el archivo usado; cuando existen ambos, la web prioriza impulso.apk).

## Qué cambia

- La portada muestra la fecha de esta actualización web. La fecha Android se consulta al servidor para el APK realmente publicado (Last-Modified); no se afirma que un APK viejo ya incluya estos cambios. Si no hay conexión, no se inventa una fecha.
- La pantalla Mi día incorpora las 50 frases del documento. Se conservan el texto, las autorías, la indicación de adaptación y las notas. Autorías no confirmadas se identifican así; no se presentan como citas verificadas. No se realizó una nueva investigación bibliográfica.
- Una frase al día según la fecha local del dispositivo, estable al recargar y al navegar por registros pasados. Orden aleatorio por instalación, sin repeticiones en cada tanda de 50, ni repetición inmediata al cambiar de tanda. Si no abrís la app un día, no se consume una frase. La lista y la selección funcionan sin Internet. La selección se guarda separadamente del progreso: no se incluye en las copias JSON ni se sincroniza entre dispositivos. Las 100 frases de las notificaciones Android no se modifican.
- Eliminar reemplaza Archivar. El objetivo desaparece inmediatamente de Hábitos (también se ocultan los ya archivados o reemplazados). Deja de formar parte de los objetivos diarios desde mañana, conservando los resultados, balances y premios históricos. No se destruyen los registros pasados. El contador de hábitos refleja los objetivos que siguen visibles.

La compilación del APK y las comprobaciones en teléfono siguen realizándose en Android Studio y en los dispositivos del usuario. Las pruebas automatizadas no sustituyen esa validación.

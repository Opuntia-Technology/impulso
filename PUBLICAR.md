# Publicar Impulso en GitHub Pages

Este paquete es independiente del proyecto Android. Incluye la firma de Ezequiel Krieger Marin, las mejoras de interfaz, los ciclos personales desde cualquier día y el margen de un día por ciclo y la aplicación web instalable. No incluye datos personales de uso.

1. Descomprimí Impulso-web.zip en tu computadora.
2. En GitHub, creá un repositorio nuevo llamado impulso, con visibilidad Public. Con GitHub Free, Pages necesita un repositorio público; sus archivos serán visibles.
3. En el repositorio, elegí Add file → Upload files. Arrastrá los archivos que están DENTRO de la carpeta descomprimida (no el ZIP ni una carpeta contenedora). index.html debe quedar en la raíz del repositorio. No subas copias de seguridad personales ni el proyecto Android.
4. Guardá con Commit changes, en la rama main.
5. Entrá en Settings → Pages. En Source, elegí Deploy from a branch. Elegí main y /(root). Tocá Save.
6. Esperá que GitHub termine el despliegue. La misma pantalla mostrará el enlace publicado, normalmente https://TUUSUARIO.github.io/impulso/. Si aparece, activá Enforce HTTPS.
7. Abrí el enlace. Entrá en Ajustes y esperá el mensaje «Lista para usar sin conexión».

## Instalar en iPhone

Abrí el enlace publicado en Safari. Tocá Compartir → Agregar a pantalla de inicio. Activá Abrir como app web si aparece. Tocá Agregar. Abrí el nuevo ícono con Internet al menos una vez, entrá en Ajustes y comprobá el mensaje de preparación sin conexión. Luego cerrá la app, activá modo avión y volvé a abrirla para comprobar que funciona.

## Datos y notificaciones

Los objetivos quedan en el almacenamiento local del navegador/app, sin cuentas ni sincronización. Los datos no se envían al repositorio. El servicio de alojamiento recibe las solicitudes normales de carga de archivos. No hay analítica añadida. Eliminar datos del sitio o cambiar de navegador/dispositivo puede eliminar o separar el progreso; usá Exportar copia y guardala en un lugar privado. Para trasladar datos desde Android, usá Exportar/Importar. Importar reemplaza los datos del destino.

La versión web muestra los avisos de margen dentro de la app, pero no programa notificaciones de Android ni recordatorios con la web cerrada. El uso sin conexión requiere una primera carga completa y que el navegador conserve su caché. Safari y el ícono instalado pueden mantener almacenamientos separados.

## Actualizar

Subí los archivos de un nuevo paquete completo al MISMO repositorio/ruta. Al abrir con Internet se descarga la actualización. Cerrá todas las ventanas de Impulso y volvé a abrirla para activarla. No borres los datos del sitio para actualizar. Cada paquete genera una versión nueva de caché según su contenido; los objetivos no se guardan en esa caché ni se eliminan al actualizarla.

El código fuente de la PWA se prepara desde el proyecto original con node build-pwa.cjs (Node y PowerShell en Windows). Este ZIP ya está generado y no requiere compilar ni instalar herramientas para publicarlo.

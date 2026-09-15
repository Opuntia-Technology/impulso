# Actualizar GitHub Pages: presentación y aplicación

1. Descomprimí Impulso-presentacion-web.zip.
2. Abrí el MISMO repositorio donde publicaste Impulso. Elegí Add file → Upload files.
3. Subí todos los archivos y la carpeta downloads que contiene el paquete, sin subir el ZIP ni una carpeta contenedora. index.html y app.html deben quedar en la raíz del repositorio. Guardá con Commit changes. No cambies Settings → Pages si ya publica main / (root).
4. Esperá al despliegue de GitHub Pages. El enlace principal ahora presenta Impulso; Usar en el navegador abre app.html. Windows y iPhone pueden seguir instalando la aplicación desde esa página.

## Activar la descarga Android

Este paquete NO contiene un APK: el instalador más reciente se genera en tu Android Studio.

1. Ubicá app-debug.apk en app/build/outputs/apk/debug de tu proyecto Android.
2. Hacé una copia y renombrala impulso.apk (no cambies su contenido).
3. En GitHub, abrí la carpeta downloads del repositorio y elegí Add file → Upload files. Subí impulso.apk y guardá con Commit changes.
4. Cuando termine el despliegue, recargá la página principal con Internet. El botón Descargar para Android se habilita automáticamente al encontrar downloads/impulso.apk.

Las próximas actualizaciones Android se publican reemplazando ese mismo archivo, compilado con la misma firma. Para conservar los registros, instalar encima de la aplicación existente sin desinstalar.

## Usuarios que ya usaban la web

Se conserva la misma dirección del repositorio, el identificador de la aplicación instalable y la clave de almacenamiento local. app.html comparte el almacenamiento con la página anterior en el mismo navegador/origen. No se migran los datos a un servidor ni se borran.

Quien tenga una versión anterior en caché debe abrir con Internet, cerrar todas las ventanas de Impulso y volver a entrar para aplicar la actualización. No borrar datos del sitio. Los enlaces antiguos con #hoy, #ciclos, #habitos o #ajustes redirigen a la aplicación; el enlace sin fragmento abre la presentación.

La aplicación sigue siendo local, sin cuentas ni sincronización entre Android y web. Importar una copia reemplaza los datos, no fusiona historiales. No subas copias personales de progreso al repositorio.

Verificado con pruebas de rutas relativas, iconos, caché sin red para presentación y aplicación por separado, y sintaxis JavaScript. Falta verificar el sitio publicado y el APK real, que no fue suministrado.

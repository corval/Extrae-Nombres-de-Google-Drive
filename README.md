# Extrae-Nombres-de-Google-Drive
Pequeño Script para correr en Google Apps Script de Google Drive para listar en una hoja de cálculo de Google Drive.

1.- Crear una nueva Hoja de cálculo de Google (Spreadsheet) desde su Google Drive. 
Cree un nuevo archivo de hoja de cálculo de Google donde crearemos una lista de archivos y carpetas de Google Drive.

2.-En la barra de título de una hoja, seleccione " Herramientas " luego " Editor de secuencias de comandos ", se abrirá otra ventana.

3.-En el Editor de secuencias de comandos, elimine todo del cuadro de texto "function"..... y pegue el contenido del archivo principal, el script está escrito en lenguaje Javascript, por lo cual la consola GAS lo entiende sin problema.

4.- Clic en el Icono Editar/ Guardar.

5.-Regrese a la hoja de cáclulo que creó y actualice la página.
Al actualizar verá en la barra de menú " Lista de archivos/carpetas ", haga clic en él y seleccione el elemento " Lista de todos los archivos y carpetas ".
Ingrese el ID de la carpeta para extraer la información.

6.-Recursivamente observará como el script empieza a extraer la información como ruta, nombre, fecha, url, etc.



¿Cómo obtener ID de carpeta?

Para obtener el ID de la carpeta, primero, vaya a la carpeta deseada en Google Drive cuyos archivos/carpetas desea listar y luego copie el carácter aleatorio justo después de ' https://drive.google.com/drive/folders/ ' como se muestra a continuación y luego péguelo en la ventana dónde solicita el ID de la carpeta.


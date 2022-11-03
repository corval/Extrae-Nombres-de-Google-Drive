function onOpen() {
    var SS = SpreadsheetApp.getActiveSpreadsheet();
    var ui = SpreadsheetApp.getUi();
    ui.createMenu('Listar Archivos/Carpetas')
      .addItem('Lista todos los archivos y carpetas de GDrive', 'listFilesAndFolders')
      .addToUi();
  };
  
  function listFilesAndFolders(){
    var folderId = Browser.inputBox('Introduce el ID del Folder ej: 1r9w5zOiBw2cMJVsvVQ3CZL2JMGhO_nB2', Browser.Buttons.OK_CANCEL);
    if (folderId === "") {
      Browser.msgBox('ID de Carpeta Inválida');
      return;
    }
    getFolderTree(folderId, true); 
  };
  
  // Obtiene el árbol de carpetas
  function getFolderTree(folderId, listAll) {
    try {
      // Obtiene las carpetas por ID
      var parentFolder = DriveApp.getFolderById(folderId);
      
      // Inicializa la Spreadsheet
      var file, data, sheet = SpreadsheetApp.getActiveSheet();
      sheet.clear();
      sheet.appendRow(["Ruta", "Nombre","Tipo" ,"Fecha", "URL", "Última Modificación", "Descripción", "Tamaño","Correo del propietario"]);
      
      // Recorre archivos y carpetas
      getChildFolders(parentFolder.getName(), parentFolder, data, sheet, listAll);
    } catch (e) {
      Logger.log(e.toString());
    }
  };
  
  // Obtiene la lista de archivos y carpetas y sus metadatos en modo recursivo
  function getChildFolders(parentName, parent, data, sheet, listAll) {
    var childFolders = parent.getFolders();
   
    // Lista las carpetas contenidas dentro de la carpeta
    while (childFolders.hasNext()) {
      var childFolder = childFolders.next();
      var folderId = childFolder.getId();
      data = [ 
        parentName + "/" + childFolder.getName(),
        childFolder.getName(),
        "Folder",
        childFolder.getDateCreated(),
        childFolder.getUrl(),
        childFolder.getLastUpdated(),
        childFolder.getDescription(),
        childFolder.getSize()/1024,
        childFolder.getOwner().getEmail()
      ];
      // Escribe
      sheet.appendRow(data);
      
      // Lista los archivos en la carpeta
      var files = childFolder.getFiles();
      while (listAll & files.hasNext()) {
        var childFile = files.next();
        data = [ 
          parentName + "/" + childFolder.getName() + "/" + childFile.getName(),
          childFile.getName(),
          "Files",
          childFile.getDateCreated(),
          childFile.getUrl(),
          childFile.getLastUpdated(),
          childFile.getDescription(),
          childFile.getSize()/1024,
          childFile.getOwner().getEmail(),
        ];
        // Escribe
        sheet.appendRow(data);
      }
      // Llamada Recursiva a la carpeta
      getChildFolders(parentName + "/" + childFolder.getName(), childFolder, data, sheet, listAll);  
    }
  };
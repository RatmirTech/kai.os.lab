// lab_part3_fixed.js
var WSH = WScript;
var fso = WSH.CreateObject("Scripting.FileSystemObject");
var shell = WSH.CreateObject("WScript.Shell");

if (WSH.Arguments.Length < 3) {
    WSH.Echo("Usage: cscript //nologo script.js <source_dir> <dest_dir> <file_name>");
    WSH.Quit(1);
}

var sourceDir = WSH.Arguments(0);
var destDir = WSH.Arguments(1);
var fileName = WSH.Arguments(2);

// 6.1. Создать исходный каталог;
if (!fso.FolderExists(sourceDir)) {
    fso.CreateFolder(sourceDir);
}

var filePath = sourceDir + "\\" + fileName;

// Проверка и удаление файла, если он существует
if (fso.FileExists(filePath)) {
    fso.DeleteFile(filePath);
}

// 6.2. С помощью Блокнота создать исходный файл;
var file = fso.CreateTextFile(filePath, true);
file.WriteLine("// Created by script");
file.Close();

shell.Run("notepad.exe \"" + filePath + "\"", 1, true);

// 6.3. Переместить исходный каталог в результирующий каталог;
if (fso.FolderExists(destDir)) {
    fso.DeleteFolder(destDir);
}
fso.MoveFolder(sourceDir, destDir);

// 6.4. Переименовать файл в результирующем каталоге;
var oldFilePath = destDir + "\\" + fileName;
var newFilePath = destDir + "\\renamed_" + fileName;
fso.MoveFile(oldFilePath, newFilePath);

// 6.5. Запустить Блокнот для редактирования файла в результирующем каталоге;
shell.Run("notepad.exe \"" + newFilePath + "\"", 1, true);

// 6.6. Вывести оглавление результирующего каталога;
var result = shell.Exec("cmd /c dir \"" + destDir + "\"");
WSH.Echo(result.StdOut.ReadAll());
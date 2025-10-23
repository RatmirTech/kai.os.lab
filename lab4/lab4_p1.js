// Создаем объекты WSH для работы с файловой системой и оболочкой
var fso = WScript.CreateObject("Scripting.FileSystemObject");
var wshShell = WScript.CreateObject("WScript.Shell");

// Проверяем количество аргументов командной строки
if (WScript.Arguments.Length < 3) {
    WScript.Echo("Использование: cscript script.js <исходный_каталог> <результирующий_каталог> <имя_файла>");
    WScript.Quit(1);
}

// Получаем параметры из командной строки
var sourceDir = WScript.Arguments.Item(0); // Исходный каталог
var destDir = WScript.Arguments.Item(1);   // Результирующий каталог
var fileName = WScript.Arguments.Item(2);  // Имя файла

// 6.1. Создать исходный каталог
if (!fso.FolderExists(sourceDir)) {
    fso.CreateFolder(sourceDir);
    WScript.Echo("Создан исходный каталог: " + sourceDir);
} else {
    WScript.Echo("Исходный каталог уже существует: " + sourceDir);
}

// 6.2. С помощью Блокнота создать исходный файл
var filePath = fso.BuildPath(sourceDir, fileName);
var fileContent = "Это содержимое файла, созданного в лабораторной работе.";
fso.CreateTextFile(filePath, true).Write(fileContent);
WScript.Echo("Создан файл: " + filePath);

// Запускаем Блокнот для редактирования файла (необязательно, но по заданию)
wshShell.Run("notepad.exe " + filePath, 1, false);

// 6.3. Переместить исходный каталог в результирующий каталог
// Сначала убедимся, что результирующий каталог существует
if (!fso.FolderExists(destDir)) {
    fso.CreateFolder(destDir);
    WScript.Echo("Создан результирующий каталог: " + destDir);
}

// Формируем путь к новому месту каталога
var newSourceDirPath = fso.BuildPath(destDir, fso.GetBaseName(sourceDir));

// Перемещаем каталог
fso.MoveFolder(sourceDir, newSourceDirPath);
WScript.Echo("Каталог перемещен в: " + newSourceDirPath);

// Обновляем переменную sourceDir на новый путь
sourceDir = newSourceDirPath;

// 6.4. Переименовать файл в результирующем каталоге
var oldFilePath = fso.BuildPath(sourceDir, fileName);
var newFileName = "renamed_" + fileName;
var newFilePath = fso.BuildPath(sourceDir, newFileName);

fso.MoveFile(oldFilePath, newFilePath);
WScript.Echo("Файл переименован: " + newFilePath);

// 6.5. Запустить Блокнот для редактирования файла в результирующем каталоге
wshShell.Run("notepad.exe " + newFilePath, 1, false);

// 6.6. Вывести оглавление результирующего каталога
WScript.Echo("\n--- Оглавление результирующего каталога ---");
var folder = fso.GetFolder(sourceDir);
var files = new Enumerator(folder.Files);
for (; !files.atEnd(); files.moveNext()) {
    var file = files.item();
    WScript.Echo(file.Name + " (" + file.Size + " байт)");
}
/*
lab3_part1.js
JScript (for cscript.exe)
Вывод справки MS-DOS (help) с возможностью перенаправления в файл.
Использование:
    cscript //nologo lab3_part1.js <commandName> [outputFilePath]
Примеры:
    cscript //nologo lab3_part1.js dir
    cscript //nologo lab3_part1.js copy "C:\temp\help_dir.txt"
*/

var WSH = WScript;
var shell = WSH.CreateObject("WScript.Shell");
var fso = new ActiveXObject("Scripting.FileSystemObject");

function showUsage() {
        WSH.Echo("Usage:");
        WSH.Echo("  cscript //nologo " + WSH.ScriptName + " <commandName> [outputFilePath]");
        WSH.Echo("");
        WSH.Echo("Examples:");
        WSH.Echo("  cscript //nologo " + WSH.ScriptName + " dir");
        WSH.Echo("  cscript //nologo " + WSH.ScriptName + " copy \"C:\\temp\\help_copy.txt\"");
}

function ensureParentFolderExists(path) {
        var p = path.replace(/\//g, "\\");
        var idx = p.lastIndexOf("\\");
        if (idx <= 0) return;
        var parent = p.substring(0, idx);
        if (parent.length <= 2) return;
        if (fso.FolderExists(parent)) return;
        ensureParentFolderExists(parent);
        fso.CreateFolder(parent);
}

var args = WSH.Arguments;
if (args.Length < 1) {
        showUsage();
        WSH.Quit(1);
}

var cmdName = args.Item(0);
var outPath = null;
if (args.Length >= 2) {
        outPath = args.Item(1);
        outPath = shell.ExpandEnvironmentStrings(outPath);
        try {
                ensureParentFolderExists(outPath);
        } catch (e) {
                WSH.Echo("Ошибка при создании папки для файла: " + e.message);
                WSH.Quit(2);
        }
}

var dosCommand = "help " + cmdName;

var comspec = shell.ExpandEnvironmentStrings("%COMSPEC%");
var fullCmd;
if (outPath) {
        fullCmd = comspec + " /C " + dosCommand + " > \"" + outPath + "\"";
        WSH.Echo("Выполняю: " + dosCommand + "  ->  " + outPath);
        try {
                shell.Run(fullCmd, 1, true);
                WSH.Echo("Готово. Файл: " + outPath);
        } catch (e) {
                WSH.Echo("Ошибка при выполнении команды: " + e.message);
                WSH.Quit(3);
        }
} else {
        fullCmd = comspec + " /K " + dosCommand + " | more";
        WSH.Echo("Выполняю: " + dosCommand + " (интерактивный вывод)");
        try {
                shell.Run(fullCmd, 1, true);
        } catch (e) {
                WSH.Echo("Ошибка при выполнении команды: " + e.message);
                WSH.Quit(4);
        }
}
WSH.Quit(0);
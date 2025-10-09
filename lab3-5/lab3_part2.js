var WSH = WScript;
var shell = WSH.CreateObject("WScript.Shell");
var fso = WSH.CreateObject("Scripting.FileSystemObject");

if (WSH.Arguments.Length < 2) {
    WSH.Echo("Usage: cscript //nologo script.js \"<file_path>\" <win|console>");
    WSH.Quit(1);
}

var filePath = WSH.Arguments.Item(0);
var mode = WSH.Arguments.Item(1).toLowerCase();

if (!fso.FileExists(filePath)) {
    var tf = fso.CreateTextFile(filePath, true);
    tf.WriteLine("// New script file");
    tf.Close();
}

shell.Run('"' + shell.ExpandEnvironmentStrings("%windir%\\notepad.exe") + '" "' + filePath + '"', 1, true);

if (mode === "win") {
    shell.Run('"' + shell.ExpandEnvironmentStrings("%windir%\\system32\\wscript.exe") + '" "' + filePath + '"', 1, true);
} else if (mode === "console") {
    shell.Run('cscript //nologo "' + WSH.Arguments.Item(0) + '"', 1, true);
}
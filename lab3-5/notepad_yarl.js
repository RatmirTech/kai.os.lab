//wshShk.js - �������� ������ �������� �� ������� �����
var WSHShell=WScript.CreateObject("WScript.Shell");
//���� � �������� �����
var DesktopPath = WSHShell.SpecialFolders("Desktop");
//c������ ����� �� ������� �����
var MyShortcut=WSHShell.CreateShortcut(DesktopPath+"\\����� �� �������.lnk");
//������ �������� �������-������ � ��������� ��
MyShortcut.TargetPath=WSHShell.ExpandEnvironmentStrings("%windir%\\notepad.exe");
MyShortcut.WorkingDirectory=WSHShell.ExpandEnvironmentStrings("%windir%");
MyShortcut.WindowStyle=4;
MyShortcut.IconLocation=WSHShell.ExpandEnvironmentStrings("%windir%\\notepad.exe,0");
MyShortcut.Save();
WScript.Echo("������ �� ������� ����� ���� ����� ��� Notepad."); 
// lab2_part3.js - �� �2, ����� III
// ����� ����, �������������� �� ������� �����

function findWordsEndingWithVowel(text) {
	var vowels = '����������Ũ�������'
	var separators = ' .,!?;:-"()[]{}'
	var words = []
	var currentWord = ''

	for (var i = 0; i < text.length; i++) {
		var char = text.charAt(i)
		if (separators.indexOf(char) == -1) {
			currentWord += char
		} else {
			if (currentWord.length > 0) {
				words.push(currentWord)
				currentWord = ''
			}
		}
	}
	if (currentWord.length > 0) {
		words.push(currentWord)
	}

	var foundWords = []
	for (var j = 0; j < words.length; j++) {
		var word = words[j]
		if (word.length > 0) {
			var lastChar = word.charAt(word.length - 1)
			if (vowels.indexOf(lastChar) != -1) {
				foundWords.push(word)
			}
		}
	}

	return foundWords
}

var inputText = WScript.Arguments(0)


WScript.Echo('�������� �����: ' + inputText)
var vowelEndingWords = findWordsEndingWithVowel(inputText)
WScript.Echo('��������� �����, �������������� �� ������� �����:')
for (var k = 0; k < vowelEndingWords.length; k++) {
	WScript.Echo(k + 1 + '. ' + vowelEndingWords[k])
}
WScript.Echo('����� ���������� ��������� ����: ' + vowelEndingWords.length)

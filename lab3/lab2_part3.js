// lab2_part3.js - ЛР №2, Часть III
// Поиск слов, оканчивающихся на гласную букву

function findWordsEndingWithVowel(text) {
	var vowels = 'аеёиоуыэюяАЕЁИОУЫЭЮЯ'
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


WScript.Echo('Исходный текст: ' + inputText)
var vowelEndingWords = findWordsEndingWithVowel(inputText)
WScript.Echo('Найденные слова, оканчивающиеся на гласную букву:')
for (var k = 0; k < vowelEndingWords.length; k++) {
	WScript.Echo(k + 1 + '. ' + vowelEndingWords[k])
}
WScript.Echo('Общее количество найденных слов: ' + vowelEndingWords.length)

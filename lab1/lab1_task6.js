// lab1_task6.js - Расчет суммы n первых членов ряда
// An = ((-1)^n * (2*n^2 + 1) / (2*n)!) * x^(2*n)

function calculateFactorial(num) {
    if (num <= 1) return 1;
    var result = 1;
    for (var i = 2; i <= num; i++) {
        result *= i;
    }
    return result;
}

function calculateSeriesSum(n, x) {
    var totalSum = 0;

    for (var currentN = 1; currentN <= n; currentN++) {
        var numerator = Math.pow(-1, currentN) * (2 * currentN * currentN + 1);
        var denominator = calculateFactorial(2 * currentN);
        var power = Math.pow(x, 2 * currentN);

        var currentTerm = (numerator / denominator) * power;
        totalSum += currentTerm;

        WScript.Echo(
            'A' +
                currentN +
                ' = (' +
                numerator +
                ' / ' +
                denominator +
                ') * ' +
                x +
                '^' +
                (2 * currentN) +
                ' = ' +
                currentTerm
        );
    }

    return totalSum;
}

var n = 3;
var x = 2;

WScript.Echo(
    'Расчет суммы первых ' + n + ' членов ряда');
var finalResult = calculateSeriesSum(n, x);
WScript.Echo('Сумма первых ' + n + ' членов ряда: ' + finalResult);

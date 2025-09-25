// lab1_task7.js - ������ ����� n ������ ������ ����
// An = 1 / ln(2 * sin(1/n))

function calculateSeriesSum(n) {
    var totalSum = 0;

    for (var currentN = 1; currentN <= n; currentN++) {
        var valueInside = 2 * Math.sin(1 / currentN); // sin(1/n)
        var currentTerm = 1 / Math.log(valueInside); // ln(...)
        totalSum += currentTerm;

        WScript.Echo(
            "A" + currentN +
            " = 1 / ln(2 * sin(1/" + currentN + ")) = " +
            currentTerm
        );
    }

    return totalSum;
}

var n = 5;

WScript.Echo("������ ����� ������ " + n + " ������ ����");
var finalResult = calculateSeriesSum(n);
WScript.Echo("����� ������ " + n + " ������ ����: " + finalResult);
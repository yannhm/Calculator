var panelResult = $("#panel-result");
var currentEquation = null;
var lastOperation = null;
$(".number").on("click", function () {
    var actualEquation = panelResult.html();
    var selectedNumber = $(this).text();
    var equationDot = actualEquation.indexOf(".");
    var nextEquation = null;
    if (parseInt(actualEquation, 10) == 0) {
        nextEquation = selectedNumber;
    }
    else if (equationDot !== -1 && actualEquation[equationDot + 1] == "0") {
        nextEquation = actualEquation.substring(0, actualEquation.length - 1) + selectedNumber;
    }
    else {
        nextEquation = actualEquation + selectedNumber;
    }
    panelResult.html(nextEquation);
});
$(".operations").on("click", function () {
    var actualEquation = parseFloat(panelResult.html());
    var operation = $(this).text();
    if (operation == "AC") {
        panelResult.html("0");
        currentEquation = null;
        lastOperation = null;
    }
    else if (operation == "+/-") {
        invertEquationSymbol(actualEquation);
    }
    else if (operation == "%") {
        panelResult.html("" + actualEquation / 100);
    }
    else if (operation == ",") {
        panelResult.html(actualEquation.toFixed(1));
    }
    else if (currentEquation == null && operation !== "=") {
        startEquation(actualEquation, operation);
    }
    else {
        finishEquation(actualEquation);
    }
});
function startEquation(actualEquation, operation) {
    currentEquation = actualEquation;
    lastOperation = operation;
    panelResult.html("0");
}
function finishEquation(actualEquation) {
    switch (lastOperation) {
        case "+":
            panelResult.html("" + (currentEquation + actualEquation));
            break;
        case "-":
            panelResult.html("" + (currentEquation - actualEquation));
            break;
        case "x":
            panelResult.html("" + (currentEquation * actualEquation));
            break;
        case "÷":
            panelResult.html("" + (currentEquation / actualEquation));
            break;
    }
    currentEquation = null;
    lastOperation = null;
}
function invertEquationSymbol(actualEquation) {
    var inverseEquation = actualEquation;
    if (actualEquation > 0) {
        inverseEquation = -Math.abs(actualEquation);
    }
    else {
        inverseEquation = Math.abs(actualEquation);
    }
    panelResult.html("" + inverseEquation);
}

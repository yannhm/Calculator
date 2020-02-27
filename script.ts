const panelResult : JQuery = $("#panel-result");
let currentEquation : number = null;
let lastOperation : string = null;

$(".number").on("click", function() {
    const actualEquation : string = panelResult.html();
    const selectedNumber : string = $(this).text();
    const equationDot : number = actualEquation.indexOf(".");
    let nextEquation : string = null;

    if (parseInt(actualEquation, 10) == 0) {
        nextEquation = selectedNumber;
    } else if (equationDot !== -1 && actualEquation[equationDot + 1] == "0") {
        nextEquation = actualEquation.substring(0, actualEquation.length - 1) + selectedNumber;
    } else {
      nextEquation = actualEquation + selectedNumber;
    } 
    panelResult.html(nextEquation);
});

$(".operations").on("click", function() {
    const actualEquation : number = parseFloat(panelResult.html());
    const operation : string = $(this).text();
    if (operation == "AC") {
        panelResult.html("0");
        currentEquation = null;
        lastOperation = null;
    } else if (operation == "+/-") {
        invertEquationSymbol(actualEquation);
    } else if(operation == "%") {
        panelResult.html("" + actualEquation / 100);
    } else if(operation == ",") {
        panelResult.html(actualEquation.toFixed(1));
    } else if (currentEquation == null && operation !== "=") {
        startEquation(actualEquation, operation);
    } else {
        finishEquation(actualEquation);
    }
});

function startEquation(actualEquation : number, operation : string) {
    currentEquation = actualEquation;
    lastOperation = operation;
    panelResult.html("0");
}

function finishEquation(actualEquation : number) {
    switch(lastOperation) {
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

function invertEquationSymbol(actualEquation : number) {
    let inverseEquation : number = actualEquation;  
    if (actualEquation > 0) {
        inverseEquation = -Math.abs(actualEquation);
    } else {
        inverseEquation = Math.abs(actualEquation);
    }
    panelResult.html("" + inverseEquation);
}




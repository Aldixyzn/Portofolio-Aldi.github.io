function appendNumber(number) {
    const display = document.getElementById("display");
    display.value += number;
}

function appendOperator(operator) {
    const display = document.getElementById("display");
    const lastChar = display.value[display.value.length - 1];

    if (display.value === '' && ['+', '-', '*', '/'].includes(operator)) {
        return;
    }

    if (isNaN(lastChar) && lastChar !== '.') {
        display.value = display.value.slice(0, -1);
    }

    display.value += operator;
}

function clearDisplay() {
    document.getElementById("display").value = '';
}

function deleteLast() {
    const display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}

function calculate() {
    const display = document.getElementById("display");
    try {
        const result = Function('"use strict";return (' + display.value + ')')();
        display.value = result;  // Display the calculated result
    } catch {
        display.value = "Error"; // Handle invalid inputs gracefully
    }
}
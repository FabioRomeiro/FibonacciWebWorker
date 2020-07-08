self.onmessage = onMessage;

let cursor = 0;

function onMessage(event) {
    sendNextFibonacciNumber();
}

function sendNextFibonacciNumber() {
    const number = fibonacci(cursor);
    self.postMessage({ index: cursor, number });
    cursor += 1;
    sendNextFibonacciNumber();
}

function fibonacci(n) {
    if (n < 2) {
        return n;
    }

    return fibonacci(n - 1) + fibonacci(n - 2);
}
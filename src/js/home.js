(function Home() {
    
    let $startBtn;
    let $stopBtn;
    let $fibonacciList;
    let $fibonacciNumber;

    let worker;
    
    document.addEventListener('DOMContentLoaded', ready);

    function ready() {
        $startBtn = document.querySelector('[data-start-btn]');
        $stopBtn = document.querySelector('[data-stop-btn]');
        $fibonacciList = document.querySelector('[data-fibonacci-list]');
        $fibonacciNumber = document.querySelector('[data-fibonacci-number]');
        
        _clearNumbersList();

        $startBtn.addEventListener('click', start);
        $stopBtn.addEventListener('click', stop);
    }

    function start (event) {
        _disableButton($startBtn);
        _enableButton($stopBtn);
        _clearNumbersList();

        worker = new Worker('/js/worker.js');
        worker.addEventListener('message', onMessage);
        worker.postMessage({ start: true })
    }

    function stop (event) {
        _disableButton($stopBtn);
        _enableButton($startBtn);
        worker.terminate();
    }

    function _disableButton($button) {
        $button.setAttribute('disabled', '');
    }

    function _enableButton($button) {
        $button.removeAttribute('disabled');
    }

    function _clearNumbersList() {
        $fibonacciList.innerHTML = '';
    }

    function renderNumber(index, number) {
        let $numberElement = $fibonacciNumber.cloneNode(true);
        $numberElement.innerText = `Fib(${index}): ${number}`;
        $fibonacciList.insertBefore($numberElement, $fibonacciList.childNodes[0]);
    }

    function onMessage (event) {
        console.log();
        renderNumber(event.data.index, event.data.number);
    }
})()
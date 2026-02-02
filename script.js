const textInput = document.getElementById('textInput');
const fontSizeInput = document.getElementById('fontSizeInput');
const yPositionInput = document.getElementById('yPositionInput');
const resetBtn = document.getElementById('resetBtn');
const svgText = document.getElementById('text_yle_tv2');

const defaults = {
    text: 'YLE     TV2',
    size: 41,
    y: 325
};

function updateSvg() {
    svgText.textContent = textInput.value;
    svgText.style.fontSize = fontSizeInput.value + 'px';
    svgText.setAttribute('y', yPositionInput.value);
}

function saveToUrl() {
    const params = new URLSearchParams();
    params.set('text', textInput.value);
    params.set('size', fontSizeInput.value);
    params.set('y', yPositionInput.value);
    history.replaceState(null, '', '?' + params.toString());
}

function loadFromUrl() {
    const params = new URLSearchParams(window.location.search);
    textInput.value = params.get('text') || defaults.text;
    fontSizeInput.value = params.get('size') || defaults.size;
    yPositionInput.value = params.get('y') || defaults.y;
    updateSvg();
}

function reset() {
    textInput.value = defaults.text;
    fontSizeInput.value = defaults.size;
    yPositionInput.value = defaults.y;
    updateSvg();
    saveToUrl();
}

textInput.addEventListener('keyup', function() {
    updateSvg();
    saveToUrl();
});

fontSizeInput.addEventListener('input', function() {
    updateSvg();
    saveToUrl();
});

yPositionInput.addEventListener('input', function() {
    updateSvg();
    saveToUrl();
});

resetBtn.addEventListener('click', reset);

// Load state from URL on page load
loadFromUrl();

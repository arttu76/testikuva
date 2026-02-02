const textInput = document.getElementById('textInput');
const fontSizeInput = document.getElementById('fontSizeInput');
const yPositionInput = document.getElementById('yPositionInput');
const resetBtn = document.getElementById('resetBtn');
const download16x9 = document.getElementById('download16x9');
const download4x3 = document.getElementById('download4x3');
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

function downloadPng(width, height, filename, fillMode) {
    const svgEl = document.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = function() {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // Fill with black background (in case SVG has transparency)
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height);

        // Calculate scaling
        const svgAspect = 768 / 576; // 4:3
        const targetAspect = width / height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (fillMode === 'fill') {
            // Fill mode: zoom to fill entire canvas, crop edges
            if (targetAspect > svgAspect) {
                // Target is wider - fit by width, crop top/bottom
                drawWidth = width;
                drawHeight = width / svgAspect;
                offsetX = 0;
                offsetY = (height - drawHeight) / 2;
            } else {
                // Target is taller - fit by height, crop sides
                drawHeight = height;
                drawWidth = height * svgAspect;
                offsetX = (width - drawWidth) / 2;
                offsetY = 0;
            }
        } else {
            // Fit mode: fit entire image, letterbox if needed
            if (targetAspect > svgAspect) {
                // Target is wider - fit by height, center horizontally
                drawHeight = height;
                drawWidth = height * svgAspect;
                offsetX = (width - drawWidth) / 2;
                offsetY = 0;
            } else {
                // Target is taller - fit by width, center vertically
                drawWidth = width;
                drawHeight = width / svgAspect;
                offsetX = 0;
                offsetY = (height - drawHeight) / 2;
            }
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

        URL.revokeObjectURL(url);

        canvas.toBlob(function(blob) {
            const link = document.createElement('a');
            link.download = filename;
            link.href = URL.createObjectURL(blob);
            link.click();
            URL.revokeObjectURL(link.href);
        }, 'image/png');
    };
    img.src = url;
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

// Download buttons: 4K resolutions
// 4:3 = 2880x2160 (same height as 4K)
// 16:9 = 3840x2160 (zoomed/cropped to fill)
download4x3.addEventListener('click', function() {
    const text = textInput.value.replace(/\s+/g, '');
    downloadPng(2880, 2160, 'testikuva-' + text + '-4x3.png', 'fit');
});

download16x9.addEventListener('click', function() {
    const text = textInput.value.replace(/\s+/g, '');
    downloadPng(3840, 2160, 'testikuva-' + text + '-16x9.png', 'fill');
});

// Load state from URL on page load
loadFromUrl();

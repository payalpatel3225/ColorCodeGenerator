function updatePlaceholder() {
    let format = document.getElementById("formatSelect").value;
    let inputField = document.getElementById("colorInput");

    if (format === "hex") {
        inputField.placeholder = "#ff5733";
    } else if (format === "rgb") {
        inputField.placeholder = "rgb(255, 87, 51)";
    } else if (format === "rgba") {
        inputField.placeholder = "rgba(255, 87, 51, 1)";
    } else if (format === "hsl") {
        inputField.placeholder = "hsl(9, 100%, 60%)";
    } else if (format === "hsla") {
        inputField.placeholder = "hsla(9, 100%, 60%, 0.5)";
    }
}

function convertColor() {
    let format = document.getElementById("formatSelect").value;
    let inputColor = document.getElementById("colorInput").value.trim();
    let colorBox = document.getElementById("colorBox");

    let hexOutput = document.getElementById("hexOutput");
    let rgbOutput = document.getElementById("rgbOutput");
    let rgbaOutput = document.getElementById("rgbaOutput");
    let hslOutput = document.getElementById("hslOutput");
    let hslaOutput = document.getElementById("hslaOutput");

    let color;

    if (format === "hex" && /^#([0-9A-F]{3}){1,2}$/i.test(inputColor)) {
        color = inputColor;
    } else if (format === "rgb" && /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/i.test(inputColor)) {
        color = inputColor;
    } else if (format === "rgba" && /^rgba\((\d{1,3}), (\d{1,3}), (\d{1,3}), (0(\.\d+)?|1(\.0+)?)\)$/i.test(inputColor)) {
        color = inputColor;
    } else if (format === "hsl" && /^hsl\(\d{1,3},\s*\d{1,3}%,\s*\d{1,3}%\)$/i.test(inputColor)) {
        color = inputColor;
    } else if (format === "hsla" && /^hsla\(\d{1,3},\s*\d{1,3}%,\s*\d{1,3}%,\s*(0(\.\d+)?|1(\.0+)?)\)$/i.test(inputColor)) {
        color = inputColor;
    } else {
        alert("Invalid color format!");
        return;
    }

    colorBox.style.backgroundColor = color;

    // Convert Colors
    let tempDiv = document.createElement("div");
    tempDiv.style.color = color;
    document.body.appendChild(tempDiv);
    let computedColor = window.getComputedStyle(tempDiv).color;
    document.body.removeChild(tempDiv);

    let rgbMatch = computedColor.match(/\d+/g);
    if (rgbMatch) {
        let r = rgbMatch[0], g = rgbMatch[1], b = rgbMatch[2];
        hexOutput.textContent = rgbToHex(r, g, b);
        rgbOutput.textContent = `rgb(${r}, ${g}, ${b})`;
        rgbaOutput.textContent = `rgba(${r}, ${g}, ${b}, 1)`;
        let hsl = rgbToHsl(r, g, b);
        hslOutput.textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        hslaOutput.textContent = `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, 1)`;
    }
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + +b).toString(16).slice(1).toUpperCase();
}

function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
        h = Math.round(h * 60);
    }
    return { h, s: Math.round(s * 100), l: Math.round(l * 100) };
}

const saturationTableTbody = document.querySelector('#saturationTableTbody');
const lightnessTableTbody = document.querySelector('#lightnessTableTbody');
const colorPickerInput = document.querySelector('input[type="color"]');
const polygonContainer = document.querySelector('.polygonContainer');
const shadesContainer = document.querySelector('.shadesContainer');
const polygonPreview = document.querySelector('.polygonPreview');
const previewContainer = document.querySelector('.previewBox');
const hueTableTbody = document.querySelector('#hueTableTbody');
const colorValues = document.querySelector('.colorValues');
const form = document.querySelector('form');

const GRID = {
  columns: 25,
  rows: 25,
};

const BOX = {
  width: 22,
  height: 22,
};

const TABLE_CONFIG = {
  hue: {
    loop: {
      start: 0,
      end: 24,
      step: 15,
    },
    type: 'h',
    suffix: '',
    tbody: hueTableTbody,
    order: (h, s, l, value) => [value, s, l],
  },
  saturation: {
    loop: {
      start: 0,
      end: 20,
      step: 5,
    },
    type: 's',
    suffix: '%',
    tbody: saturationTableTbody,
    order: (h, s, l, value) => [h, value, l],
  },
  lightness: {
    loop: {
      start: 0,
      end: 20,
      step: 5,
    },
    type: 'l',
    suffix: '%',
    tbody: lightnessTableTbody,
    order: (h, s, l, value) => [h, s, value],
  },
};

generateHexagonCircle(GRID, BOX);

form.addEventListener('submit', handleFormSubmit);
form.addEventListener('input', handleFormInput);
polygonContainer.addEventListener('mouseover', checkPolygonPreview);

checkPolygonPreview({ target: polygonContainer });

function handleFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const color = formData.get('color-name').trim();

  if (!color) {
    return;
  }

  const div = document.createElement('div');
  div.style.color = color;
  document.body.appendChild(div);
  const rgbObject = getComputedStyle(div).color.match(/\d+/g).map(Number);
  document.body.removeChild(div);

  updateStateOnAction(rgbObject, div, true);
}

function handleFormInput(event) {
  const target = event.target;

  if (target.type === 'text') {
    return;
  }

  const formData = new FormData(form);
  const color = formData.get('color-picker');

  const rgbColor = hexToRgb(color);
  updateStateOnAction(
    [rgbColor.r, rgbColor.g, rgbColor.b],
    document.createElement('div'),
    false,
  );
}

function rgbToHex(color) {
  const { r, g, b } = color;

  const toHex = (value) => {
    const hex = Math.max(0, Math.min(255, value)).toString(16);
    return hex.padStart(2, '0');
  };

  return {
    r: toHex(r),
    g: toHex(g),
    b: toHex(b),
  };
}

function hexToRgb(color) {
  const hex = color.replace('#', '');
  return {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16),
  };
}

function generateHexagonCircle(grid, boxSizes) {
  const polygonWidth = boxSizes.width;
  const polygonHeight = boxSizes.height;

  const centerX = (grid.columns * polygonWidth) / 2;
  const centerY = (grid.rows * polygonHeight) / 2;

  const maxRings = Math.min(
    Math.floor(grid.columns / 2),
    Math.floor(grid.rows / 2),
  );

  const fragment = document.createDocumentFragment();

  for (let ring = 0; ring < maxRings; ring++) {
    const hexagonsInRing = ring === 0 ? 1 : ring * 6;
    const ringRadius = ring * (polygonHeight * 0.75);

    for (let i = 0; i < hexagonsInRing; i++) {
      const angle = (i * (360 / hexagonsInRing) * Math.PI) / 180;
      const x = centerX + ringRadius * Math.cos(angle);
      const y = centerY + ringRadius * Math.sin(angle);

      if (
        x >= 0 &&
        x <= grid.columns * polygonWidth &&
        y >= 0 &&
        y <= grid.rows * polygonHeight
      ) {
        const polygon = document.createElement('div');
        polygon.classList.add('polygon');
        polygon.style.left = `${x - polygonWidth / 2}px`;
        polygon.style.top = `${y - polygonHeight / 2}px`;

        const hue = ((angle * 180) / Math.PI + 360) % 360;
        const saturation = (ring / (maxRings - 1)) * 100;
        const color = hslToRgb(hue, saturation, 50);

        const hexColor = rgbToHex(color);
        polygon.style.backgroundColor = `#${hexColor.r}${hexColor.g}${hexColor.b}`;
        polygon.setAttribute('data-color-r', color.r);
        polygon.setAttribute('data-color-g', color.g);
        polygon.setAttribute('data-color-b', color.b);

        polygon.addEventListener('click', initData);
        polygon.addEventListener('mouseover', updateHoverColorOnPreview);

        fragment.appendChild(polygon);
      }
    }
  }

  polygonContainer.appendChild(fragment);

  polygonContainer.style.width = `${grid.columns * boxSizes.width}px`;
  polygonContainer.style.height = `${grid.rows * boxSizes.height}px`;

  const randomXIndex = Math.floor(Math.random() * grid.columns);
  const randomYIndex = Math.floor(Math.random() * grid.rows);

  polygonContainer.children[(randomXIndex, randomYIndex)].click();
  polygonPreview.style.backgroundColor =
    polygonContainer.children[
      (randomXIndex, randomYIndex)
    ].style.backgroundColor;
}

function generateColorsForGrid(grid) {
  const colors = [];
  const centerX = grid.columns / 2;
  const centerY = grid.rows / 2;
  const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));

  for (let i = 0; i < grid.columns; i++) {
    colors.push([]);
    for (let j = 0; j < grid.rows; j++) {
      const dx = i - centerX;
      const dy = j - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      const hue = (angle + 360) % 360;
      const saturation = (distance / maxDistance) * 100;
      const lightness = 50;

      const color = hslToRgb(hue, saturation, lightness);
      colors[i].push(color);
    }
  }
  return colors;
}

function hslToRgb(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function generateShades(r, g, b) {
  const hsl = rgbToHsl(r, g, b);
  const fragment = document.createDocumentFragment();
  const totalShades = 21;
  let exactMatchFound = false;
  let inputLightness = hsl.l;

  shadesContainer.innerHTML = '';

  const shadeElements = [];

  for (let i = totalShades; i > 0; i--) {
    const lightness = (i - 1) * 5;
    const shadeColor = hslToRgb(hsl.h, hsl.s, lightness);

    const shade = document.createElement('div');
    shade.classList.add('shade-container');
    shade.setAttribute('data-color-r', shadeColor.r);
    shade.setAttribute('data-color-g', shadeColor.g);
    shade.setAttribute('data-color-b', shadeColor.b);
    const hexValues = rgbToHex(shadeColor);
    const hexColor = `#${hexValues.r}${hexValues.g}${hexValues.b}`;

    if (lightness === inputLightness) {
      shade.classList.add('active');
      exactMatchFound = true;
    }

    shade.innerHTML = `
      <span>${lightness}%</span>
      <div class="shade" style="background-color: ${hexColor}" onclick="initColorCta(this)"></div>
      <span>${hexColor}</span>
    `;

    shadeElements.push({ element: shade, lightness });
  }

  if (!exactMatchFound) {
    const newShadeColor = hslToRgb(hsl.h, hsl.s, inputLightness);
    const newShade = document.createElement('div');
    newShade.classList.add('shade-container', 'active');
    newShade.setAttribute('data-color-r', newShadeColor.r);
    newShade.setAttribute('data-color-g', newShadeColor.g);
    newShade.setAttribute('data-color-b', newShadeColor.b);
    const hexValues = rgbToHex(newShadeColor);
    const hexColor = `#${hexValues.r}${hexValues.g}${hexValues.b}`;

    newShade.innerHTML = `
      <span>${inputLightness}%</span>
      <div class="shade" style="background-color: ${hexColor}" onclick="initColorCta(this)"></div>
      <span>${hexColor}</span>
    `;

    let insertIndex = shadeElements.findIndex(
      (item) => item.lightness < inputLightness,
    );
    if (insertIndex === -1) {
      insertIndex = shadeElements.length;
    }
    shadeElements.splice(insertIndex, 0, {
      element: newShade,
      lightness: inputLightness,
    });
  }

  shadeElements.forEach((item) => fragment.appendChild(item.element));
  shadesContainer.appendChild(fragment);
}

function initData() {
  if (this.classList.contains('active')) {
    return;
  }

  const r = this.getAttribute('data-color-r');
  const g = this.getAttribute('data-color-g');
  const b = this.getAttribute('data-color-b');

  for (const polygon of polygonContainer.children) {
    polygon.classList.remove('active');
  }

  this.classList.add('active');
  generateShades(r, g, b);

  for (const config in TABLE_CONFIG) {
    populateTable(r, g, b, TABLE_CONFIG[config]);
  }

  previewContainer.style.backgroundColor = this.style.backgroundColor;
  const hex = rgbToHex({ r, g, b });
  const hsl = rgbToHsl(r, g, b);
  colorValues.innerHTML = `<span>#${hex.r}${hex.g}${hex.b}</span><span>rgb(${r}, ${g}, ${b})</span><span>hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)</span>`;

  if (!this.getAttribute('data-is-from-color-input')) {
    colorPickerInput.value = `#${hex.r}${hex.g}${hex.b}`;
  }
}

function updateHoverColorOnPreview() {
  polygonPreview.style.backgroundColor = this.style.backgroundColor;
  polygonPreview.style.opacity = 1;
}

function checkPolygonPreview(event) {
  if (event.target.classList.contains('polygonContainer')) {
    polygonPreview.style.opacity = 0;
  }
}

function updateStateOnAction(rgbArray, div, findCircleElement) {
  const rgbColor = {
    r: rgbArray[0],
    g: rgbArray[1],
    b: rgbArray[2],
  };

  let colorFound = false;

  if (findCircleElement) {
    for (const polygon of polygonContainer.children) {
      const r = Number(polygon.getAttribute('data-color-r'));
      const g = Number(polygon.getAttribute('data-color-g'));
      const b = Number(polygon.getAttribute('data-color-b'));

      if (r === rgbColor.r && g === rgbColor.g && b === rgbColor.b) {
        polygon.click();
        colorFound = true;
        break;
      }
    }

    if (colorFound) {
      return;
    }
  }

  const hexColor = rgbToHex(rgbColor);
  div.style.backgroundColor = `#${hexColor.r}${hexColor.g}${hexColor.b}`;
  div.setAttribute('data-color-r', rgbColor.r);
  div.setAttribute('data-color-g', rgbColor.g);
  div.setAttribute('data-color-b', rgbColor.b);

  if (!findCircleElement) {
    div.setAttribute('data-is-from-color-input', true);
  } else {
    polygonPreview.style.backgroundColor = div.style.backgroundColor;
  }

  initData.call(div);
}

function populateTable(r, g, b, config) {
  config.tbody.innerHTML = '';

  const baseHsl = rgbToHsl(r, g, b);
  const fragment = document.createDocumentFragment();
  const tableRows = [];

  let exactMatchFound = false;

  for (let i = config.loop.start; i <= config.loop.end; i++) {
    const value = i * config.loop.step;
    const rgb = hslToRgb(
      ...config.order(baseHsl.h, baseHsl.s, baseHsl.l, value),
    );
    const hex = rgbToHex(rgb);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    const row = document.createElement('tr');
    row.setAttribute('data-color-r', rgb.r);
    row.setAttribute('data-color-g', rgb.g);
    row.setAttribute('data-color-b', rgb.b);

    if (value === baseHsl[config.type]) {
      row.classList.add('active');
      exactMatchFound = true;
    }

    row.innerHTML = `
      <td style="background-color: #${hex.r}${hex.g}${hex.b}; width: 20%; cursor: pointer" onclick="initColorCta(this)"></td>
      <td>${value}${config.suffix}</td>
      <td>#${hex.r}${hex.g}${hex.b}</td>
      <td>rgb(${rgb.r}, ${rgb.g}, ${rgb.b})</td>
      <td>hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)</td>
    `;

    tableRows.push({ element: row, value });
  }

  if (!exactMatchFound) {
    const rgb = hslToRgb(baseHsl.h, baseHsl.s, baseHsl.l);
    const hex = rgbToHex(rgb);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    const row = document.createElement('tr');
    row.setAttribute('data-color-r', rgb.r);
    row.setAttribute('data-color-g', rgb.g);
    row.setAttribute('data-color-b', rgb.b);
    row.classList.add('active');

    row.innerHTML = `
      <td style="background-color: #${hex.r}${hex.g}${hex.b}; width: 20%; cursor: pointer" onclick="initColorCta(this)"></td>
      <td>${baseHsl[config.type]}${config.suffix}</td>
      <td>#${hex.r}${hex.g}${hex.b}</td>
      <td>rgb(${rgb.r}, ${rgb.g}, ${rgb.b})</td>
      <td>hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)</td>
    `;

    const insertIndex = tableRows.findIndex(
      (item) => item.value > baseHsl[config.type],
    );

    if (insertIndex === -1) {
      insertIndex = tableRows.length;
    }

    tableRows.splice(insertIndex, 0, {
      element: row,
      value: baseHsl[config.type],
    });
  }

  tableRows.forEach((item) => fragment.appendChild(item.element));
  config.tbody.appendChild(fragment);
}

function initColorCta(element) {
  if (element.parentElement.classList.contains('active')) {
    return;
  }

  const r = element.parentElement.getAttribute('data-color-r');
  const g = element.parentElement.getAttribute('data-color-g');
  const b = element.parentElement.getAttribute('data-color-b');

  updateStateOnAction([r, g, b], document.createElement('div'), true);
}

/*
  Theme instalation from parent window
*/
(function initThemeFromParentContext() {
  window.addEventListener('message', (event) => {
    if (event.data.type !== "THEME_CHANGED") {
      return;
    }
    const currentTheme = document.body.classList[0] || 'light';
    document.body.classList.remove(currentTheme);
    document.body.classList.add(event.data.theme);
  });
})();
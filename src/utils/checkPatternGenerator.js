/**
 * Dynamic Procedural Fabric & Check Pattern Generator
 * Generates high-resolution fabric textures for Three.js CanvasTexture.
 */

export const generateCheckPatternCanvas = ({
  patternType = 'tartan',
  primaryColor = '#B74737',
  secondaryColor = '#1C2841',
  accentColor = '#EDE7DC',
  gridScale = 12,
  size = 1024,
}) => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!ctx) return canvas;

  // 1. Base fabric color
  ctx.fillStyle = primaryColor;
  ctx.fillRect(0, 0, size, size);

  const step = size / gridScale;

  if (patternType === 'gingham') {
    // Classic 50% blend gingham check
    ctx.fillStyle = secondaryColor;
    for (let x = 0; x < size; x += step * 2) {
      ctx.fillRect(x, 0, step, size);
    }
    ctx.save();
    ctx.globalAlpha = 0.5;
    for (let y = 0; y < size; y += step * 2) {
      ctx.fillRect(0, y, size, step);
    }
    ctx.restore();
  } else if (patternType === 'buffalo') {
    // Bold 2-tone block check
    ctx.fillStyle = secondaryColor;
    for (let x = 0; x < size; x += step) {
      for (let y = 0; y < size; y += step) {
        if ((Math.floor(x / step) + Math.floor(y / step)) % 2 === 0) {
          ctx.fillRect(x, y, step, step);
        }
      }
    }
  } else if (patternType === 'windowpane') {
    // Minimalist thin grid
    ctx.strokeStyle = secondaryColor;
    ctx.lineWidth = Math.max(3, step * 0.08);
    for (let x = 0; x <= size; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, size);
      ctx.stroke();
    }
    for (let y = 0; y <= size; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(size, y);
      ctx.stroke();
    }
  } else if (patternType === 'madras') {
    // Multi-color yarn-dyed uneven stripes
    const stripes = [
      { color: secondaryColor, width: step * 0.75 },
      { color: accentColor, width: step * 0.25 },
      { color: primaryColor, width: step * 0.5 },
      { color: secondaryColor, width: step * 0.35 },
    ];
    let offset = 0;
    while (offset < size) {
      for (const s of stripes) {
        ctx.fillStyle = s.color;
        ctx.fillRect(offset, 0, s.width, size);
        offset += s.width;
        if (offset >= size) break;
      }
    }
    ctx.save();
    ctx.globalAlpha = 0.45;
    offset = 0;
    while (offset < size) {
      for (const s of stripes) {
        ctx.fillStyle = s.color;
        ctx.fillRect(0, offset, size, s.width);
        offset += s.width;
        if (offset >= size) break;
      }
    }
    ctx.restore();
  } else {
    // Default Tartan (Highland Classic)
    ctx.fillStyle = secondaryColor;
    for (let x = 0; x < size; x += step * 2) {
      ctx.fillRect(x, 0, step, size);
    }
    ctx.save();
    ctx.globalAlpha = 0.55;
    for (let y = 0; y < size; y += step * 2) {
      ctx.fillRect(0, y, size, step);
    }
    ctx.restore();

    // Accent fine pin-stripes
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = Math.max(2, step * 0.06);
    for (let x = step / 2; x < size; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, size);
      ctx.stroke();
    }
    for (let y = step / 2; y < size; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(size, y);
      ctx.stroke();
    }
  }

  // 2. Micro-fabric cloth twill weave grain simulation
  const imgData = ctx.getImageData(0, 0, size, size);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const pixelIndex = i / 4;
    const px = pixelIndex % size;
    const py = Math.floor(pixelIndex / size);
    // diagonal twill line noise
    const twill = (px + py) % 4 === 0 ? -12 : (px - py) % 4 === 0 ? 10 : 0;
    data[i] = Math.min(255, Math.max(0, data[i] + twill));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + twill));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + twill));
  }
  ctx.putImageData(imgData, 0, 0);

  return canvas;
};

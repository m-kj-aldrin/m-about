export interface SvgDownloadOptions {
  /** Scale factor relative to the SVG’s viewBox size. */
  scale?: number;

  /** Explicit output width. If set, height is derived from viewBox to keep aspect. */
  width?: number;

  /** Explicit output height. If set, width is derived from viewBox to keep aspect. */
  height?: number;

  fileName?: string;
  mimeType?: 'image/png' | 'image/jpeg' | 'image/webp';
  quality?: number;
  backgroundColor?: string;
}

/**
 * Get the file extension for a given MIME type.
 */
function getExtensionForMimeType(mimeType: string): string {
  const mimeToExt: Record<string, string> = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/webp': 'webp',
  };
  return mimeToExt[mimeType] || 'png';
}

/**
 * Take an SVG element, render it as an image at a given scale / size,
 * preserving the aspect ratio from its viewBox, and download it.
 */
export async function downloadSvgAsImage(
  svg: SVGSVGElement,
  options: SvgDownloadOptions = {}
): Promise<void> {
  const {
    scale,
    width: targetWidth,
    height: targetHeight,
    fileName: providedFileName,
    mimeType = 'image/png',
    quality,
    backgroundColor,
  } = options;

  // Derive filename from mimeType if not provided, or ensure extension matches mimeType
  const extension = getExtensionForMimeType(mimeType);
  let fileName: string;
  if (providedFileName) {
    // If fileName is provided, ensure its extension matches the mimeType
    const lastDot = providedFileName.lastIndexOf('.');
    if (lastDot >= 0) {
      fileName = providedFileName.slice(0, lastDot + 1) + extension;
    } else {
      fileName = providedFileName + '.' + extension;
    }
  } else {
    fileName = `image.${extension}`;
  }

  const vb = svg.viewBox.baseVal;
  if (!vb || vb.width === 0 || vb.height === 0) {
    throw new Error('SVG must have a non-empty viewBox (width/height > 0).');
  }

  const vbWidth = vb.width;
  const vbHeight = vb.height;
  const aspect = vbWidth / vbHeight;

  // Decide final pixel size
  let outWidth: number;
  let outHeight: number;

  if (typeof scale === 'number' && scale > 0) {
    outWidth = vbWidth * scale;
    outHeight = vbHeight * scale;
  } else if (targetWidth && targetHeight) {
    // Use width, adjust height to preserve aspect
    outWidth = targetWidth;
    outHeight = Math.round(targetWidth / aspect);
  } else if (targetWidth) {
    outWidth = targetWidth;
    outHeight = Math.round(targetWidth / aspect);
  } else if (targetHeight) {
    outHeight = targetHeight;
    outWidth = Math.round(targetHeight * aspect);
  } else {
    // Default: 1:1 with viewBox
    outWidth = vbWidth;
    outHeight = vbHeight;
  }

  // Clone SVG and set *intrinsic* pixel size, but keep the same viewBox
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
  clone.setAttribute('viewBox', `${vb.x} ${vb.y} ${vbWidth} ${vbHeight}`);
  clone.setAttribute('width', String(outWidth));
  clone.setAttribute('height', String(outHeight));

  const svgText = new XMLSerializer().serializeToString(clone);
  const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
  const svgUrl = URL.createObjectURL(svgBlob);

  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = svgUrl;
    });

    // At this point img.naturalWidth/Height should be outWidth/outHeight.
    const canvas = document.createElement('canvas');
    canvas.width = outWidth;
    canvas.height = outHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get 2D context.');

    if (backgroundColor) {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, outWidth, outHeight);
    }

    // No extra scaling: draw full image into full canvas
    ctx.drawImage(img, 0, 0, outWidth, outHeight);

    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob((b) => resolve(b), mimeType, quality)
    );
    if (!blob) throw new Error('Failed to create image blob.');

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } finally {
    URL.revokeObjectURL(svgUrl);
  }
}

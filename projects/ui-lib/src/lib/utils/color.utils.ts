export class ColorUtils {
  /**
   * Преобразует HEX в RGB
   */
  static hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    let cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(c => c + c).join('');
    }
    if (cleanHex.length !== 6) return null;

    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);

    return { r, g, b };
  }

  /**
   * Преобразует RGB в HEX
   */
  static rgbToHex(r: number, g: number, b: number): string {
    return (
      '#' +
      [r, g, b]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('')
        .toUpperCase()
    );
  }

  /**
   * Создание более светлого оттенка цвета
   * @param hex базовый цвет
   * @param amount 0-1 (0 = без изменения, 1 = белый)
   */
  static lighten(hex: string, amount: number): string {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return hex;

    const r = Math.round(rgb.r + (255 - rgb.r) * amount);
    const g = Math.round(rgb.g + (255 - rgb.g) * amount);
    const b = Math.round(rgb.b + (255 - rgb.b) * amount);

    return this.rgbToHex(r, g, b);
  }

  /**
   * Создание более тёмного оттенка цвета
   * @param hex базовый цвет
   * @param amount 0-1 (0 = без изменения, 1 = чёрный)
   */
  static darken(hex: string, amount: number): string {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return hex;

    const r = Math.round(rgb.r * (1 - amount));
    const g = Math.round(rgb.g * (1 - amount));
    const b = Math.round(rgb.b * (1 - amount));

    return this.rgbToHex(r, g, b);
  }

  /**
   * Возвращает контрастный цвет (чёрный или белый) для текста
   */
  static contrast(hex: string): '#000000' | '#FFFFFF' {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return '#000000';

    // стандартная формула яркости
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
  }

  /**
   * Создание палитры оттенков для цвета
   * @param hex базовый цвет
   * @param steps количество оттенков
   */
  static palette(hex: string, steps: number = 5): string[] {
    const palette: string[] = [];
    const stepAmount = 0.1;

    for (let i = steps; i > 0; i--) {
      palette.push(this.lighten(hex, stepAmount * i));
    }

    palette.push(hex);

    for (let i = 1; i <= steps; i++) {
      palette.push(this.darken(hex, stepAmount * i));
    }

    return palette;
  }
}

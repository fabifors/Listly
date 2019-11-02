export default class Color {
  constructor(hue, sat, lum, alpha) {
    this.hue = hue;
    this.saturation = sat;
    this.luminance = lum;
    this.alpha = alpha;
    this.hsla = `hsla(${this.hue}, ${this.saturation}, ${this.luminance}, ${this.alpha})`;
  }

  /* GETTERS */

  getHue () {
    return this.hue;
  }

  getSaturation () {
    return this.saturation;
  }

  getLuminance () {
    return this.luminance;
  }

  getAlpha () {
    return this.alpha;
  }

  getColor () {
    return this.hsla;
  }
  
  /* SETTERS */

  setHue (hue) {
    if (hue > 360) {
      throw Error("Can't set hue value over 360");
    }
    this.hue = hue;
  }

  setSaturation (sat) {
    if (sat > 100) {
      throw Error("Can't set saturation value over 100");
    } 
    this.saturation = sat;
  }

  setLuminance (lum) {
    if (lum > 100) {
      throw Error("Can't set luminance value over 100");
    } 
    this.saturation = lum;
  }

  /* FUNCTIONS */

  lighten (num) {
    return `hsla(${this.hue}, ${this.saturation}, ${this.luminance + num}, ${this.alpha})`;
  }

  darken (num) {
    return `hsla(${this.hue}, ${this.saturation}, ${this.luminance - num}, ${this.alpha})`;
  }

}
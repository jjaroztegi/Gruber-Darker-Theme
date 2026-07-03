class Color {
  constructor(r, g, b) {
    this.values = [r, g, b];
  }

  getRed() {
    return this.values[0];
  }

  toString() {
    return `rgb(${this.values.join(", ")})`;
  }
}

class ColorWithAlpha extends Color {
  constructor(r, g, b, a) {
    super(r, g, b);
    this.alpha = a;
  }

  toString() {
    return `rgba(${this.values.join(", ")}, ${this.alpha})`;
  }
}

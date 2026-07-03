class Point {
  x = 0;
  y = 0;

  move(x: number, y: number): void {
    this.x += x;
    this.y += y;
  }

  scale(n: number): void {
    this.x *= n;
    this.y *= n;
  }
}

const point = new Point();
point.x = 2;
point.y = 3;
point.move(1, -1);
point.scale(2);

console.log(`${point.x}, ${point.y}`);

import type { Point } from './Point';

export class Matrix {
  public readonly matrix = new Float32Array(9);

  public set(
    m00: number,
    m10: number,
    m20: number,
    m01: number,
    m11: number,
    m21: number,
    m02 = 0,
    m12 = 0,
    m22 = 1
  ) {
    const m = this.matrix;

    m[0] = m00;
    m[1] = m10;
    m[2] = m20;
    m[3] = m01;
    m[4] = m11;
    m[5] = m21;
    m[6] = m02;
    m[7] = m12;
    m[8] = m22;

    return this;
  }

  public setIdentity() {
    this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);

    return this;
  }

  public scale(x: number, y = x) {
    const m = this.matrix;

    m[0] *= x;
    m[1] *= x;
    m[3] *= y;
    m[4] *= y;

    return this;
  }

  public scaleV(v: Point) {
    return this.scale(v.x, v.y);
  }

  public rotate(rad: number) {
    const m = this.matrix;
    const m00 = m[0];
    const m01 = m[1];
    const m02 = m[2];
    const m10 = m[3];
    const m11 = m[4];
    const m12 = m[5];
    const s = Math.sin(rad);
    const c = Math.cos(rad);

    m[0] = c * m00 + s * m10;
    m[1] = c * m01 + s * m11;
    m[2] = c * m02 + s * m12;
    m[3] = c * m10 - s * m00;
    m[4] = c * m11 - s * m01;
    m[5] = c * m12 - s * m02;

    return this;
  }

  public translate(v: Point) {
    const m = this.matrix;
    const m00 = m[0];
    const m01 = m[1];
    const m02 = m[2];
    const m10 = m[3];
    const m11 = m[4];
    const m12 = m[5];
    const m20 = m[6];
    const m21 = m[7];
    const m22 = m[8];
    const x = v.x;
    const y = v.y;

    m[0] = m00;
    m[1] = m01;
    m[2] = m02;
    m[3] = m10;
    m[4] = m11;
    m[5] = m12;
    m[6] = x * m00 + y * m10 + m20;
    m[7] = x * m01 + y * m11 + m21;
    m[8] = x * m02 + y * m12 + m22;

    return this;
  }

  public clone() {
    const m = this.matrix;

    return new Matrix().set(
      m[0],
      m[1],
      m[2],
      m[3],
      m[4],
      m[5],
      m[6],
      m[7],
      m[8]
    );
  }
}

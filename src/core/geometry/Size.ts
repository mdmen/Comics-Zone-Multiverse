export class Size {
  constructor(public width = 0, public height = 0) {}

  public set(width: number, height = width) {
    this.width = width;
    this.height = height;

    return this;
  }

  public copy(size: Size) {
    this.width = size.width;
    this.height = size.height;

    return this;
  }

  public scale(kw: number, kh = kw) {
    this.width *= kw;
    this.height *= kh;

    return this;
  }

  public setWidth(width: number) {
    this.width = width;

    return this;
  }

  public setHeight(height: number) {
    this.height = height;

    return this;
  }

  public clone() {
    return new Size(this.width, this.height);
  }

  public isEqual(size: Size) {
    return this.width === size.width && this.height === size.height;
  }
}

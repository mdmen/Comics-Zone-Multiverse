import { Vector } from '../../geometries';
import { Settings } from '../../Settings';
import { type Camera } from '../Camera';
import { type Drawable } from '../Drawable';
import { type Picture } from '../Picture';

export interface LayerOptions {
  container: HTMLElement;
  className?: string;
  width?: number;
  height?: number;
  camera?: Camera | null;
}

export abstract class Layer {
  protected node;
  protected width;
  protected height;
  protected camera;
  private prevPosition = new Vector();

  constructor({
    container,
    camera = null,
    className,
    width = Settings.get('width'),
    height = Settings.get('height'),
  }: LayerOptions) {
    this.width = width;
    this.height = height;
    this.camera = camera;
    this.node = this.create(className);

    container.appendChild(this.node);
  }

  private create(className?: string) {
    const node = this.createNode();

    !className && (node.style.position = 'relative');
    !!className && node.classList.add(className);
    node.style.width = `${Math.floor(this.width)}px`;
    node.style.height = `${Math.floor(this.height)}px`;
    node.style.overflow = 'hidden';

    if (!Settings.get('antialiasing')) {
      node.style.imageRendering = 'pixelated';
      node.style.textRendering = 'optimizeSpeed';
    }

    return node;
  }

  protected shouldDraw(drawable: Drawable) {
    return !this.camera || this.camera.isCollidingWith(drawable);
  }

  shouldSyncWithCamera() {
    if (!this.camera) return false;

    const cameraPosition = this.camera.getPosition();

    return !cameraPosition.isEqualTo(this.prevPosition);
  }

  updatePrevPosition() {
    const cameraPosition = (this.camera as Camera).getPosition();
    this.prevPosition.copy(cameraPosition);
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  destroy() {
    this.node.remove();
    this.node = null as unknown as HTMLElement;
    this.camera = null as unknown as Camera;
  }

  protected abstract createNode(): HTMLElement;

  abstract syncWithCamera(): void;

  abstract getNode(): HTMLElement;

  abstract drawImage(image: Picture): void;

  abstract drawRect(drawable: Drawable): void;

  abstract clear(): void;
}

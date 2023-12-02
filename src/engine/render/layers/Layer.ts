import { Vector } from '../../geometries';
import { Settings } from '../../Settings';
import type { Camera } from '../Camera';
import { Drawable } from '../Drawable';
import type { Picture } from '../Picture';
import { Node } from '../nodes/Node';
import { type Rect } from '../Rect';
import { type SpriteText } from '../sprites';

export interface LayerOptions {
  container: HTMLElement;
  width?: number;
  height?: number;
  camera?: Camera | null;
}

export abstract class Layer extends Node {
  private readonly container;
  protected readonly node;
  protected readonly width;
  protected readonly height;
  protected camera;
  private readonly prevPosition = new Vector();

  constructor({
    container,
    camera = null,
    width = Settings.get('canvasWidth'),
    height = Settings.get('canvasHeight'),
  }: LayerOptions) {
    super();

    this.width = width;
    this.height = height;
    this.camera = camera;
    this.container = container;

    this.node = this.create();
    this.setup();
    this.mount();
  }

  private setup() {
    this.node.classList.add(Settings.get('canvasClassName'));
    this.node.style.width = `${Math.floor(this.width)}px`;
    this.node.style.height = `${Math.floor(this.height)}px`;

    if (!Settings.get('antialiasing')) {
      this.node.style.imageRendering = 'pixelated';
      this.node.style.textRendering = 'optimizeSpeed';
    }
  }

  private mount() {
    this.container.appendChild(this.node);
  }

  protected shouldDraw(drawable: Drawable): boolean {
    return !this.camera || this.camera.isCollidingWith(drawable);
  }

  private shouldSyncWithCamera(): boolean {
    if (!this.camera) return false;

    const cameraPosition = this.camera.getPosition();

    return !cameraPosition.isEqualTo(this.prevPosition);
  }

  private updatePrevPosition() {
    const cameraPosition = (this.camera as Camera).getPosition();
    this.prevPosition.copy(cameraPosition);
  }

  preDraw() {
    if (!this.shouldSyncWithCamera()) return;

    this.syncWithCamera();
    this.updatePrevPosition();
  }

  setCamera(camera: Camera) {
    this.camera = camera;
  }

  unsetCamera() {
    this.camera = null;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  protected abstract create(): HTMLElement;

  protected abstract syncWithCamera(): void;

  abstract drawImage(drawable: Picture | SpriteText): void;

  abstract postDraw(): void;

  abstract drawRect(rect: Rect): void;

  abstract clear(): void;
}

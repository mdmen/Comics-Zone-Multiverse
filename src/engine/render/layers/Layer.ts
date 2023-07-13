import { Vector } from '../../math';
import { Settings } from '../../Settings';
import type { Camera } from '../Camera';
import type { Image } from '../Image';
import { Node } from '../nodes/Node';
import { type RectShape } from '../RectShape';
import { type Updatable } from '../Updatable';

export interface LayerOptions {
  container: HTMLElement;
  width?: number;
  height?: number;
  camera?: Camera;
}

export abstract class Layer extends Node {
  private readonly container;
  protected readonly camera;
  protected readonly node;
  protected readonly width;
  protected readonly height;
  private readonly prevPosition = new Vector();

  constructor({
    container,
    camera,
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

  private setup(): void {
    this.node.classList.add(Settings.get('canvasClassName'));
    this.node.style.width = `${Math.floor(this.width)}px`;
    this.node.style.height = `${Math.floor(this.height)}px`;

    if (!Settings.get('antialiasing')) {
      this.node.style.imageRendering = 'pixelated';
      this.node.style.textRendering = 'optimizeSpeed';
    }
  }

  private mount(): void {
    this.container.appendChild(this.node);
  }

  protected shouldDraw(updatable: Updatable): boolean {
    if (!updatable.isVisible()) return false;

    return !this.camera || this.camera.isCollidingWith(updatable);
  }

  private shouldSyncWithCamera(): boolean {
    if (!this.camera) return false;

    const cameraPosition = this.camera.getPosition();

    return !cameraPosition.isEqualTo(this.prevPosition);
  }

  private updatePrevPosition(): void {
    const cameraPosition = (this.camera as Camera).getPosition();
    this.prevPosition.copy(cameraPosition);
  }

  public preDraw(): void {
    if (!this.shouldSyncWithCamera()) return;

    this.syncWithCamera();
    this.updatePrevPosition();
  }

  protected abstract create(): HTMLElement;

  protected abstract syncWithCamera(): void;

  public abstract drawImage(drawable: Image): void;

  public abstract postDraw(): void;

  public abstract drawRect(rect: RectShape): void;
}

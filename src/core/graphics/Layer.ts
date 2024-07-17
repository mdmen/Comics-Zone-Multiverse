import { Vector } from '../geometry';
import { Settings } from '../Settings';
import type { Camera } from '../Camera';
import type { Drawable } from './Drawable';

import './layer.css';

interface LayerOptions {
  container: HTMLElement;
  width: number;
  height: number;
  camera?: Camera;
  className?: string;
}

export abstract class Layer {
  protected readonly settings = Settings.getInstance();
  public readonly element;
  public readonly width;
  public readonly height;
  public readonly camera;
  private readonly prevPosition = new Vector();

  constructor({ container, camera, className, width, height }: LayerOptions) {
    this.width = Math.floor(width);
    this.height = Math.floor(height);
    this.camera = camera;

    const element = this.create();
    element.style.setProperty('--layer-width', `${this.width}px`);
    element.style.setProperty('--layer-height', `${this.height}px`);

    if (className) {
      element.classList.add(className);
    }

    if (!this.settings.isAntialiasing()) {
      element.classList.add('layer-pixelated');
    }

    this.element = element;
    container.appendChild(element);
  }

  protected isOnCamera(drawable: Drawable) {
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

  public destroy() {
    this.element.remove();
  }

  protected abstract create(): HTMLElement;

  abstract syncWithCamera(): void;

  abstract draw(drawable: Drawable): void;

  abstract clear(): void;
}

import { Vector } from '../../geometry';
import { Settings } from '../../Settings';
import { HTMLLayer } from '../layers';
import type { Drawable } from '../Drawable';

import './html-node.css';

export abstract class HTMLNode {
  protected readonly element;
  protected readonly settings = Settings.getInstance();
  protected readonly position = new Vector();
  protected opacity = 1;
  protected rotation = 0;
  protected scale = 1;
  protected debug = false;
  protected visible = true;
  protected zIndex = 0;
  protected mounted = false;
  protected flipped = false;

  constructor(protected readonly drawable: Drawable) {
    this.element = document.createElement('div');
    this.element.classList.add('node');

    this.syncPosition();

    const visible = this.drawable.isFullyVisible();
    this.syncVisibility(visible);

    const opacity = this.drawable.getFullOpacity();
    this.syncOpacity(opacity);

    this.syncRotation();
    this.syncScale();
    this.syncDebugBox();
    this.syncZIndex();
  }

  public mount() {
    if (this.mounted) return;

    const layer = this.drawable.layer as HTMLLayer;
    layer.innerElement.appendChild(this.element);
    this.mounted = true;
  }

  public unmount() {
    if (!this.mounted) return;

    this.element.remove();
    this.mounted = false;
  }

  public isMounted() {
    return this.mounted;
  }

  public update() {
    const visible = this.drawable.isFullyVisible();
    if (this.visible !== visible) {
      this.syncVisibility(visible);

      if (!visible) return;
    }

    const opacity = this.drawable.getFullOpacity();
    if (this.opacity !== opacity) {
      this.syncOpacity(opacity);

      if (opacity === 0) return;
    }

    const position = this.drawable.getFullPosition();
    this.position.x !== position.x && this.syncPositionX(position.x);
    this.position.y !== position.y && this.syncPositionY(position.y);

    this.rotation !== this.drawable.rotation && this.syncRotation();
    this.scale !== this.drawable.scale && this.syncScale();
    this.zIndex !== this.drawable.zIndex && this.syncZIndex();
    this.debug !== this.settings.isDebug() && this.syncDebugBox();
  }

  public syncVisibility(visible: boolean) {
    this.visible = visible;

    this.element.style.setProperty(
      '--node-display',
      `${visible ? 'block' : 'none'}`
    );
  }

  public syncOpacity(opacity: number) {
    this.opacity = opacity;

    this.element.style.setProperty('--node-opacity', `${opacity}`);
  }

  public syncRotation() {
    this.rotation = this.drawable.rotation;

    this.element.style.setProperty('--node-rotation', `${this.rotation}deg`);
  }

  public syncPosition() {
    const position = this.drawable.getFullPosition();

    this.syncPositionX(position.x);
    this.syncPositionY(position.y);
  }

  public syncPositionX(n: number) {
    this.position.setX(n);

    this.element.style.setProperty('--node-pos-x', `${n | 0}px`);
  }

  public syncPositionY(n: number) {
    this.position.setY(n);

    this.element.style.setProperty('--node-pos-y', `${n | 0}px`);
  }

  public syncScale() {
    this.scale = this.drawable.scale;

    const scaleX = this.flipped ? -this.scale : this.scale;
    this.element.style.setProperty('--node-scale-x', `${scaleX}`);
    this.element.style.setProperty('--node-scale-y', `${this.scale}`);
  }

  public syncZIndex() {
    this.zIndex = this.drawable.zIndex;

    this.element.style.setProperty('--node-z-index', `${this.zIndex}`);
  }

  public syncDebugBox() {
    this.debug = this.settings.isDebug();

    this.element.style.setProperty(
      '--node-outline',
      this.debug ? '1px solid red' : 'none'
    );
  }

  public destroy() {
    this.unmount();
  }
}

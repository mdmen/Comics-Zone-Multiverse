import { Vector } from '../../geometry';
import { HTMLLayer } from './HTMLLayer';
import { HTMLCustomElement } from './HTMLCustomElement';
import type { Entity } from '../../entities';
import type { Drawable } from '../Drawable';

type DrawableEntity = Entity & { drawable: Drawable };

export abstract class HTMLNode<T extends DrawableEntity = DrawableEntity> {
  protected readonly element;
  protected readonly position = new Vector();
  protected opacity = 1;
  protected scale = 1;
  protected debug = false;
  protected visible = true;
  protected zIndex = 0;
  protected mounted = false;
  protected flipped = false;
  protected shouldUpdate = false;

  public static readonly TAG_NAME = 'g-node';

  static {
    HTMLCustomElement.define(HTMLNode.TAG_NAME);
  }

  constructor(protected readonly entity: T) {
    this.element = document.createElement(HTMLNode.TAG_NAME);
    this.element.classList.add('node');

    this.syncPosition();

    const visible = this.entity.drawable.isGloballyVisible();
    this.syncVisibility(visible);

    const opacity = this.entity.drawable.getGlobalOpacity();
    this.syncOpacity(opacity);

    const zIndex = this.entity.drawable.getGlobalZIndex();
    this.syncZIndex(zIndex);

    this.syncScale();
    this.syncDebugBox();
  }

  public mount() {
    if (this.mounted) return;

    const layer = this.entity.drawable.layer as HTMLLayer;
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
    const visible = this.entity.drawable.isGloballyVisible();
    if (this.visible !== visible) {
      this.syncVisibility(visible);

      if (!visible) {
        this.shouldUpdate = false;
        return;
      }

      this.shouldUpdate = true;
    }

    const opacity = this.entity.drawable.getGlobalOpacity();
    if (this.opacity !== opacity) {
      this.syncOpacity(opacity);

      if (opacity === 0) {
        this.shouldUpdate = false;
        return;
      }

      this.shouldUpdate = true;
    }

    const position = this.entity.globalPosition;
    if (this.position.x !== position.x) {
      this.syncPositionX(position.x);
    }
    if (this.position.y !== position.y) {
      this.syncPositionY(position.y);
    }

    const zIndex = this.entity.drawable.getGlobalZIndex();
    if (this.zIndex !== zIndex) {
      this.syncZIndex(zIndex);
    }

    if (this.scale !== this.entity.scale) {
      this.syncScale();
    }

    if (this.debug !== this.entity.drawable.debug) {
      this.syncDebugBox();
    }
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

  public syncPosition() {
    const position = this.entity.globalPosition;

    this.syncPositionX(position.x);
    this.syncPositionY(position.y);
  }

  public syncPositionX(n: number) {
    this.position.x = n;

    this.element.style.setProperty('--node-pos-x', `${n | 0}px`);
  }

  public syncPositionY(n: number) {
    this.position.y = n;

    this.element.style.setProperty('--node-pos-y', `${n | 0}px`);
  }

  public syncScale() {
    this.scale = this.entity.scale;

    const scaleX = this.flipped ? -this.scale : this.scale;
    this.element.style.setProperty('--node-scale-x', `${scaleX}`);
    this.element.style.setProperty('--node-scale-y', `${this.scale}`);
  }

  public syncZIndex(zIndex: number) {
    this.zIndex = zIndex;

    this.element.style.setProperty('--node-z-index', `${zIndex}`);
  }

  public syncDebugBox() {
    this.debug = this.entity.drawable.debug;

    this.element.style.setProperty(
      '--node-outline',
      this.debug ? '1px solid red' : 'none'
    );
  }

  public destroy() {
    this.unmount();
  }
}

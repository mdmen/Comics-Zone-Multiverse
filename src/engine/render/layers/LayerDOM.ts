import { Settings } from '../../Settings';
import { Layer } from './Layer';
import { type Image } from '../Image';
import { type RectShape } from '../RectShape';
import { type SpriteText } from '../sprites';
import { Drawable } from '../Drawable';

export class LayerDOM extends Layer {
  private subnode!: HTMLDivElement;

  protected create(): HTMLDivElement {
    const layer = document.createElement('div');
    layer.style.overflow = 'hidden';

    this.subnode = this.createSubLayer();
    layer.appendChild(this.subnode);

    return layer;
  }

  private createSubLayer(): HTMLDivElement {
    const layer = document.createElement('div');
    const className = Settings.get('canvasSubLayerClassName');

    layer.classList.add(className);
    layer.style.position = 'absolute';
    layer.style.transform = 'translate3d(0, 0, 0)';
    layer.style.minWidth = '100%';
    layer.style.top = '0';
    layer.style.left = '0';

    return layer;
  }

  protected syncWithCamera(): void {
    const position = this.camera!.getPosition();
    const posX = -Math.floor(position.x);
    const posY = -Math.floor(position.y);

    this.subnode.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
  }

  public drawImage(image: Image | SpriteText): void {
    const node = image.getDomNode();

    if (!node) throw Error('There is no Node within Image');
    if (!this.shouldDraw(image)) return;

    const domNode = node.getNode();
    this.setCommonProps(domNode, image);

    const source = image.getSource();
    domNode.style.backgroundPosition = `${-source.x}px ${-source.y}px`;
  }

  public drawRect(shape: RectShape): void {
    const node = shape.getDomNode();

    if (!node) throw Error('There is no Node within Shape');
    if (!this.shouldDraw(shape)) return;

    const domNode = node.getNode();
    this.setCommonProps(domNode, shape);

    domNode.style.backgroundColor = shape.getColor();
  }

  private setCommonProps(node: HTMLElement, drawable: Drawable): void {
    const visible = drawable.isVisible();

    node.hidden = !visible;

    if (!visible) return;

    const position = drawable.getOffsetPosition();
    const posX = position.x | 0;
    const posY = position.y | 0;
    const width = drawable.getWidth();
    const height = drawable.getHeight();
    const opacity = drawable.getOpacity();

    node.style.opacity = `${opacity}`;
    node.style.width = `${width | 0}px`;
    node.style.height = `${height | 0}px`;
    node.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
  }

  public postDraw(): void {
    return;
  }

  public getSubnode(): HTMLDivElement {
    return this.subnode;
  }

  public clear(): void {}
}

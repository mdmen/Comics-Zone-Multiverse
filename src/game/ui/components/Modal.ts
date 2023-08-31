import { createHiddenLabel } from '@/game/helpers';
import { generateUniqueId } from '@/engine';
import { type NodeContent, Node } from './Node';

interface Options {
  container: HTMLElement;
  heading: string;
  content: NodeContent;
}

export class Modal extends Node {
  private heading;
  private content;
  private readonly headingId;

  constructor({ container, heading, content }: Options) {
    super();

    this.heading = heading;
    this.content = content;
    this.headingId = generateUniqueId();

    this.node = this.create();

    container.append(this.node);

    this.bindClose();
  }

  protected create(): HTMLElement {
    const overlay = this.createOverlay();
    const modal = this.createModal();
    overlay.append(modal);

    return overlay;
  }

  private createOverlay(): HTMLElement {
    const overlay = document.createElement('div');

    overlay.classList.add('modal-overlay', 'hidden');

    return overlay;
  }

  private createModal(): HTMLElement {
    const modal = document.createElement('div');

    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', this.headingId);
    modal.setAttribute('aria-modal', 'true');
    modal.classList.add('modal');

    modal.append(this.createHeading());
    modal.append(this.createContent());
    modal.append(this.createCloseButton());

    return modal;
  }

  private createHeading(): HTMLElement {
    const heading = document.createElement('h2');

    heading.classList.add('modal-caption');
    heading.setAttribute('id', this.headingId);
    heading.append(this.heading);

    return heading;
  }

  private createContent(): HTMLElement {
    const content = document.createElement('div');

    content.classList.add('modal-content');
    const text =
      this.content instanceof Node ? this.content.getNode() : this.content;
    content.append(text);

    return content;
  }

  private createCloseButton(): HTMLElement {
    const button = document.createElement('button');

    button.setAttribute('type', 'button');
    button.append(createHiddenLabel('Close modal'));
    button.append('X');
    button.classList.add('modal-close');

    button.addEventListener('click', () => {
      this.hide();
    });

    return button;
  }

  private bindClose(): void {
    window.addEventListener('keydown', ({ code }) => {
      if (code === 'Escape') {
        this.hide();
      }
    });

    this.node.addEventListener('click', ({ target }) => {
      if (target && !(target as HTMLElement).closest('.modal')) {
        this.hide();
      }
    });
  }

  public hide(): void {
    this.node.classList.add('hidden');
  }

  public show(): void {
    this.node.classList.remove('hidden');
  }
}

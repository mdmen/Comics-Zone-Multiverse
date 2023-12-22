import { type NodeContent, Node } from './Node';

interface Options {
  container: HTMLElement;
  heading: string;
  content: NodeContent;
  classNames?: string[];
}

export class Modal extends Node {
  private heading;
  private content;
  private container;

  constructor({ container, classNames = [], heading, content }: Options) {
    super();

    this.heading = heading;
    this.content = content;
    this.container = container;

    this.node = this.create(classNames);

    this.bindClose();
  }

  protected create(classNames: string[]) {
    const overlay = this.createOverlay();
    const modal = this.createModal(classNames);

    overlay.append(modal);

    return overlay;
  }

  private createOverlay() {
    const overlay = document.createElement('div');

    overlay.classList.add('modal-overlay');

    return overlay;
  }

  private createModal(classNames: string[]) {
    const modal = document.createElement('div');

    modal.classList.add('modal', 'hidden', ...classNames);

    modal.append(this.createHeading());
    modal.append(this.createContent());
    modal.append(this.createCloseButton());

    return modal;
  }

  private createHeading() {
    const heading = document.createElement('h2');

    heading.classList.add('modal-caption');
    heading.append(this.heading);

    return heading;
  }

  private createContent() {
    const content = document.createElement('div');

    content.classList.add('modal-content');
    Node.setContent(content, this.content);

    return content;
  }

  private createCloseButton() {
    const button = document.createElement('button');

    button.setAttribute('type', 'button');
    button.append('X');
    button.classList.add('modal-close');

    button.addEventListener('click', () => {
      this.hide();
    });

    return button;
  }

  private bindClose() {
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

  hide() {
    this.node.querySelector('.modal')?.classList.add('hidden');

    setTimeout(() => {
      this.container.removeChild(this.node);
    }, 300);
  }

  show() {
    this.container.append(this.node);

    setTimeout(() => {
      this.node.querySelector('.modal')?.classList.remove('hidden');
    });
  }
}

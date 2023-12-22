import { Node } from './Node';

interface RadioItem {
  label: string;
  value: string;
  disabled?: boolean;
}

interface RadioOptions {
  name: string;
  items: RadioItem[];
  title?: string;
  value?: string;
  classNames?: string[];
  onChange?(radio: RadioGroup): void;
}

export class RadioGroup extends Node {
  private value;

  constructor({
    value = '',
    title,
    classNames = [],
    name,
    items,
    onChange = () => {},
  }: RadioOptions) {
    super();

    this.value = value;
    this.node = this.create(items, name, onChange, title);
    this.addClassNames(...classNames);
  }

  protected create(
    items: RadioItem[],
    name: string,
    onChange: (radio: RadioGroup) => void,
    title?: string
  ) {
    const node = document.createElement('fieldset');
    node.classList.add('radio-group');

    if (title) {
      const legend = document.createElement('legend');
      legend.classList.add('radio-group-title');
      legend.textContent = title;
      node.append(legend);
    }

    const container = document.createElement('div');
    container.classList.add('radio-group-items');

    items.forEach((item) => {
      const radio = this.createItem(name, item, onChange);
      container.append(radio);
    });

    node.append(container);

    return node;
  }

  private createItem(
    name: string,
    { value, label, disabled }: RadioItem,
    onChange: (radio: RadioGroup) => void
  ) {
    const node = document.createElement('label');
    node.classList.add('radio-group-item');

    const input = document.createElement('input');
    input.classList.add('radio-group-item-input', 'visually-hidden');
    input.type = 'radio';
    input.name = name;
    input.value = value;

    if (disabled) {
      node.classList.add('disabled');
      input.setAttribute('disabled', 'disabled');
    }

    if (this.value === value) {
      input.setAttribute('checked', 'checked');
    }

    input.addEventListener('change', () => {
      this.value = value;
      onChange(this);
    });

    node.append(input);

    const icon = document.createElement('div');
    icon.classList.add('radio-group-item-icon');
    node.append(icon);

    const text = document.createElement('span');
    text.classList.add('radio-group-item-label');
    text.textContent = label;
    node.append(text);

    return node;
  }

  getValue() {
    return this.value;
  }
}

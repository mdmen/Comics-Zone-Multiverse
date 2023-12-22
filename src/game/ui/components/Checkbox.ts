import { Node } from './Node';

interface Options {
  onChange(checkbox: Checkbox): void;
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  classNames?: string[];
}

export class Checkbox extends Node {
  private checked = false;

  constructor({
    checked = false,
    label = '',
    disabled = false,
    classNames = [],
    onChange = () => {},
  }: Options) {
    super();

    this.checked = checked;
    this.node = this.create(label, onChange, checked, disabled);
    this.addClassNames(...classNames);
  }

  protected create(
    label: string,
    onChange: (checkbox: Checkbox) => void,
    checked: boolean,
    disabled: boolean
  ) {
    const node = document.createElement('label');
    node.classList.add('checkbox');

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.classList.add('visually-hidden');
    checked && input.setAttribute('checked', 'checked');

    if (disabled) {
      node.classList.add('disabled');
      input.setAttribute('disabled', 'disabled');
    }

    input.addEventListener('change', () => {
      this.checked = !this.checked;
      onChange(this);
    });

    node.append(input);

    const icon = this.createIcon();
    node.append(icon);

    if (label) {
      const text = document.createElement('span');
      text.classList.add('checkbox-label');
      text.append(label);
      node.append(text);
    }

    return node;
  }

  private createIcon() {
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('viewBox', '0 0 40 40');
    icon.innerHTML = `
    <rect class="checkbox-icon-bg" x="5" y="5" width="30" height="30" rx="3"/>
    <path class="checkbox-icon-check" d="M7 22l10 8 18-26" pathLength="1" />`;

    icon.ariaHidden = 'true';
    icon.classList.add('checkbox-icon');

    return icon;
  }

  isChecked() {
    return this.checked;
  }
}

import { Text, type TextOptions } from '@/core';

export class BaseText extends Text {
  constructor(options: TextOptions) {
    super({
      ...options,
      text: options.text.toUpperCase(),
    });
  }

  async setText(text: string) {
    await super.setText(text.toUpperCase());
  }
}

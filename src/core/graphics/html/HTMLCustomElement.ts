export class HTMLCustomElement extends HTMLElement {
  public static define(tagName: string) {
    if (!customElements.get(tagName)) {
      customElements.define(tagName, this);
    }
  }
}

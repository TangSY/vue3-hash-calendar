/* eslint-disable max-classes-per-file */
declare module '@vue/test-utils' {
  // eslint-disable-next-line
  export class DOMWrapper<ElementType extends Element> {
    style: CSSStyleDeclaration;
  }

  // eslint-disable-next-line
  class VueWrapper {
    style: CSSStyleDeclaration;
  }
}

import { createElement } from '../render.js';

export default class BaseView {
  getTemplate() {
    return this.createTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element.remove();
    this.element = null;
  }

  createTemplate() {
    throw new Error('Method createTemplate must be defined');
  }

  addListener(selector, eventType, func) {
    const element = selector
      ? this.getElement().querySelector(selector)
      : this.getElement();
    element.addEventListener(eventType, func);
  }

  removeListener(selector, eventType, func) {
    const element = selector
      ? this.getElement().querySelector(selector)
      : this.getElement();
    element.removeEventListener(eventType, func);
  }
}

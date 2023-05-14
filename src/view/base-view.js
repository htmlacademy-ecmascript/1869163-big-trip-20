import { createElement } from '../render.js';

export default class BaseView {
  listeners = [];

  get template() {
    return this.createTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.template);
    }

    return this.element;
  }

  removeElement() {
    this.listeners.forEach(({ selector, eventType, func }) =>
      this.removeListener(selector, eventType, func)
    );
    this.listeners = [];

    this.element.remove();
    this.element = null;
  }

  createTemplate() {
    throw new Error('Method createTemplate must be defined');
  }

  addListener(selector, eventType, func) {
    this.listeners.push({ selector, eventType, func });
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

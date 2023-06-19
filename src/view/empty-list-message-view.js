import AbstractView from '../framework/view/abstract-view';

export default class EmptyListMessageView extends AbstractView {
  constructor(message) {
    super();
    this.message = message;
  }

  get template() {
    return `
        <p class="trip-events__msg">${this.message}</p>
        `;
  }
}

import AbstractView from '../framework/view/abstract-view.js';

const emptyListText = {
  'filter-everything': 'Click New Event to create your first point',
  'filter-past': 'There are no past events now',
  'filter-present': 'There are no present events now',
  'filter-future': 'There are no future events now',
};

export default class NoPointsView extends AbstractView {
  constructor(text) {
    super();
    this.text = text;
  }

  get template() {
    return `
    <p class="trip-events__msg">${this.text}</p>;
    `;
  }
}

export { emptyListText };

import BaseView from './base-view.js';

const emptyListText = {
  'filter-everything': 'Click New Event to create your first point',
  'filter-past': 'There are no past events now',
  'filter-present': 'There are no present events now',
  'filter-future': 'There are no future events now',
};

export default class NoPointsView extends BaseView {
  constructor(text) {
    super();
    this.text = text;
  }

  createTemplate() {
    return `
    <p class="trip-events__msg">${this.text}</p>;
    `;
  }
}

export { emptyListText };

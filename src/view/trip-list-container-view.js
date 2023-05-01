import BaseView from './base-view';

export default class TripListContainerView extends BaseView {
  createTemplate() {
    return `
        <ul class="trip-events__list"></ul>
        `;
  }
}

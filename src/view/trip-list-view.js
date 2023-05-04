import { render } from '../render';
import TripListContainerView from './trip-list-container-view';
import TripListItemView from './trip-list-item-view';

export default class TripListView {
  constructor(listData) {
    this.listData = listData;
    this.element = new TripListContainerView().getElement();

    this.listData.forEach(({ type, city }) => {
      render(new TripListItemView(type, city), this.element);
    });
  }

  getElement() {
    return this.element;
  }
}

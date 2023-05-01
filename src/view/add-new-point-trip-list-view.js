import { render } from '../render';
import TripListContainerView from './trip-list-container-view';
import TripListItemView from './trip-list-item-view';
import NewPointView from './new-point-view';

export default class AddNewPointTripListView {
  constructor(listData) {
    this.listData = listData;
    this.tripListContainer = new TripListContainerView().getElement();

    render(new NewPointView(), this.tripListContainer);

    this.listData.forEach(({ type, city }) => {
      render(new TripListItemView(type, city), this.tripListContainer);
    });
  }

  getElement() {
    return this.tripListContainer;
  }

  removeElement() {
    this.tripListContainer.remove();
  }
}

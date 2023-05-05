import { render } from '../render';
import BaseView from './base-view';
import TripListContainerView from './trip-list-container-view';
import TripListItemOpenedView from './trip-list-item-opened-view';
import TripListItemView from './trip-list-item-view';

export default class TripListView extends BaseView {
  constructor(listData, modelUpdateCallBack) {
    super();
    this.element = new TripListContainerView().getElement();
    this.modelUpdateCallBack = modelUpdateCallBack;

    listData?.forEach((pointCard) => {
      const listItem = new TripListItemView(pointCard);

      listItem.addListener('.event__rollup-btn', 'click', () =>
        this.modelUpdateCallBack(pointCard.id, true)
      );

      const listItemOpened = new TripListItemOpenedView(pointCard);

      listItemOpened.addListener('.event__reset-btn', 'click', () =>
        this.modelUpdateCallBack(pointCard.id, false)
      );

      render(pointCard.isOpen ? listItemOpened : listItem, this.element);
    });
  }

  getElement() {
    return this.element;
  }
}

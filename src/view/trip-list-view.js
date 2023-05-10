import { render } from '../render';
import { isEscapeKey } from '../utils';
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

      const closeOpenedCard = () => {
        this.modelUpdateCallBack(pointCard.id, false);
        document.removeEventListener('keydown', onDocumentKeydown);
      };

      function onDocumentKeydown(evt) {
        if (isEscapeKey(evt)) {
          evt.preventDefault();
          closeOpenedCard();
        }
      }

      const onRollupBtnClick = () => {
        this.modelUpdateCallBack(pointCard.id, true);
        document.addEventListener('keydown', onDocumentKeydown);
      };

      const onResetBtnClick = closeOpenedCard;

      listItem.addListener('.event__rollup-btn', 'click', onRollupBtnClick);

      const listItemOpened = new TripListItemOpenedView(pointCard);

      listItemOpened.addListener('.event__reset-btn', 'click', onResetBtnClick);

      render(pointCard.isOpen ? listItemOpened : listItem, this.element);
    });
  }

  getElement() {
    return this.element;
  }
}

import { EventType } from '../const';
import { remove, render, RenderPosition, replace } from '../framework/render';
import TripListItemOpenedView from '../view/trip-list-item-opened-view';
import TripListItemView from '../view/trip-list-item-view';
import TripListView from '../view/trip-list-view';

export default class PointPresenter {
  constructor(
    headerAddNewPointButton,
    pointCardsModel,
    filterModel,
    sortModel
  ) {
    this.pointCardContainer = new TripListView();
    this.headerAddNewPointButton = headerAddNewPointButton;
    this.pointCardsModel = pointCardsModel;

    this.pointComponents = [];
    this.openedPointComponent = null;
    this.openedPoint = null;
    this.temporaryPoint = null;

    [filterModel, sortModel].forEach((model) =>
      model.addObserver(() => this.#setIsNewEventButtonDisabled(false))
    );

    pointCardsModel.addObserver((eventType) => {
      if (eventType === EventType.ADD_POINT) {
        this.#setIsNewEventButtonDisabled(false);
      }
    });
  }

  #setIsNewEventButtonDisabled(isDisabled) {
    this.headerAddNewPointButton.disabled = isDisabled;
  }

  #temporaryPointRemove() {
    if (
      !this.temporaryPoint ||
      this.openedPointComponent.id !== this.temporaryPoint.id
    ) {
      return;
    }

    this.openedPointComponent.element.remove();
    this.temporaryPoint = null;
    this.openedPointComponent = null;
    this.#setIsNewEventButtonDisabled(false);
  }

  addNewOpenedPoint() {
    this.#setIsNewEventButtonDisabled(true);

    this.temporaryPoint = this.pointCardsModel.temporaryPoint;
    this.openedPoint = this.temporaryPoint;
    this.openedPointComponent = this.#createNewOpenedPoint(
      this.temporaryPoint,
      () => this.#temporaryPointRemove()
    );

    render(
      this.openedPointComponent,
      this.pointCardContainer.element,
      RenderPosition.AFTERBEGIN
    );
  }

  #createNewPoint(point) {
    const pointView = new TripListItemView(point, this.pointCardsModel);
    this.pointComponents.push(pointView);

    const rollupBtn = pointView.element.querySelector('.event__rollup-btn');
    rollupBtn.addEventListener('click', () => {
      this.#openPointCard(point);
    });

    const favoriteBtn = pointView.element.querySelector('.event__favorite-btn');
    favoriteBtn.addEventListener('click', () => {
      const updatedPoint = { ...point, isFavorite: !point.isFavorite };
      this.pointCardsModel.updatePoint(updatedPoint);
    });

    return pointView;
  }

  #createNewOpenedPoint(point, customCancelHandler) {
    const cancelHandler = () => {
      this.#closePointCard();
    };

    const formCancelHandler = customCancelHandler
      ? customCancelHandler
      : cancelHandler;

    const formSubmitHandler = (submittedPoint) => {
      if (!submittedPoint) {
        this.#closePointCard();
        this.openedPoint = null;
        return;
      }

      if (this.temporaryPoint) {
        this.pointCardsModel.addPoint(submittedPoint);
        return;
      }

      this.pointCardsModel.updatePoint(submittedPoint);
    };

    const formDeleteHandler = (pointToDelete) =>
      this.pointCardsModel.deletePoint(pointToDelete);

    const pointOpenedView = new TripListItemOpenedView(
      point,
      formCancelHandler,
      formSubmitHandler,
      formDeleteHandler,
      this.pointCardsModel
    );
    this.openedPointComponent = pointOpenedView;

    return pointOpenedView;
  }

  #openPointCard(point) {
    this.#temporaryPointRemove();

    if (this.openedPoint !== null) {
      this.#closePointCard();
      this.openedPoint = null;
    }

    const pointOpenedView = this.#createNewOpenedPoint(point);
    const oldComponent = this.pointComponents.find(
      (component) => component.id === point.id
    );

    replace(pointOpenedView, oldComponent);

    this.pointComponents = this.pointComponents.filter(
      (component) => component.id !== point.id
    );
    this.openedPoint = point;
  }

  #closePointCard() {
    if (!this.openedPointComponent || !this.openedPoint) {
      return;
    }

    if (this.temporaryPoint) {
      this.#temporaryPointRemove();
      return;
    }

    const pointView = this.#createNewPoint(this.openedPoint);
    replace(pointView, this.openedPointComponent);
    this.openedPointComponent = null;
    this.openedPoint = null;
  }

  #rerenderPoint(updatedPoint) {
    const pointView = this.#createNewPoint(updatedPoint);
    const oldPointView = this.pointComponents.find(
      (component) => component.id === pointView.id
    );

    this.pointComponents = this.pointComponents.map((component) =>
      component.id === pointView.id ? pointView : component
    );

    replace(pointView, oldPointView);
  }

  #onDocumentKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();

      if (!this.openedPoint) {
        return;
      }

      if (!this.openedPointComponent) {
        this.#temporaryPointRemove();
        return;
      }

      this.#closePointCard();
      this.#setIsNewEventButtonDisabled(false);
      this.openedPoint = null;
    }
  };

  init(listData) {
    listData.forEach((point) => {
      const pointView = this.#createNewPoint(point);
      render(pointView, this.pointCardContainer.element);
    });

    document.addEventListener('keydown', this.#onDocumentKeydown);
  }

  destroy() {
    this.pointComponents = [];
    remove(this.pointCardContainer);
  }
}

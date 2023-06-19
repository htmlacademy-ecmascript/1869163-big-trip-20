import { remove, render, RenderPosition, replace } from '../framework/render';
import { isEscapeKey } from '../utils';
import TripListItemOpenedView from '../view/trip-list-item-opened-view';
import TripListItemView from '../view/trip-list-item-view';
import TripListView from '../view/trip-list-view';

export default class PointPresenter {
  constructor(pointCardsModel, headerAddNewPointButton) {
    this.pointCardContainer = new TripListView();
    this.headerAddNewPointButton = headerAddNewPointButton;
    this.pointCardsModel = pointCardsModel;
    this.pointComponents = [];
    this.openedPointComponent = null;
    this.openedPoint = null;
    this.pointTemplate = null;
  }

  pointTemplateRemove() {
    if (
      !this.openedPointComponent ||
      !this.pointTemplate ||
      this.openedPointComponent.id !== this.pointTemplate.id
    ) {
      return;
    }

    this.openedPointComponent?.element.remove();
    this.pointTemplate = null;
    this.openedPointComponent = null;
    this.headerAddNewPointButton.disabled = false;
  }

  addNewOpenedPoint() {
    this.headerAddNewPointButton.disabled = true;

    this.pointTemplate = this.pointCardsModel.pointTemplate;
    const pointTemplateComponent = this.#createNewOpenedPoint(
      this.pointTemplate,
      () => this.pointTemplateRemove()
    );
    this.openedPointComponent = pointTemplateComponent;

    render(
      pointTemplateComponent,
      this.pointCardContainer.element,
      RenderPosition.AFTERBEGIN
    );
  }

  #createNewPoint(point) {
    const pointView = new TripListItemView(point);
    this.pointComponents.push(pointView);

    const rollupBtn = pointView.element.querySelector('.event__rollup-btn');
    rollupBtn.addEventListener('click', () => {
      this.#replacePointWithForm(point);
    });

    const favoriteBtn = pointView.element.querySelector('.event__favorite-btn');
    favoriteBtn.addEventListener('click', () => {
      const updatedPoint = { ...point, isFavorite: !point.isFavorite };
      this.pointCardsModel.updatePoint(updatedPoint);
      this.#rerenderPoint(updatedPoint);
    });

    return pointView;
  }

  #createNewOpenedPoint(point, customCancelHandler) {
    const cancelHandler = () => {
      this.#replaceFormWithPoint(point);
      this.openedPoint = null;
    };
    const formCancelHandler = customCancelHandler
      ? customCancelHandler
      : cancelHandler;

    const formSubmitHandler = (evt) => {
      evt.preventDefault();

      if (this.pointTemplate) {
        this.pointCardsModel.addPoint(this.pointTemplate);
        this.pointComponents.push(this.#createNewPoint(this.pointTemplate));
        this.#replaceFormWithPoint(this.pointTemplate);

        this.pointTemplate = null;
        this.openedPoint = null;
        this.headerAddNewPointButton.disabled = false;

        return;
      }

      this.#replaceFormWithPoint(point);
      this.openedPoint = null;
    };

    const pointOpenedView = new TripListItemOpenedView(
      point,
      formCancelHandler,
      formSubmitHandler
    );
    this.openedPointComponent = pointOpenedView;

    return pointOpenedView;
  }

  #replacePointWithForm(point) {
    this.pointTemplateRemove();

    if (this.openedPoint !== null) {
      this.#replaceFormWithPoint(this.openedPoint);
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

  #replaceFormWithPoint() {
    const pointView = this.#createNewPoint(this.openedPoint);

    replace(pointView, this.openedPointComponent);

    this.openedPointComponent = null;
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
    if (isEscapeKey(evt)) {
      evt.preventDefault();

      if (!this.openedPoint) {
        return;
      }

      this.#replaceFormWithPoint(this.openedPoint);
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

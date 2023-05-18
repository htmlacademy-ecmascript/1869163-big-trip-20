import { remove, render, replace } from '../framework/render';
import PointCardsModel from '../model/point-cards-model';
import { isEscapeKey } from '../utils';
import TripListItemOpenedView from '../view/trip-list-item-opened-view';
import TripListItemView from '../view/trip-list-item-view';
import TripListView from '../view/trip-list-view';

export default class PointPresenter {
  constructor() {
    this.pointCardContainer = new TripListView();

    this.onRollupBtnClick = (point) => this.#replacePointWithForm(point);
    this.onPointFormSubmit = () => this.#replaceFormWithPoint();
    this.onCancelBtnClick = () => this.#replaceFormWithPoint();
    this.onFavoriteBtnClick = (point, favoriteBtn) =>
      this.#addToFavorite(point, favoriteBtn);

    this.pointComponents = [];
    this.openedPointComponent = null;

    this.openedPoint = null;

    this.pointCardsModel = new PointCardsModel();
  }

  #createNewPoint(point) {
    const pointView = new TripListItemView(point);
    this.pointComponents.push(pointView);

    const rollupBtn = pointView.element.querySelector('.event__rollup-btn');
    rollupBtn.addEventListener('click', () => {
      this.onRollupBtnClick(point);
    });

    const favoriteBtn = pointView.element.querySelector('.event__favorite-btn');
    favoriteBtn.addEventListener('click', () => {
      this.onFavoriteBtnClick(point, favoriteBtn);
    });

    return pointView;
  }

  #changeIsFavorite(point) {
    point.isFavorite = !point.isFavorite;
    return point;
  }

  #addToFavorite(point, favoriteBtn) {
    this.pointCardsModel.updatePoint(point, this.#changeIsFavorite(point));

    favoriteBtn.classList.toggle('event__favorite-btn--active');
  }

  #createNewOpenedPoint(point) {
    const pointOpenedView = new TripListItemOpenedView(point);
    this.openedPointComponent = pointOpenedView;

    const pointForm = pointOpenedView.element.querySelector('form');
    pointForm.addEventListener('submit', () => this.onPointFormSubmit(point));

    const cancelBtn =
      pointOpenedView.element.querySelector('.event__reset-btn');
    cancelBtn.addEventListener('click', () => {
      this.onCancelBtnClick(point);

      this.openedPoint = null;
    });

    return pointOpenedView;
  }

  #replacePointWithForm(point) {
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
    remove(this.pointCardContainer);
  }
}

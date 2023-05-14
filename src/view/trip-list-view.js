import { render, replace } from '../framework/render';
import AbstractView from '../framework/view/abstract-view';
import { isEscapeKey } from '../utils';
import TripListItemOpenedView from './trip-list-item-opened-view';
import TripListItemView from './trip-list-item-view';

export default class TripListView extends AbstractView {
  constructor(onRollupBtnClick, onPointFormSubmit, onCancelBtnClick) {
    super();
    this.onRollupBtnClick = onRollupBtnClick;
    this.onPointFormSubmit = onPointFormSubmit;
    this.onCancelBtnClick = onCancelBtnClick;

    this.pointComponents = [];
    this.openedPointComponent = null;

    this.openedPoint = null;
  }

  get template() {
    return `
        <ul class="trip-events__list"></ul>
        `;
  }

  createNewPoint(point) {
    const pointView = new TripListItemView(point);
    this.pointComponents.push(pointView);

    const rollupBtn = pointView.element.querySelector('.event__rollup-btn');
    rollupBtn.addEventListener('click', () => {
      this.onRollupBtnClick(point);
    });

    return pointView;
  }

  createNewOpenedPoint(point) {
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

  replacePointWithForm(point) {
    if (this.openedPoint !== null) {
      this.replaceFormWithPoint(this.openedPoint);
      this.openedPoint = null;
    }

    const pointOpenedView = this.createNewOpenedPoint(point);

    const oldComponent = this.pointComponents.find(
      (component) => component.id === point.id
    );

    replace(pointOpenedView, oldComponent);

    this.pointComponents = this.pointComponents.filter(
      (component) => component.id !== point.id
    );

    this.openedPoint = point;
  }

  replaceFormWithPoint() {
    const pointView = this.createNewPoint(this.openedPoint);

    replace(pointView, this.openedPointComponent);

    this.openedPointComponent = null;
  }

  #onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();

      if (!this.openedPoint) {
        return;
      }

      this.replaceFormWithPoint(this.openedPoint);
      this.openedPoint = null;
    }
  };

  init(listData) {
    listData.forEach((point) => {
      const pointView = this.createNewPoint(point);

      render(pointView, this.element);
    });

    document.addEventListener('keydown', this.#onDocumentKeydown);
  }
}

import HeaderTripTimeFiltersView from '../view/header-trip-time-filters-view';
import HeaderTripInfoView from '../view/header-trip-info-view';
import TripSectionListFilterView from '../view/trip-section-list-filter-view';
import TripListView from '../view/trip-list-view';
import NoPointsView from '../view/no-points-view';
import { emptyListText } from '../view/no-points-view';
import { render, RenderPosition } from '../framework/render';
import PointPresenter from './point-presenter';
import { InputId } from '../const';

export default class Presenter {
  #currentSortType = InputId.SORT_DAY;
  #sourcedPoints = [];

  constructor(
    headerTripInfoContainer,
    headerTripControlsFilterContainer,
    tripEventsSectionContainer,
    pointCardsModel
  ) {
    this.headerTripInfoContainer = headerTripInfoContainer;
    this.headerTripControlsFilterContainer = headerTripControlsFilterContainer;
    this.tripEventsSectionContainer = tripEventsSectionContainer;
    this.headerTripTimeFiltersView = new HeaderTripTimeFiltersView();

    this.noPointsView = new NoPointsView(emptyListText['filter-everything']);

    this.headerAddNewPointButton = document.querySelector(
      '.trip-main__event-add-btn'
    );

    this.pointCardsModel = pointCardsModel;

    this.tripListView = new TripListView();
    this.pointPresenter = new PointPresenter();
  }

  /** Рендер информации в хедере */
  #renderHeaderTripInfo() {
    render(
      new HeaderTripInfoView(),
      this.headerTripInfoContainer,
      RenderPosition.AFTERBEGIN
    );
  }

  /** Рендер фильтров Время */
  #renderHeaderTripTimeFilters() {
    render(
      this.headerTripTimeFiltersView,
      this.headerTripControlsFilterContainer
    );
  }

  /** Рендер фильтров в секции */
  #renderTripSectionFilters() {
    render(
      new TripSectionListFilterView(this.#onSortTypeChange),
      this.tripEventsSectionContainer
    );
  }

  #sortPoints(sortInputId) {
    this.pointCardsModel.sortPointsData(sortInputId);

    this.#currentSortType = sortInputId;
  }

  #onSortTypeChange = (sortInputId) => {
    if (this.#currentSortType === sortInputId) {
      return;
    }

    this.#sortPoints(sortInputId);
    this.pointPresenter.destroy();
    this.#renderPointCards();
  };

  /** Рендер точек */
  #renderPointCards() {
    this.pointPresenter.init(this.pointCardsModel.pointCards);

    render(
      this.pointPresenter.pointCardContainer,
      this.tripEventsSectionContainer
    );
  }

  init() {
    this.#renderTripSectionFilters();
    this.#renderPointCards();

    this.#sourcedPoints = [...this.pointCardsModel.pointCards];
  }
}

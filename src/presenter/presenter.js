import HeaderTripTimeFiltersView from '../view/header-trip-time-filters-view';
import HeaderTripInfoView from '../view/header-trip-info-view';
import TripSectionListFilterView from '../view/trip-section-list-filter-view';
import TripListView from '../view/trip-list-view';
import NoPointsView from '../view/no-points-view';
import { emptyListText } from '../view/no-points-view';
import { render, RenderPosition } from '../framework/render';
import PointPresenter from './point-presenter';

export default class Presenter {
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
  }

  /** Рендер информации в хедере */
  renderHeaderTripInfo() {
    render(
      new HeaderTripInfoView(),
      this.headerTripInfoContainer,
      RenderPosition.AFTERBEGIN
    );
  }

  /** Рендер фильтров Время */
  renderHeaderTripTimeFilters() {
    render(
      this.headerTripTimeFiltersView,
      this.headerTripControlsFilterContainer
    );
  }

  /** Рендер фильтров в секции */
  renderTripSectionFilters() {
    render(new TripSectionListFilterView(), this.tripEventsSectionContainer);
  }

  /** Рендер точек */
  renderPointCards() {
    const pointPresenter = new PointPresenter();

    pointPresenter.init(this.pointCardsModel.pointCards);

    render(pointPresenter.pointCardContainer, this.tripEventsSectionContainer);
  }

  init() {
    this.renderPointCards();
  }
}

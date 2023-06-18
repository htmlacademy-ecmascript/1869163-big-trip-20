import HeaderTripInfoView from '../view/header-trip-info-view';
import TripSectionListFilterView from '../view/trip-section-list-filter-view';
import TripListView from '../view/trip-list-view';
import { render, RenderPosition } from '../framework/render';
import PointPresenter from './point-presenter';
import { EmptyListMessage, EventType, FilterType, SortType } from '../const';
import {
  filterFuture,
  filterPast,
  filterPresent,
  sortDay,
  sortPrice,
} from '../utils';
import EmptyListMessageView from '../view/empty-list-message-view';

export default class Presenter {
  constructor(
    headerAddNewPointButton,
    headerTripInfoContainer,
    tripEventsSectionContainer,
    pointCardsModel,
    filterModel,
    sortModel,
    timeFilterPresenter
  ) {
    this.headerTripInfoContainer = headerTripInfoContainer;
    this.tripEventsSectionContainer = tripEventsSectionContainer;
    this.pointCardsModel = pointCardsModel;
    this.headerAddNewPointButton = headerAddNewPointButton;
    this.filterModel = filterModel;
    this.sortModel = sortModel;
    this.tripListView = new TripListView();
    this.pointPresenter = new PointPresenter(
      pointCardsModel,
      this.headerAddNewPointButton
    );
    this.timeFilterPresenter = timeFilterPresenter;

    this.currentModifier = { eventType: null, modifier: null };
    this.filteredPoints = [...this.pointCardsModel.pointCards];
    this.emptyListMessageView = null;

    this.observerCallback = (eventType, modifier) => {
      this.currentModifier = { eventType, modifier };
      this.#onModifierChange();
    };
    this.sortModel.addObserver(this.observerCallback);
    this.pointCardsModel.addObserver(() => {});

    this.headerAddNewPointButton.addEventListener('click', () => {
      this.filteredPoints = this.pointCardsModel.pointCards;
      this.tripSectionListFilterView.setDayActive();
      this.timeFilterPresenter.resetFilter();

      this.pointPresenter.addNewOpenedPoint();
    });

    this.filterModel.addObserver((eventType, modifier) => {
      this.observerCallback(eventType, modifier);
      this.tripSectionListFilterView.setDayActive();
    });
  }

  get pointCards() {
    if (this.currentModifier.eventType === EventType.SET_FILTER) {
      switch (this.currentModifier.modifier) {
        case FilterType.FUTURE:
          this.filteredPoints =
            this.pointCardsModel.pointCards.filter(filterFuture);
          break;
        case FilterType.PAST:
          this.filteredPoints =
            this.pointCardsModel.pointCards.filter(filterPast);
          break;
        case FilterType.PRESENT:
          this.filteredPoints =
            this.pointCardsModel.pointCards.filter(filterPresent);
          break;
        default:
          this.filteredPoints = this.pointCardsModel.pointCards;
      }

      return this.filteredPoints;
    }

    switch (this.currentModifier.modifier) {
      case SortType.SORT_DAY:
        return [...this.filteredPoints].sort(sortDay);
      case SortType.SORT_TIME:
        return [...this.filteredPoints].sort();
      case SortType.SORT_PRICE:
        return [...this.filteredPoints].sort(sortPrice);
      default:
        return this.filteredPoints;
    }
  }

  /** Рендер информации в хедере */
  #renderHeaderTripInfo() {
    render(
      new HeaderTripInfoView(),
      this.headerTripInfoContainer,
      RenderPosition.AFTERBEGIN
    );
  }

  /** Рендер фильтров в секции */
  #renderTripSectionFilters() {
    this.tripSectionListFilterView = new TripSectionListFilterView(
      this.#onSortTypeChange
    );
    render(this.tripSectionListFilterView, this.tripEventsSectionContainer);
  }

  #onModifierChange = () => {
    this.pointPresenter.destroy();
    this.#renderPointCards();
  };

  #onSortTypeChange = (sortType) => {
    this.sortModel.sortType = sortType;
  };

  /** Рендер точек */
  #renderPointCards() {
    if (this.emptyListMessageView) {
      this.emptyListMessageView.element.remove();
      this.emptyListMessageView.removeElement();
      this.emptyListMessageView = null;
    }

    this.pointPresenter.init(this.pointCards);

    if (this.pointCards.length === 0) {
      this.emptyListMessageView = new EmptyListMessageView(
        EmptyListMessage[this.currentModifier.modifier]
      );

      render(this.emptyListMessageView, this.tripEventsSectionContainer);
    }

    render(
      this.pointPresenter.pointCardContainer,
      this.tripEventsSectionContainer
    );
  }

  #rerenderPointCards() {
    this.pointPresenter.destroy();
    this.#renderPointCards();
  }

  init() {
    this.#renderTripSectionFilters();
    this.#renderPointCards();
  }
}

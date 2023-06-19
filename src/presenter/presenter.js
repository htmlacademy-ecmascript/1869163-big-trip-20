import TripSectionSortPanelView from '../view/trip-section-sort-panel-view';
import TripListView from '../view/trip-list-view';
import { render } from '../framework/render';
import PointPresenter from './point-presenter';
import { EmptyListMessage, EventType, FilterType, SortType } from '../const';
import {
  filterFuture,
  filterPast,
  filterPresent,
  sortDay,
  sortDuration,
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
      this.headerAddNewPointButton,
      pointCardsModel,
      filterModel,
      sortModel
    );
    this.timeFilterPresenter = timeFilterPresenter;

    this.currentModifier = { eventType: null, modifier: SortType.SORT_DAY };
    this.emptyListMessageView = null;
    this.filteredPoints = [...this.pointCardsModel.pointCards];

    this.filterObserverCallback = (eventType, modifier) => {
      this.currentModifier = { eventType, modifier };
      this.#onModifierChange();
    };
    this.sortModel.addObserver(this.filterObserverCallback);

    this.pointCardsModel.addObserver((eventType, point) => {
      if (
        (eventType === EventType.FETCH_POINTS ||
          eventType === EventType.ADD_POINT) &&
        this.pointCardsModel.pointCards.length > 0 &&
        !document.querySelector('.trip-events__trip-sort')
      ) {
        this.#renderTripSectionSortPanel();
      }

      if (
        eventType === EventType.POINT_IS_DELETED &&
        this.pointCardsModel.pointCards.length === 0
      ) {
        this.TripSectionSortPanelView.element.remove();
        this.TripSectionSortPanelView.removeElement();
      }

      if (
        eventType === EventType.ADD_POINT ||
        eventType === EventType.FETCH_POINTS ||
        eventType === EventType.POINT_IS_DELETED
      ) {
        this.timeFilterPresenter.resetFilter();
        this.setSortPanelDayActive();
        this.#rerenderPointCards();
      }

      if (eventType === EventType.UPDATE_POINT) {
        this.updateFilteredPoints(point);
        this.#rerenderPointCards();
      }
    });

    this.headerAddNewPointButton.addEventListener('click', () => {
      this.timeFilterPresenter.resetFilter();

      if (this.pointCardsModel.pointCards.length > 0) {
        this.setSortPanelDayActive();
      }

      this.pointPresenter.addNewOpenedPoint();
    });

    this.filterModel.addObserver((eventType, modifier) => {
      this.filterObserverCallback(eventType, modifier);

      if (this.pointCardsModel.pointCards.length > 0) {
        this.setSortPanelDayActive();
      }
    });
  }

  updateFilteredPoints(newPoint) {
    this.filteredPoints = this.filteredPoints.map((filteredPoint) =>
      filteredPoint.id === newPoint.id ? newPoint : filteredPoint
    );
  }

  setSortPanelDayActive() {
    this.TripSectionSortPanelView.setDayActive();
    this.currentModifier = {
      EventType: EventType.SET_SORT_TYPE,
      modifier: SortType.SORT_DAY,
    };
  }

  get pointCards() {
    if (this.currentModifier.eventType === EventType.SET_FILTER) {
      this.filteredPoints = [...this.pointCardsModel.pointCards];

      switch (this.currentModifier.modifier) {
        case FilterType.FUTURE:
          this.filteredPoints = this.filteredPoints.filter(filterFuture);
          break;
        case FilterType.PAST:
          this.filteredPoints = this.filteredPoints.filter(filterPast);
          break;
        case FilterType.PRESENT:
          this.filteredPoints = this.filteredPoints.filter(filterPresent);
          break;
        default:
          this.filteredPoints = this.filteredPoints.sort(sortDay);
          break;
      }
    }

    switch (this.currentModifier.modifier) {
      case SortType.SORT_TIME:
        this.filteredPoints.sort(sortDuration);
        break;
      case SortType.SORT_PRICE:
        this.filteredPoints.sort(sortPrice);
        break;
      default:
        this.filteredPoints.sort(sortDay);
        break;
    }

    return this.filteredPoints;
  }

  #renderTripSectionSortPanel() {
    this.TripSectionSortPanelView = new TripSectionSortPanelView(
      this.#onSortTypeChange
    );
    render(this.TripSectionSortPanelView, this.tripEventsSectionContainer);
  }

  #onModifierChange = () => {
    this.pointPresenter.destroy();
    this.#renderPointCards();
  };

  #onSortTypeChange = (sortType) => {
    this.sortModel.sortType = sortType;
  };

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

      this.TripSectionSortPanelView.element.remove();
      this.TripSectionSortPanelView.removeElement();

      render(this.emptyListMessageView, this.tripEventsSectionContainer);
    }

    if (
      this.pointCards.length > 0 &&
      !document.querySelector('.trip-events__trip-sort')
    ) {
      this.#renderTripSectionSortPanel();
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
    this.pointCardsModel.fetchData();
  }
}

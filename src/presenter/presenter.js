import { RenderPosition, render } from '../render';
import HeaderTripTimeFiltersView from '../view/header-trip-time-filters-view';
import HeaderTripInfoView from '../view/header-trip-info-view';
import TripSectionListFilterView from '../view/trip-section-list-filter-view';
import TripListView from '../view/trip-list-view';
import AddNewPointTripListView from '../view/add-new-point-trip-list-view';

const mockListData = [
  { type: 'Taxi', city: 'Amsterdam' },
  { type: 'Flight', city: 'Chamonix' },
  { type: 'Drive', city: 'Chamonix' },
];

export default class Presenter {
  constructor(
    headerTripInfoContainer,
    headerTripControlsFilterContainer,
    tripEventsSectionContainer
  ) {
    this.headerTripInfoContainer = headerTripInfoContainer;
    this.headerTripControlsFilterContainer = headerTripControlsFilterContainer;
    this.tripEventsSectionContainer = tripEventsSectionContainer;
    this.headerTripTimeFiltersView = new HeaderTripTimeFiltersView();

    this.tripListView = new TripListView(mockListData);
    this.addNewPointTripListView = new AddNewPointTripListView(mockListData);
  }

  init() {
    render(
      new HeaderTripInfoView(),
      this.headerTripInfoContainer,
      RenderPosition.AFTERBEGIN
    );

    render(
      this.headerTripTimeFiltersView,
      this.headerTripControlsFilterContainer
    );

    render(new TripSectionListFilterView(), this.tripEventsSectionContainer);
    render(this.addNewPointTripListView, this.tripEventsSectionContainer);

    this.headerTripTimeFiltersView.addListener(
      '#filter-future',
      'click',
      () => {
        this.addNewPointTripListView.removeElement();
        render(this.tripListView, this.tripEventsSectionContainer);
      }
    );
    this.headerTripTimeFiltersView.addListener(
      '#filter-present',
      'click',
      () => {
        this.tripListView.removeElement();
        render(this.addNewPointTripListView, this.tripEventsSectionContainer);
      }
    );
  }
}

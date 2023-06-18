import { FilterType } from '../const';
import { render } from '../framework/render';
import HeaderTripTimeFiltersView from '../view/header-trip-time-filters-view';

export default class TimeFilterPresenter {
  constructor(headerTripControlsFilterContainer, filterModel) {
    this.headerTripControlsFilterContainer = headerTripControlsFilterContainer;
    this.headerTripTimeFiltersView = new HeaderTripTimeFiltersView();

    this.filterModel = filterModel;

    this.headerTripTimeFiltersView.element.addEventListener('change', (evt) => {
      this.filterModel.filter = evt.target.id;
    });
  }

  resetFilter() {
    this.headerTripTimeFiltersView.resetFilter();
    this.filterModel.filter = FilterType.EVERYTHING;
  }

  init() {
    render(
      this.headerTripTimeFiltersView,
      this.headerTripControlsFilterContainer
    );
  }
}

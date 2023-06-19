import Presenter from './presenter/presenter';
import PointCardsModel from './model/point-cards-model';
import TimeFilterPresenter from './presenter/time-filter-presenter';
import FilterModel from './model/filter-model';
import {
  FilterType,
  SortType,
  API_SERVER_END_POINT,
  AUTHORIZATION_TOKEN,
} from './const';
import SortModel from './model/sort-model';
import ApiService from './framework/api-service';

const headerTripInfoContainer = document.querySelector('.trip-main');
const headerTripControlsFilterContainer = headerTripInfoContainer.querySelector(
  '.trip-controls__filters'
);
const headerAddNewPointButton = document.querySelector(
  '.trip-main__event-add-btn'
);

const loader = document.querySelector('.loader-overlay');

const setIsLoaderVisible = (isVisible) => {
  if (isVisible) {
    loader.classList.remove('--hidden');
  } else {
    loader.classList.add('--hidden');
  }
};

const apiService = new ApiService(API_SERVER_END_POINT, AUTHORIZATION_TOKEN);

const tripEventsSection = document.querySelector('.trip-events');
const pointCardsModel = new PointCardsModel(apiService, setIsLoaderVisible);
const filterModel = new FilterModel(FilterType.EVERYTHING);
const sortModel = new SortModel(SortType.SORT_DAY);
const timeFilterPresenter = new TimeFilterPresenter(
  headerTripControlsFilterContainer,
  filterModel
);

const presenter = new Presenter(
  headerAddNewPointButton,
  headerTripInfoContainer,
  tripEventsSection,
  pointCardsModel,
  filterModel,
  sortModel,
  timeFilterPresenter
);

presenter.init();

timeFilterPresenter.init();

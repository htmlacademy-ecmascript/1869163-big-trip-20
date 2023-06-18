import Presenter from './presenter/presenter';
import PointCardsModel from './model/point-cards-model';
import TimeFilterPresenter from './presenter/time-filter-presenter';
import FilterModel from './model/filter-model';
import { FilterType, SortType } from './const';
import SortModel from './model/sort-model';

const headerTripInfoContainer = document.querySelector('.trip-main');
const headerTripControlsFilterContainer = headerTripInfoContainer.querySelector(
  '.trip-controls__filters'
);
const headerAddNewPointButton = document.querySelector(
  '.trip-main__event-add-btn'
);
const tripEventsSection = document.querySelector('.trip-events');
const pointCardsModel = new PointCardsModel();
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

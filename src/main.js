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

const loader = document.querySelector('.loader-overlay');

const setIsLoaderVisible = (isVisible) => {
  if (isVisible) {
    loader.classList.remove('--hidden');
  } else {
    loader.classList.add('--hidden');
  }
};

const errorModal = document.querySelector('.error-modal');
const errorModalCloseButton = document.querySelector(
  '.error-modal-close-button'
);
const setIsErrorModalVisible = (isVisible, textPrefix) => {
  if (isVisible) {
    errorModal.querySelector(
      'h2'
    ).textContent = `${textPrefix}Something's gone wrong...`;
    errorModal.classList.remove('hidden');
  } else {
    errorModal.classList.add('hidden');
  }
};
errorModalCloseButton.addEventListener('click', () =>
  setIsErrorModalVisible(false)
);

const tripEventsSection = document.querySelector('.trip-events');
const pointCardsModel = new PointCardsModel(
  setIsLoaderVisible,
  setIsErrorModalVisible
);
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
  timeFilterPresenter,
  setIsErrorModalVisible
);

presenter.init();

timeFilterPresenter.init();

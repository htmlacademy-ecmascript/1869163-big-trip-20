import Presenter from './presenter/presenter';

const headerTripInfoContainer = document.querySelector('.trip-main');
const headerTripControlsFilterContainer = headerTripInfoContainer.querySelector(
  '.trip-controls__filters'
);
const tripEventsSection = document.querySelector('.trip-events');

const presenter = new Presenter(
  headerTripInfoContainer,
  headerTripControlsFilterContainer,
  tripEventsSection
);

presenter.init();

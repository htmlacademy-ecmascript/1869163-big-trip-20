import Presenter from './presenter/presenter';
import PointCardsModel from './model/point-cards-model';

const headerTripInfoContainer = document.querySelector('.trip-main');
const headerTripControlsFilterContainer = headerTripInfoContainer.querySelector(
  '.trip-controls__filters'
);
const tripEventsSection = document.querySelector('.trip-events');
const pointCardsModel = new PointCardsModel();

const presenter = new Presenter(
  headerTripInfoContainer,
  headerTripControlsFilterContainer,
  tripEventsSection,
  pointCardsModel
);

presenter.init();

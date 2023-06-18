const MIN_PRICE = 20;
const MAX_PRICE = 100;
const POINT_CARDS_COUNT = 3;

const PointCardType = {
  TAXI: 'Taxi',
  BUS: 'Bus',
  TRAIN: 'Train',
  SHIP: 'Ship',
  DRIVE: 'Drive',
  FLIGHT: 'Flight',
  CHECK_IN: 'Check-in',
  SIGHTSEEING: 'Sightseeing',
  RESTAURANT: 'Restaurant',
};

const POINT_CARD_TYPES = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

const POINT_CARD_CITY_NAMES = [
  'Praha',
  'New York',
  'Podebrady',
  'Brno',
  'Rostov',
  'Vladivostok',
  'Chicago',
  'Mordor',
  'Tokyo',
];

const POINT_CARD_DESCRIPTIONS = [
  'Здесь вкусно кормят!',
  'Это место очень хвалят!',
  'Топ 1 ТрипАдвайзера!',
  'Здесь Кексу очень понравилось!',
  'Сюда очень легко добраться!',
];

const FilterType = {
  EVERYTHING: 'filter-everything',
  FUTURE: 'filter-future',
  PRESENT: 'filter-present',
  PAST: 'filter-past',
};

const EmptyListMessage = {
  'filter-everything': 'Click New Event to create your first point',
  'filter-future': 'There are no future events now',
  'filter-present': 'There are no present events now',
  'filter-past': 'There are no past events now',
};

const SortType = {
  SORT_DAY: 'sort-day',
  SORT_TIME: 'sort-time',
  SORT_PRICE: 'sort-price',
};

const EventType = {
  SET_FILTER: 'SET_FILTER',
  SET_SORT_TYPE: 'SET_SORT_TYPE',
  ADD_NEW_POINT: 'ADD_NEW_POINT',
};

export {
  POINT_CARD_TYPES,
  POINT_CARD_CITY_NAMES,
  MIN_PRICE,
  MAX_PRICE,
  POINT_CARD_DESCRIPTIONS,
  POINT_CARDS_COUNT,
  FilterType,
  SortType,
  EventType,
  EmptyListMessage,
  PointCardType,
};

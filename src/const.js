const MIN_PRICE = 20;
const MAX_PRICE = 100;
const POINT_CARDS_COUNT = 3;

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

const InputId = {
  DEFAULT: 'default',
  SORT_DAY: 'sort-day',
  SORT_EVENT: 'sort-event',
  SORT_TIME: 'sort-time',
  SORT_PRICE: 'sort-price',
  SORT_OFFER: 'sort-offer',
};

export {
  POINT_CARD_TYPES,
  POINT_CARD_CITY_NAMES,
  MIN_PRICE,
  MAX_PRICE,
  POINT_CARD_DESCRIPTIONS,
  POINT_CARDS_COUNT,
  InputId,
};

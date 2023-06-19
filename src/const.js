const FilterType = {
  EVERYTHING: 'filter-everything',
  FUTURE: 'filter-future',
  PRESENT: 'filter-present',
  PAST: 'filter-past',
};

const SortType = {
  SORT_DAY: 'sort-day',
  SORT_TIME: 'sort-time',
  SORT_PRICE: 'sort-price',
};

const EmptyListMessage = {
  'sort-day': 'Click New Event to create your first point',
  'filter-everything': 'Click New Event to create your first point',
  'filter-future': 'There are no future events now',
  'filter-present': 'There are no present events now',
  'filter-past': 'There are no past events now',
};

const EventType = {
  SET_FILTER: 'SET_FILTER',
  SET_SORT_TYPE: 'SET_SORT_TYPE',
  FETCH_POINTS: 'FETCH_POINTS',
  FETCH_DESTINATIONS: 'FETCH_DESTINATIONS',
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  REQUEST_TO_DELETE_POINT: 'REQUEST_TO_DELETE_POINT',
  POINT_IS_DELETED: 'POINT_IS_DELETED',
  SENDING_REQUEST: 'SENDING_REQUEST',
  RESPONSE_ERROR: 'RESPONSE_ERROR',
};

const API_SERVER_END_POINT = 'https://20.ecmascript.pages.academy';

const AUTHORIZATION_TOKEN = 'Basic 000111222';

const RequestMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

const Endpoints = {
  GET_POINTS: 'big-trip/points',
  GET_DESTINATIONS: 'big-trip/destinations',
  GET_OFFERS: 'big-trip/offers',
  POST_POINT: 'big-trip/points',
  UPDATE_POINT: 'big-trip/points',
  ADD_POINT: 'big-trip/points',
  DELETE_POINT: 'big-trip/points',
};

const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;

const POINT_DEFAULT_TYPE = 'bus';

export {
  FilterType,
  SortType,
  EventType,
  EmptyListMessage,
  API_SERVER_END_POINT,
  AUTHORIZATION_TOKEN,
  RequestMethods,
  Endpoints,
  MINUTES_PER_HOUR,
  HOURS_PER_DAY,
  POINT_DEFAULT_TYPE,
};

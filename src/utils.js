import { MAX_PRICE, MIN_PRICE } from './const';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore);

const DATE_FORMAT = 'D MMMM';
const TIME_FORMAT = 'HH:mm';

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const shuffle = (array) =>
  array.length > 0 ? [...array].sort(() => Math.random() - 0.5) : [];

const getRandomPrice = () => getRandomInteger(MIN_PRICE, MAX_PRICE);

const isEscapeKey = (evt) => evt.key === 'Escape';

function humanizePointCardDate(date) {
  return date ? dayjs(date).format(DATE_FORMAT) : '';
}

function getTimeFromDate(date) {
  return date ? dayjs(date).format(TIME_FORMAT) : '';
}

const sortPrice = (a, b) => a.price - b.price;
const sortDay = (a, b) => a.time.start - b.time.start;

const filterFuture = (point) => dayjs().isBefore(dayjs(point.time.start));
const filterPast = (point) => dayjs(point.time.end).isBefore(dayjs());
const filterPresent = (point) =>
  dayjs(point.time.start).isSameOrBefore(dayjs()) &&
  dayjs(point.time.end).isAfter(dayjs());

export {
  getRandomArrayElement,
  getRandomInteger,
  getRandomPrice,
  humanizePointCardDate,
  getTimeFromDate,
  shuffle,
  isEscapeKey,
  sortPrice,
  sortDay,
  filterFuture,
  filterPast,
  filterPresent,
};

import { MAX_PRICE, MIN_PRICE } from './const';
import dayjs from 'dayjs';

const DATE_FORMAT = 'D MMMM';

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

export {
  getRandomArrayElement,
  getRandomInteger,
  getRandomPrice,
  humanizePointCardDate,
  shuffle,
  isEscapeKey,
};

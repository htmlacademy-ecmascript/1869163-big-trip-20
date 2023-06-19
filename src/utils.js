import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import duration from 'dayjs/plugin/duration';
import { HOURS_PER_DAY, MINUTES_PER_HOUR } from './const';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(duration);

const DATE_FORMAT = 'D MMMM';
const TIME_FORMAT = 'HH:mm';

const getFormattedDate = (date) =>
  date ? dayjs(date).format(DATE_FORMAT) : '';

const getFormattedTime = (date) =>
  date ? dayjs(date).format(TIME_FORMAT) : '';

const getDefaultDatepickerEndDate = ({ start, end }) =>
  dayjs(end).isBefore(start) ? start : end;

const sortPrice = (a, b) => b.price - a.price;
const sortDay = (a, b) => a.time.start - b.time.start;
const sortDuration = (a, b) =>
  dayjs(b.time.end).diff(b.time.start, 'minute') -
  dayjs(a.time.end).diff(a.time.start, 'minute');

const getZeroPrefixedNumber = (n) => `${n < 10 ? '0' : ''}${n}`;

const getTimeDuration = ({ start, end }) => {
  const days = Math.round(dayjs(end).diff(start, 'day'));
  const hours =
    Math.round(dayjs(end).diff(start, 'hour')) - days * HOURS_PER_DAY;
  const minutes =
    Math.round(dayjs(end).diff(start, 'minute')) -
    hours * MINUTES_PER_HOUR -
    days * MINUTES_PER_HOUR * HOURS_PER_DAY;

  if (days > 0) {
    return `${getZeroPrefixedNumber(days)}D ${getZeroPrefixedNumber(
      hours
    )}H ${getZeroPrefixedNumber(minutes)}M`;
  }

  if (hours > 0) {
    return `${getZeroPrefixedNumber(hours)}H ${getZeroPrefixedNumber(
      minutes
    )}M`;
  }

  return `${getZeroPrefixedNumber(minutes)}M`;
};

const filterFuture = (point) => dayjs().isBefore(dayjs(point.time.start));
const filterPast = (point) => dayjs(point.time.end).isBefore(dayjs());
const filterPresent = (point) =>
  dayjs(point.time.start).isSameOrBefore(dayjs()) &&
  dayjs(point.time.end).isSameOrAfter(dayjs());

const getCities = (destinationsArray) => {
  const citiesById = {};
  const citiesByName = {};
  destinationsArray.forEach(({ id, name, description, pictures }) => {
    citiesById[id] = { name, description, pictures };
    citiesByName[name] = { id, description, pictures };
  });

  return { citiesById, citiesByName };
};

const convertToOffersByType = (offersResponse) => {
  const offersByType = {};
  offersResponse.forEach(({ type, offers }) => {
    offersByType[type] = offers;
  });

  return offersByType;
};

const getCheckedOffers = (possibleOffers, offers) =>
  possibleOffers.map((offer) => ({
    ...offer,
    isChecked: offers.includes(offer.id),
  }));

const convertPoint = (points, citiesById, offersByType) =>
  points.map((point) => {
    const { id, type, offers, destination } = point;
    const possibleOffers = offersByType[type];

    return {
      id,
      type,
      time: {
        start: new Date(point['date_from']),
        end: new Date(point['date_to']),
      },
      city: { ...citiesById[destination], id: destination },
      price: point['base_price'],
      isFavorite: point['is_favorite'],
      offers: getCheckedOffers(possibleOffers, offers),
    };
  });

const preparePointToServer = ({
  id,
  type,
  time,
  city,
  price,
  isFavorite,
  offers,
}) => ({
  id,
  destination: city.id,
  ['date_from']: dayjs(time.start).toISOString(),
  ['date_to']: dayjs(time.end).toISOString(),
  ['base_price']: price,
  ['is_favorite']: isFavorite,
  type,
  offers: offers.filter(({ isChecked }) => isChecked).map((offer) => offer.id),
});

const getFormData = (formData) => {
  const entries = [...formData.entries()];
  const formDataValues = {};
  const offersIds = [];

  entries.forEach(([key, value]) => {
    if (!key.includes('event')) {
      offersIds.push(key);
      return;
    }
    formDataValues[key] = value;
  });

  const { ['event-price']: price } = formDataValues;
  return { offersIds, price: Number(price) };
};

export {
  getFormattedDate,
  getFormattedTime,
  getTimeDuration,
  getDefaultDatepickerEndDate,
  sortPrice,
  sortDay,
  sortDuration,
  filterFuture,
  filterPast,
  filterPresent,
  convertPoint,
  getCities,
  convertToOffersByType,
  preparePointToServer,
  getFormData,
};

import {
  getRandomArrayElement,
  getRandomInteger,
  getRandomPrice,
} from '../utils.js';
import {
  POINT_CARD_TYPES,
  POINT_CARD_CITY_NAMES,
  POINT_CARD_DESCRIPTIONS,
} from '../const.js';

const pointCardImgUrl = `https://loremflickr.com/248/152?random=${getRandomInteger(
  1,
  6
)}`;

const mockListData = [
  { type: 'Taxi', city: 'Amsterdam' },
  { type: 'Flight', city: 'Chamonix' },
  { type: 'Drive', city: 'Chamonix' },
];

const mockPointCards = [
  {
    date: new Date('2023-03-18'),
    type: getRandomArrayElement(POINT_CARD_TYPES),

    time: {
      start: null,
      end: null,
    },

    city: {
      name: getRandomArrayElement(POINT_CARD_CITY_NAMES),
      img: pointCardImgUrl,
      description: getRandomArrayElement(POINT_CARD_DESCRIPTIONS),
    },

    price: getRandomPrice(),

    offers: [
      { offer: '', price: getRandomPrice() },
      { offer: '', price: getRandomPrice() },
      { offer: '', price: getRandomPrice() },
    ],

    isOpen: false,
    isFavorite: true,
  },
  {
    date: new Date('2023-03-18'),
    type: getRandomArrayElement(POINT_CARD_TYPES),

    time: {
      start: null,
      end: null,
    },

    city: {
      name: getRandomArrayElement(POINT_CARD_CITY_NAMES),
      img: pointCardImgUrl,
      description: getRandomArrayElement(POINT_CARD_DESCRIPTIONS),
    },

    price: getRandomPrice(),

    offers: [
      { offer: '', price: getRandomPrice() },
      { offer: '', price: getRandomPrice() },
      { offer: '', price: getRandomPrice() },
    ],

    isOpen: false,
    isFavorite: false,
  },
  {
    date: new Date('2023-03-18'),
    type: getRandomArrayElement(POINT_CARD_TYPES),

    time: {
      start: null,
      end: null,
    },

    city: {
      name: getRandomArrayElement(POINT_CARD_CITY_NAMES),
      img: pointCardImgUrl,
      description: getRandomArrayElement(POINT_CARD_DESCRIPTIONS),
    },

    price: getRandomPrice(),

    offers: [
      { offer: '', price: getRandomPrice() },
      { offer: '', price: getRandomPrice() },
      { offer: '', price: getRandomPrice() },
    ],

    isOpen: true,
    isFavorite: true,
  },
  {
    date: new Date('2023-03-18'),
    type: getRandomArrayElement(POINT_CARD_TYPES),

    time: {
      start: null,
      end: null,
    },

    city: {
      name: getRandomArrayElement(POINT_CARD_CITY_NAMES),
      img: pointCardImgUrl,
      description: getRandomArrayElement(POINT_CARD_DESCRIPTIONS),
    },

    price: getRandomPrice(),

    offers: [
      { offer: '', price: getRandomPrice() },
      { offer: '', price: getRandomPrice() },
      { offer: '', price: getRandomPrice() },
    ],

    isOpen: true,
    isFavorite: true,
  },
];

function getRandomPointCardsData() {
  return getRandomArrayElement(mockPointCards);
}

export { mockListData, getRandomPointCardsData };

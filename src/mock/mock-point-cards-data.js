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

const mockPointCards = [
  {
    id: 1,

    type: getRandomArrayElement(POINT_CARD_TYPES),

    time: {
      start: new Date('2023-03-18'),
      end: new Date('2023-03-20'),
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
    id: 2,

    type: getRandomArrayElement(POINT_CARD_TYPES),

    time: {
      start: new Date('2023-03-18'),
      end: new Date('2023-03-20'),
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
    id: 3,

    type: getRandomArrayElement(POINT_CARD_TYPES),

    time: {
      start: new Date('2023-03-18'),
      end: new Date('2023-03-20'),
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
    id: 4,

    type: getRandomArrayElement(POINT_CARD_TYPES),

    time: {
      start: new Date('2023-03-18'),
      end: new Date('2023-03-20'),
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
];

function getRandomPointCardsData() {
  return getRandomArrayElement(mockPointCards);
}

export { getRandomPointCardsData };

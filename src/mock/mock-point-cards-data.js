import { getRandomArrayElement, getRandomPrice, shuffle } from '../utils.js';
import {
  POINT_CARD_TYPES,
  POINT_CARD_CITY_NAMES,
  POINT_CARD_DESCRIPTIONS,
} from '../const.js';

const mockPointCards = [
  {
    id: 1,

    type: getRandomArrayElement(POINT_CARD_TYPES),

    time: {
      start: new Date('2023-07-05 18:00'),
      end: new Date('2023-07-20 19:00'),
    },

    city: {
      name: getRandomArrayElement(POINT_CARD_CITY_NAMES),
      description: getRandomArrayElement(POINT_CARD_DESCRIPTIONS),
    },

    price: getRandomPrice(),

    offers: [
      { offer: '', price: getRandomPrice() },
      { offer: '', price: getRandomPrice() },
      { offer: '', price: getRandomPrice() },
    ],

    isFavorite: false,
  },
  {
    id: 2,

    type: getRandomArrayElement(POINT_CARD_TYPES),

    time: {
      start: new Date('2023-06-20 10:30'),
      end: new Date('2023-06-25 12:00'),
    },

    city: {
      name: getRandomArrayElement(POINT_CARD_CITY_NAMES),
      description: getRandomArrayElement(POINT_CARD_DESCRIPTIONS),
    },

    price: getRandomPrice(),

    offers: [
      { offer: '', price: getRandomPrice() },
      { offer: '', price: getRandomPrice() },
      { offer: '', price: getRandomPrice() },
    ],

    isFavorite: false,
  },
  {
    id: 3,

    type: getRandomArrayElement(POINT_CARD_TYPES),

    time: {
      start: new Date('2023-06-09 14:00'),
      end: new Date('2023-07-20 16:00'),
    },

    city: {
      name: getRandomArrayElement(POINT_CARD_CITY_NAMES),
      description: getRandomArrayElement(POINT_CARD_DESCRIPTIONS),
    },

    price: getRandomPrice(),

    offers: [
      { offer: '', price: getRandomPrice() },
      { offer: '', price: getRandomPrice() },
      { offer: '', price: getRandomPrice() },
    ],

    isFavorite: false,
  },
  {
    id: 4,

    type: getRandomArrayElement(POINT_CARD_TYPES),

    time: {
      start: new Date('2023-06-09 15:00'),
      end: new Date('2023-06-20 20:00'),
    },

    city: {
      name: getRandomArrayElement(POINT_CARD_CITY_NAMES),
      description: getRandomArrayElement(POINT_CARD_DESCRIPTIONS),
    },

    price: getRandomPrice(),

    offers: [
      { offer: '', price: getRandomPrice() },
      { offer: '', price: getRandomPrice() },
      { offer: '', price: getRandomPrice() },
    ],

    isFavorite: false,
  },
];

function getRandomPointCardsData() {
  return shuffle(mockPointCards);
}

const randomPointCardsData = getRandomPointCardsData();

export { randomPointCardsData };

import { getRandomArrayElement, getRandomPrice, shuffle } from '../utils.js';
import {
  POINT_CARD_TYPES,
  POINT_CARD_CITY_NAMES,
  POINT_CARD_DESCRIPTIONS,
  POINT_CARDS_COUNT,
} from '../const.js';

const mockPointCards = [
  {
    id: 1,

    type: getRandomArrayElement(POINT_CARD_TYPES),

    time: {
      start: new Date('2023-03-05'),
      end: new Date('2023-03-20'),
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
      start: new Date('2023-03-18'),
      end: new Date('2023-03-20'),
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
      start: new Date('2023-03-23'),
      end: new Date('2023-03-20'),
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
      start: new Date('2023-03-09'),
      end: new Date('2023-03-20'),
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
  return shuffle(mockPointCards).slice(0, POINT_CARDS_COUNT);
}

const randomPointCardsData = getRandomPointCardsData();

export { randomPointCardsData };

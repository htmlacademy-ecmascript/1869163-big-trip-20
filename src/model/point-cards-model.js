import { EventType, PointCardType } from '../const';
import Observable from '../framework/observable';
import { randomPointCardsData } from '../mock/mock-point-cards-data';
import { nanoid } from 'nanoid';

export default class PointCardsModel extends Observable {
  #pointCards = randomPointCardsData;

  get pointCards() {
    return this.#pointCards;
  }

  updatePoint(updatedPoint) {
    this.#pointCards = this.#pointCards.map((point) => {
      if (point.id === updatedPoint.id) {
        return updatedPoint;
      }
      return point;
    });
  }

  getPoint(id) {
    return this.#pointCards.find((point) => point.id === id);
  }

  addPoint(point) {
    this.#pointCards.unshift(point);
    this._notify(EventType.ADD_NEW_POINT, point);
  }

  get pointTemplate() {
    return {
      id: nanoid(),

      type: PointCardType.BUS,

      time: {
        start: new Date(),
        end: new Date(),
      },

      city: {
        name: '',
        description: '',
      },

      price: 0,

      offers: [],

      isFavorite: false,
    };
  }
}

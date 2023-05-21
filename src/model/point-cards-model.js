import { InputId } from '../const';
import { randomPointCardsData } from '../mock/mock-point-cards-data';
import { sortPrice } from '../utils';

export default class PointCardsModel {
  #pointCards = randomPointCardsData;

  get pointCards() {
    return this.#pointCards;
  }

  toggleIsFavorite(point) {
    const updatedPoint = { ...point, isFavorite: !point.isFavorite };
    this.updatePoint(updatedPoint);

    return updatedPoint;
  }

  updatePoint(updatedPoint) {
    this.#pointCards = this.#pointCards.map((point) => {
      if (point.id === updatedPoint.id) {
        return updatedPoint;
      }
      return point;
    });
  }

  sortPointsData(sortInputId) {
    switch (sortInputId) {
      case InputId.SORT_DAY:
        this.#pointCards.sort(sortPrice);
        break;
      case InputId.SORT_EVENT:
        this.#pointCards.sort(sortPrice);
        break;
      case InputId.SORT_TIME:
        this.#pointCards.sort(sortPrice);
        break;
      case InputId.SORT_PRICE:
        this.#pointCards.sort(sortPrice);
        break;
      case InputId.SORT_OFFER:
        this.#pointCards.sort(sortPrice);
        break;
      default:
    }
  }
}

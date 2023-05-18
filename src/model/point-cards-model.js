import { randomPointCardsData } from '../mock/mock-point-cards-data';

export default class PointCardsModel {
  #pointCards = randomPointCardsData;

  get pointCards() {
    return this.#pointCards;
  }

  updatePoint(point, updatedPoint) {
    const updatedPointCards = this.pointCards.filter(
      (card) => card.id !== point.id
    );

    updatedPointCards.push(updatedPoint);

    this.#pointCards = updatedPointCards;
  }
}

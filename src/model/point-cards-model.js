import { POINT_CARDS_COUNT } from '../const';
import { getRandomPointCardsData } from '../mock/mock-point-cards-data';

export default class PointCardsModel {
  #pointCards = getRandomPointCardsData().slice(0, POINT_CARDS_COUNT);

  get pointCards() {
    return this.#pointCards;
  }
}

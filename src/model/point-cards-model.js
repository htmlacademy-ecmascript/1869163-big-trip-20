import { POINT_CARDS_COUNT } from '../const';
import { getRandomPointCardsData } from '../mock/mock-point-cards-data';

export default class PointCardsModel {
  pointCards = Array.from(
    { length: POINT_CARDS_COUNT },
    getRandomPointCardsData
  );

  getPointCardsData() {
    return this.pointCards;
  }
}

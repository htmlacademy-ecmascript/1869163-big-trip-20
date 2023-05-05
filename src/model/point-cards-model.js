import { POINT_CARDS_COUNT } from '../const';
import { getRandomPointCardsData } from '../mock/mock-point-cards-data';

export default class PointCardsModel {
  pointCards = [
    ...new Set(
      Array.from({ length: POINT_CARDS_COUNT }, getRandomPointCardsData)
    ),
  ];

  addModelUpdateCallBack(callBack) {
    this.modelUpdateCallBack = callBack;
  }

  getPointCardsData() {
    return this.pointCards;
  }

  updateOpenStateOfCard(id, isOpen) {
    const updatedCards = this.pointCards.map((card) => {
      if (card.id !== id) {
        return { ...card, isOpen: false };
      }
      return { ...card, isOpen };
    });

    this.pointCards = updatedCards;
    if (!this.modelUpdateCallBack) {
      return;
    }
    this.modelUpdateCallBack();
  }
}

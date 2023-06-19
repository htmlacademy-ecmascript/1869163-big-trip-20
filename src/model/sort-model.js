import { EventType } from '../const';
import Observable from '../framework/observable';

export default class SortModel extends Observable {
  constructor(initSortType) {
    super();
    this.currentSortType = initSortType;
  }

  set sortType(newSortType) {
    this.currentSortType = newSortType;

    this._notify(EventType.SET_SORT_TYPE, newSortType);
  }

  get sortType() {
    return this.currentSortType;
  }
}

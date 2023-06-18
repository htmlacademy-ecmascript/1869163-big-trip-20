import { EventType } from '../const';
import Observable from '../framework/observable';

export default class FilterModel extends Observable {
  constructor(initFilter) {
    super();
    this.currentFilter = initFilter;
  }

  set filter(newFilter) {
    this.currentFilter = newFilter;

    this._notify(EventType.SET_FILTER, newFilter);
  }

  get filter() {
    return this.currentFilter;
  }
}

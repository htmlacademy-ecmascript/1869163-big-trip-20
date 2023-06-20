import {
  API_SERVER_END_POINT,
  AUTHORIZATION_TOKEN,
  EventType,
  POINT_DEFAULT_TYPE,
} from '../const';
import Observable from '../framework/observable';
import {
  getCities,
  convertToOffersByType,
  convertPoint,
} from '../utils';
import BigTripApiService from '../big-trip-api-service';

export default class PointCardsModel extends Observable {
  constructor(setIsLoaderVisible) {
    super();
    this.setIsLoaderVisible = setIsLoaderVisible;
    this.apiService = new BigTripApiService(API_SERVER_END_POINT, AUTHORIZATION_TOKEN);
  }

  #pointCards = [];
  #citiesById = {};
  #citiesByName = {};
  #offersByType = {};
  #suggestions = [];
  #isLoading = false;

  #setIsLoading(isLoading) {
    this.#isLoading = isLoading;
    this.setIsLoaderVisible(isLoading);
  }

  get isLoading() {
    return this.#isLoading;
  }

  async #fetchDestinations() {
    const destinationsResponse = await this.apiService.fetchDestinations();

    const { citiesByName, citiesById } = getCities(destinationsResponse);
    this.#citiesByName = citiesByName;
    this.#citiesById = citiesById;

    this.#suggestions = [
      ...new Set(destinationsResponse.map(({ name }) => name)),
    ].sort();
  }

  async #fetchOffers() {
    const offersResponse = await this.apiService.fetchOffers();

    this.#offersByType = convertToOffersByType(offersResponse);
  }

  async #fetchPoints() {
    const points = await this.apiService.fetchPoints();

    this.#pointCards = convertPoint(
      points,
      this.#citiesById,
      this.#offersByType
    );
  }

  async fetchData() {
    try {
      this.#setIsLoading(true);
      this._notify(EventType.SENDING_REQUEST);

      await this.#fetchDestinations();
      await this.#fetchOffers();
      await this.#fetchPoints();

      this._notify(EventType.FETCH_POINTS);
    } catch (error) {
      this._notify(EventType.RESPONSE_ERROR, error);
    }

    this.#setIsLoading(false);
  }

  async updatePoint(updatedPoint) {
    try {
      this.#setIsLoading(true);
      this._notify(EventType.SENDING_REQUEST);

      this.apiService.updatePoint(updatedPoint);

      this.#pointCards = this.#pointCards.map((point) => {
        if (point.id === updatedPoint.id) {
          return updatedPoint;
        }
        return point;
      });

      this._notify(EventType.UPDATE_POINT, updatedPoint);
    } catch (error) {
      this._notify(EventType.RESPONSE_ERROR, updatedPoint);
    }

    this.#setIsLoading(false);
  }

  async addPoint(newPoint) {
    try {
      this.#setIsLoading(true);
      this._notify(EventType.SENDING_REQUEST);

      const id = await this.apiService.addPoint(newPoint);
      this.pointCards.push({ ...newPoint, id });
      this._notify(EventType.ADD_POINT);
    } catch (error) {
      this._notify(EventType.RESPONSE_ERROR, error);
    }
    this.#setIsLoading(false);
  }

  async deletePoint(point) {
    try {
      this.#setIsLoading(true);
      this._notify(EventType.REQUEST_TO_DELETE_POINT);

      this.apiService.deletePoint(point);
      this.#pointCards = this.#pointCards.filter(({ id }) => id !== point.id);
      this._notify(EventType.POINT_IS_DELETED);
    } catch (error) {
      this._notify(EventType.RESPONSE_ERROR, error);
    }

    this.#setIsLoading(false);
  }

  get pointCards() {
    return this.#pointCards;
  }

  get temporaryPoint() {
    return {
      id: '',
      type: POINT_DEFAULT_TYPE,
      time: {
        start: new Date(),
        end: new Date(),
      },
      city: {
        name: '',
        description: '',
        pictures: [],
      },
      price: 0,
      isFavorite: false,
      offers: this.#offersByType[POINT_DEFAULT_TYPE],
    };
  }

  get suggestions() {
    return this.#suggestions;
  }

  get offers() {
    return this.#offersByType;
  }

  get citiesByName() {
    return this.#citiesByName;
  }
}

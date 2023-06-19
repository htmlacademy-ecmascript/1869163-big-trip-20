import {
  Endpoints,
  EventType,
  POINT_DEFAULT_TYPE,
  RequestMethods,
} from '../const';
import Observable from '../framework/observable';
import {
  getCities,
  convertToOffersByType,
  convertPoint,
  preparePointToServer,
} from '../utils';
import ApiService from '../framework/api-service';

export default class PointCardsModel extends Observable {
  constructor(apiService, setIsLoaderVisible) {
    super();
    this.apiService = apiService;
    this.setIsLoaderVisible = setIsLoaderVisible;
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
    const response = await this.apiService._load({
      url: Endpoints.GET_DESTINATIONS,
    });
    const destinations = await ApiService.parseResponse(response);

    const { citiesByName, citiesById } = getCities(destinations);
    this.#citiesByName = citiesByName;
    this.#citiesById = citiesById;

    this.#suggestions = [
      ...new Set(destinations.map(({ name }) => name)),
    ].sort();
  }

  async #fetchOffers() {
    const response = await this.apiService._load({ url: Endpoints.GET_OFFERS });
    const offersResponse = await ApiService.parseResponse(response);

    this.#offersByType = convertToOffersByType(offersResponse);
  }

  async #fetchPoints() {
    const response = await this.apiService._load({ url: Endpoints.GET_POINTS });
    const points = await ApiService.parseResponse(response);

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
      this._notify(EventType.RESPONSE_ERROR);
    }

    this.#setIsLoading(false);
  }

  async updatePoint(updatedPoint) {
    try {
      this.#setIsLoading(true);
      this._notify(EventType.SENDING_REQUEST);

      await this.apiService._load({
        url: `${Endpoints.UPDATE_POINT}/${updatedPoint.id}`,
        method: RequestMethods.PUT,
        body: JSON.stringify(preparePointToServer(updatedPoint)),
        headers: new Headers({ 'Content-type': 'application/json' }),
      });

      this.#pointCards = this.#pointCards.map((point) => {
        if (point.id === updatedPoint.id) {
          return updatedPoint;
        }
        return point;
      });

      this._notify(EventType.UPDATE_POINT);
    } catch (error) {
      this._notify(EventType.RESPONSE_ERROR, updatedPoint);
    }

    this.#setIsLoading(false);
  }

  async addPoint(newPoint) {
    try {
      this.#setIsLoading(true);
      this._notify(EventType.SENDING_REQUEST);

      const response = await this.apiService._load({
        url: Endpoints.ADD_POINT,
        method: RequestMethods.POST,
        body: JSON.stringify(preparePointToServer(newPoint)),
        headers: new Headers({ 'Content-type': 'application/json' }),
      });

      const { id } = await ApiService.parseResponse(response);
      this.pointCards.push({ ...newPoint, id });
      this._notify(EventType.ADD_POINT);
    } catch (error) {
      this._notify(EventType.RESPONSE_ERROR);
    }
    this.#setIsLoading(false);
  }

  async deletePoint(point) {
    try {
      this.#setIsLoading(true);
      this._notify(EventType.REQUEST_TO_DELETE_POINT);

      await this.apiService._load({
        url: `${Endpoints.DELETE_POINT}/${point.id}`,
        method: RequestMethods.DELETE,
      });

      this.#pointCards = this.#pointCards.filter(({ id }) => id !== point.id);
      this._notify(EventType.POINT_IS_DELETED);
    } catch (error) {
      this._notify(EventType.RESPONSE_ERROR);
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

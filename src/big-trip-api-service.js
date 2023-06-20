import { Endpoints, RequestMethods } from './const';
import ApiService from './framework/api-service';
import { preparePointToServer } from './utils';

export default class BigTripApiService extends ApiService {
  async fetchDestinations() {
    const response = await this._load({
      url: Endpoints.GET_DESTINATIONS,
    });
    const destinationsResponse = await ApiService.parseResponse(response);

    return destinationsResponse;
  }

  async fetchOffers() {
    const response = await this._load({ url: Endpoints.GET_OFFERS });
    const offersResponse = await ApiService.parseResponse(response);

    return offersResponse;
  }

  async fetchPoints() {
    const response = await this._load({ url: Endpoints.GET_POINTS });
    const points = await ApiService.parseResponse(response);

    return points;
  }

  async updatePoint(updatedPoint) {
    await this._load({
      url: `${Endpoints.UPDATE_POINT}/${updatedPoint.id}`,
      method: RequestMethods.PUT,
      body: JSON.stringify(preparePointToServer(updatedPoint)),
      headers: new Headers({ 'Content-type': 'application/json' }),
    });
  }

  async addPoint(newPoint) {
    const response = await this._load({
      url: Endpoints.ADD_POINT,
      method: RequestMethods.POST,
      body: JSON.stringify(preparePointToServer(newPoint)),
      headers: new Headers({ 'Content-type': 'application/json' }),
    });
    const { id } = await ApiService.parseResponse(response);

    return id;
  }

  async deletePoint(point) {
    await this._load({
      url: `${Endpoints.DELETE_POINT}/${point.id}`,
      method: RequestMethods.DELETE,
    });
  }
}

import AbstractView from '../framework/view/abstract-view';
import { humanizePointCardDate } from '../utils';

export default class TripListItemView extends AbstractView {
  constructor(pointCard) {
    super();
    this.pointCard = pointCard;
  }

  get id() {
    return this.pointCard.id;
  }

  get template() {
    const { time, type, city, price } = this.pointCard;

    const humanizedStartDate = humanizePointCardDate(time.start);

    return `
    <li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime=${time}>${humanizedStartDate}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="${city.img}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${city.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>
                    —
                    <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>
                  </p>
                  <p class="event__duration">30M</p>
                </div>
                <p class="event__price">
                  €&nbsp;<span class="event__price-value">${price}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  <li class="event__offer">
                    <span class="event__offer-title">Order Uber</span>
                    +€&nbsp;
                    <span class="event__offer-price">20</span>
                  </li>
                </ul>
                <button class="event__favorite-btn" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>
    `;
  }
}
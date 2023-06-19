import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import {
  getDefaultDatepickerEndDate,
  getFormData,
  getFormattedDate,
} from '../utils';
import { EventType } from '../const';

export default class TripListItemOpenedView extends AbstractStatefulView {
  #datepickerStart = null;
  #datepickerEnd = null;
  #isFormChanged = false;

  constructor(
    pointCard,
    formCancelHandler,
    formSubmitHandler,
    formDeleteHandler,
    pointCardModel
  ) {
    super();
    this.formCancelHandler = formCancelHandler;
    this.formSubmitHandler = formSubmitHandler;
    this.formDeleteHandler = formDeleteHandler;
    this.pointCardModel = pointCardModel;

    this._setState({ ...pointCard });
    this._restoreHandlers();

    this.pointCardModel.addObserver((eventType) => {
      if (eventType === EventType.REQUEST_TO_DELETE_POINT) {
        this.#setDeleteButtonText('Deleting...');
      }

      if (eventType === EventType.SENDING_REQUEST) {
        this.#setSaveButtonText('Saving...');
      }

      if (eventType === EventType.RESPONSE_ERROR) {
        this.#setDeleteButtonText('Delete');
        this.#setSaveButtonText('Save');
        this.shake();
      }
    });
  }

  #setSaveButtonText(text) {
    this.element.querySelector('.event__save-btn').textContent = text;
  }

  #setDeleteButtonText(text) {
    const btn = this.element.querySelector('.event__reset-btn--delete');
    if (btn) {
      btn.textContent = text;
    }
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerStart && this.#datepickerEnd) {
      this.#datepickerStart.destroy();
      this.#datepickerEnd.destroy();
      this.#datepickerStart = null;
      this.#datepickerEnd = null;
    }
  }

  #setDatepicker() {
    this.#datepickerStart = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        defaultDate: this._state.time.start,
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        minuteIncrement: 1,
      }
    );
    this.#datepickerStart.config.onChange.push((newDate) => {
      this.updateElement({
        time: {
          start: new Date(newDate),
          end: getDefaultDatepickerEndDate(this._state.time),
        },
      });
    });

    this.#datepickerEnd = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        defaultDate: getDefaultDatepickerEndDate(this._state.time),
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        minDate: this._state.time.start,
        minuteIncrement: 1,
      }
    );
    this.#datepickerEnd.config.onChange.push((newDate) => {
      this.updateElement({
        time: { ...this._state.time, end: new Date(newDate) },
      });
    });
  }

  _restoreHandlers() {
    const resetButton = this.element.querySelector('.event__reset-btn--reset');
    const deleteButton = this.element.querySelector(
      '.event__reset-btn--delete'
    );
    const rollUpButton = this.element.querySelector('.event__rollup-btn');

    if (resetButton) {
      resetButton.addEventListener('click', this.formCancelHandler);
    }

    if (rollUpButton) {
      rollUpButton.addEventListener('click', this.formCancelHandler);
    }

    if (deleteButton) {
      deleteButton.addEventListener('click', () =>
        this.formDeleteHandler(this._state)
      );
    }

    const form = this.element.querySelector('form');

    form.querySelectorAll('input').forEach((input) =>
      input.addEventListener('change', () => {
        this.#isFormChanged = true;
      })
    );

    form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      const formData = new FormData(evt.target);
      const { offersIds, price } = getFormData(formData);
      const offers = this._state.offers.map((offer) => ({
        ...offer,
        isChecked: offersIds.includes(offer.id),
      }));

      const pointToUpdate = {
        ...this._state,
        offers,
        price,
      };

      this.formSubmitHandler(
        !this.#isFormChanged && this._state.id ? null : pointToUpdate
      );
    });

    this.element
      .querySelector('.event__type-group')
      .addEventListener('click', this.#eventTypeGroupHandler);

    this.element
      .querySelector('.event__input--destination')
      .addEventListener('input', this.#destinationInputHandler);

    this.#setDatepicker();
  }

  #eventTypeGroupHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.tagName !== 'LABEL') {
      return;
    }

    const type = evt.target.textContent.toLowerCase();
    const offers = this.pointCardModel.offers[type];

    this.updateElement({ type, offers });
  };

  #destinationInputHandler = (evt) => {
    evt.preventDefault();
    const name = evt.target.value;
    const city = this.pointCardModel.citiesByName[name];
    if (!city) {
      evt.target.value = '';
      this.updateElement({
        city: {
          name: '',
          description: '',
          pictures: [],
        },
      });
      return;
    }

    this.updateElement({ city: { ...city, name } });
  };

  get id() {
    return this._state.id;
  }

  #renderPicture({ src, description }) {
    return `<img class="event__photo" src="${src}" alt="${description}">`;
  }

  #renderPictures(city) {
    return city.pictures.map(this.#renderPicture).join('');
  }

  #renderOffer(offer) {
    return `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden"
        id="${offer.id}" type="checkbox"
        name="${offer.id}" ${offer.isChecked ? 'checked' : ''}>
        <label class="event__offer-label" for="${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          +€&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>
    `;
  }

  #renderOffers(offers) {
    return offers.map(this.#renderOffer).join('');
  }

  #renderSuggestion(suggestion) {
    return `<option value="${suggestion}"></option>`;
  }

  #renderSuggestions() {
    return this.pointCardModel.suggestions.map(this.#renderSuggestion).join('');
  }

  get template() {
    const { type, city, price, time, offers, id } = this._state;

    const iconUrl = `img/icons/${this._state.type.toLowerCase()}.png`;
    const isRollupBtn = id
      ? '<button class="event__rollup-btn" type="button"><span class="visually-hidden">Open event</span></button>'
      : '';
    const isDestination = city.name
      ? `<section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">
                    ${city.description}</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${this.#renderPictures(city)}
                      </div>
                    </div>
                  </section>`
      : '';

    const startTime = getFormattedDate(time.start);
    const endTime = getFormattedDate(time.end);

    return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="${iconUrl}" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        <div class="event__type-item">
                          <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                          <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                          <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                          <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                          <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                          <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked="">
                          <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                          <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                          <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                          <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination"
                    value="${city.name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${this.#renderSuggestions()}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime}">
                    —
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTime}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      €
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="number" min="0" name="event-price" value="${price}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn event__reset-btn--
                  ${id ? 'delete' : 'reset'}"
                  type="${id ? 'button' : 'reset'}">
                  ${id ? 'Delete' : 'Cancel'}</button>
                  ${isRollupBtn}
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                      ${this.#renderOffers(offers)}
                    </div>
                  </section>

                  ${isDestination}

                </section>
              </form>
            </li>`;
  }
}

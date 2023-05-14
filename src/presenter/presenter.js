import HeaderTripTimeFiltersView from '../view/header-trip-time-filters-view';
import HeaderTripInfoView from '../view/header-trip-info-view';
import TripSectionListFilterView from '../view/trip-section-list-filter-view';
import TripListView from '../view/trip-list-view';
import NoPointsView from '../view/no-points-view';
import { emptyListText } from '../view/no-points-view';
import { render, RenderPosition } from '../framework/render';

export default class Presenter {
  constructor(
    headerTripInfoContainer,
    headerTripControlsFilterContainer,
    tripEventsSectionContainer,
    pointCardsModel
  ) {
    this.headerTripInfoContainer = headerTripInfoContainer;
    this.headerTripControlsFilterContainer = headerTripControlsFilterContainer;
    this.tripEventsSectionContainer = tripEventsSectionContainer;
    this.headerTripTimeFiltersView = new HeaderTripTimeFiltersView();

    this.noPointsView = new NoPointsView(emptyListText['filter-everything']);

    this.headerAddNewPointButton = document.querySelector(
      '.trip-main__event-add-btn'
    );

    this.pointCardsModel = pointCardsModel;

    this.tripListView = new TripListView(
      (point) => this.tripListView.replacePointWithForm(point),
      () => this.tripListView.replaceFormWithPoint(),
      () => this.tripListView.replaceFormWithPoint()
    );

    this.rerenderPointsList = () => {
      this.tripListView.removeElement();
    };
  }

  init() {
    /** Загрузка фильтров Время */

    // render(
    //   this.headerTripTimeFiltersView,
    //   this.headerTripControlsFilterContainer
    // );

    /** Заведение переменной для функции листенера кнопок Время */

    // this.headerTripTimeFiltersViewListenerFunc = (evt) => {
    //   this.noPointsView.removeElement();
    //   this.noPointsView = new NoPointsView(emptyListText[evt.target.id]);
    //   render(this.noPointsView, this.tripEventsSectionContainer);
    // };

    /** Заведение переменной для функции листенера кнопки Новая точка */

    // this.headerAddNewPointButtonListenerFunc = () => {
    //   this.headerTripTimeFiltersView.removeListener(
    //     '',
    //     'change',
    //     this.headerTripTimeFiltersViewListenerFunc
    //   );
    //   this.noPointsView.removeElement();

    //   this.headerAddNewPointButton.removeEventListener(
    //     'click',
    //     this.headerAddNewPointButtonListenerFunc
    //   );

    /** Рендер информации в хедере и списка ивентов */

    //   render(
    //     new HeaderTripInfoView(),
    //     this.headerTripInfoContainer,
    // RenderPosition.AFTERBEGIN
    //   );

    //   render(new TripSectionListFilterView(), this.tripEventsSectionContainer);
    //   render(this.addNewPointTripListView, this.tripEventsSectionContainer);
    // };

    /** Рендер списка без точек */

    // render(this.noPointsView, this.tripEventsSectionContainer);

    /** Добавляем листенеры для фильтров Время и кнопки Новая точка */

    // this.headerTripTimeFiltersView.addListener(
    //   '',
    //   'change',
    //   this.headerTripTimeFiltersViewListenerFunc
    // );

    // this.headerAddNewPointButton.addEventListener(
    //   'click',
    //   this.headerAddNewPointButtonListenerFunc
    // );

    this.tripListView.init(this.pointCardsModel.pointCards);

    render(this.tripListView, this.tripEventsSectionContainer);
  }
}

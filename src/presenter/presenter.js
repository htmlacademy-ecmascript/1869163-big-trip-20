import { RenderPosition, render } from '../render';
import HeaderTripTimeFiltersView from '../view/header-trip-time-filters-view';
import HeaderTripInfoView from '../view/header-trip-info-view';
import TripSectionListFilterView from '../view/trip-section-list-filter-view';
import TripListView from '../view/trip-list-view';
import AddNewPointTripListView from '../view/add-new-point-trip-list-view';
import NoPointsView from '../view/no-points-view';
import { mockListData } from '../mock/mock-point-cards-data';
import { emptyListText } from '../view/no-points-view';

export default class Presenter {
  constructor(
    headerTripInfoContainer,
    headerTripControlsFilterContainer,
    tripEventsSectionContainer
  ) {
    this.headerTripInfoContainer = headerTripInfoContainer;
    this.headerTripControlsFilterContainer = headerTripControlsFilterContainer;
    this.tripEventsSectionContainer = tripEventsSectionContainer;
    this.headerTripTimeFiltersView = new HeaderTripTimeFiltersView();

    this.noPointsView = new NoPointsView(emptyListText['filter-everything']);
    this.tripListView = new TripListView(mockListData);
    this.addNewPointTripListView = new AddNewPointTripListView(mockListData);

    this.headerAddNewPointButton = document.querySelector(
      '.trip-main__event-add-btn'
    );
  }

  init() {
    // Загрузка фильтров Время

    // render(
    //   this.headerTripTimeFiltersView,
    //   this.headerTripControlsFilterContainer
    // );

    // Заведение переменной для функции листенера кнопок Время

    // this.headerTripTimeFiltersViewListenerFunc = (evt) => {
    //   this.noPointsView.removeElement();
    //   this.noPointsView = new NoPointsView(emptyListText[evt.target.id]);
    //   render(this.noPointsView, this.tripEventsSectionContainer);
    // };

    // Заведение переменной для функции листенера кнопки Новая точка

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

    //Рендер информации в хедере и списка ивентов

    //   render(
    //     new HeaderTripInfoView(),
    //     this.headerTripInfoContainer,
    //     RenderPosition.AFTERBEGIN
    //   );

    //   render(new TripSectionListFilterView(), this.tripEventsSectionContainer);
    //   render(this.addNewPointTripListView, this.tripEventsSectionContainer);
    // };

    // //Рендер списка без точек

    // render(this.noPointsView, this.tripEventsSectionContainer);

    //Добавляем листенеры для фильтров Время и кнопки Новая точка

    // this.headerTripTimeFiltersView.addListener(
    //   '',
    //   'change',
    //   this.headerTripTimeFiltersViewListenerFunc
    // );

    // this.headerAddNewPointButton.addEventListener(
    //   'click',
    //   this.headerAddNewPointButtonListenerFunc
    // );

    render(new TripListView(mockListData), this.tripEventsSectionContainer);
  }
}

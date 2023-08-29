import { render } from '../framework/render.js';
import { updateItem } from '../utils/utils.js';
import TripSortView from '../view/trip-sort-view.js';
import TripPointPresenter from './trip-point-presenter.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import TripEventsListEmptyView from '../view/trip-events-list-empty-view.js';

// Модели
import PointsModel from '../model/points-model.js';

const CSSClasses = {TRIP_EVENTS: '.trip-events'};
export default class TripContentPresenter {
  #tripEventsContainer = null;
  #tripEventsListContainer = null;
  #pointsModel = null;
  #points = null;
  #pointPresenters = new Map();

  /**
   * @property {Object | null} previousEditingPoint Объект с информацией о предыдущей редактируемой точке
   * @property {TripEventsListItemView} previousEditingPoint.point View точки маршрута
   * @property {EditPointView} previousEditingPoint.form View формы редактированияточки маршрута
   * @property {Function}  previousEditingPoint.handler KeyDownHandler точки маршрута
   */
  #previousEditingPoint = null;

  constructor() {
    this.#tripEventsContainer = document.querySelector(CSSClasses.TRIP_EVENTS); // Общий контейнер для событий
    this.#tripEventsListContainer = new TripEventsListView(); // Контейнер для списка точек маршрута
    this.#pointsModel = new PointsModel(); // Модель для получения данных о точках маршрута
  }

  init() {
    this.#points = this.#pointsModel.points.slice(); // Копируем полученный из модели массив с точками маршрута

    this.#renderTripBoard();
  }

  get points() {
    return this.#points;
  }

  #pointChangeHandler = (changedPoint) => {
    this.#points = updateItem(this.#points, changedPoint); // Обновляем информацию о точке в общем списке
    this.#pointPresenters.get(changedPoint.id).init(changedPoint); // Перерисовываем точку
  };

  #renderTripBoard() {
    this.#renderSort(); // Отрисовываем сортировку точек маршрута

    // Отрисовываем точки маршрута или надпись-предложение, если ни одной точки нет
    render(this.#tripEventsListContainer, this.#tripEventsContainer); // Отрисовываем контейнер для точек маршрута

    if (this.#points.length > 0) {
      this.#renderEventPoints(this.#points);
    } else {
      this.#renderNoPoints();
    }
  }

  #renderSort() {
    render(new TripSortView(), this.#tripEventsContainer);
  }

  #renderNoPoints() {
    render(new TripEventsListEmptyView(), this.#tripEventsListContainer.element);
  }

  #renderEventPoints(points) {
    for (let i = 0; i < points.length; i++) { //Выводим не с первой точки, а со второй т.к. первая отводится под блок редактирования
      this.#renderEventPoint(points[i]); // Отрисовываем события; // Отрисовываем события
    }
  }

  #renderEventPoint(point) {
    const pointPresenter = new TripPointPresenter(this.#tripEventsListContainer.element);

    point.pointChangeCallback = this.#pointChangeHandler;

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearEventPoints() {
    this.#pointPresenters.forEach((pointPresenter) => pointPresenter.destroy());
    this.#pointPresenters.clear();
  }

  reRenderEventPoints(points) {
    this.#clearEventPoints();
    // document.removeEventListener('keydown', this.#previousEditingPoint?.handler);
    this.#previousEditingPoint = null;
    this.#renderEventPoints(points);
  }
}

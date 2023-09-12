import TripFilterView from '../view/trip-filter-view.js';
import { render, replace, remove } from '../framework/render.js';
import { upperCaseFirst } from '../utils/utils.js';
import { FilterType, filters } from '../utils/filter.js';

export default class TripFilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointsModel = null;

  #filterComponent = null;
  #currentFilter = null;
  #previousFilterComponent = null;

  constructor({
    filterContainer,
    filterModel,
    pointsModel,
  }) {
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;
    this.#filterContainer = filterContainer;
    this.#currentFilter = this.#filterModel.filter;
  }

  get filters() {
    const points = this.#pointsModel.points;

    return Object.values(FilterType).map((type) => ({
      name: type,
      dataLength: filters[type](points).length
    }));
  }

  init() {
    this.#previousFilterComponent = this.#filterComponent;
    this.#filterComponent = new TripFilterView({
      filters: this.filters,
      currentFilter: this.#currentFilter,
      onFilterChangeCallback: this.#filterChangeHandler
    });

    if(this.#previousFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    this.#rerenderFilter();
  }

  #rerenderFilter() {
    replace(this.#filterComponent, this.#previousFilterComponent);
    remove(this.#previousFilterComponent);
  }

  /** Обработчики */
  #filterChangeHandler = (filterType) => {
    if(this.#filterModel.filter === filterType) {
      return;
    }

    const capitalizedFilterName = upperCaseFirst(filterType);

    this.#filterModel.setFilter(capitalizedFilterName);
  };
}

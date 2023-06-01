import { BaseStore } from "fluxible/addons/index.js";

import GridData from "./GridData.js";

class GridStore extends BaseStore {
  data: any;
  emitChange: Function;

  static storeName = "GridStore"

  static handlers = {
    "LOAD_GRID": "handleApiOk",
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.data = undefined;
  }

  handleApiOk() {
    this.data = JSON.parse(JSON.stringify(GridData));
    this.emitChange();
  }

  getData() { return this.data; }

  dehydrate() {
    return {
      data: this.data,
    };
  }

  rehydrate(state) {
    this.data = state.data;
  }
}

export default GridStore;
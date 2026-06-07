class UniqueArray {
  constructor() {
    this._items = [];
    this._lookup = {};
  }

  _keyFor(item) {
    if (item !== null && typeof item === "object") {
      return "obj:" + JSON.stringify(item);
    }
    return "prim:" + String(item);
  }

  add(item) {
    const key = this._keyFor(item);
    if (this._lookup[key]) {
      return;
    }
    this._items.push(item);
    this._lookup[key] = true;
  }

  showAll() {
    console.log(this._items);
  }

  exists(item) {
    const key = this._keyFor(item);
    return this._lookup[key] === true;
  }

  get(index) {
    if (index < 0 || index >= this._items.length) {
      return -1;
    }
    return this._items[index];
  }
}

module.exports = UniqueArray;

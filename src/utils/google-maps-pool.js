export default {

  instances: [],

  getFirstAvailableIndex() {
    return this.instances.map(item => item.available).indexOf(true);
  },

  useAvailableMap(index, node, options) {
    const map = this.getMap(index);
    node.appendChild(map.getDiv());
    this.update(index, options);
    this.instances[index].available = false;
    return index;
  },

  createElement() {
    const element = document.createElement('div');
    element.style.width = '100%';
    element.style.height = '100%';
    return element;
  },

  createNewMap(node, options) {
    const element = this.createElement();
    node.appendChild(element);
    const map = new window.google.maps.Map(element, {
      ...options,
      center: new window.google.maps.LatLng(options.lat, options.lng),
    });
    let index = this.instances.push({
      map,
      available: false,
    });
    return --index;
  },

  create(node, options) {
    const index = this.getFirstAvailableIndex();
    if (index > -1) {
      return this.useAvailableMap(index, node, options);
    }
    return this.createNewMap(node, options);
  },

  free(index) {
    if (this.instances[index]) {
      this.instances[index].available = true;
    }
  },

  getMap(index) {
    return this.instances[index].map;
  },

  update(index, options) {
    const map = this.getMap(index);
    map.setOptions({
      ...options,
      center: new window.google.maps.LatLng(options.lat, options.lng),
    });
  },

};
